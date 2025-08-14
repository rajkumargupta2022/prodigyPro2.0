import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import InvetmentConfirmation from "../components/InvestmentConfirmation";
import { imageUrl } from "../services/utils/urls";
import { schemeDeatilDataKeys } from "./data-interfaces/transact";
import { errorToast } from "../services/utils/toast";

const EmergencyFund = () => {
  const navigate = useNavigate()
  const [sipDateList, setSipDateList] = useState<number[]>([])
  const [selectedSchemeList, setSelectedSchemeList] = useState<schemeDeatilDataKeys[]>([])
  const schemeList = [
     {
      "sipAllowed": true,
      "stpAllowed": false,
      "swpAllowed": false,
      "purchaseAllowed": false,
      "redemptionAllowed": true,
      "switchAllowed": true,
      "scheme": "Nippon India Power & Infra Fund(B)",
      "accordSchemeCode": 2450,
      "nseProductCode": "PSBP",
      "nseAMCCode": "NIPPONINDIAMUTUALFUND_MF",
      "amcCode": "RMF",
      "nseReinvestTag": "Z",
      "launchDate": "2004-05-08T00:00:00.000Z",
      "lockInPeriod": 0,
      "ISIN": "INF204K01AD2",
      "cnav": 341.44,
      "expenseRatio": 1.82,
      "planType": "NORMAL",
      "planOption": "Bonus",
      "equityType": "Sector Funds",
      "fundSize": 0,
      "minSIPAmt": 1000,
      "minLumSumAmt": 5000,
      "exitLoadPeriod": 1,
      "exitLoad": "1% on or before 1M, Nil after 1M",
      "sipDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "stpDateList": [],
      "swpDateList": [],
      "oneYearCAGR": -8.41,
      "threeYearCAGR": 30.57,
      "fiveYearCAGR": 31.48
    },
    {
      "sipAllowed": true,
      "stpAllowed": false,
      "swpAllowed": false,
      "purchaseAllowed": true,
      "redemptionAllowed": false,
      "switchAllowed": false,
      "scheme": "SBI Small Cap Fund-Reg(G)",
      "accordSchemeCode": 7885,
      "nseProductCode": "SB346G-GR-L1",
      "nseAMCCode": "SBIMUTUALFUND_MF",
      "amcCode": "L",
      "nseReinvestTag": "Z",
      "launchDate": "2009-09-08T18:30:00.000Z",
      "lockInPeriod": 0,
      "ISIN": "INF200K01T28",
      "cnav": 170.91,
      "expenseRatio": 1.57,
      "planType": "NORMAL",
      "planOption": "Growth",
      "equityType": "Small cap Fund",
      "fundSize": 308287873000,
      "minSIPAmt": 1000,
      "minLumSumAmt": 5000,
      "exitLoadPeriod": 1,
      "exitLoad": "",
      "sipDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "stpDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "swpDateList": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
      ],
      "oneYearCAGR": -7.02,
      "threeYearCAGR": 16.92,
      "fiveYearCAGR": 27.35
    }
  ]
  const [openInvestmentConfirmation, setOpenInvestmentConfirmation] =
    useState<boolean>(false);

  const handleInvestmentConfirmation = () => {
    if (selectedSchemeList.length <= 0) {
      errorToast("Plaese select schemes..")
      return
    }
    handleSipIntersection()
    setOpenInvestmentConfirmation(true)
  }
  const handleSipIntersection = () => {
    const sipIntersectionData = selectedSchemeList?.map(scheme => scheme.sipDateList)
      .reduce((acc, curr) => acc.filter(date => curr.includes(date)))
    setSipDateList(sipIntersectionData)
  }


  const handleSelectedScheme = (item: schemeDeatilDataKeys) => {

    setSelectedSchemeList(prev => {
      const alreadySelected = prev.find(scheme => scheme.accordSchemeCode === item.accordSchemeCode);

      if (alreadySelected) {
        return prev.filter(scheme => scheme.accordSchemeCode !== item.accordSchemeCode);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <>
      <NavBar />

      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" onClick={() => navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs14px" /> Emergency Fund</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Emergency Fund</h4>
              <p className="small">Park your surplus money in liquid funds for flexibility, safety, and better returns than traditional savings accounts. Ideal for short-term goals and emergency funds!</p>
            </div>
          </div>
        </div>
      </div>
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
                      src={`${imageUrl + item?.amcCode}.png`}
                      className="rounded"
                      height={30}
                      width={30}
                      alt=""
                    />
                    <small className="mx-2">{item.scheme}</small>
                  </div>
                  <div className="col-1 adjustText pb-2 crPointer text-end">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            );
          })}




          <Link to={"/all-mutual-funds"} className="logoBlueColor">+ Add New Fund</Link><br />
          <button type="button" className="customButton px-2 mt-3" onClick={handleInvestmentConfirmation}>Continue</button>
        </div>
      </div>
      <InvetmentConfirmation
        show={openInvestmentConfirmation}
        setShow={setOpenInvestmentConfirmation}
        schemeList={selectedSchemeList}
        setSchemeList={setSelectedSchemeList}
        sipDateList={sipDateList}
        from={"emergency"}
      />
      <Footer />
    </>
  );
};

export default EmergencyFund;
