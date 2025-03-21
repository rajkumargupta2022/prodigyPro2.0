import NavBar from "../components/Navbar";
import sbi from "../assets/img/bank-logo/sbi.png"
import { Calendar4, ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useState } from "react";
import { Card } from "react-bootstrap";
import BankMandate from "../components/BankMandate";

const NFOApply = () => {
  const [openBankMandate, setOpenBankMandate] = useState<boolean>(false)

  const handleBankMandate = () => {
    setOpenBankMandate(true)
  }

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor">Home  <ChevronRight className="fs12px" /> NFO Live <ChevronRight className="fs12px" /><small className="greyColor"> Kotak Nifty Small Cap 250 Index Fund - Regular (G) </small> </h6>
          </div>
          <div className="col-12 d-flex align-items-start">
            <img src={sbi} alt="" />
            <div className="d-flex flex-column ps-3">
              <h4 className="mb-0">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</h4>
              <small className="fs12px">Equity: Small Cap</small>
            </div>
          </div>
          <div className="col-8">
            <div className="col-12 bg-white rounded-2 p-2 px-2 mt-4">
              <small className="fs14px">Nav</small><br />
              <small><CurrencyRupee className="" />100</small>
            </div>
            <div className="col-12 bg-white rounded-2 p-2 px-2 my-3">
              <div className="row px-3 my-3">
                <h6>Fund Detail</h6>
                <div className="col-6">
                  <p className="m-0 fs12px"> LAUNCHED</p>
                  <small className="fs14px text-dark">20 jan 2025</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> END DATE</p>
                  <small className="fs14px text-dark">22 Jan 2025</small>
                </div>
              </div>

              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> ALLOTMENT DATE</p>
                  <small className="fs14px text-dark">25 Jan 2025</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> MIN. INVESTMENT</p>
                  <small className="fs14px text-dark"><CurrencyRupee className="" />100</small>
                </div>
              </div>
              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> PLAN TYPE</p>
                  <small className="fs14px text-dark">Regular</small>
                </div>
                <div className="col-6">
                  <p className="m-0 fs12px"> PLAN OPTION</p>
                  <small className="fs14px text-dark">GROTH</small>
                </div>
              </div>
              <div className="row px-3 my-3">
                <div className="col-6">
                  <p className="m-0 fs12px"> Withdrawal Charges</p>
                  <small className="fs14px text-dark">0%</small>
                </div>

              </div>

            </div>
          </div>
          <div className="col-4 bg-white rounded-2 p-2 px-2 mt-4">
            <div className="row px-3 my-3">
              <h6>INVEST NOW</h6>
              <hr />
              <div className="col-6">
                <button className="activeBtn"> Monthly SIP</button>
              </div>
              <div className="col-6">
                <button className="deActiveBtn"> One-Time</button>
              </div>
              <div className="col-11 mt-4">
                <small className="fs12px">DAY OF SIP</small><br />
                <small className="fs14px text-dark">17th of every month</small>
              </div>
              <div className="col-1 mt-5 px-2">
                <small className="crPointer dateIcon"><Calendar4 className='' /></small>
              </div>

              <hr />
              <div className="col-12 form-group">
                <label htmlFor="exampleInputEmail1" className="fs12px">INVESTMENT AMOUNT</label>
                <input type="email" className="form-control" placeholder="1000" />
              </div>
              <div className=" mt-2">
                <button type="button" className="btn shortcutValue">Min.</button>
                <button type="button" className="btn shortcutValue mx-1"><CurrencyRupee className='mb-1' />1,000</button>
                <button type="button" className="btn shortcutValue mx-1"><CurrencyRupee className='mb-1' />2,000</button>
                <button type="button" className="btn shortcutValue mx-1"><CurrencyRupee className='mb-1' />5,000</button>
              </div>

            </div>
            <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>NAV applicable once amount credited to AMC’s bank account</Card.Header>
              <button className="customButton buttunCenter my-2 px-3"  onClick={handleBankMandate}>Continue</button>
          </div>
        </div>
      </div>


      <BankMandate show={openBankMandate} setShow={setOpenBankMandate} />
    </>
  );
};

export default NFOApply;
