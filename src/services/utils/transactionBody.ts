import { detailPortfolioSchemeType } from "../../pages/data-interfaces/portfolio";
import { schemeDeatilDataKeys } from "../../pages/data-interfaces/transact";

export const sipFilterBody = (schemeList: schemeDeatilDataKeys[]) => {
  if (schemeList?.length > 0) {
    const data = schemeList.map((item: schemeDeatilDataKeys) => ({
      NSEProductCode: item.nseProductCode,
      NSEAmcCode: "HDFCMUTUALFUND_MF", // make sure this is a string or a defined constant
      start_date: item.start_date,
      from_date: item.from_date,
      to_date: item.to_date,
      amount: item.amount,
      additionalPurchase: false,
      folioNumber: item?.selectedFolio?.folio_number,
      mandateId: item?.umrn_no,
      schemeName: item?.scheme,
    }));
    console.log("data", data);

    return data;
  }
};

export const purchaseFilterBody = (schemeList: schemeDeatilDataKeys[]) => {
  if (schemeList?.length > 0) {
    const data = schemeList.map((item: schemeDeatilDataKeys) => ({
      NSEProductCode: item.nseProductCode,
      amount: item.amount,
      additionalPurchase: false,
      folioNumber: item?.selectedFolio?.folio_number,
      schemeName: item?.scheme,
    }));
    
    return data;
  }
};
export const redeemFilterBody = (redeemList: detailPortfolioSchemeType[]) => {
  if (redeemList?.length > 0) {
    const data = redeemList.map((item: detailPortfolioSchemeType) => ({
      accordProductCode: item.accordSchemeCode,
      amount: item.amount??0,
      redemption_units:item.redemption_units??0,
      all_units: item.redemption_units??0===Number(item.unit) ? true:false,
      folioNumber: item?.folio,
      schemeName: item?.scheme,
    }));
    
    return data;
  }
};
