// AdminUserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { allFamilyListKeys, allFamilyResponseType, familyDataType, familySnapshotResponseType } from "../pages/data-interfaces/dashboard";
import { postRequestSimple } from "../services/Api/HandleApi";
import { getRequestSimple } from "../services/Api/HandleApi";
import { kycUpdateRes } from "../pages/data-interfaces/ucc";
import { UccStatusEnum } from "../pages/data/ucc-data";
import { endPoints } from "../services/utils/urls";
import { detailPortfolioSchemeType, detailPortfolioType } from "../pages/data-interfaces/portfolio";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../services/utils/toast";


export interface UccStatusInfo {
  isShowKycMsg: boolean;
  isLoadingKyc: boolean;
  uccStatusData: kycUpdateRes | null;
}

interface AdminUserContextType {
  adminUser?: allFamilyListKeys;
  familyMemberList: allFamilyListKeys[];
  switchProfile: (adminData: allFamilyListKeys, setShow?: (value: boolean) => void
  ) => void;
  familySnapShotData: familyDataType[];
  snapshotData: familyDataType;
  familyPortfolio: (adminData: allFamilyListKeys, fromPortfolio?: boolean) => Promise<void>;
  setSnapshotData: (value: any) => void;
  fetchDetailedPortfolio: (value: string) => Promise<void>;
  setPortfolioDetailData: (value: any) => void;
  portfolioDetailData: detailPortfolioSchemeType[];
  fetchFamilyPortfoloData: () => void;
  isSwitched: boolean;
  uccStatusInfo: UccStatusInfo;
  fetchUccStatus: (ucc: string) => Promise<void>;
  fetchFanilyMembersForUcc: (ucc: string, pan: string) => Promise<void>;

}

// 2. Update context creation
const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);


