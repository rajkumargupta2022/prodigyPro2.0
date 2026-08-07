import { endPoints } from "../services/utils/urls";
import {
  durationKeys,
  riskDurationRes,
  riskKeys,
  searchKeys,
  searchRes,
} from "../pages/data-interfaces/explore";
import {
  getRequestSimple,
  postRequest,
  postRequestSimple,
} from "../services/Api/HandleApi";
import {
  bankMandateKeys,
  bankMandateResponse,
  foliosKeys,
  foliosResponse,
  schemeDeatilDataKeys,
  schemeDetailType,
  sipPurchaseRedemptionKey,
  sipPurchaseRedemptionResponse,
} from "../pages/data-interfaces/transact";
import { investKeys } from "../pages/data-interfaces/ai";
import { nfoLiveRes } from "../pages/data-interfaces/nfo";
import { fetchAdminUser } from "../services/user/adminUser";
import { keys } from "../services/utils/keys";
import { daysAdded } from "../services/dates/dateFormater";
import { finalTransaction } from "../services/utils/transactionApi";
import {
  familyDataType,
  familySnapshotResponseType,
} from "../pages/data-interfaces/dashboard";

//tools***************************************

//intent handling===================
export type TransactionTypeChoice = "SIP" | "PURCHASE";

export interface InvestPrefill {
  transactionType?: TransactionTypeChoice;
  amount?: number;
  sipDate?: number;
}

export interface IntentFollowUp {
  text: string;
  schemeOptions?: searchKeys[];
  investPrefill?: InvestPrefill;
}

export interface InvestFlowStart extends InvestPrefill {
  scheme: searchKeys;
}

