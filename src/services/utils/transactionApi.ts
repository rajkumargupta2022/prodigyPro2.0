import {
  schemeDeatilDataKeys,
  sipPurchaseRedemptionResponse,
} from "../../pages/data-interfaces/transact";
import { postRequest } from "../Api/HandleApi";
import { fetchAdminUser } from "../user/adminUser";
import { purchaseFilterBody, sipFilterBody } from "./transactionBody";
import { endPoints } from "./urls";

export const finalTransaction = async (
  schemeList: schemeDeatilDataKeys[],
  transactionType: string,
  datasetter: (vlaue: any) => void
) => {
  const adminUser = fetchAdminUser();
  let transactionBody = {
    ucc: adminUser.ucc,
    transactionType: transactionType,
    cartItems:transactionType==="sip" ? sipFilterBody(schemeList):transactionType==="purchase" ? purchaseFilterBody(schemeList):"",
  };
  try {
    const res = await postRequest<sipPurchaseRedemptionResponse>(
      endPoints.sipPurchaseRedemption,
      transactionBody
    );
    if (res.data) {
      datasetter(res.data);
    } else {
      datasetter([]);
    }
  } catch (err) {
    console.log("error from transactio api", err);
  }
};
