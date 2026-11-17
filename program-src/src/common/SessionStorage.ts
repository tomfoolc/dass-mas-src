import Constant from "@/constant/Constant";
import {
  Encrypt,
  Decrypt,
} from "./Encryptor";

import {
  goToPage,
  destroySession,
} from "@/dass/common/DASSUtils";

const SessionStorageName = "DASS.SESSION";
const IsEncrypt = process.env.REACT_APP_IS_ENCRYPT === "0" ? false : true;

const Session = {
  checkSession,
  getSession,
  setSession,
  removeSession,
};

export default Session;

export function checkSession(name: string) {
  if (sessionStorage.getItem(SessionStorageName + "." + name) !== null) {
    return true;
  } else {
    return false;
  }
}

export function getSession(name: string) {
  if (checkSession(name)) {
    try {
      if (IsEncrypt) {
        const encryptData = sessionStorage.getItem(
          SessionStorageName + "." + name
        );
        const decryptData = Decrypt(encryptData);
        return decryptData;
      } else {
        return sessionStorage.getItem(SessionStorageName + "." + name);
      }
    } catch {
      destroySession();
      goToPage(Constant.SYSTEMPAGE);
    }
  } else return null;
}

export function setSession(name: string, value: string) {
  if (IsEncrypt) {
    const encryptData = Encrypt(JSON.stringify(value));
    return sessionStorage.setItem(SessionStorageName + "." + name, encryptData);
  } else {
    return sessionStorage.setItem(SessionStorageName + "." + name, value);
  }
}

export function removeSession(name: string) {
  return sessionStorage.removeItem(SessionStorageName + "." + name);
}
