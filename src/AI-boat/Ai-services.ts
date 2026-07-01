import axios from "axios";
import { endPoints } from "../services/utils/urls";
import { assetTypeListResponse, categoryListResponse, searchKeys, searchRes } from "../pages/data-interfaces/explore";
import { getRequestSimple, postRequest, postRequestSimple } from "../services/Api/HandleApi";
import { topPerformersRes } from "../pages/data-interfaces/transact";
import { investKeys } from "../pages/data-interfaces/ai";


//tools***************************************

//intent handling===================
export interface IntentFollowUp {
  text: string;
  schemeOptions?: searchKeys[];
}

export interface IntentActionResult {
  portfolioData?: boolean;
  topPerformersData?: boolean;
  followUp?: IntentFollowUp;
}

export const handleAIIntent = async (
  intent: string,
  params: investKeys
): Promise<IntentActionResult> => {
  switch (intent) {
    case "search_scheme": {
      const schemeName = params?.scheme_name;
      if (!schemeName) {
        return {};
      }
      const schemeList = await fetchSchemeList(schemeName);
      if (schemeList && schemeList.length > 0) {
        return {
          followUp: {
            text: `Here are the top results for "${schemeName}":`,
            schemeOptions: schemeList,
          },
        };
      }
      return { followUp: { text: `I couldn't find any schemes matching "${schemeName}".` } };
    }

    case "portfolio":
    case "portfolio_review":
      return { portfolioData: true };

    case "top_performers":
      return { topPerformersData: true };

    default:
      return {};
  }
};




//apis====================
export const fetchSchemeList = async (name: string) => {
    try {
      const token = localStorage.getItem("token")
      let tokenBody = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      const res = await getRequestSimple<searchRes>(endPoints.searchScheme + "?text=" + name, tokenBody)
      if (res.success) {
        return res.data;
      } 
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  //top performers***********************************************

   const fetchCategoryList = async (data: number) => {
      try {
        const res = await getRequestSimple<categoryListResponse>(endPoints.getCategoryTypesList + "?asset_code=" + data)
        if (res.data) {
          console.log(res.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    const fetchAssetTypeList = async () => {
      try {
        const res = await getRequestSimple<assetTypeListResponse>(endPoints.getAssetTypesList)
        if (res.data) {
          console.log(res.data)
        }
      } catch (err) {
      }
    }
  const fetchTopPerformers = async () => {
      try {
        const requestBody = {
          filter_by_year: 3,
          page: 1,
          amc_code: "amcCode",
          classcode: "classCode",
          asset_code: "assetCode",
          risk_code:  null
        };
  
        const res = await postRequestSimple<topPerformersRes>(endPoints.getTopPerformers, requestBody);
  
        if (res.data) {
         console.log(res.data)
        }
      } catch (err) {
       console.log(err);
      } 
    }


    //portfoloio performance***********************************************
    
      