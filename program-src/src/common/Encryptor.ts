import CryptoJS from "crypto-js";

const secretPass = process.env.REACT_APP_CRYPTO_KEY
  ? process.env.REACT_APP_CRYPTO_KEY
  : "REACT_APP_CRYPTO_SECRETY";

export function BasicEncrypt(data: any) {
  const encryptData = window.btoa(data).toString();
  return encryptData;
}

export function BasicDecrypt(data: any) {
  const decryptData = window.atob(data).toString();
  return decryptData;
}

export function Encrypt(data: any) {
  const encryptData = CryptoJS.AES.encrypt(data, secretPass).toString();
  return encryptData;
}

export function Decrypt(encryptData: any) {
  const bytes = CryptoJS.AES.decrypt(
    encryptData ? encryptData : "",
    secretPass
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
