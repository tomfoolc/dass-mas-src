import { IReportConfig } from "./ReportConfig";

export interface IUserConfig {
  hospital_cde?: string;
  user_id?: string;
  name?: string;
  unit_code?: string; // cms default ward / MSSU / system defined unit (e.g. TMH MRO)
  unit_type?: string; // MSSU
  specialty?: string;
  ward?: string;
  specialty_ward_list?: string;
  tel_no?: string;
  role?: IUserRole;
  email?: string;
  password?: string;
  attempt_login?: string;
  last_logon_dtm?: Date;
  auth_system?: string;
  expiry_dte?: Date;
  hospitalListAry?: [];
  clinicListAry?: [];
  unitListAry?: [];
  subUnitList?: [];
  changeReasonList?: [];
  specialtyListAry?: [];
  wardListAry?: [];
  clinic_code?: string;
  reportConfig: IReportConfig
}

export interface IUserProfile {
  hospital_cde?: string;
  user_id?: string;
  name?: string;
  unit_code?: string; // cms default ward / MSSU / system defined unit (e.g. TMH MRO)
  unit_type?: string; // MSSU
  specialty?: string;
  ward?: string;
  tel_no?: string;
  email?: string;
  password?: string;
  new_password?: string;
  attempt_login?: string;
  last_logon_dtm?: Date;
  auth_system?: string;
  expiry_dte?: Date;
  upd_dtm?: Date;
  action_by_hosp?: string;
  action_by?: string;
  role_list?: string;
}

export interface IUserRole {
  role_id?: string; // MSW, CLERK, DOCTOR
  creator: string;
  distributor: string;
  assessor: string;
  reviewer: string;
  sysadmin: string;
  haits: string;
  ho: string;
  clustercoord: string;
}

export interface IDoctorList {
  hospital_cde?: string;
  user_id?: string;
  name?: string;
}

export interface IHospitalList {
  cluster_cde: string;
  hospital_cde: string;
  hospital_eng_name?: string;
  hospital_chi_name?: string;
}

export interface IClinicList {
  clinic_cde?: string;
  clinic_desc?: string;
}

export interface IUnitList {
  hospital_cde?: string;
  unit_code?: string;
  unit_short_desc?: string;
  unit_type?: string;
}

export interface ISubUnitList {
  hospital_cde?: string;
  unit_code?: string;
  sub_unit_code?: string;
  sub_unit_desc?: string;
  resp_mssu?: string;
  resp_sub_unit_code?: string;
}

export interface IChangeReason {
  reason_code?: string;
  reason_type?: string;
  reason_desc?: string;
}
