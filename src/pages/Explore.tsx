import NavBar from "../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import icici from "../assets/img/bank-logo/icici.png"
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <>
      <NavBar />

      <div className="breadcum_area" style={{ backgroundColor: "#F2F4FB" }}>
        <div className="personal_form_container p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
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
          <Link className="logoBlueColor text-decoration-none mt-4" to="#">+ Add New Fund</Link><br/>
          <button type="button"  className="customButton mt-2 px-2">Continue</button>
        </div>
      </div>
    </>
  );
};

export default Explore;
