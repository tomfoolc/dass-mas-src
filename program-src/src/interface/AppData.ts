export interface IAppData {
  da_app_no?: string;
  da_type?: string; // Refer, New
  app_status?: string;
  esign_status?: string;
  app_date?: string;
  da_ref_no?: string;
  mssu_ref_no?: string;
  ssfu_name?: string;
  old_da_ref_no?: string;

  ax_hospital_type?: string;
  ax_hospital_cde?: string;
  ax_clinic_code?: string;
  ax_specialty_type?: string;
  ax_specialty_ward?: string;
  ax_sub_spec_ward?: string;
  ax_doctor?: string;
  ax_doctor_name?: string;
  ax_ref_no?: string;

  create_by_hosp?: string;
  create_by_unit?: string;
  create_by_unit_type?: string;

  create_by?: string;
  create_dtm?: Date;

  submit_dtm?: Date;
  review_dtm?: Date;
  sign_dtm?: Date;
  complete_dtm?: Date;
  close_dtm?: string;

  upd_by_hosp?: string;
  upd_by_unit?: string;
  upd_by_unit_type?: string;
  upd_by?: string;
  upd_dtm?: Date;

  // Patient Information
  patient_key?: string;
  hkid?: string;
  document_type?: string; // I: HKIC  B: BC
  eng_name?: string;
  chi_name?: string;
  sex?: string;
  dob?: Date;
  age?: number;
  addr?: string;
  tel_no?: string;
  remark?: string;
  treat_hospital_type?: string; // H: Hospital, C: Clinic
  treat_hospital_cde?: string;
  treat_specialty_type?: string; // S: Specialty, W: Ward
  treat_specialty_ward?: string;
  treat_ref_no?: string;
  next_follow_up_dte?: string;

  //Application Detail
  patient_cond?: string;
  app_type?: string; //NEW, NDA, HDA
  med_rpt_attached?: number;
  form_return_dte?: string;
  contact?: string;
  contact_no?: string;
  oth_contact?: string; //removed
  oth_contact_no?: string; //removed

  //MAF Request Parts
  maf_req_part2?: number;
  maf_req_part3?: number;
  maf_req_part4?: number;
  maf_req_part5?: number;
  maf_req_part6?: number;
  maf_req_part7?: number;
  msg_to_doctor?: string;

  //MAF Details
  //Part 2
  loss_cond?: string; // loss_limb, loss_hand, loss_feet, loss_sight, loss_paralysis, paraplegia, bedridden, oth_cond
  other_cond_desc?: string;
  not_disable?: number;
  not_disable_desc?: string;
  not_disable_remark?: string;

  // Part 3
  with_constant_attend?: number;
  freq_att_type?: string; // FT, CS
  is_above15?: number;

  // Part 4
  disabled_duration?: string; // 0TO6M, 6M, 6TO12M, 1TO2Y, 2TO3Y, FR3YTO, UPTO, PERM
  disabled_duration_desc?: number;

  // Part 5
  mental_fit?: number;

  // Part 6
  recommendation?: string; // N P Y

  // Part 7
  chg_ax_result?: string;
  result_spec_reason?: string;
  other_comment?: string;

  resp_mssu?: string;
  resp_unit_type?: string;

  user_change_reason?: string;
  
  uc_reason_code?: string;
  uc_maf_change_part?: string;
  uc_oth_reason?: string;  
}

export interface IAppStat {
  all?: number;
  reminder?: number;
  overdue?: number;
  nf?: number;
  pe?: number;
  re?: number;
  co?: number;
  cl?: number;
  stat_1w?: number;
  stat_2w?: number;
  stat_3w?: number;
  stat_4w?: number;
  stat_gtr4w?: number;
}

export interface IMessageCenter {
  hospital_cde?: string;
  user_id?: string;
  da_app_no?: string;
  msg_id?: number;
  message?: string;
  read_by_hosp?: string;
  read_by?: string;
}

export interface IESigature {
  hospital_cde?: string;
  user_id?: string;
  da_app_no?: string;
  username?: string;
  content_in?: string;
}
