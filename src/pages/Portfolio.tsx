import NavBar from "../components/Navbar";
import { ArrowDownCircleFill, ArrowDownUp, ArrowUpCircleFill, CurrencyRupee } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import {  imageUrl } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { getPercentageValue, getValueInSort, percentageDetailFolio } from "../services/calculation/percentageCalculate";
import { useNavigate } from "react-router-dom";
import { useAdminUser } from "../context/AdminContext";
import { fetchAdminUser } from "../services/user/adminUser";
import PortfolioEmpty from "./PortfolioEmpty";
import emptyImg from "../assets/img/empty-img.svg"
import Footer from "../components/Footer";
import { detailPortfolioSchemeType } from "./data-interfaces/portfolio";
import { PortfolioSkeleton } from "./PortfolioSkeleton";


const Portfolio = () => {
  const navigate = useNavigate()
  const { familyPortfolio, snapshotData,setPortfolioDetailData,portfolioDetailData,fetchDetailedPortfolio } = useAdminUser()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const title: string = "You Have No Investments Yet";
  const body: string = "Start investing today to build your portfolio and achieve your financial goals.";
  const btnName = "Explore Funds";
  const btnUrl = "/all-mutual-funds"
  const adminUser = fetchAdminUser()



  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const pan = localStorage.getItem("pan")
    if (pan) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          await Promise.all([
            familyPortfolio(adminUser, true),
            fetchDetailedPortfolio(adminUser?.ucc)
          ]);
        } catch (e) {}
        setIsLoading(false);
      }
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [])

 
 

  const toggleSort = () => {
    const sorted = [...portfolioDetailData].sort((a, b) => {
      const aVal = percentageDetailFolio(Number(a.purchase), Number(a.gain));
      const bVal = percentageDetailFolio(Number(b.purchase), Number(b.gain));
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });
    setPortfolioDetailData(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const fundDetails = (item:detailPortfolioSchemeType)=>{
 
     navigate("/fund-details?productcode="+item.accordSchemeCode,{state:{...item,fromPortfolio:true}}) 
  }

  return (
    <>
      <NavBar />
      {isLoading ? <PortfolioSkeleton /> : (
        <>
          <div className="container py-2 mt-4 portfolio_sticky_2025">
            <div className="personal_form_container">
          {portfolioDetailData?.length > 0 ? <>
            <div className="borderColor p-3 rounded-4 bg-white">
              <div className="row text-center">
                <div className="col">
                  <small className="fw-semibold">OVERALL {`${snapshotData?.Gainloss >= 0 ? "PROFIT" : "LOSS"}`}</small> <span className="fs12px ms-1" > As on {currentDateInStringNumber()}</span>
                </div>
                <h3 className={`fw-bold ${snapshotData?.Gainloss >= 0 ? "congratesColor" : "errorColor2"}`}><CurrencyRupee className="mb-1" />{Math.abs(snapshotData?.Gainloss)?.toLocaleString("en-In")}<small className={`fs-6 ${snapshotData?.Gainloss >= 0 ? "congratesColor" : "errorColor2"}`} >({snapshotData?.Finalcagr}%)</small></h3>
                <div className="textColor">1 Day change
                  {snapshotData?.Totaldayschange >= 0 ?
                    <span className="congratesColor"> <ArrowUpCircleFill /><CurrencyRupee className="mb-1" />{snapshotData?.Totaldayschange?.toLocaleString("en-In")} ({getPercentageValue(Number(snapshotData?.Totalpurchase), snapshotData?.Totaldayschange)}%)</span> :
                    <span className="errorColor2"><ArrowDownCircleFill /><CurrencyRupee className="mb-1" />{snapshotData?.Totaldayschange?.toLocaleString("en-In")} ({getPercentageValue(Number(snapshotData?.Totalpurchase), snapshotData?.Totaldayschange)}%)</span>
                  }
                </div>
              </div>
              <hr />
              <div className="row  mt-1">
                <div className="col-6 text-end ">
                  <small className="fs14px">Investment</small><br />
                  <small className="fs16px"><CurrencyRupee className="mb-1" />{Math.round(Number(snapshotData?.Totalpurchase))?.toLocaleString("en-In")} </small>
                </div>
                <div className="col-5 text-start ">
                  <small className="fs14px">Current Value</small><br />
                  <small className="fs16px"><CurrencyRupee className="mb-1" />{Math.round(Number(snapshotData?.Totalmarketvalue))?.toLocaleString("en-In")} </small>
                </div>
              </div>
            </div>
          </> : <PortfolioEmpty images={emptyImg} title={title} body={body} btnName={btnName} btnUrl={btnUrl} />}

        </div>
      </div>
      {portfolioDetailData.length > 0 ? <div className="container py-2 personal_form_container">
        <div className="row ">
          <div className="col-6 text-start"><h6 >Invested funds</h6> </div>
          <div className="col-6 text-end" onClick={toggleSort} > <button type="button" className="btn gainLossBtn ">Gain/Loss <ArrowDownUp />
          </button></div>
        </div>
      </div> : ""}


      { portfolioDetailData?.length > 0 ? portfolioDetailData?.map((item,i) => {
        return (
          <div className="container py-2 crPointer" onClick={()=>fundDetails(item)} key={i}>
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
                    <small> <CurrencyRupee className="mb-1" />{getValueInSort(Number(item?.gain??0))}</small> <small className={`fs12px ${Number(item?.finalcagr??0) > 0 ? "congratesColor" : "errorColor2"}`}>{getPercentageValue(Number(item?.purchase), item?.gain??0)}%</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
      }) : ""}

        </>
      )}

        <Footer />
    </>
  );
};

export default Portfolio;