export const AdminUserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [familyMemberList, setFamilyMemberList] = useState<allFamilyListKeys[]>([])
  const [adminUser, setAdminUser] = useState<allFamilyListKeys>()
  const [familySnapShotData, setFamilySnapShotData] = useState<familyDataType[]>([])
  const [portfolioDetailData, setPortfolioDetailData] = useState<detailPortfolioSchemeType[]>([])
  const [isSwitched, setIsSwitched] = useState(false)
  const [uccStatusInfo, setUccStatusInfo] = useState<UccStatusInfo>({
    isShowKycMsg: false,
    isLoadingKyc: true,
    uccStatusData: null
  });

  const [snapshotData, setSnapshotData] = useState<familyDataType>({
    Totalpurchase: 0,
    Totalmarketvalue: 0,
    Finaldays: 0,
    Finalcagr: "",
    Totaldayschange: 0,
    Gainloss: 0,
    Dividend: 0,
    debtPercentFinal: "",
    goldPercentFinal: "",
    equityPercentFinal: "",
    myPortfolio: false,
  })

  useEffect(() => {
    fetchFamilyPortfoloData()
  }, [])
  const fetchFanilyMembersForUcc = async (ucc: string, pan: string) => {
    try {
      let familyMember: allFamilyListKeys[] = []
      const res = await postRequestSimple<allFamilyResponseType>(endPoints.getAllFamily, { pan });
      if (res.success) {
        let flag = false;
        res.data.forEach((member) => {
          const formattedItem = {
            ...member,
            name: nameFormatter(member.name || ''),
            relation: nameFormatter(member.relation || ''),
            jh1_name: nameFormatter(member.jh1_name || ''),
            jh2_name: nameFormatter(member.jh2_name || '')
          }
          if (member?.ucc === ucc) {
            flag = true;
            localStorage.setItem("pan", pan)
            switchProfile(formattedItem)
          }
          else {
            const formattedItem = {
              ...member,
              name: nameFormatter(member.name || ''),
              relation: nameFormatter(member.relation || ''),
              jh1_name: nameFormatter(member.jh1_name || ''),
              jh2_name: nameFormatter(member.jh2_name || '')
            }
            familyMember.push(formattedItem)
          }
        })
        if (flag) {
          localStorage.setItem("familyList", JSON.stringify(familyMember))
          navigate("/ucc-submit?client_code=" + ucc);
        } else {
          errorToast("Getting error while matching client code")
        }
      }
    } catch (err) {
      errorToast(err);
    }
  }

  const fetchFamilyPortfoloData = async () => {
    const pan = localStorage.getItem("pan")
    // let adminData: any = localStorage.getItem("familyList")
    // adminData = JSON.parse(adminData)
    // remove admin check exist in if conditions
    if (pan) {
      const res = await postRequestSimple<allFamilyResponseType>(endPoints.getAllFamily, {
        pan
      });
      if (res) {
        localStorage.setItem("familyList", JSON.stringify(res.data))
        filterAdmin(res.data)
      }
    }
    // else if (adminData && adminData.length > 0 && adminData[0]?.ucc) {
    //   filterAdmin(adminData)
    // }
  }

  const filterAdmin = (data: allFamilyListKeys[]) => {
    let familyMember: allFamilyListKeys[] = []
    let adminData: any = localStorage.getItem("adminUser")
    adminData = adminData ? JSON.parse(adminData) : null

    if (!adminData?.ucc) {
      // First time setup - find Self and set as admin
      if (data.length === 1) {
        const formattedItem = {
          ...data[0],
          name: nameFormatter(data[0].name || ''),
          relation: nameFormatter(data[0].relation || ''),
          jh1_name: nameFormatter(data[0].jh1_name || ''),
          jh2_name: nameFormatter(data[0].jh2_name || '')
        }

        localStorage.setItem("adminUser", JSON.stringify(formattedItem))
        setAdminUser(formattedItem)
        familyPortfolio(formattedItem)
        fetchUccStatus(formattedItem.ucc || "")
        setFamilyMemberList([formattedItem])
        return
      }
      for (const item of data) {
        const formattedItem = {
          ...item,
          name: nameFormatter(item.name || ''),
          relation: nameFormatter(item.relation || ''),
          jh1_name: nameFormatter(item.jh1_name || ''),
          jh2_name: nameFormatter(item.jh2_name || '')
        }

        if (item.relation === "Self") {
          localStorage.setItem("adminUser", JSON.stringify(formattedItem))
          setAdminUser(formattedItem)
          familyPortfolio(formattedItem)
          fetchUccStatus(formattedItem.ucc || "")
        } else {
          familyMember.push(formattedItem)
        }
      }
      setFamilyMemberList(familyMember)
    } else {
      // Admin already exists - separate admin from family members
      let currentAdmin: allFamilyListKeys | null = null

      for (const item of data) {
        const formattedItem = {
          ...item,
          name: nameFormatter(item.name || ''),
          relation: nameFormatter(item.relation || ''),
          jh1_name: nameFormatter(item.jh1_name || ''),
          jh2_name: nameFormatter(item.jh2_name || '')
        }

        if (item.ucc === adminData.ucc) {
          currentAdmin = formattedItem
          localStorage.setItem("adminUser", JSON.stringify(formattedItem))
          setAdminUser(formattedItem)
        } else {
          familyMember.push(formattedItem)
        }
      }
      setFamilyMemberList(familyMember)

      // If current admin is found, fetch their portfolio
      if (currentAdmin) {
        familyPortfolio(currentAdmin)
        fetchUccStatus(currentAdmin.ucc || "")
      }
    }
  }

  const nameFormatter = (name: string): string => {
    if (!name) return '';
    return name
      .toLowerCase()
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const switchProfile = (
    adminData: allFamilyListKeys, setShow?: (show: boolean) => void
  ) => {
    localStorage.setItem("adminUser", JSON.stringify(adminData));
    console.log("Admin data switched to:", adminData);
    setAdminUser(adminData);
    fetchUccStatus(adminData.ucc)
    setIsSwitched(isSwitched => !isSwitched)
    // Re-filter the family data to update family member list
    let familyListData: any = localStorage.getItem("familyList")
    if (familyListData) {
      familyListData = JSON.parse(familyListData)
      filterAdmin(familyListData)
    }

    familyPortfolio(adminData)
    fetchDetailedPortfolio(adminData?.ucc)
    if (setShow) setShow(false);
  };
  const fetchUccStatus = async (ucc: string) => {
    if (!ucc) {
      setUccStatusInfo(prev => ({ ...prev, isLoadingKyc: false }));
      return;
    }
    try {
      setUccStatusInfo(prev => ({ ...prev, isLoadingKyc: true }));
      const res = await getRequestSimple<kycUpdateRes>(endPoints.getUccUpdate + "?client_code=" + ucc);
      localStorage.setItem("uccStatus", res.status);

      setUccStatusInfo(prev => ({
        ...prev,
        uccStatusData: res,
        isShowKycMsg: res.status !== UccStatusEnum.ACTIVE
      }));
    } catch (error) {
      console.error("Error fetching UCC status:", error);
    } finally {
      setUccStatusInfo(prev => ({ ...prev, isLoadingKyc: false }));
    }
  };

  const familyPortfolio = async (adminUser: any, fromPortfolio: boolean = false) => {
        try{
 if (adminUser?.ucc) {
  
      const res = await postRequestSimple<familySnapshotResponseType>(endPoints.getFamilySnapshot, {
        ucc: adminUser?.ucc
      });
      if (res) {
        console.log("Family snapshot response:", res);
        setFamilySnapShotData(res.finalArray)
        if (res?.finalArray?.length > 1) {
          const portfolioType = localStorage.getItem("portfolioType")
          if (res.finalArray[0]?.myPortfolio && portfolioType === "my") {
            setSnapshotData(res.finalArray[0])
          }
          else if (!res.finalArray[1]?.myPortfolio && portfolioType === "family" && (!fromPortfolio)) {
            setSnapshotData(res.finalArray[1])
          }
          else {
            // Default to first available portfolio if portfolioType doesn't match
            setSnapshotData(res.finalArray[0])
          }
        } else if (res?.finalArray?.length === 1) {
          localStorage.setItem("portfolioType", "my")
          setSnapshotData(res.finalArray[0])
        } else {
          setSnapshotData({
            Totalpurchase: 0,
            Totalmarketvalue: 0,
            Finaldays: 0,
            Finalcagr: "",
            Totaldayschange: 0,
            Gainloss: 0,
            Dividend: 0,
            debtPercentFinal: "",
            goldPercentFinal: "",
            equityPercentFinal: "",
            myPortfolio: false,
          })
        }
      }
    } else {
      // fetchFamilyPortfoloData();
      setFamilySnapShotData([])
      setSnapshotData({
        Totalpurchase: 0,
        Totalmarketvalue: 0,
        Finaldays: 0,
        Finalcagr: "",
        Totaldayschange: 0,
        Gainloss: 0,
        Dividend: 0,
        debtPercentFinal: "",
        goldPercentFinal: "",
        equityPercentFinal: "",
        myPortfolio: false,
      })
    }
      }catch(err){
        setFamilySnapShotData([])
      setSnapshotData({
        Totalpurchase: 0,
        Totalmarketvalue: 0,
        Finaldays: 0,
        Finalcagr: "",
        Totaldayschange: 0,
        Gainloss: 0,
        Dividend: 0,
        debtPercentFinal: "",
        goldPercentFinal: "",
        equityPercentFinal: "",
        myPortfolio: false,
      })
      }
   
  }

  const fetchDetailedPortfolio = async (ucc: string) => {
    try {
      const res = await postRequestSimple<detailPortfolioType>(endPoints.getDetailedPortfolio, { ucc });
      if (res) {
        const modifiedData = res.dataSent.data.filter((item) => Number(item.purchase) > 0)
        setPortfolioDetailData(modifiedData)
      } else {
        setPortfolioDetailData([])
      }
    } catch (err) {
      setPortfolioDetailData([])
    }
  }

  return (
    <AdminUserContext.Provider value={{
      adminUser,
      familyMemberList,
      switchProfile,
      familySnapShotData,
      snapshotData,
      familyPortfolio,
      setSnapshotData,
      fetchDetailedPortfolio,
      setPortfolioDetailData,
      portfolioDetailData,
      fetchFamilyPortfoloData,
      isSwitched,
      uccStatusInfo,
      fetchUccStatus,
      fetchFanilyMembersForUcc
    }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error("Error during export admin user from context");
  }
  return context;
};