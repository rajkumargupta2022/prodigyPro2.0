import { ChevronRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvetmentConfirmation from "../components/InvestmentConfirmation";
import { endPoints, imageUrl } from "../services/utils/urls";
import { errorToast } from "../services/utils/toast";
import {  schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { postRequest } from "../services/Api/HandleApi";

interface pageProps {
  from: string
}

const RecomendedSchemes: React.FC<pageProps> = ({ from }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sipDateList, setSipDateList] = useState<number[]>([])
  // const schemeList = [
  //   {
  //     "sipAllowed": true,
  //     "stpAllowed": true,
  //     "swpAllowed": true,
  //     "purchaseAllowed": true,
  //     "redemptionAllowed": false,
  //     "switchAllowed": false,
  //     "scheme": "HDFC Flexi Cap Fund(G)",
  //     "accordSchemeCode": 1131,
  //     "nseProductCode": "02-L1",
  //     "nseAMCCode": "HDFCMUTUALFUND_MF",
  //     "accordAMCCode": 400013,
  //     "amcName": "HDFC",
  //     "nseReinvestTag": "Z",
  //     "launchDate": "1995-01-01 00:00:00.000",
  //     "lockInPeriod": 0,
  //     "ISIN": "INF179K01608",
  //     "cnav": 2011.85,
  //     "expenseRatio": 1.38,
  //     "planType": "NORMAL",
  //     "planOption": "Growth",
  //     "equityType": "Flexi Cap Fund",
  //     "fundSize": 696390491000,
  //     "minSIPAmt": 1000,
  //     "minLumSumAmt": 5000,
  //     "exitLoadPeriod": 1,
  //     "exitLoad": "",
  //     "sipDateList": [],
  //     "stpDateList": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5
  //     ],
  //     "swpDateList": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //       8,
  //       9,
  //       10,
  //       11,
  //       12,
  //       13,
  //       14,
  //       15,
  //       16,
  //       17,
  //       18,
  //       19,
  //       20,
  //       21,
  //       22,
  //       23,
  //       24,
  //       25,
  //       26,
  //       27,
  //       28
  //     ],
  //     "swpFrequency": [
  //       "ANNUAL",
  //       "SEMI-ANNUAL",
  //       "MONTHLY",
  //       "QUARTERLY"
  //     ],
  //     "stpFrequency": [
  //       "WEEKLY",
  //       "MONTHLY",
  //       "QUARTERLY"
  //     ],
  //     "oneYearCAGR": 8.62,
  //     "threeYearCAGR": 22.71,
  //     "fiveYearCAGR": 27.59
  //   },
  //       {
  //     "sipAllowed": true,
  //     "stpAllowed": true,
  //     "swpAllowed": true,
  //     "purchaseAllowed": true,
  //     "redemptionAllowed": false,
  //     "switchAllowed": false,
  //     "scheme": "SBI Small Cap Fund-Reg(G)",
  //     "accordSchemeCode": 7885,
  //     "nseProductCode": "SB346G-GR-L1",
  //     "nseAMCCode": "SBIMUTUALFUND_MF",
  //     "accordAMCCode": 400027,
  //     "amcName": "SBI",
  //     "nseReinvestTag": "Z",
  //     "launchDate": "2009-09-08T18:30:00.000Z",
  //     "lockInPeriod": 0,
  //     "ISIN": "INF200K01T28",
  //     "cnav": 174.68,
  //     "expenseRatio": 1.57,
  //     "planType": "NORMAL",
  //     "planOption": "Growth",
  //     "equityType": "Small cap Fund",
  //     "fundSize": 308287873000,
  //     "minSIPAmt": 1000,
  //     "minLumSumAmt": 5000,
  //     "exitLoadPeriod": 1,
  //     "exitLoad": "",
  //     "sipDateList": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5
  //     ],
  //     "stpDateList": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //       8,
  //       9,
  //       10,
  //       11,
  //       12,
  //       13,
  //       14,
  //       15,
  //       16,
  //       17,
  //       18,
  //       19,
  //       20,
  //       21,
  //       22,
  //       23,
  //       24,
  //       25,
  //       26,
  //       27,
  //       28
  //     ],
  //     "swpDateList": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //       8,
  //       9,
  //       10,
  //       11,
  //       12,
  //       13,
  //       14,
  //       15,
  //       16,
  //       17,
  //       18,
  //       19,
  //       20,
  //       21,
  //       22,
  //       23,
  //       24,
  //       25,
  //       26,
  //       27,
  //       28
  //     ],
  //     "swpFrequency": [
  //       "MONTHLY",
  //       "QUARTERLY"
  //     ],
  //     "stpFrequency": [
  //       "WEEKLY",
  //       "QUARTERLY",
  //       "MONTHLY"
  //     ],
  //     "oneYearCAGR": -3.58,
  //     "threeYearCAGR": 16.77,
  //     "fiveYearCAGR": 24.66
  //   }
  // ]
  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([])
  const [selectedSchemeList, setSelectedSchemeList] = useState<schemeDeatilDataKeys[]>([])

  const [openInvestmentConfirmation, setOpenInvestmentConfirmation] =
    useState<boolean>(false);

  useEffect(() => {

    fetchSchemeList()
    
  }, [])
  const handleInvestmentConfirmation = () => {
    if (selectedSchemeList.length <= 0) {
      errorToast("Plaese select schemes..")
      return
    }
    handleSipIntersection()
    setOpenInvestmentConfirmation(true)
  }
  const handleSipIntersection = () => {
    console.log("location.state.newsipamt",location.state.newsipamt);
    const sipIntersectionData = selectedSchemeList?.map(scheme => scheme.sipDateList)
      .reduce((acc, curr) => acc.filter(date => curr.includes(date)))
    setSipDateList(sipIntersectionData)
    
     setSelectedSchemeList((prev: any) =>
          prev.map((obj: any) => {
            return {
              ...obj,
              totalAmount: location.state.newsipamt,
            };
          })
        );
  }


  const handleSelectedScheme = (item: any) => {

    setSelectedSchemeList(prev => {
      const alreadySelected = prev.find(scheme => scheme.accordSchemeCode === item.accordSchemeCode);
      if (alreadySelected) {
        return prev.filter(scheme => scheme.accordSchemeCode !== item.accordSchemeCode);
      } else {
        return [...prev, item];
      }
    });
  };

  const fetchSchemeList = async () => {
    try {
      const res = await postRequest<any>(endPoints.goalPlanningSchemes, { durationValues: location.state.investmentPeriod })
      setSchemeList(res.data)
      setSelectedSchemeList(res.data)

    } catch (err) {
      setSchemeList([])
    }
  }
 const fundDetails = (item: any) => {
    
    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
  }

  return (
    <>

      <div className="container pt-2">
        <div className="personal_form_container">
          <p className="mb-2 ">Recommended Schemes</p>
          {schemeList.map((item, index) => {
            const isChecked = selectedSchemeList?.some(scheme => scheme?.accordSchemeCode === item.accordSchemeCode);

            return (
              <div className="bg-white px-4 my-2 rounded form_shadow" key={index}>
                <div className="row borderColor py-2 crPointer" onClick={() => handleSelectedScheme(item)}>
                  <div className="round col-11">
                    <input
                      type="checkbox"
                      id={"checkbox" + index}
                      checked={isChecked}
                      onClick={() => handleSelectedScheme(item)}
                    />
                    <label htmlFor={"checkbox" + index}></label>
                    <img
                      src={`${imageUrl + item?.accordAMCCode}.png`}
                      className="rounded"
                      height={30}
                      width={30}
                      alt=""
                    />
                    <small className="mx-2">{item.scheme}</small>
                  </div>
                  <div className="col-1 adjustText pb-2 crPointer text-end" onClick={()=>fundDetails(item)}>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            );
          })}




          {/* <Link to={"/all-mutual-funds"} className="logoBlueColor">+ Add New Fund</Link><br /> */}
          <button type="button" className="customButton px-2 mt-3" onClick={handleInvestmentConfirmation}>Continue</button>
        </div>
      </div>
      <InvetmentConfirmation
        show={openInvestmentConfirmation}
        setShow={setOpenInvestmentConfirmation}
        schemeList={selectedSchemeList}
        setSchemeList={setSelectedSchemeList}
        sipDateList={sipDateList}
        from={location.state?.title||from}
       
      />

    </>
  );
};

export default RecomendedSchemes;
