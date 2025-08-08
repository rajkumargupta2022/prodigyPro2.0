import { schemeDeatilDataKeys } from "../../pages/data-interfaces/transact";
import { keys } from "./keys";

 export const checkTransactionAllowed = (schemeList:schemeDeatilDataKeys[],checkType:string)=>{
   let isAllowed = schemeList.some((item=>{
      if(checkType===keys.sip || item.sipDateList.length===0){
       return item.sipAllowed ===false
      }else if(checkType===keys.purchase){
       return item.purchaseAllowed===false
      }
      else if(checkType===keys.switch){
       return item.switchAllowed===false
      }
      else if(checkType===keys.redumption){
       return item.redemptionAllowed===false
      }
       else if(checkType===keys.stp || item.stpDateList.length===0){
       return item.stpAllowed===false
      }
      else if(checkType===keys.swp || item.swpDateList.length===0){
       return item.swpAllowed===false
      }
    }))
 
    
    return !isAllowed
  }