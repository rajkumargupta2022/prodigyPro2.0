import { detailPortfolioSchemeType } from "../../pages/data-interfaces/portfolio";
import {
  schemeDeatilDataKeys,
  sipPurchaseRedemptionResponse,
} from "../../pages/data-interfaces/transact";
import { postRequest } from "../Api/HandleApi";
import { keys } from "./keys";
// import { fetchAdminUser } from "../user/adminUser";
import { purchaseFilterBody, redeemFilterBody, sipFilterBody } from "./transactionBody";
import { endPoints } from "./urls";

export const finalTransaction = async (
  schemeList: schemeDeatilDataKeys[],
  transactionType: string,
  datasetter: (vlaue: any) => void
) => {
  // const adminUser = fetchAdminUser();
  let transactionBody = {
    ucc: "BFC00002",
    transactionType: transactionType,
    cartItems:transactionType===keys.sip ? sipFilterBody(schemeList):transactionType===keys.purchase ? purchaseFilterBody(schemeList):"",
  };
  try {
    const res = await postRequest<sipPurchaseRedemptionResponse>(
      endPoints.sipPurchaseRedemption,
      transactionBody
    );
    if (res.data) {
      datasetter(res.data);
      return res
    } else {
      datasetter([]);
    }
  } catch (err) {
    // console.log("error from transactio api", err);
    return err
  }
};



export const redeemTransaction = async (
  redeemList: detailPortfolioSchemeType[],
  transactionType: string,
  datasetter: (vlaue: any) => void
) => {
  // const adminUser = fetchAdminUser();
  let transactionBody = {
    ucc: "BFC00002",
    transactionType: transactionType,
    cartItems:redeemFilterBody(redeemList),
  };
  try {
    const res = await postRequest<sipPurchaseRedemptionResponse>(
      endPoints.sipPurchaseRedemption,
      transactionBody
    );
    if (res.data) {
      datasetter(res.data);
      return res
    } else {
      datasetter([]);
    }
  } catch (err) {
    // console.log("error from transactio api", err);
    return err
  }
};
