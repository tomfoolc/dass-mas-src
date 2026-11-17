export interface ISystemData {
  hospital_cde?: string;
  unit_name?: string;
  user_id?: string;
  access_token?: string;
  force_change_secret?: boolean;
  isAuthenticated?: boolean;
  isCMSLogon?: boolean;
}

export interface IOptionList {
  text?: string;
  value?: string;
}
