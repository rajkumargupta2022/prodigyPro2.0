import NavBar from "../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import icici from "../assets/img/bank-logo/icici.png"
import sbi from "../assets/img/bank-logo/sbi.png"
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";

const RecommendedFunds = () => {
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  const handleSchemeDetail = () => {
    setOpenSchemeDetail(true)
  }
  return (
    <>
      <NavBar />


      <div className="container pt-2">

        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor">Home <small className="greyColor"> <ChevronRight className="fs14px" /> Recommended Funds </small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Recommended Funds</h4>
              <p className="fs14px">Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!</p>
            </div>
          </div>
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Risk Profile</small>
              <div className="">
                <button type="button" className="btn riskProfileBtn">Conservative</button>
                <button type="button" className="btn riskProfileBtn mx-1">Moderate</button>
                <button type="button" className="btn riskProfileBtn mx-1">Aggressive</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Investment horizon</small>
              <div className="">
                <button type="button" className="btn riskProfileBtn">Upto 1 Yr</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 3 Yrs</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 5Yrs</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 8 Yrs</button>
                <button type="button" className="btn riskProfileBtn mx-1">Upto 10 Yrs</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="container pt-2">
        <div className="personal_form_container">
          <small className="mb-2 fs14px lightBlack">Recommended Schemes</small>
          <div className="bg-white px-4 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={icici} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4  my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={sbi} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4 my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={icici} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4 my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={sbi} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4 my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={icici} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4 my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={sbi} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4 my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={icici} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="bg-white px-4 my-2 rounded form_shadow">
            <div className="row borderColor py-2">
              <div className="round col-11">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"></label>
                <img src={sbi} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="logoBlueColor  crPointer">+ Add New Fund</div><br />
          <button type="button" className="customButton px-2" onClick={handleSchemeDetail}>Continue</button>
        </div>
      </div>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default RecommendedFunds;
