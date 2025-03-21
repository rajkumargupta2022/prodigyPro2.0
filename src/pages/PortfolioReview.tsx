import NavBar from "../components/Navbar";
import sbi from "../assets/img/bank-logo/sbi.png"
import {  ChevronRight, CurrencyRupee, Download, Envelope, Telephone } from "react-bootstrap-icons";
import { useState } from "react";
import SwitchFund from "../components/SwitchFund";

const PortfolioReview = () => {
  const [openSwitchFund, setOpenSwitchFund] = useState<boolean>(false)

  const handleSwitchFund = () => {
    setOpenSwitchFund(true)
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
                <h5>Switch (2 funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px"> Consider reviewing or replacing these funds, as they are underperforming.</p>
                </div>
                <hr className="text-warning border-2" />
                <div className="col-11 d-flex align-items-start">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col-1">
                  <ChevronRight className="text-secondary" />
                </div>
                <div className="col-12 d-flex align-items-start my-2">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund}><button type="button" className="btn transactBtn">Switch All</button></div>
              </div>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Satisfactory Performance (3 funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px"> Keep these funds in your portfolio to benefit from their strong performance.</p>
                </div>
                <hr className="text-success border-2" />
                <div className="col-11 d-flex align-items-start">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col-1">
                  <ChevronRight className="text-secondary" />
                </div>
                <div className="col-12 d-flex align-items-start my-2">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund} ><button type="button" className="btn transactBtn">Invest More</button></div>
              </div>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Redemption (2 funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px"> Exit these fund and reallocate to better-performing options.</p>
                </div>
                <hr className="text-danger border-2" />
                <div className="col-11 d-flex align-items-start">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col-1">
                  <ChevronRight className="text-secondary" />
                </div>
                <div className="col-12 d-flex align-items-start my-2">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund}><button type="button" className="btn transactBtn">Redeem All</button></div>
              </div>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h5>Under Watch (2 funds)</h5>
                <div className="col-12">
                  <p className="m-0 fs14px">Monitor these funds closely for any potential changes.</p>
                </div>
                <hr className="text-secondary border-2" />
                <div className="col-11 d-flex align-items-start">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div>
                <div className="col-1">
                  <ChevronRight className="text-secondary" />
                </div>
                <div className="col-12 d-flex align-items-start my-2">
                  <img src={sbi} alt="" />
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</small>
                    <small className="fs12px">Folio: 2599564198</small>
                  </div>
                </div> 
                <div className="col text-start fs12px mt-2" onClick={handleSwitchFund}><button type="button" className="btn transactBtn">Under Watch</button></div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="row  bg-white rounded-2 p-3 mt-4">
              <h5>For detailed analysis of your portfolio please reach out to our expert.</h5>
              <div className="col-12 d-flex align-items-start">
                  <img src={sbi} alt="" height={50} width={50}/>
                  <div className="d-flex flex-column ps-3">
                    <small className="mb-0">R K Gupta</small>
                    <small className="fs14px">Currenty managing  <CurrencyRupee/>1.88Cr Aum</small>
                    <small className="fs16px logoBlueColor"><Telephone/> +91 9956419878</small>
                    <small className="fs16px logoBlueColor"><Envelope/>  rajkumarbfcsofttech@gmail.com</small>
                  </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">

            <button type="button"   className="customButton"><Download/> Review Report</button>
            </div>
          </div>
        </div>
      </div>


      <SwitchFund show={openSwitchFund} setShow={setOpenSwitchFund} />
    </>
  );
};

export default PortfolioReview;
