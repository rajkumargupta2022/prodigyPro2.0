// AdminUserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { allFamilyListKeys, allFamilyResponseType, familyDataType, familySnapshotResponseType } from "../pages/data-interfaces/dashboard";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { detailPortfolioSchemeType, detailPortfolioType } from "../pages/data-interfaces/portfolio";


interface AdminUserContextType {
  adminUser?: allFamilyListKeys;
  familyMemberList: allFamilyListKeys[];
  switchProfile: (adminData: allFamilyListKeys, setShow?: (value: boolean) => void
  ) => void;
  familySnapShotData: familyDataType[];
  snapshotData: familyDataType;
  familyPortfolio: (adminData: allFamilyListKeys, fromPortfolio?: boolean) => void;
  setSnapshotData: (value: any) => void;
  fetchDetailedPortfolio: (value: string) => void;
  setPortfolioDetailData: (value: any) => void;
  portfolioDetailData: detailPortfolioSchemeType[];
  fetchFamilyPortfoloData:()=>void

}

// 2. Update context creation
const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);


export const AdminUserProvider = ({ children }: { children: ReactNode }) => {
  const [familyMemberList, setFamilyMemberList] = useState<allFamilyListKeys[]>([])
  const [adminUser, setAdminUser] = useState<allFamilyListKeys>()
  const [familySnapShotData, setFamilySnapShotData] = useState<familyDataType[]>([])
  const [portfolioDetailData, setPortfolioDetailData] = useState<detailPortfolioSchemeType[]>([])

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

  const fetchFamilyPortfoloData = async () => {
    const pan = localStorage.getItem("pan")
    let adminData: any = localStorage.getItem("familyList")
    adminData = JSON.parse(adminData)
    if (pan && !adminData) {
      const res = await postRequest<allFamilyResponseType>(endPoints.getAllFamily, {
        pan
      });
      if (res) {
        localStorage.setItem("familyList", JSON.stringify(res.data))
        filterAdmin(res.data)
      }
    } else if (adminData && adminData.length > 0 && adminData[0]?.ucc) {
      filterAdmin(adminData)
    }
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
    setAdminUser(adminData);

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

  const familyPortfolio = async (adminUser: any, fromPortfolio: boolean = false) => {
    if (adminUser?.ucc) {
      const res = await postRequest<familySnapshotResponseType>(endPoints.getFamilySnapshot, {
        ucc: adminUser?.ucc
      });
      if (res) {
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
      fetchFamilyPortfoloData();
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
      const res = await postRequest<detailPortfolioType>(endPoints.getDetailedPortfolio, { ucc });
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
      fetchFamilyPortfoloData
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