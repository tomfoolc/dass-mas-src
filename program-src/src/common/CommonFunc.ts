import { format } from "date-fns";
import Constant from "@/constant/Constant";

export default class CommonFunc {
  static readonly Validate = {
    isNumber: function (_val: string) {
      return !isNaN(Number(_val));
    },

    isInteger: function (_val: string) {
      let pattern = /^\d+$/;
      return pattern.test(_val);
    },

    isAlphabetic: function (_val: string) {
      let pattern = /^[a-zA-Z]+$/;
      return pattern.test(_val);
    },

    isAlphanumeric: function (_val: string) {
      let pattern = /^[a-zA-Z0-9]+$/;
      return pattern.test(_val);
    },

    hasUpperCase: function (_val: string) {
      let pattern = /[A-Z]/;
      return pattern.test(_val);
    },

    hasLowerCase: function (_val: string) {
      let pattern = /[a-z]/;
      return pattern.test(_val);
    },

    hasNumber: function (_val: string) {
      let pattern = /[0-9]/;
      return pattern.test(_val);
    },

    hasNonAlphabetic: function (_val: string) {
      let pattern = /[^a-zA-Z\d\s:]/;
      return pattern.test(_val);
    },

    hasForbiddenCharacter: function (_val: string) {
      let pattern = /[\^,=&"'><]/;
      return pattern.test(_val);
    },
  };

  static readonly Date = {
    today: function () {
      return CommonFunc.Date.formatDate(new Date());
    },

    now: function () {
      return CommonFunc.Date.formatDateTime(new Date());
    },

    newFormatDate: function (_date: Date, _format: string) {
      return format(new Date(_date), _format);
    },    

    formatDate: function (_date: Date) {
      return format(new Date(_date), Constant.Date.datefnsformat);
    },

    formatDateTime: function (_date: Date) {
      return format(new Date(_date), Constant.Date.datetimefnsformat);
    },

    formatDisplayDate: function (_date: Date) {
      let date = _date || null;
      if (date !== null)
        return format(new Date(_date), Constant.Date.datefnsdisplayformat);
      else
        return null;
    },

    formatDisplayDateTime: function (_date: Date) {
      let date = _date || null;
      if (date !== null)
        return format(new Date(_date), Constant.Date.datetimefnsdisplayformat);
      else
        return null;
    },

    formatDisplayDateTime2: function (_date: Date) {
      let date = _date || null;
      if (date !== null)
        return format(new Date(_date), Constant.Date.datetimefnsdisplayformat2);
      else
        return null;
    },    

  };
}
