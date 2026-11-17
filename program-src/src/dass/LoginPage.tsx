import React from "react";
import { connect } from "react-redux";

import Constant from "@/constant/Constant";

import {
  BasicEncrypt,
} from "../common/Encryptor";

import {
  goToPage,
  destroySession,
  getUrlParam,
} from "@/dass/common/DASSUtils";

import { DropdownList, Label } from "@/layouts";

import "./css/LoginPage.css";

import {
  getUserConfig,
  authenticate,
  cmsAuthenticate,
  ewsAuthenticate,
  getLoginHospital,
} from "@/reducers";

interface AppProps {
  hospitalCode?: string;
  forwardUrl?: string;
}

interface DispatchProps {
  getUserConfig: (hosp_cde: string, user_id: string) => Promise<any>;
  authenticate: (
    hosp_cde: string,
    user_id: string,
    password: string
  ) => Promise<any>;
  cmsAuthenticate: (
    hosp_cde: string,
    user_id: string,
    token: string
  ) => Promise<any>;
  ewsAuthenticate: (
    hosp_cde: string,
    user_id: string,
    token: string
  ) => Promise<any>;
  getLoginHospital: () => Promise<any>;
}

type Props = AppProps & DispatchProps;

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  getUserConfig,
  authenticate,
  cmsAuthenticate,
  ewsAuthenticate,
  getLoginHospital,
};

