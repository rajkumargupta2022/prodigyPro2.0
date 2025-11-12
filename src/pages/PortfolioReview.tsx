import NavBar from "../components/Navbar";
import sbi from "../assets/img/bank-logo/sbi.png"
import { ChevronRight, CurrencyRupee, Download, Envelope, Telephone } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import SwitchFund from "../components/SwitchFund";
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { portfolioReviewKeys, portfolioReviewRes, portfolioSummaryKeys, portfolioSummaryRes } from "./data-interfaces/portfolio";

const PortfolioReview = () => {
  const [openSwitchFund, setOpenSwitchFund] = useState<boolean>(false)
  const [satisfactoryList, setSatisfactoryList] = useState<portfolioReviewKeys[]>([])
  const [underWatchList, setUnderWatchList] = useState<portfolioReviewKeys[]>([])
  const [redemptionList, setRedemptionList] = useState<portfolioReviewKeys[]>([])
  const [switchList, setSwitchList] = useState<portfolioReviewKeys[]>([])
  const [portfolioSummaryList, setPortfolioSummaryList] = useState<portfolioSummaryKeys[]>([])

  const handleSwitchFund = () => {
    setOpenSwitchFund(true)
  }
  useEffect(() => {
    fetchSatisfactorySchemes()
    fetchUnderWatchSchemes()
    fetchRedemptionSchemes()
    fetchSwitchSchemes()
    fetchSchemePerformance()
  }, [])

  const fetchSchemePerformance = async () => {
    try {
      const adminUser = fetchAdminUser()
      if (adminUser?.ucc) {
        const reqBody = {
          ucc: "5011030899"
        }
        const res = await postRequest<portfolioSummaryRes>(endPoints.getSchemePerformanceSummary, reqBody)
        if (res.success) {
          setPortfolioSummaryList(res.data)
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
          ucc: "5011030899"
        }
        const res = await postRequest<portfolioReviewRes>(endPoints.getSatisfactoryPerformanceSchemes, reqBody)
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
          ucc: "5011030899"
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
          ucc: "5011030899"
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
          ucc: "5011030899"
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
   


  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 d-flex align-items-start">
            <h4>Portfolio Review</h4>
          </div>
          <div className="col-md-8 col-sm-12 ">
            <div className="col-12 bg-white rounded-2 p-2 px-2 mt-4">
              <h5>Fund Performance Summary</h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Switch (2)</span>
                  <span>₹2.51L</span>
                </div>
                <div className="progress height6px">
                  <div className="progress-bar switchBgColor" style={{ width: "60%" }}></div>
                </div>
              </div>

              {/* Satisfactory Performance */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Satisfactory Performance (3)</span>
                  <span>₹8.09K</span>
                </div>
                <div className="progress height6px">
                  <div className="progress-bar satisfactoryBg" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Under Watch */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Under Watch (2)</span>
                  <span>₹62K</span>
                </div>
                <div className="progress height6px">
                  <div className="progress-bar underwatchBg" style={{ width: "20%" }}></div>
                </div>
              </div>

              {/* Redemption */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Redemption (2)</span>
                  <span>₹32K</span>
                </div>
                <div className="progress height6px">
                  <div className="progress-bar redumptionBg" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Switch ({switchList.length} funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px"> Consider reviewing or replacing these funds, as they are underperforming.</p>
                </div>
                <hr className="text-warning border-2" />
                {switchList?.length ? switchList.map((item: portfolioReviewKeys, i) => {
                  return <>
                    <div className="col-11 p-2 d-flex align-items-start" key={i}>
                      <img src={`${imageUrl+item.accordAMCCode}.png`} alt=""  height={40} width={40} className="rounded"/>
                      <div className="d-flex flex-column ps-3">
                        <small className="mb-0">{item.scheme}</small>
                        <small className="fs12px">Folio: {item.folio}</small>
                      </div>
                    </div>
                    <div className="col-1">
                      <ChevronRight className="text-secondary" />
                    </div>
                  </>
                }) : <p className="text-danger">No scheme availble</p>}
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund}><button type="button" className="btn transactBtn">Switch All</button></div>
              </div>
            </div>

            {/* stisfactory performane****************************** */}
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Satisfactory Performance ({satisfactoryList.length} funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px"> Keep these funds in your portfolio to benefit from their strong performance.</p>
                </div>
                <hr className="text-success border-2" />
                {satisfactoryList?.length ? satisfactoryList.map((item: portfolioReviewKeys, i) => {
                  return <>
                    <div className="col-11 p-2  d-flex align-items-start" key={i}>
                      <img src={`${imageUrl+item.accordAMCCode}.png`} alt=""  height={40} width={40} className="rounded"/>
                      <div className="d-flex flex-column ps-3">
                        <small className="mb-0">{item.scheme}</small>
                        <small className="fs12px">Folio: {item.folio}</small>
                      </div>
                    </div>
                    <div className="col-1">
                      <ChevronRight className="text-secondary" />
                    </div>
                  </>
                }) : <p className="text-danger">No scheme availble</p>}

                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund} ><button type="button" className="btn transactBtn">Invest More</button></div>
              </div>
            </div>

            {/* Redemptione****************************** */}
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Redemption ({redemptionList.length} funds)</h5>
                <div className="col-12 ">
                  <p className="m-0 fs14px"> Exit these fund and reallocate to better-performing options.</p>
                </div>
                <hr className="text-danger border-2" />
                {redemptionList?.length ? redemptionList.map((item: portfolioReviewKeys, i) => {
                  return <>
                    <div className="col-11 p-2 d-flex align-items-start" key={i}>
                      <img src={`${imageUrl+item.accordAMCCode}.png`} alt=""  height={40} width={40} className="rounded"/>
                      <div className="d-flex flex-column ps-3">
                        <small className="mb-0">{item.scheme}</small>
                        <small className="fs12px">Folio: {item.folio}</small>
                      </div>
                    </div>
                    <div className="col-1">
                      <ChevronRight className="text-secondary" />
                    </div>
                  </>
                }) : <p className="text-danger">No scheme availble</p>}
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund}><button type="button" className="btn transactBtn">Redeem All</button></div>
              </div>
            </div>

            {/* Under watch performane****************************** */}
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Under Watch ({underWatchList.length} funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px">Monitor these funds closely for any potential changes.</p>
                </div>
                <hr className="text-secondary border-2" />
                {underWatchList?.length ? underWatchList.map((item: portfolioReviewKeys, i) => {
                  return <>
                    <div className="col-11 p-2 d-flex align-items-start" key={i}>
                      <img src={`${imageUrl+item.accordAMCCode}.png`} alt=""  height={40} width={40} className="rounded"/>
                      <div className="d-flex flex-column ps-3">
                        <small className="mb-0">{item.scheme}</small>
                        <small className="fs12px">Folio: {item.folio}</small>
                      </div>
                    </div>
                    <div className="col-1">
                      <ChevronRight className="text-secondary" />
                    </div>
                  </>
                }) : <p className="text-danger">No scheme availble</p>}
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund}><button type="button" className="btn transactBtn">Under Watch</button></div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="row  bg-white rounded-2 p-3 mt-4">
              <h5>For detailed analysis of your portfolio please reach out to our expert.</h5>
              <div className="col-12 d-flex align-items-start">
                <img src={sbi} alt="" height={50} width={50} />
                <div className="d-flex flex-column ps-3">
                  <small className="mb-0">R K Gupta</small>
                  <small className="fs14px">Currenty managing  <CurrencyRupee />1.88Cr Aum</small>
                  <small className="fs16px logoBlueColor"><Telephone /> +91 9956419878</small>
                  <small className="fs16px logoBlueColor"><Envelope />  rajkumarbfcsofttech@gmail.com</small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">

              <button type="button" className="customButton"><Download /> Review Report</button>
            </div>
          </div>
        </div>
      </div>


      <SwitchFund show={openSwitchFund} setShow={setOpenSwitchFund} />
    </>
  );
};

export default PortfolioReview;
