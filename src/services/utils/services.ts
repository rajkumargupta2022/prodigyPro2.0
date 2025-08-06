import { schemeDeatilDataKeys } from "../../pages/data-interfaces/transact";
import { keys } from "./keys";

 export const checkTransactionAllowed = (schemeList:schemeDeatilDataKeys[],checkType:string)=>{
   let isAllowed = schemeList.some((item=>{
      if(checkType===keys.sip){
       return item.sipAllowed ===false
      }else if(checkType===keys.purchase){
       return item.purchaseAllowed===false
      }
    }))
    console.log("isallowed",!isAllowed);
    console.log("schemeList",schemeList);
    
    return !isAllowed
  }