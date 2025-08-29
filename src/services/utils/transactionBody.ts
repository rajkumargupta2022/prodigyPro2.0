import { detailPortfolioSchemeType } from "../../pages/data-interfaces/portfolio";
import { schemeDeatilDataKeys } from "../../pages/data-interfaces/transact";
import { dateForApi } from "../dates/dateFormater";

export const sipFilterBody = (schemeList: schemeDeatilDataKeys[],additionalPurchase:boolean=false) => {
  
  if (schemeList?.length > 0) {
 
    const data = schemeList.map((item: schemeDeatilDataKeys) => ({
      NSEProductCode: item.nseProductCode,
      NSEAmcCode: item.nseAMCCode, // make sure this is a string or a defined constant
      start_date: dateForApi(item.start_date),
      from_date: item.from_date,
      to_date: item.to_date,
      amount: item.amount,
      additionalPurchase: additionalPurchase,
      folioNumber: item?.selectedFolio?.folio_number,
      mandateId: item?.mandateId,
      schemeName: item?.scheme,
      firstSIPToday:item.firstSIPToday
    }));

    return data;
  }
};

export const purchaseFilterBody = (schemeList: schemeDeatilDataKeys[],additionalPurchase:boolean) => {
  if (schemeList?.length > 0) {
    const data = schemeList.map((item: schemeDeatilDataKeys) => ({
      NSEProductCode: item.nseProductCode,
      amount: item.amount,
      additionalPurchase: additionalPurchase,
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
      amount: Math.round(Number(item.amount))??0,
      redemption_units:item.redemption_units??0,
      all_units: item.redemption_units??0===Number(item.unit) ? true:false,
      folioNumber: item?.folio,
      schemeName: item?.scheme,
    }));
    
    return data;
  }
};
export const switchFilterBody = (list: any[]) => {
  if (list?.length > 0) {
    const data = list.map((item: any) => ({
      fromAccordProductCode: item.fromAccordProductCode,
      toAccordProductCode:item.toAccordProductCode,
      amount: item.amount??0,
      installment_units:item.installment_units??0,
      all_units: item.installment_units??0===Number(item.installment_units) ? true:false,
      folioNumber: item?.folioNumber,
      schemeName: item?.scheme,
      to_date:item.to_date
    }));
    
    return data;
  }
};
