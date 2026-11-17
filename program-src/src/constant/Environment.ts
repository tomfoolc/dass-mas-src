import Constant from "./Constant";

export function getIsDummyData() {
  return false;
}

export function getEnvironment() {
  return Constant.DEBUG;
}

export function isCacheEnable() {
  return false;
}
