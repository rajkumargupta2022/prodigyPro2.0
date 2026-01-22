import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BankDetailForm = () => {
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
      <div className="container">
        <div className="personal_form_container">
          <h5 className="mb-3 mt-1">Bank Details</h5>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  ACCOUNT NUMBER
                </label>
                <input type="text" name="fullname" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  RE-ENTER ACCOUNT NUMBER
                </label>
                <input type="email" name="email" className="form-control" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <span className="mt-2 fs12px">
                  RESIDENT STATUS
                </span>
                <br />
                <div className="row">
            <div className=" col">
              <div className="">
                <button type="button" className="btn riskProfileBtn">Saving Account</button>
                <button type="button" className="btn riskProfileBtn mx-1">Current Account</button>
              </div>
            </div>
          </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  IFSC CODE
                </label>
                <input type="text" name="pob" className="form-control" />
              </div>
            </div>

            {/* Country & State */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  BANK
                </label>
                <input type="text" name="pob" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  BRANCH
                </label>
                <input type="text" name="pob" className="form-control" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onBack={() => {}} onSaveContinue={() => {navigate('/bank-details-varification')}} />
    </>
  );
};

export default BankDetailForm;
