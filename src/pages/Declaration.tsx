import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";


const Declaration = () => {
  const navigate = useNavigate()
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
      <div className="container ">
        <div className="personal_form_container ">
          <h5 className="mb-4">Declarations</h5>
          <form className="bg-white px-5 py-4 rounded-4 form_shadow">
            {/* First Name & Last Name */}
            <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">INCOME RANGE</small><br/>
                <button type="button" className="btn riskProfileBtn">Below 1 Lakh</button>
                <button type="button" className="btn riskProfileBtn mx-1">1-5 Lakh</button>
                <button type="button" className="btn riskProfileBtn mx-1">5-10 Lakh</button>
                <button type="button" className="btn riskProfileBtn mx-1">10-25 Lakh</button>
                <button type="button" className="btn riskProfileBtn mx-1">25 Lakh  - 1 Crore</button>
                <button type="button" className="btn riskProfileBtn mx-1">Above 1 Crore</button>
              </div>
          </div>

            <div className="row mb-3">
              <div className="col-md-6 mt-2">
                <span className="mt-2 fs14px">
                  RESIDENT STATUS
                </span>
                <br />
                <input
                  type="radio"
                  className="btn-check"
                  name="a2"
                  id="option11"
                  autoComplete="off"
                />
              <div className=" col">
                <button type="button" className="btn riskProfileBtn">Indian</button>
             
            </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="option1"
                  name="option6"
                  style={{ borderRadius: "2.25em" }}
                />
                <label className="form-check-label mx-1" htmlFor="option1">
                  I hereby declare that i'm not a politically person.
                </label>
              </div>

              {/* Checkbox 2 */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="option2"
                  name="option5"
                  style={{ borderRadius: "2.25em" }}
                />
                <label className="form-check-label mx-1" htmlFor="option2">
                  I'm not the Tax Payer of any other country other than india.
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onBack={() => {}} onSaveContinue={() => {navigate('/address-details')}} />
    </>
  );
};

export default Declaration;
