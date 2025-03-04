import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BankDetails = () => {
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
      <div className="container pt-5">
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">Bank Details</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  ACCOUNT NUMBER
                </label>
                <input type="text" name="fullname" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  RE-ENTER ACCOUNT NUMBER
                </label>
                <input type="email" name="email" className="form-control" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <span className="mt-2 fw-light text-secondary">
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
                <label
                  className="btn btn-outline-primary declaration-button"
                  htmlFor="option11"
                >
                  Saving Account
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="a2"
                  id="option11"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-primary declaration-button"
                  htmlFor="option11"
                >
                  Current Account
                </label>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  IFSC CODE
                </label>
                <input type="text" name="pob" className="form-control" />
              </div>
            </div>

            {/* Country & State */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  BANK
                </label>
                <input type="text" name="pob" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
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

export default BankDetails;