const LoginPage = (props: Props) => {
  const { forwardUrl = "" } = props;
  const [cmslogon, setCmsLogon] = React.useState(false);
  const [cmslogonErr, setCmslogonErr] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [passkey, setPasskey] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dataFetchedRef = React.useRef(false);

  const [hospital, setHospital] = React.useState<string>(
    props.hospitalCode ? props.hospitalCode : ""
  );
  const [hospitalList, setHospitalList] = React.useState<string[][]>([
    ["", ""],
  ]);

  const hospitalOnChange = (value: string) => {
    setHospital(value);
  };

  // CMS Logon - Begin
  React.useEffect(() => {

    const loadLoginHospitalList = async () => {
      const { getLoginHospital } = props;

      const response = await getLoginHospital();

      if (response !== null) {
        if (response.ret_cde === Constant.API_SUCCESS) {
          let aryHospital = [];
          for (const element of response.result) {
            aryHospital.push([element.hospital_cde, element.hospital_cde]);
          }
          setHospitalList(aryHospital);

          let defInstCode = getUrlParam("hospital_cde");
          if (defInstCode !== "") {
            setHospital(defInstCode.toUpperCase());
          }
        } else {
          setMessage(response.ret_msg ? response.ret_msg : Constant.ERROR_MSG);
        }
      } else {
        setMessage(Constant.SYSTEM_ERROR_MSG);
      }
    };

    const othSysAuthentication = async (
      hospitalCde: string,
      userId: string,
      access_token: string,
      auth_system: string
    ) => {
      const { cmsAuthenticate, ewsAuthenticate, getUserConfig } = props;

      if (auth_system === "EWS") {
        const authResponse = await ewsAuthenticate(
          hospitalCde,
          userId,
          access_token
        );

        if (authResponse.ret_cde === Constant.API_SUCCESS) {
          const response = await getUserConfig(hospitalCde, userId);
          setTimeout(() => {
            if (response.ret_cde === Constant.API_SUCCESS) {
              setTimeout(() => {
                goToPage(Constant.SYSTEMPAGE);
              }, Constant.DELAY);
            } else {
              setCmslogonErr(true);
            }
          }, Constant.DELAY);
        }
      } else {
        const authResponse = await cmsAuthenticate(
          hospitalCde,
          userId,
          access_token
        );

        if (authResponse.ret_cde === Constant.API_SUCCESS) {
          const response = await getUserConfig(hospitalCde, userId);
          setTimeout(() => {
            if (response.ret_cde === Constant.API_SUCCESS) {
              if (response.result.cmspatient == null) {
                goToPage(Constant.SYSTEMPAGE);
              } else {
                let hkid = response.result.cmspatient.hkid;
                setTimeout(() => {
                  if (hkid !== "") {
                    goToPage("/cmsapp");
                  } else {
                    goToPage(Constant.SYSTEMPAGE);
                  }
                }, Constant.DELAY);
              }
            } else {
              setCmslogonErr(true);
            }
          }, Constant.DELAY);
        }
      }
    };

    if (dataFetchedRef.current) {
      return;
    } else {
      dataFetchedRef.current = true;

      let hospitalCde = getUrlParam("hospital_cde");
      let userId = getUrlParam("user_id");
      let access_token = getUrlParam("access_token");
      let auth_system = getUrlParam("auth_system");
      let error = getUrlParam("error");

      loadLoginHospitalList();

      if (
        hospitalCde !== "" &&
        userId !== "" &&
        access_token !== "" &&
        auth_system !== ""
      ) {
        setCmsLogon(true);
        othSysAuthentication(hospitalCde, userId, access_token, auth_system);
      } else if (error !== "") {
        setCmsLogon(true);
        setCmslogonErr(true);
      } else {
        setCmsLogon(false);
        setCmslogonErr(false);
      }
    }
  }, [props]);

  // CMS Logon - End

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "passkey") {
      setPasskey(value);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setMessage("");
    if (!hospital) {
      setMessage("Please select hospital.");
      return;
    }

    if (!(username && passkey)) {
      setMessage("Please input username and password.");
      return;
    }

    setLoading(true);

    const { authenticate, getUserConfig } = props;

    let instcode: string = hospital;
    const authResponse = await authenticate(
      instcode,
      username.toUpperCase(),
      BasicEncrypt(passkey)
    );

    if (authResponse.ret_cde === Constant.API_SUCCESS) {
      let bForceToChgSecret = authResponse.result.force_change_secret;

      if (bForceToChgSecret) {
        goToPage("resetpwd");
      } else {
        const response = await getUserConfig(instcode, username.toUpperCase());

        if (response.ret_cde === Constant.API_SUCCESS) {
          goToPage(
            forwardUrl.indexOf("daapp?&da_app_no=") === -1
              ? Constant.SYSTEMPAGE
              : forwardUrl
          );
        } else {
          destroySession();
          setMessage(
            response.ret_msg
              ? response.ret_msg
              : "Your login attempt was not successful. Please try again."
          );
        }
      }
    } else {
      setMessage(
        authResponse.ret_msg ? authResponse.ret_msg : Constant.SYSTEM_ERROR_MSG
      );
    }
    setLoading(false);
  };

  let pageContent = null;

  if (!cmslogon)
    pageContent = (
      <div
        style={{
          border: "0px blue solid",
          width: "100%",
          textAlign: "center",
          paddingLeft: "7%",
          paddingRight: "7%",
          paddingTop: "0px",
        }}
      >
        <div
          style={{
            border: "2px silver solid",
            borderTop: "0px",
            width: "100%",
            minWidth: "900px",
          }}
        >
          <div
            className="row alignCenter"
            style={{ backgroundColor: "", margin: "2px" }}
          >
            <div
              className="alignLeft"
              style={{ width: "50%", borderRight: "1px dotted black" }}
            >
              <img 
                src={require("@/assets/images/ha_logo.gif")} 
                alt="Hospital Authority" 
              />
            </div>

            <div
              className="alignRight"
              style={{ width: "50%", marginTop: "10px" }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  verticalAlign: "middle",
                  paddingRight: "10px",
                }}
              >
                <b> DASS IT Support Hotline: 2300-8190, 2515-2653 </b>
              </div>
            </div>
          </div>

          <div
            style={{ height: "1px", width: "400", backgroundColor: "black" }}
          />

          <div id="logoContainer">
            <img 
              src={require("@/assets/images/login_page.png")} 
              alt="" 
            />
            <div id="logoText">
              <div style={{ fontWeight: "bold" }}>
                Disability Allowance Supporting System
              </div>
              <div className="alignRight" style={{ paddingRight: "15px" }}>
                {" "}
                Version {process.env.REACT_APP_VERSION}{" "}
              </div>
            </div>
          </div>

          <div
            style={{ height: "1px", width: "400", backgroundColor: "black" }}
          />

          <div
            style={{
              width: "100%",
              textAlign: "center",
              paddingLeft: "50px",
              paddingTop: "5px",
              paddingBottom: "10px",
              backgroundColor: "rgb(61, 91, 133)",
            }}
          >
            <form name="form" onSubmit={handleSubmit}>
              <div className="row">
                <Label text={"Hospital : "} style={{ color: "white" }} />
                <DropdownList
                  value={hospital}
                  list={hospitalList}
                  onSelect={hospitalOnChange}
                  width={70}
                />
                &nbsp;&nbsp;
                <Label text={"Username : "} style={{ color: "white" }} />
                <div>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    maxLength={16}
                  />
                </div>
                &nbsp;&nbsp;
                <Label text={"Password : "} style={{ color: "white" }} />
                <div>
                  <input
                    type="password"
                    name="passkey"
                    value={passkey}
                    onChange={handleChange}
                    autoComplete="off"
                    maxLength={20}
                  />
                </div>
                &nbsp;&nbsp;
                <div>
                  <button
                    className="btn btn-primary"
                    name="login"
                    disabled={loading}
                  >
                    Login
                  </button>
                  {loading}
                </div>
              </div>
            </form>
          </div>
          <div style={{ height: "10px" }}>
            {message && <div>{message}</div>}
          </div>

          <div className="row">
            <div
              className="alignLeft"
              style={{ width: "65%", marginTop: "10px" }}
            ></div>
            <div
              className="alignLeft"
              style={{ width: "35%", marginTop: "10px" }}
            >
              <div id="loginRemarkH">Important Notes</div>
              <div id="loginRemarkI">
                <div>1. All patient information is strictly confidential</div>
                <div>2. Staff may only use DASS for authorised purposes</div>
                <div>3. All access to DASS is logged</div>
                <div>4. Please logout immediately after use</div>
                <div>5. If you have any trouble or discover any abnormal situation, please contact DASS IT Support team.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else {
    if (!cmslogonErr)
      pageContent = <div> Waiting for Logon Authentication ... </div>;
    else pageContent = <div> Fail to login DASS. </div>;
  }

  return <>{pageContent}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
