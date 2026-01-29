import NavBar from "../components/Navbar";
import { ChevronRight, Envelope, Telephone } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import SwitchFund from "../components/SwitchFund";
import { fetchAdminUser } from "../services/user/adminUser";
import { getRequest, postRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { portfolioReviewKeys, portfolioReviewRes, summaryInsideKeys, portfolioSummaryRes, portfolioExpertRes, portfolioExpertKeys } from "./data-interfaces/portfolio";
import { getPercentageValue, getValueInSort } from "../services/calculation/percentageCalculate";
import InvestMoreScheme from "../components/Invest-more-scheme";
import UnderWatchPerformance from "../components/Underwatch-performance";
import RedemptionPerformance from "../components/Redemption-performance";
import PortfolioEmpty from "./PortfolioEmpty";
import emptyImg from "../assets/img/empty-img.svg"

const PortfolioReview = () => {
  const [openSwitchFund, setOpenSwitchFund] = useState<boolean>(false)
  const [satisfactoryList, setSatisfactoryList] = useState<portfolioReviewKeys[]>([])
  const [satisfactoryListProps, setSatisfactoryListProps] = useState<portfolioReviewKeys[]>([])
  const [underWatchList, setUnderWatchList] = useState<portfolioReviewKeys[]>([])
  const [redemptionList, setRedemptionList] = useState<portfolioReviewKeys[]>([])
  const [redemptionListProps, setRedemptionListProps] = useState<portfolioReviewKeys[]>([])
  const [switchList, setSwitchList] = useState<portfolioReviewKeys[]>([])
  const [switchListForProps, setSwitchListForProps] = useState<portfolioReviewKeys[]>([])
  const [portfolioSummaryList, setPortfolioSummaryList] = useState<summaryInsideKeys[]>([])
  const [totolInvested, setTotalInvested] = useState<number>(0)
  const [portfolioExpertData, setPortfolioExpertData] = useState<portfolioExpertKeys | null>()
  const [openRedumptinPerformance, setOpenRedumptinPerformance] = useState<boolean>(false)
  const [openUnderwatchModel, setOpenUnderwatchModel] = useState<boolean>(false)
  const [openInvestMore, setOpenInvestMore] = useState<boolean>(false)
  const [productCodes, setProductCodes] = useState<number[]>([])
  const [underWatchDetail, setUnderWatchDetail] = useState<portfolioReviewKeys | null>(null)


  useEffect(() => {

    fetchSchemePerformance()
  }, [])

  const fetchPortfolioExpert = async () => {
    try {
      const res = await getRequest<portfolioExpertRes>(endPoints.getPortfolioExpert)
      if (res.success) {
        setPortfolioExpertData(res.data)
      }
    } catch (err) {
      setPortfolioExpertData(null)
    }
  }
  const fetchSchemePerformance = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (adminUser?.ucc) {
        const reqBody = {
          ucc: adminUser?.ucc
        }
        const res = await postRequest<portfolioSummaryRes>(endPoints.getSchemePerformanceSummary, reqBody)
        if (res.success) {
          setPortfolioSummaryList(res.data?.performance_summary)
          setTotalInvested(res.data?.total)
          fetchSatisfactorySchemes()
          fetchUnderWatchSchemes()
          fetchRedemptionSchemes()
          fetchSwitchSchemes()
          fetchPortfolioExpert()

        } else {
          setPortfolioSummaryList([])
        }
      }
    } catch (err) {
      setPortfolioSummaryList([])
    }
  }

  const fetchSatisfactorySchemes = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (adminUser?.ucc) {
        const reqBody = {
          ucc: adminUser?.ucc
        }
        const res = await postRequest<any>(endPoints.getSatisfactoryPerformanceSchemes, reqBody)
        if (res.success) {
          setSatisfactoryList(res.data)

        } else {
          setSatisfactoryList([])
        }
      }
    } catch (err) {
      setSatisfactoryList([])
    }
  }
  const fetchUnderWatchSchemes = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (adminUser?.ucc) {
        const reqBody = {
          ucc: adminUser?.ucc
        }
        const res = await postRequest<portfolioReviewRes>(endPoints.getUnderwatchSchemes, reqBody)
        if (res.success) {
          setUnderWatchList(res.data)
        } else {
          setUnderWatchList([])
        }
      }
    } catch (err) {
      setUnderWatchList([])
    }
  }

  const fetchRedemptionSchemes = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (adminUser?.ucc) {
        const reqBody = {
          ucc: adminUser?.ucc
        }
        const res = await postRequest<portfolioReviewRes>(endPoints.getRedemptionRecommendedSchemes, reqBody)
        if (res.success) {
          setRedemptionList(res.data)
        } else {
          setRedemptionList([])
        }
      }
    } catch (err) {
      setRedemptionList([])
    }
  }
  const fetchSwitchSchemes = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (adminUser?.ucc) {
        const reqBody = {
          ucc: adminUser?.ucc
        }
        const res = await postRequest<portfolioReviewRes>(endPoints.getSwitchSchemes, reqBody)
        if (res.success) {
          setSwitchList(res.data)
        } else {
          setSwitchList([])
        }
      }
    } catch (err) {
      setSwitchList([])
    }
  }

  const singleSatisfactoryInvest = (item:portfolioReviewKeys) => {
    setProductCodes([item.accordSchemeCode])
    setSatisfactoryListProps([item])
    setOpenInvestMore(true)

  }
  const singleSwitcTransaction = (item: portfolioReviewKeys) => {
  
      setProductCodes([item.accordSchemeCode, item.target?.accordProductCode??0])
    
    setSwitchListForProps([item])
    setOpenSwitchFund(true)

  }
  const handleInvestMore = () => {
    let products = satisfactoryList.map((item: any) => {
      return item.accordSchemeCode
    })
    setProductCodes(products)
    setOpenInvestMore(true)
    setSatisfactoryListProps(satisfactoryList)

  }
  const handleBulkSwitch = () => {
    setSwitchListForProps(switchList)

    const products = new Set<number>();
    switchList.forEach(element => {
      products.add(element.accordSchemeCode)
      products.add(element?.target?.accordProductCode ?? 0)
    });
    const uniqueProducts = Array.from(products);
    setProductCodes(uniqueProducts)
    setOpenSwitchFund(true)
  }

  const redemptionPerformance = () => {
    let products = redemptionList.map((item: any) => {
      return item.accordSchemeCode
    })
    setProductCodes(products)
    setOpenRedumptinPerformance(true)
    setRedemptionListProps(redemptionList)
  }
  const underWatchPerformnace = (item: portfolioReviewKeys) => {
    let products = [item.accordSchemeCode]
    setProductCodes(products)
    setOpenUnderwatchModel(true)
    setUnderWatchDetail(item)
  }
  const singleRedemption = (item: portfolioReviewKeys) => {
    setProductCodes([item.accordSchemeCode])
    setOpenRedumptinPerformance(true)
    setRedemptionListProps([item])
  }
  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          {portfolioSummaryList?.length > 0 ? <>
            <div className="col-12 d-flex align-items-start">
              <h4>Portfolio Review</h4>
            </div>
            <div className="col-md-8 col-sm-12 ">
              <div className="col-12 bg-white rounded-2 p-2 px-2 mt-4">
                <h5>Fund Performance Summary</h5>

                {portfolioSummaryList?.length > 0 ? portfolioSummaryList?.map((item,i) => {
                  return <div className="mb-3" key={i}>
                    <div className="d-flex justify-content-between">
                      <span>{item.name} ({item.scheme_count})</span>
                      <span>₹{getValueInSort(item.currentValue)}</span>
                    </div>
                    <div className="progress height6px">
                      <div className={`progress-bar ${item.name?.replace(/\s+/g, '-')}`} style={{ width: getPercentageValue(totolInvested, item.currentValue) + "%" }}></div>
                    </div>
                  </div>
                }) : <p className="logoBlueColor text-center">Loading...</p>}


              </div>
              {switchList?.length >0&&
              <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
                <div className="row px-3 my-3">
                  <h5>Switch ({switchList.length} funds)</h5>
                  <div className="col-12">
                    <p className="m-0 fs14px"> Consider reviewing or replacing these funds, as they are underperforming.</p>
                  </div>
                  <hr className="text-warning border-2" />
                  {switchList?.length ? switchList.map((item: portfolioReviewKeys, i) => {
                    return <>
                      <div className="col-11 p-2 d-flex align-items-start crPointer" key={i} onClick={() => singleSwitcTransaction(item)}>
                        <img src={`${imageUrl + item.accordAMCCode}.png`} alt="" height={40} width={40} className="rounded" />
                        <div className="d-flex flex-column ps-3">
                          <small className="mb-0">{item.scheme}</small>
                          <small className="fs12px">Folio: {item.folio}</small>
                        </div>
                      </div>
                      <div className="col-1"  onClick={() => singleSwitcTransaction(item)}>
                        <ChevronRight className="text-secondary" />
                      </div>
                    </>
                  }) : <p className="logoBlueColor text-center">Loading...</p>}
                  <div className="col text-start fs12px mt-2" onClick={handleBulkSwitch}><button type="button" className="btn transactBtn">Switch All</button></div>
                </div>
              </div>
}

              {/* stisfactory performane****************************** */}
              {satisfactoryList?.length > 0 &&
                <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
                  <div className="row px-3 my-3">
                    <h5>Satisfactory Performance ({satisfactoryList.length} funds)</h5>
                    <div className="col-12">
                      <p className="m-0 fs14px"> Keep these funds in your portfolio to benefit from their strong performance.</p>
                    </div>
                    <hr className="text-success border-2" />
                    {satisfactoryList?.length ? satisfactoryList.map((item: portfolioReviewKeys, i) => {
                      return <>
                        <div className="col-11 p-2  d-flex align-items-start crPointer" key={i} onClick={() => singleSatisfactoryInvest(item)}>
                          <img src={`${imageUrl + item.accordAMCCode}.png`} alt="" height={40} width={40} className="rounded" />
                          <div className="d-flex flex-column ps-3">
                            <small className="mb-0">{item.scheme}</small>
                            <small className="fs12px">Folio: {item.folio}</small>
                          </div>
                        </div>
                        <div className="col-1" onClick={() => singleSatisfactoryInvest(item)}>
                          <ChevronRight className="text-secondary" />
                        </div>
                      </>
                    }) : ""}

                    <div className="col text-start fs12px mt-2" onClick={handleInvestMore} ><button type="button" className="btn transactBtn">Invest More</button></div>
                  </div>
                </div>}

              {/* Redemptione****************************** */}
              {redemptionList?.length > 0 &&
                <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
                  <div className="row px-3 my-3">
                    <h5>Redemption ({redemptionList.length} funds)</h5>
                    <div className="col-12 ">
                      <p className="m-0 fs14px"> Exit these fund and reallocate to better-performing options.</p>
                    </div>
                    <hr className="text-danger border-2" />
                    {redemptionList?.length ? redemptionList.map((item: any, i) => {
                      return <>
                        <div className="col-11 p-2 d-flex align-items-start crPointer" key={i} onClick={() => singleRedemption(item)}>
                          <img src={`${imageUrl + item.accordAMCCode}.png`} alt="" height={40} width={40} className="rounded" />
                          <div className="d-flex flex-column ps-3">
                            <small className="mb-0">{item.scheme}</small>
                            <small className="fs12px">Folio: {item.folio}</small>
                          </div>
                        </div>
                        <div className="col-1 crPointer" onClick={() => singleRedemption(item)}>
                          <ChevronRight className="text-secondary" />
                        </div>
                      </>
                    }) : ""}
                    <div className="col text-start fs12px mt-2" onClick={redemptionPerformance}><button type="button" className="btn transactBtn">Redeem All</button></div>
                  </div>
                </div>}

              {/* Under watch performane****************************** */}
              {underWatchList?.length > 0 &&
                <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
                  <div className="row px-3 my-3">
                    <h5>Under Watch ({underWatchList.length} funds)</h5>
                    <div className="col-12">
                      <p className="m-0 fs14px">Monitor these funds closely for any potential changes.</p>
                    </div>
                    <hr className="text-secondary border-2" />
                    {underWatchList?.length ? underWatchList.map((item: portfolioReviewKeys, i) => {
                      return <>
                        <div className="col-11 p-2 d-flex align-items-start crPointer" key={i} onClick={() => underWatchPerformnace(item)}>
                          <img src={`${imageUrl + item.accordAMCCode}.png`} alt="" height={40} width={40} className="rounded" />
                          <div className="d-flex flex-column ps-3">
                            <small className="mb-0">{item.scheme}</small>
                            <small className="fs12px">Folio : {item.folio}</small>
                          </div>
                        </div>
                        <div className="col-1" onClick={() => underWatchPerformnace(item)}>
                          <ChevronRight className="text-secondary" />
                        </div>
                      </>
                    }) : ""}
                  </div>
                </div>}
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="row  bg-white rounded-2 p-3 mt-4">
                <h5>For detailed analysis of your portfolio please reach out to our expert.</h5>
                <div className="col-12 d-flex align-items-start">
                  <img src={`${portfolioExpertData?.img}`} alt="" height={50} width={50} className="rounded-circle" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">{portfolioExpertData?.name}</small>
                    <small className="fs14px">({portfolioExpertData?.designation})</small>
                    <small className="fs14px">{portfolioExpertData?.aum}</small>
                    <a href={`tel:${portfolioExpertData?.phone}`} className="fs16px logoBlueColor d-block">
                      <Telephone /> {portfolioExpertData?.phone}
                    </a>

                    <a href={`mailto:${portfolioExpertData?.email}`} className="fs16px logoBlueColor d-block">
                      <Envelope /> {portfolioExpertData?.email}
                    </a>

                  </div>
                </div>
              </div>
              {/* <div className="d-flex justify-content-center mt-3">

                <button type="button" className="customButton"><Download /> Review Report</button>
              </div> */}
            </div></> : <PortfolioEmpty images={emptyImg} title="No investments yet" body=" Every goal needs a starting point
                       make your first investment today!" btnName="Build My Portfolio" btnUrl="/all-mutual-funds" />}
        </div>

      </div>
      <InvestMoreScheme show={openInvestMore} setShow={setOpenInvestMore} productCodes={productCodes}satisfactorySchemeList={satisfactoryListProps}  number={portfolioExpertData?.phone ?? ""} />
      <SwitchFund show={openSwitchFund} setShow={setOpenSwitchFund} productCodes={productCodes} switchSchemeList={switchListForProps} number={portfolioExpertData?.phone ?? ""} />
      <RedemptionPerformance show={openRedumptinPerformance} setShow={setOpenRedumptinPerformance} productCodes={productCodes} redemptionList={redemptionListProps} number={portfolioExpertData?.phone ?? ""} />
      <UnderWatchPerformance show={openUnderwatchModel} setShow={setOpenUnderwatchModel} productCodes={productCodes} underWatchDetail={underWatchDetail} />
    </>
  );
};

export default PortfolioReview;
