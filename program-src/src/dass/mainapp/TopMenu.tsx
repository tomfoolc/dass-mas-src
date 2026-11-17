import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IUserConfig } from "@/interface";

import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { PollDownMenu, ToolTips } from "@/layouts";
import {
  destroySession,
  destroyCMSPatientData,
} from "@/dass/common/DASSUtils";

interface StateProps {
  das_data: {
    UserData: IUserConfig;
  };
}

interface AppProps {
  isCMSLogon?: boolean;
}

type Props = AppProps;

const mapDispatchToProps = {};

const TopMenu = (props: Props) => {
  const { isCMSLogon = false } = props;

  const userState = useSelector((state: StateProps) => state.das_data.UserData);
  const hospitalCde = userState.hospital_cde;
  const sysRoleCaseCreator = userState.role?.creator;
  const sysRoleFormReviewer = userState.role?.reviewer;
  const sysRoleClusterCoordinator = userState.role?.clustercoord;
  const sysRoleHaits = userState.role?.haits;
  const sysHO = userState.role?.ho;

  const cssStyles = {
    topmenu: {
      height: 33,
      display: "flex",
      backgroundColor: "rgb(36,48,64)",
    },

    rightmenu: {
      display: "flex",
      marginTop: "0px",
      marginLeft: "auto",
      marginRight: "5px",
      color: "white",
      fontSize: "12px",
    },

    formControl: {
      m: 0,
      width: 0,
      height: 0,
      zIndex: 999,
    },

    list: {
      padding: 0,
      width: 320,
      maxWidth: 360,
      color: "white",
      /*backgroundColor: "rgb(75,85,92)",*/
      backgroundColor: "rgb(36,48,64)",
    },

    listItem: {
      height: "25px",
    },

    image: {
      height: 25,
      width: 25,
    },

    text: {
      color: "black",
      textDecorationLine: "none",
      paddingRight: "10px",
    },
  };

  const homeOnClick = async () => {
    if (isCMSLogon) {
      destroyCMSPatientData();
    }
  };

  const logout = () => {
    destroySession(hospitalCde);
  };

  let appMenu = (
    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {sysRoleCaseCreator === "1" ? (
          <ListItemButton sx={cssStyles.listItem}>
            <ListItem sx={cssStyles.listItem} component={Link} to="/newapp">
              <ListItemText primary="New Application" />
            </ListItem>
          </ListItemButton>
        ) : null}
        <ListItemButton sx={cssStyles.listItem}>
          <ListItem sx={cssStyles.listItem} component={Link} to="/searchapp">
            <ListItemText primary="Search Existing DA MAF" />
          </ListItem>
        </ListItemButton>
      </List>
    </FormControl>
  );

  let reportMenu = (

    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >

        {sysRoleHaits === "1" || sysHO === "1" || sysRoleClusterCoordinator === "1" || sysRoleFormReviewer === "1" ? (
          <ListItemButton sx={cssStyles.listItem}>
            <ListItem sx={cssStyles.listItem} component={Link} to="/rpt/apputils">
              <ListItemText primary="Utilisation Report" />
            </ListItem>
          </ListItemButton>
        ) : null}

        {sysRoleHaits === "1" || sysHO === "1" || sysRoleClusterCoordinator === "1" || sysRoleFormReviewer === "1" ? (
          <ListItemButton sx={cssStyles.listItem}>
            <ListItem sx={cssStyles.listItem} component={Link} to="/rpt/chgstatusreason">
              <ListItemText primary="Change Status Reason Report" />
            </ListItem>
          </ListItemButton>
        ) : null}


        {sysRoleHaits === "1" || sysHO === "1" ? (
          <ListItemButton sx={cssStyles.listItem}>
            <ListItem sx={cssStyles.listItem} component={Link} to="/rpt/appdetail">
              <ListItemText primary="Application Detail Report" />
            </ListItem>
          </ListItemButton>
        ) : null}

      </List>
    </FormControl>
  );

  let userMenu = (
    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton sx={cssStyles.listItem}>
          <ListItem sx={cssStyles.listItem} component={Link} to="/editprofile">
            <ListItemText primary="Edit Profile" />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={cssStyles.listItem}>
          <ListItem
            sx={cssStyles.listItem}
            component={Link}
            to="/changepassword"
          >
            <ListItemText primary="Change Password" />
          </ListItem>
        </ListItemButton>
      </List>
    </FormControl>
  );

  let adminMenu = (
    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton sx={cssStyles.listItem}>
          <ListItem
            sx={cssStyles.listItem}
            component={Link}
            to="/createnewuser"
          >
            <ListItemText primary="Create New User Account" />
          </ListItem>
        </ListItemButton>
        <ListItemButton sx={cssStyles.listItem}>
          <ListItem sx={cssStyles.listItem} component={Link} to="/useraccmaint">
            <ListItemText primary="User Account Maintenance" />
          </ListItem>
        </ListItemButton>
      </List>
    </FormControl>
  );

  let helpMenu = (
    <FormControl sx={cssStyles.formControl}>
      <List
        sx={cssStyles.list}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton sx={cssStyles.listItem}>
          <ListItem sx={cssStyles.listItem} component={Link} to="/document">
            <ListItemText primary="Document" />
          </ListItem>
        </ListItemButton>
      </List>
    </FormControl>
  );

  return (
    <div>
      <div style={cssStyles.topmenu}>
        <div className="row" style={{ margin: "0px 0px 0px 5px" }}>
          <div style={{ margin: "4px 10px 0px 0px" }}>
            <Link className="link" to="/mainapp" onClick={homeOnClick}>
              <img 
                style={cssStyles.image} 
                src={require("@/assets/images/house.png")}
                alt="" 
              />
            </Link>
          </div>
          {!isCMSLogon ? (
            <div className="row">
              <PollDownMenu text="Application" menuList={appMenu} />
              {sysRoleHaits === "1" || sysHO === "1" || sysRoleClusterCoordinator === "1" || sysRoleFormReviewer === "1" ? (
                <PollDownMenu text="Report" menuList={reportMenu} />
              ) : null}
              <PollDownMenu text="User" menuList={userMenu} />
              {sysRoleHaits === "1" ? (
                <PollDownMenu text="Admin" menuList={adminMenu} />
              ) : null}
              <PollDownMenu text="Help" menuList={helpMenu} />
            </div>
          ) : null}
        </div>
        <div style={cssStyles.rightmenu}>
          <div style={{ margin: "4px 20px 0px 0px" }}>
            <ToolTips
              text={
                <div>
                  <div style={{ fontWeight: 800 }}>DAS IT Support Hotline</div>
                  <div>Office hour : 2300-8190</div>
                  <div>Non-office hour : 2515-2653</div>
                </div>
              }
            />
          </div>
          <div style={{ margin: "4px 0px 0px 0px" }}>
            <Link className="link" to="/" onClick={logout}>
              <ToolTips
                text={<div>Logout</div>}
                content={
                  <div>
                    <img
                      style={cssStyles.image}
                      src={require("@/assets/images/logout.png")}
                      alt=""
                    />
                  </div>
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(TopMenu);
