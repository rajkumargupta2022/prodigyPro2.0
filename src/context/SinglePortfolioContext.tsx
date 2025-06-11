import React, { createContext, useContext, useState, ReactNode } from "react";
import { familyWiseType } from "../pages/data-interfaces/dashboard";
interface SinglePortfolioContextType {
  value: familyWiseType;
  handleSinglePortfolio: (newValue: familyWiseType) => void;
  // setShow:(newValue: boolean) => void;
}
const SinglePortfolioContext = createContext<SinglePortfolioContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const SinglePortfolioProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [value, setValue] = useState<familyWiseType>({
    Gpan: "",
    Pan: "",
    Name: "",
    Totalpurchase: 0,
    TotalMarketValue: 0,
    Cagr: 0,
    Gainloss: 0,
    userid: "",
    days: 0
  });

  // const updateValue = (newValue: string) => {
  //   setValue(newValue);
  // };
  const handleSinglePortfolio = (singleFamilyData: familyWiseType) => {
    localStorage.setItem("singlePortfolio", JSON.stringify(singleFamilyData))
    // setShow(false)
    setValue(singleFamilyData)
  }

  return (
    <SinglePortfolioContext.Provider value={{ value, handleSinglePortfolio }}>
      {children}
    </SinglePortfolioContext.Provider>
  );
};

// Custom hook for using the context
export const useSinglePortfolioContext = (): SinglePortfolioContextType => {
  const context = useContext(SinglePortfolioContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};