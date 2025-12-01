// LoaderContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { getRequest } from "../services/Api/HandleApi";
import { emergencyPortfolioListRes, emergencySnapshortKeys, emergencySnapshortRes } from "../pages/data-interfaces/emergency-portfolio";
import { fetchAdminUser } from "../services/user/adminUser";
import { endPoints } from "../services/utils/urls";
import { detailPortfolioSchemeType } from "../pages/data-interfaces/portfolio";

interface EmergencyContextType {
  emergencyPortfolioSnapshot: emergencySnapshortKeys[] ;
  emergencyPortfolioList: detailPortfolioSchemeType[] ;
  setEmergencyPortfolioSnapshot: (data:emergencySnapshortKeys[]) => void;
  fetchPortfolio: () => void;
  fetchPortfolioList: () => void;
}

const EmergencyPortfolioContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyPortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [emergencyPortfolioSnapshot, setEmergencyPortfolioSnapshot] = useState<emergencySnapshortKeys[]>([]);
  const [emergencyPortfolioList, setEmergencyPortfolioList] = useState<detailPortfolioSchemeType[]>([]);
   

  const fetchPortfolio = async () => {
    const adminUser = fetchAdminUser();
    const res = await getRequest<emergencySnapshortRes>(endPoints.getEmergencyPortfolioSnapshot + `?ucc=${adminUser?.ucc}`);
    if (res?.success) {
      setEmergencyPortfolioSnapshot(res?.data || []);
    }else{
      setEmergencyPortfolioSnapshot([]);
    }
  }
   const fetchPortfolioList = async () => {
    const adminUser = fetchAdminUser();
    const res = await getRequest<emergencyPortfolioListRes>(endPoints.getDetailedEmergencyPortfolio + `?ucc=${adminUser?.ucc}`);
    if (res?.success) {
      setEmergencyPortfolioList(res?.data || []);
    }else{
      setEmergencyPortfolioList([]);
    }
  }

 

  return (
    <EmergencyPortfolioContext.Provider value={{ emergencyPortfolioSnapshot, setEmergencyPortfolioSnapshot,fetchPortfolio,fetchPortfolioList,emergencyPortfolioList }}>
      {children}
    </EmergencyPortfolioContext.Provider>
  );
};

export const useEmergencyPortfolio = () => {
  const context = useContext(EmergencyPortfolioContext);
  if (!context) {
    throw new Error("Should be used within EmergencyPortfolioProvider");
  }
  return context;
};
