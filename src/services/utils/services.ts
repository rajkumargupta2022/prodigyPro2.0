import { schemeDeatilDataKeys } from "../../pages/data-interfaces/transact";
import { keys } from "./keys";

export const checkTransactionAllowed = (
  schemeList: schemeDeatilDataKeys[],
  checkType: string
) => {
  for (let i = 0; i < schemeList.length; i++) {
    if (checkType === keys.sip && (schemeList[i].sipDateList.length > 0) ) {
      return schemeList[i].sipAllowed;
    } else if (checkType === keys.purchase) {
      return schemeList[i].purchaseAllowed;
    } else if (checkType === keys.switch) {
      return schemeList[i].switchAllowed;
    } else if (checkType === keys.redumption) {
      return schemeList[i].redemptionAllowed;
    } else if (checkType === keys.stp &&  (schemeList[i].stpDateList.length > 0)) {
      return schemeList[i].stpAllowed;
    } else if (checkType === keys.swp && (schemeList[i].swpDateList.length > 0)) {
      return schemeList[i].swpAllowed;
    }else{
      return false
    }
  }
  

};