export interface IntentActionResult {
  portfolioData?: boolean;
  topPerformersData?: boolean;
  nfoLiveData?: boolean;
  startRecommendFlow?: boolean;
  followUp?: IntentFollowUp;
  investFlow?: InvestFlowStart;
  askInvestScheme?: InvestPrefill;
  helpRedirect?: boolean;
  outOfScope?: boolean;
  schemeDetailShow?: boolean;
}
const hasRecommendedKeyword = (text: string) => {
  const regex = /\b(recomended fund|recommended scheme|nfo(?:'s|s)?)\b/i;
  return regex.test(text);
};
export const handleAIIntent = async (
  intent: string,
  params: investKeys,
  userText: string,
): Promise<IntentActionResult> => {
  switch (intent) {
    case "scheme_details":
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
      return {
        followUp: {
          text: `I couldn't find any schemes matching "${schemeName}".`,
        },
      };
    }

    case "invest":
    case "sip_investment":
    case "purchase_investment": {
      const schemeName = params?.scheme_name;
      const transactionType: TransactionTypeChoice | undefined =
        intent === "sip_investment"
          ? "SIP"
          : intent === "purchase_investment"
            ? "PURCHASE"
            : params?.transaction_type === "SIP" ||
                params?.transaction_type === "PURCHASE"
              ? params.transaction_type
              : undefined;
      const sipDate =
        typeof params?.sip_date === "number" &&
        params.sip_date >= 1 &&
        params.sip_date <= 31
          ? params.sip_date
          : undefined;
      const prefill: InvestPrefill = {
        transactionType,
        amount: params?.amount ?? undefined,
        sipDate,
      };

      if (!schemeName) {
        return { askInvestScheme: prefill };
      }

      const schemeList = await fetchSchemeList(schemeName);
      if (!schemeList || schemeList.length === 0) {
        return {
          followUp: {
            text: `I couldn't find any schemes matching "${schemeName}".`,
          },
        };
      }

      if (schemeList.length === 1) {
        return { investFlow: { scheme: schemeList[0], ...prefill } };
      }

      return {
        followUp: {
          text: `Here are the top results for "${schemeName}". Select one to proceed with your investment:`,
          schemeOptions: schemeList,
          investPrefill: prefill,
        },
      };
    }

    case "portfolio":
      // case "portfolio_review":
      return { portfolioData: true };

    case "top_performers":
      if (hasRecommendedKeyword(userText)) {
        return { startRecommendFlow: true };
      }
      return { topPerformersData: true };

    case "nfo":
      return { nfoLiveData: true };

    case "recommend":
      return { startRecommendFlow: true };

    case "out_of_scope":
      return { helpRedirect: true };
    default:
      return {};
  }
};

//apis====================
export const fetchSchemeList = async (name: string) => {
  try {
    const token = localStorage.getItem("token");
    let tokenBody = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await getRequestSimple<searchRes>(
      endPoints.searchScheme + "?text=" + name,
      tokenBody,
    );
    if (res.success) {
      return res.data;
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

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

export const fetchRiskDurationOptions =
  async (): Promise<RiskDurationOptions> => {
    try {
      const res = await getRequestSimple<riskDurationRes>(
        endPoints.getRightSchemeDurationRisk,
      );
      if (
        res.success &&
        res.dataRisk?.length > 0 &&
        res.dataDuration?.length > 0
      ) {
        return { dataRisk: res.dataRisk, dataDuration: res.dataDuration };
      }
      return riskDurationFallback;
    } catch (err) {
      console.log(err);
      return riskDurationFallback;
    }
  };

export const fetchRecommendedSchemes = async (
  risk: number,
  duration: number,
): Promise<schemeDeatilDataKeys[]> => {
  try {
    const reqBody = { risk, duration };
    const res = await postRequestSimple<any>(
      endPoints.getRecommendedSchemes,
      reqBody,
    );
    const data: schemeDeatilDataKeys[] = res?.data ?? [];
    return data.filter((item) => item.nseProductCode);
  } catch (err) {
    console.log(err);
    return [];
  }
};

//nfo live***********************************************

export const fetchLiveNfoSchemes = async (): Promise<
  schemeDeatilDataKeys[]
> => {
  try {
    const res = await getRequestSimple<nfoLiveRes>(endPoints.liveNfo);
    if (!res.success) return [];
    const now = new Date();
    const eligible = res.data.filter(
      (item) =>
        item.sipAllowed ||
        item.purchaseAllowed ||
        item?.sipDateList?.length > 0,
    );
    return eligible
      .filter(
        (item) => new Date(item.nfo_close_date ?? "").getTime() > now.getTime(),
      )
      .sort(
        (a, b) =>
          new Date(a.nfo_close_date ?? "").getTime() -
          new Date(b.nfo_close_date ?? "").getTime(),
      );
  } catch (err) {
    console.log(err);
    return [];
  }
};

//invest flow***********************************************

export const ordinalSuffix = (n: number): string => {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};

export interface InvestData {
  scheme: schemeDeatilDataKeys;
  transactionType?: TransactionTypeChoice;
  amount?: number;
  sipDate?: number;
  folio?: foliosKeys;
  isNewFolio?: boolean;
  mandate?: bankMandateKeys;
}

export const fetchSchemeDetails = async (
  accordSchemeCode: number,
): Promise<schemeDeatilDataKeys | null> => {
  try {
    const res = await postRequest<schemeDetailType>(
      endPoints.getSchemeDetails,
      { productcode: accordSchemeCode },
    );
    return res?.data?.[0] ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchInvestFolios = async (
  accordSchemeCode: number,
): Promise<foliosKeys[]> => {
  try {
    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return [];
    const res = await postRequest<foliosResponse>(endPoints.getSchemeFolios, {
      ucc: adminUser.ucc,
      product_code: accordSchemeCode,
    });
    return res?.data ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchInvestMandates = async (
  requiredAmount: number,
): Promise<bankMandateKeys[]> => {
  try {
    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return [];
    const res = await postRequest<bankMandateResponse>(
      endPoints.getMandateList,
      { ucc: adminUser.ucc },
    );
    const today = new Date();
    return (res?.mandates ?? []).filter(
      (mandate) =>
        Number(mandate.amount) >= requiredAmount &&
        new Date(mandate.to_date) >= today,
    );
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const submitInvestTransaction = async (
  data: InvestData,
): Promise<{ success: boolean; results: sipPurchaseRedemptionKey[] }> => {
  const adminUser = fetchAdminUser();
  if (!adminUser?.ucc) return { success: false, results: [] };

  const isSip = data.transactionType === "SIP";
  const schemePayload: schemeDeatilDataKeys = {
    ...data.scheme,
    amount: data.amount,
    selectedFolio: data.folio ?? ({} as foliosKeys),
    ...(isSip
      ? {
          start_date: daysAdded(7, data.sipDate ? [data.sipDate] : []),
          from_date: data.mandate?.from_date
            ?.replace("T", " ")
            .replace("Z", ""),
          to_date: data.mandate?.to_date?.replace("T", " ").replace("Z", ""),
          mandateId: data.mandate?.umrn_no,
          firstSIPToday: true,
        }
      : {}),
  };

  let capturedData: sipPurchaseRedemptionKey[] = [];
  const res = (await finalTransaction(
    [schemePayload],
    isSip ? keys.sip : keys.purchase,
    (d) => {
      capturedData = d ?? [];
    },
    false,
  )) as sipPurchaseRedemptionResponse | undefined;

  if (res?.success) {
    return { success: true, results: capturedData };
  }
  return { success: false, results: [] };
};

//family member portfolio***********************************************

export const fetchMemberPortfolio = async (
  ucc: string,
): Promise<familyDataType | null> => {
  try {
    const res = await postRequestSimple<familySnapshotResponseType>(
      endPoints.getFamilySnapshot,
      { ucc },
    );
    return res?.finalArray?.find((item) => item.myPortfolio === true) ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
