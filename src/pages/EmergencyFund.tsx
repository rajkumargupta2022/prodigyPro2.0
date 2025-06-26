import NavBar from "../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import icici from "../assets/img/bank-logo/icici.png"
import { ChevronRight } from "react-bootstrap-icons";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import Footer from "../components/Footer";

const EmergencyFund = () => {
  const [openSchemeDetail,setOpenSchemeDetail] = useState<boolean>(false)
  const handleSchemeDetail = ()=>{
    setOpenSchemeDetail(true)
  }
  return (
    <>
      <NavBar />

      <div className="breadcum_area">
        <div className="personal_form_container pt-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <ChevronRight className="fs14px" />
            <Breadcrumb.Item href="#">
              Library
            </Breadcrumb.Item>
            <ChevronRight className="fs14px" />
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="row">
            <div className=" col">
              <h4>Emergency Fund</h4>
              <p className="small">Park your surplus money in liquid funds for flexibility, safety, and better returns than traditional savings accounts. Ideal for short-term goals and emergency funds!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-2">
        <div className="personal_form_container">
          <p className="mb-2 ">Recommended Schemes</p>
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
                <img src={icici} height={30} width={30} alt="" />
                <small className="mx-2">ICICI Prudential bluechip Funds</small>
              </div>
              <div className="col-1 adjustText  pb-2 crPointer  text-end">
                <ChevronRight />
              </div>
            </div>
          </div>
          <div className="logoBlueColor ">+ Add New Fund</div><br/>
          <button type="button"  className="customButton px-2" onClick={handleSchemeDetail}>Continue</button>
        </div>
      </div>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail}/>
        <Footer />
    </>
  );
};

export default EmergencyFund;
