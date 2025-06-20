// AdminUserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { allFamilyListKeys, allFamilyResponseType, familyDataType, familySnapshotResponseType } from "../pages/data-interfaces/dashboard";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";


interface AdminUserContextType {
  adminUser?: allFamilyListKeys;
  familyMemberList: allFamilyListKeys[];
  switchProfile: (adminData: allFamilyListKeys, setShow: (value: boolean) => void
  ) => void;
  familySnapShotData:familyDataType[];
  snapshotData:familyDataType;
  familyPortfolio:(adminData: allFamilyListKeys)=>void;
  setSnapshotData:(value:any)=>void

}

// 2. Update context creation
const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);


export const AdminUserProvider = ({ children }: { children: ReactNode }) => {
 const [familyMemberList, setFamilyMemberList] = useState<allFamilyListKeys[]>([])
  const [adminUser, setAdminUser] = useState<allFamilyListKeys>()
    const [familySnapShotData, setFamilySnapShotData] = useState<familyDataType[]>([])
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
    let adminData:any = localStorage.getItem("familyList")
    adminData = JSON.parse(adminData)
    if (pan && !adminData) {
      const res = await postRequest<allFamilyResponseType>(endPoints.getAllFamily, {
        pan
      });
      if (res) {
        localStorage.setItem("familyList",JSON.stringify(res.data))
        filterAdmin(res.data)
      }
    }else if(adminData[0]?.ucc){
       filterAdmin(adminData)

    }
  }

  const filterAdmin = (data: allFamilyListKeys[]) => {
    
    let familyMember: allFamilyListKeys[] = []
    let adminData: any = localStorage.getItem("adminUser")
    adminData= JSON.parse(adminData)
    if (!adminData?.ucc) {
      for (const item of data) {
        if (item.relation === "Self") {
          item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
          localStorage.setItem("adminUser", JSON.stringify(item))
          // item.profilePic = "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
          setAdminUser(item)
        } else {
          // item.profilePic = "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
          item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
          familyMember.push(item)
        }
      }
      setFamilyMemberList(familyMember)
    }else{
      for (const item of data) {
        if (item.ucc === adminData.ucc) {
          item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
          localStorage.setItem("adminUser", JSON.stringify(item))
          // item.profilePic = "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
          setAdminUser(item)
        } else {
          item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
          familyMember.push(item)
          // item.profilePic = "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
          
        }
      }
      setFamilyMemberList(familyMember)
    }

  }

const switchProfile = (
  adminData: allFamilyListKeys,setShow: (show: boolean) => void 
) => {
  localStorage.setItem("adminUser", JSON.stringify(adminData));
  fetchFamilyPortfoloData();
  familyPortfolio(adminData)
  setShow(false);
};

 const familyPortfolio = async (adminUser: any) => {
    const res = await postRequest<familySnapshotResponseType>(endPoints.getFamilySnapshot, {
      ucc: adminUser?.ucc
    });
    if (res) {
      setFamilySnapShotData(res.finalArray)
      setSnapshotData(res.finalArray[0])
      console.log("res.finalArray", res.finalArray);

      // let portfolioType = localStorage.getItem("portfolioType")
      // if (portfolioType === "my") {
      //   let family = res.finalArray.filter((item) => item?.myPortfolio === true)
      //   setSnapshotData(family[0])
      // } else if (portfolioType === "family") {
      //   let family = res.finalArray.filter((item) => item?.myPortfolio !== true)
      //   setSnapshotData(family[0])
      // } else {
      //   let family = res.finalArray.filter((item) => item?.myPortfolio === true)
      //   setSnapshotData(family[0])
      // }
    }

  }

  return (
    <AdminUserContext.Provider value={{ adminUser,familyMemberList,switchProfile,familySnapShotData,snapshotData,familyPortfolio,setSnapshotData}}>
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
