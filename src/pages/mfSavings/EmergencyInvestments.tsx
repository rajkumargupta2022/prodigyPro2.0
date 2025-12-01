import {  CurrencyRupee } from "react-bootstrap-icons";
import { useEffect } from "react";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { currentDateInStringNumber } from "../../services/dates/dateFormater";
import { getPercentageValue, getValueInSort } from "../../services/calculation/percentageCalculate";
import { useNavigate } from "react-router-dom";
import { useAdminUser } from "../../context/AdminContext";
import { fetchAdminUser } from "../../services/user/adminUser";
import PortfolioEmpty from "../PortfolioEmpty";
import emptyImg from "../../assets/img/empty-img.svg"
import { detailPortfolioSchemeType } from "../data-interfaces/portfolio";
import { getRequest } from "../../services/Api/HandleApi";
import { isAvailbleEmergencyPortfolioRes } from "../data-interfaces/emergency-portfolio";
import { useEmergencyPortfolio } from "../../context/EmergencyPortfolio";
import { keys } from "../../services/utils/keys";


const EmergencyInvestments = () => {
  const navigate = useNavigate()
  const { familyPortfolio,  portfolioDetailData, fetchDetailedPortfolio } = useAdminUser()
  const { emergencyPortfolioSnapshot,fetchPortfolio,fetchPortfolioList,emergencyPortfolioList } = useEmergencyPortfolio()
  const title: string = "You Have No Investments Yet";
  const body: string = "Start investing today to build your portfolio and achieve your financial goals.";
  const btnName = "Explore Funds";
  const btnUrl = "/all-mutual-funds"
  const adminUser = fetchAdminUser()
  // const [isEmergencyPortfolio, setIsEmergencyPortfolio] = useState<boolean>(false)



  useEffect(() => {
    const pan = localStorage.getItem("pan")
    if (pan) {
      isPortfolioAvailble()
      familyPortfolio(adminUser, true)
      fetchDetailedPortfolio(adminUser?.ucc)
    }
  }, [])

  const isPortfolioAvailble = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (!adminUser?.ucc) return
      const res = await getRequest<isAvailbleEmergencyPortfolioRes>(endPoints.hasEmergencyPortfolio + `?ucc=${adminUser?.ucc}`)
      if (res?.success) {
        // setIsEmergencyPortfolio(res.data)
        fetchPortfolio()
        fetchPortfolioList()
      } else {
        // setIsEmergencyPortfolio(false)
      }

    } catch (err) {
      console.log(err);
      // setIsEmergencyPortfolio(false)
    }
  }





  const fundDetails = (item: detailPortfolioSchemeType) => {

    navigate("/fund-details", { state: { ...item, fromPortfolio: true ,from:keys.bajaj} })
  }

  return (
    <>


      <div className="container py-2  portfolio_sticky_2025">
        <div className="personal_form_container">
          {portfolioDetailData?.length > 0 ? <>
            <div className="borderColor p-3 rounded-4 bg-white">
              <div className="row text-center">
                <div className="col">
                  <small className="fw-semibold">OVERALL PROFIT</small> <span className="fs12px ms-1" > As on {currentDateInStringNumber()}</span>
                </div>
                <h3 className={`fw-bold ${emergencyPortfolioSnapshot[0]?.Gainloss >= 0 ? "congratesColor" : "errorColor2"}`}><CurrencyRupee className="mb-1" />{Math.abs(emergencyPortfolioSnapshot[0]?.Gainloss)?.toLocaleString("en-In")}<small className={`fs-6 ${emergencyPortfolioSnapshot[0]?.Gainloss >= 0 ? "congratesColor" : "errorColor2"}`} >({emergencyPortfolioSnapshot[0]?.absolute_return}%)</small></h3>

              </div>
              <hr />
              <div className="row ">
                <div className="col-6 text-end ">
                  <small className="fs14px">Investment</small><br />
                  <small className="fs16px"><CurrencyRupee className="mb-1" />{Math.round(Number(emergencyPortfolioSnapshot[0]?.Totalpurchase??0))?.toLocaleString("en-In")} </small>
                </div>
                <div className="col-5 text-start ">
                  <small className="fs14px">Current Value</small><br />
                  <small className="fs16px"><CurrencyRupee className="mb-1" />{Math.round(Number(emergencyPortfolioSnapshot[0]?.Totalmarketvalue))?.toLocaleString("en-In")} </small>
                </div>
                <hr className="" />
                {/* <div className="d-flex align-items-center justify-content-center my-3">
                 <div className={` col-lg-2 logoBlueColor  border  text-center monthly_btn crPointer`} > Insta Redeem </div>
                </div> */}
                <p className="text-center fs14px  mb-0">Get instant withdrawals* of up to ₹50,000 back to your bank account anytime.</p>
              </div>
            </div>
          </> : <PortfolioEmpty images={emptyImg} title={title} body={body} btnName={btnName} btnUrl={btnUrl} />}

        </div>
      </div>



      {emergencyPortfolioList?.length > 0 ? emergencyPortfolioList?.map((item) => {
        return (
          <div className="container py-2 crPointer" onClick={() => fundDetails(item)}>
            <div className="personal_form_container">
              <div className="borderColor p-3 rounded-4 bg-white">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="prod_icon_img">
                      <img src={`${imageUrl + item?.accordAMCCode}.png`} className="logoRadius" height={40} width={40} alt="" />
                    </div>
                    <div className="ms-2 prod_icon_heading mt-1">
                      <h4>{item?.scheme}</h4>
                      <p>Folio: {item?.folio}</p>
                    </div>
                  </div>

                </div>
                <hr />
                <div className="row text-start mt-1">
                  <div className="col-4 col-md-4">
                    <small className="fs14px">Invested</small><br />
                    <small> <CurrencyRupee className="mb-1" />{getValueInSort(Number(item?.purchase))}</small>
                  </div>
                  <div className="col-4 col-md-4">
                    <small className="fs14px">Current Value</small><br />
                    <small> <CurrencyRupee className="mb-1" />{getValueInSort(Number(item?.currentvalue))}</small>
                  </div>
                  <div className="col-4 col-md-4">
                    <small className="fs14px">Gain/Loss</small><br />
                    <small> <CurrencyRupee className="mb-1" />{getValueInSort(Number(item?.gain ?? 0))}</small> <small className={`fs12px ${Number(item?.finalcagr ?? 0) > 0 ? "congratesColor" : "errorColor2"}`}>{getPercentageValue(Number(item?.purchase), item?.gain ?? 0)}%</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
      }) : ""}




    </>
  );
};

export default EmergencyInvestments;
