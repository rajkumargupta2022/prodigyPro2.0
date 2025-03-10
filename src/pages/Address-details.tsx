import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const AddressDetails = () => {
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
          <h3 className="mb-3 text-dark fw-bolder">Address Details</h3>
          <form className="bg-white px-5 py-4 rounded-4 form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  PINCODE
                </label>
                <input type="text" name="fullname" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  ADDRESS
                </label>
                <input type="text" name="address" className="form-control" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  LANDMARK
                </label>
                <input type="text" name="landmark" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  STATE
                </label>
                <select name="mobile_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="self">MAHARASTRA</option>
                </select>
              </div>
            </div>

            {/* Country & State */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  CITY
                </label>
                <select name="mobile_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="self">PUNE</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  COUNTRY
                </label>
                <select name="mobile_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="self">INDIA</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onBack={() => {}} onSaveContinue={() => {navigate('/bank-details')}} />
    </>
  );
};

export default AddressDetails;
