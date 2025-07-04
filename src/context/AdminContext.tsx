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
  familyPortfolio: (adminData: allFamilyListKeys) => void;
  setSnapshotData: (value: any) => void;
  fetchDetailedPortfolio: (value: string) => void;
  setPortfolioDetailData: (value: any) => void;
  portfolioDetailData: detailPortfolioSchemeType[];

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
    } else if (adminData[0]?.ucc) {
      filterAdmin(adminData)

    }
  }

  const filterAdmin = (data: allFamilyListKeys[]) => {

    let familyMember: allFamilyListKeys[] = []
    let adminData: any = localStorage.getItem("adminUser")
    adminData = JSON.parse(adminData)
    if (!adminData?.ucc) {
      for (const item of data) {
        if (item.relation === "Self") {
          item.name = nameFormatter(item.name)
          localStorage.setItem("adminUser", JSON.stringify(item))
          item.relation = nameFormatter(item.relation)
          item.jh1_name = nameFormatter(item.jh1_name)
          item.jh2_name = nameFormatter(item.jh2_name)
          setAdminUser(item)
          familyPortfolio(item)
        } else {
          item.name = nameFormatter(item.name)
          item.relation = nameFormatter(item.relation)
          item.jh1_name = nameFormatter(item.jh1_name)
          item.jh2_name = nameFormatter(item.jh2_name)
          familyMember.push(item)
        }
      }
      setFamilyMemberList(familyMember)
    } else {
      for (const item of data) {
        if (item.ucc === adminData.ucc) {
          item.name = nameFormatter(item.name)
          item.relation = nameFormatter(item.relation)
          item.jh1_name = nameFormatter(item.jh1_name)
          item.jh2_name = nameFormatter(item.jh2_name)
          localStorage.setItem("adminUser", JSON.stringify(item))
          setAdminUser(item)
        } else {
          item.name = nameFormatter(item.name)
          item.relation = nameFormatter(item.relation)
          item.jh1_name = nameFormatter(item.jh1_name)
          item.jh2_name = nameFormatter(item.jh2_name)
          familyMember.push(item)

        }
      }
      setFamilyMemberList(familyMember)
    }

  }
  const nameFormatter = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const switchProfile = (
    adminData: allFamilyListKeys, setShow?: (show: boolean) => void
  ) => {
    localStorage.setItem("adminUser", JSON.stringify(adminData));
    fetchFamilyPortfoloData();
    familyPortfolio(adminData)
    fetchDetailedPortfolio(adminData?.ucc)
    if (setShow) setShow(false);
  };

  const familyPortfolio = async (adminUser: any) => {
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
          } else if (!res.finalArray[1]?.myPortfolio && portfolioType === "family") {
            setSnapshotData(res.finalArray[1])
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
      <AdminUserContext.Provider value={{ adminUser, familyMemberList, switchProfile, familySnapShotData, snapshotData, familyPortfolio, setSnapshotData, fetchDetailedPortfolio, setPortfolioDetailData, portfolioDetailData }}>
        {children}
      </AdminUserContext.Provider>
    );
  };

  export const useAdminUser = () => {
    const context = useContext(AdminUserContext);
    if (!context) {
      throw new Error("Error during export  admin user from context");
    }
    return context;
  };
