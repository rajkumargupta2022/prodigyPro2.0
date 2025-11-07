import { schemeDeatilDataKeys } from "../../pages/data-interfaces/transact";
import { keys } from "./keys";

export const checkTransactionAllowed = (
  schemeList: schemeDeatilDataKeys[],
  checkType: string
) => {
  for (let i = 0; i < schemeList?.length; i++) {
    if (checkType === keys?.sip) {
      if ((schemeList[i]?.sipDateList?.length??0) === 0) {
        return false;
      }
      return schemeList[i]?.sipAllowed;
    } else if (checkType === keys.purchase) {
      return schemeList[i]?.purchaseAllowed;
    } else if (checkType === keys?.switch) {
      return schemeList[i]?.switchAllowed;
    } else if (checkType === keys.redumption) {
      return schemeList[i].redemptionAllowed;
    } else if (checkType === keys.stp) {
      if ((schemeList[i].stpDateList?.length ?? 0) === 0) {
        return false;
      }
      return schemeList[i].stpAllowed;
    } else if (checkType === keys.swp) {
      if ((schemeList[i].swpDateList?.length??0) === 0) {
        return false;
      }
      return schemeList[i].swpAllowed;
    } else {
      return false;
    }
  }
};

export function maskString(input: string): string {
  if (input.length <= 8) return input; // If too short, return as is

  const firstFour = input.slice(0, 4);
  const lastFour = input.slice(-4);
  const stars = '*'.repeat(input.length - 8);

  return `${firstFour}${stars}${lastFour}`;
}

export function firstLettersOnly(sentence: string): string {
  if (!sentence) return "";

  return sentence
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}

export const filterData = (arr: any[], key: string) => {
  if (!Array.isArray(arr) || arr?.length === 0) {
    throw new Error("Array required..");
  }

  return arr.filter((item: any) => item[key] > 0);
};

export const checkIsSIFScheme = (value: string): boolean =>{
  const regex = /\bSIF\b|\bQSIF\b|long[\s\-]*short/i;
  return regex.test(value);
}

