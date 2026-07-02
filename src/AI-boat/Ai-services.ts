import axios from "axios";
import { endPoints } from "../services/utils/urls";
import { assetTypeListResponse, categoryListResponse, durationKeys, riskDurationRes, riskKeys, searchKeys, searchRes } from "../pages/data-interfaces/explore";
import { getRequestSimple, postRequest, postRequestSimple } from "../services/Api/HandleApi";
import { schemeDeatilDataKeys, topPerformersRes } from "../pages/data-interfaces/transact";
import { investKeys } from "../pages/data-interfaces/ai";
import { nfoLiveRes } from "../pages/data-interfaces/nfo";


//tools***************************************

//intent handling===================
export interface IntentFollowUp {
  text: string;
  schemeOptions?: searchKeys[];
}

export interface IntentActionResult {
  portfolioData?: boolean;
  topPerformersData?: boolean;
  nfoLiveData?: boolean;
  startRecommendFlow?: boolean;
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

    case "nfo_live":
      return { nfoLiveData: true };

    case "recommend_funds":
      return { startRecommendFlow: true };

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

  //recommended funds***********************************************

  export interface RiskDurationOptions {
    dataRisk: riskKeys[];
    dataDuration: durationKeys[];
  }

  const riskDurationFallback: RiskDurationOptions = {
    dataRisk: [
      { risk: 1, Constellation: "Conservative" },
      { risk: 2, Constellation: "Moderate" },
      { risk: 3, Constellation: "Aggressive" },
    ],
    dataDuration: [
      { duration: "1 Year", durationValues: 1 },
      { duration: "2 Year", durationValues: 2 },
      { duration: "3 Year", durationValues: 3 },
      { duration: "4 Years", durationValues: 4 },
      { duration: "5 Years", durationValues: 5 },
    ],
  };

  export const fetchRiskDurationOptions = async (): Promise<RiskDurationOptions> => {
    try {
      const res = await getRequestSimple<riskDurationRes>(endPoints.getRightSchemeDurationRisk)
      if (res.success && res.dataRisk?.length > 0 && res.dataDuration?.length > 0) {
        return { dataRisk: res.dataRisk, dataDuration: res.dataDuration };
      }
      return riskDurationFallback;
    } catch (err) {
      console.log(err);
      return riskDurationFallback;
    }
  }

  export const fetchRecommendedSchemes = async (risk: number, duration: number): Promise<schemeDeatilDataKeys[]> => {
    try {
      const reqBody = { risk, duration };
      const res = await postRequestSimple<any>(endPoints.getRecommendedSchemes, reqBody);
      const data: schemeDeatilDataKeys[] = res?.data ?? [];
      return data.filter((item) => item.nseProductCode);
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  //nfo live***********************************************

  export const fetchLiveNfoSchemes = async (): Promise<schemeDeatilDataKeys[]> => {
    try {
      const res = await getRequestSimple<nfoLiveRes>(endPoints.liveNfo)
      if (!res.success) return [];
      const now = new Date();
      const eligible = res.data.filter((item) =>
        item.sipAllowed || item.purchaseAllowed || item?.sipDateList?.length > 0
      );
      return eligible
        .filter((item) => new Date(item.nfo_close_date ?? "").getTime() > now.getTime())
        .sort((a, b) => new Date(a.nfo_close_date ?? "").getTime() - new Date(b.nfo_close_date ?? "").getTime());
    } catch (err) {
      console.log(err);
      return [];
    }
  }


    
      