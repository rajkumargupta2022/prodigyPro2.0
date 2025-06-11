import MyNavbar from "../components/Navbar"
import Card from 'react-bootstrap/Card';
import { CurrencyRupee, ArrowUpCircleFill, ArrowDownCircleFill, ChevronDown } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";

import AreYouSure from "../components/Are-You-sure";
import OurServices from "./dashboard/Our-services";
import GoalPlanning from "./dashboard/Goal-planning";
import PopularFunds from "./dashboard/Popular-funds";
import DiscoverFUnds from "./dashboard/Discover-Funds";
// import KycMsg from "./dashboard/Kyc-msg";
import SwitchPortfolio from "./dashboard/Switch-portfolio";
import { familyDataType, familySnapshotResponseType } from "./data-interfaces/dashboard";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { getPercentageValue } from "../services/calculation/percentageCalculate";


const Dashboard = () => {

  const [openPortfolioSwitch, setOpenPortfolioSwitch] = useState<boolean>(false);
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

  const [target, setTarget] = useState(null);
  const ref = useRef(null);



  const handleClick = (event: any) => {
    setOpenPortfolioSwitch(!openPortfolioSwitch);
    setTarget(event.target);
    console.log("=======", event.target);

  };
  useEffect(() => {
    familyPortfolio()
  }, [])

  const familyPortfolio = async () => {
    const pan = localStorage.getItem("pan")
    if (pan) {
      const res = await postRequest<familySnapshotResponseType>(endPoints.getFamilySnapshot, {
        pan
      });
      if (res) {
        setFamilySnapShotData(res.finalArray)
        let portfolioType = localStorage.getItem("portfolioType")
        if (portfolioType === "my") {
          let family = res.finalArray.filter((item) => item?.myPortfolio === true)
          setSnapshotData(family[0])
        } else if (portfolioType === "family") {
          let family = res.finalArray.filter((item) => item?.myPortfolio !== true)
          setSnapshotData(family[0])
        } else {
          let family = res.finalArray.filter((item) => item?.myPortfolio === true)
          setSnapshotData(family[0])
        }
        // console.log("asdsad",family[0]);

      }
    }
  }

  return (
    <>
      <MyNavbar />
      <section>
        <div className="container-fluid">
          <div className="row mt-3 justify-content-md-center">
            <div className="col-lg-7 col-sm-12">
              {/* <KycMsg/>  */}
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row border-bottom">
                    <div className="col d-flex">
                      <h6 className="fw-semibold">PORTFOLIO SUMMARY </h6> <span className="fs12px ms-2" > As on {currentDateInStringNumber()}</span>
                    </div>
                    <h3 className="fw-bold"><CurrencyRupee className="mb-1" />{snapshotData.Totalmarketvalue.toLocaleString("en-In")}<small className="fs-6 crPointer" onClick={handleClick}><ChevronDown /></small></h3>
                  </div>
                  <div className="mt-2 textColor">
                    1 Day change{" "}
                    {snapshotData.Totaldayschange >= 0 ? (
                      <span className="congratesColor">
                        <ArrowUpCircleFill />
                        <CurrencyRupee className="mb-1" />
                        {snapshotData.Totaldayschange.toLocaleString("en-In")}  ({getPercentageValue(Number(snapshotData.Totalpurchase), snapshotData.Totaldayschange)}%)
                      </span>
                    ) : snapshotData.Totaldayschange < 0 && (
                      <span className="errorColor2">
                        <ArrowDownCircleFill />
                        <CurrencyRupee className="mb-1" />
                        {snapshotData.Totaldayschange.toLocaleString("en-In")} ({getPercentageValue(Number(snapshotData.Totalpurchase), snapshotData.Totaldayschange)}%)
                      </span>
                    )}
                  </div>
                </Card.Body>
              </Card>
              <OurServices />
              <GoalPlanning />
              <PopularFunds />
            </div>
            <DiscoverFUnds />

          </div>
        </div>
      </section>
      <SwitchPortfolio
        show={openPortfolioSwitch}
        setShow={setOpenPortfolioSwitch}
        target={target}
        refData={ref}
        familySnapShotData={familySnapShotData}
        snapshotData={snapshotData}
        setSnapshotData={setSnapshotData}
      />

      <AreYouSure />
    </>
  )
}
export default Dashboard