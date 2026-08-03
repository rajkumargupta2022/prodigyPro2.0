import NavBar from "../../components/Navbar";
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { imageUrl } from "../../services/utils/urls";
import { getPercentageValue, getValueInSort } from "../../services/calculation/percentageCalculate";
import { useNavigate } from "react-router-dom";
import { useAdminUser } from "../../context/AdminContext";
import { fetchAdminUser } from "../../services/user/adminUser";
import PortfolioEmpty from "../PortfolioEmpty";
import emptyImg from "../../assets/img/empty-img.svg"
import Footer from "../../components/Footer";
import { detailPortfolioSchemeType } from "../data-interfaces/portfolio";
import { TransactionSkeletonCard } from "./Skeleton";


const TransactionList = () => {
  const navigate = useNavigate()
  const { familyPortfolio, portfolioDetailData, fetchDetailedPortfolio } = useAdminUser()
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
        } catch (e) { }
        setIsLoading(false);
      }
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [])


  const fundDetails = (item: detailPortfolioSchemeType) => {
    navigate("/transaction-history?accord_product_code=" + item.accordSchemeCode + "&folio_number=" + item?.folio, { state: { accord_product_code: item.accordSchemeCode, folio_number: item?.folio } })
    //  navigate("/transaction-history?productcode="+item.accordSchemeCode,{state:{...item,fromPortfolio:true}}) 
  }

  return (
    <>
      <NavBar />
      {isLoading ? <TransactionSkeletonCard /> : (
        <> <div className="container pt-2">
          <div className="personal_form_container">
            <div className="d-flex my-3">
              <h6 className="logoBlueColor crPointer" onClick={() => navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs12px bold" />All Transactions </small> </h6>
            </div>
            <div className="row">
              <div className=" col">
                <h4>All Transactions </h4>
              </div>
            </div>

          </div>



          {portfolioDetailData?.length > 0 ? portfolioDetailData?.map((item, i) => {
            return (
              <div className="container py-2 crPointer" onClick={() => fundDetails(item)} key={i}>
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
                        <small> <CurrencyRupee className="mb-1" />{(Number(item?.purchase)?.toLocaleString("en-In"))}</small>
                      </div>
                      <div className="col-4 col-md-4">
                        <small className="fs14px">Current Value</small><br />
                        <small> <CurrencyRupee className="mb-1" />{(Number(item?.currentvalue)?.toLocaleString("en-In"))}</small>
                      </div>
                      <div className="col-4 col-md-4">
                        <small className="fs14px">Gain/Loss</small><br />
                        <small> <CurrencyRupee className="mb-1" />{getValueInSort(Number(item?.gain ?? 0))}</small> <small className={`fs12px ${Number(item?.finalcagr ?? 0) > 0 ? "congratesColor" : "errorColor2"}`}>({getPercentageValue(Number(item?.purchase), item?.gain ?? 0)}%)</small>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )
          }) : <PortfolioEmpty images={emptyImg} title={title} body={body} btnName={btnName} btnUrl={btnUrl} />}

        </div>
        </>
      )}

      <Footer />

    </>
  );
};

export default TransactionList;
