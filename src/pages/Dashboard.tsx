import MyNavbar from "../components/Navbar"
import Card from 'react-bootstrap/Card';
import { CurrencyRupee, ArrowUpCircleFill, ArrowDownCircleFill, ChevronDown } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";

// import OurServices from "./dashboard/Our-services";
import GoalPlanning from "./dashboard/Goal-planning";
import PopularFunds from "./dashboard/Popular-funds";
import DiscoverFUnds from "./dashboard/Discover-Funds";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { getPercentageValue } from "../services/calculation/percentageCalculate";
import { fetchAdminUser } from "../services/user/adminUser";
import { useAdminUser } from "../context/AdminContext";
import SwitchPortfolio from "./dashboard/Switch-portfolio";
import Footer from "../components/Footer";
import OurServices from "./dashboard/Our-services";



const Dashboard = () => {
  const { familySnapShotData, familyPortfolio, snapshotData } = useAdminUser()

  const [openPortfolioSwitch, setOpenPortfolioSwitch] = useState<boolean>(false);


  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const adminUser = fetchAdminUser()




  const handleClick = (event: any) => {
    if (familySnapShotData.length > 1) {
      setOpenPortfolioSwitch(!openPortfolioSwitch);
      setTarget(event.target);
    }
  };
  useEffect(() => {
    familyPortfolio(adminUser)
    // fetchRiskProfile()
  }, [])

  // const fetchRiskProfile = async () => {
  //   try {
  //     await postRequest<any>(endPoints.getRiskProfile, { ucc: adminUser?.ucc ?? "" })
  //   } catch (err: any) {
  //     console.log(err.response.data.data.risk);
  //     if (err.response.data.data.risk === -1) {
  //       navigate("/risk-profile")
  //     }
  //   }
  // }



  return (
    <>
      <MyNavbar />
      <section className="closeModel">
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
                    <h3 className="fw-bold"><CurrencyRupee className="mb-1" />{snapshotData?.Totalmarketvalue.toLocaleString("en-In")}{familySnapShotData.length > 1 &&  <small className="fs-6 crPointer" onClick={handleClick}>  <ChevronDown  className="mx-1"/></small>}</h3>
                  </div>
                  <div className="mt-2 textColor" >
                    1 Day change{" "}
                    {snapshotData?.Totaldayschange >= 0 ? (
                      <span className="congratesColor">
                        <ArrowUpCircleFill />
                        <CurrencyRupee className="mb-1" />
                        {snapshotData?.Totaldayschange.toLocaleString("en-In")}  ({getPercentageValue(Number(snapshotData?.Totalmarketvalue), snapshotData?.Totaldayschange)}%)
                      </span>
                    ) : snapshotData?.Totaldayschange < 0 && (
                      <span className="errorColor2">
                        <ArrowDownCircleFill />
                        <CurrencyRupee className="mb-1" />
                        {snapshotData?.Totaldayschange.toLocaleString("en-In")} ({getPercentageValue(Number(snapshotData?.Totalmarketvalue), snapshotData?.Totaldayschange)}%)
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

      />



      <Footer />
    </>
  )
}
export default Dashboard