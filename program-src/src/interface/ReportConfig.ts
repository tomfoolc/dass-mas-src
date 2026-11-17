import { IOptionRptItem } from "./OptionItem";

export interface IReportConfig {
  cluster_cde: string;
  hospitalOptList: Array<IOptionRptItem>;
}