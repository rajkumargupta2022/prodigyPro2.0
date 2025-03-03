import NavBar from "../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import icici from "../assets/img/bank-logo/icici.png"
import sbi from "../assets/img/bank-logo/sbi.png"
import { ArrowDownCircleFill, ArrowDownUp, ArrowUpCircleFill, ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { Card } from "react-bootstrap";

const Portfolio = () => {
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  const handleSchemeDetail = () => {
    setOpenSchemeDetail(true)
  }
  return (
    <>
      <NavBar />


      <div className="container py-2 mt-4">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="row text-center">
              <div className="col">
                <small className="fw-semibold">OVERALL PROFIT</small> <span className="fs12px ms-1" > As on 14 Jan 2024</span>
              </div>
              <h3 className="fw-bold congratesColor"><CurrencyRupee className="mb-1" />10,91,550 <small className="fs-6 congratesColor" >(10.44%)</small></h3>
              <div className="textColor">1 Day change <span className="congratesColor"><ArrowUpCircleFill /><CurrencyRupee className="mb-1" />1,246 (02.5%)</span> <span className="errorColor2"><ArrowDownCircleFill /><CurrencyRupee className="mb-1" />1,246 (02.5%)</span></div>
            </div>
            <hr />
            <div className="row  mt-1">
              <div className="col-6 text-end ">
                <small className="fs14px">Investment</small><br />
                <small className="fs16px"><CurrencyRupee className="mb-1" />1,24656.55 </small>
              </div>
              <div className="col-5 text-start ">
                <small className="fs14px">Current Value</small><br />
                <small className="fs16px"><CurrencyRupee className="mb-1" />1,2465.586 </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-2 personal_form_container">
        <div className="row ">
          <div className="col-6 text-start"><h6 >OVERALL PROFIT</h6> </div>
          <div className="col-6 text-end">              <button type="button" className="btn gainLossBtn ">Gain/Loss <ArrowDownUp/>
          {/* &#x25B2;
<br/>
<small>&#x25BC;</small> */}
</button></div>
        </div>
      </div>
      <div className="container py-2">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Folio:32352612</p>
                </div>
              </div>
           
            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Invested</small><br />
                <small> <CurrencyRupee className="mb-1" />124.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Current Value</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Gain/Loss</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small> <small className="fs12px congratesColor">22.63%</small>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="borderColor p-3 rounded-4 bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Folio:32352612</p>
                </div>
              </div>
           
            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Invested</small><br />
                <small> <CurrencyRupee className="mb-1" />124.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Current Value</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Gain/Loss</small><br />
                <small> <CurrencyRupee className="mb-1" />194.2K</small> <small className="fs12px congratesColor">22.63%</small>
              </div>
            </div>
          </div>



        </div>
      </div>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default Portfolio;
