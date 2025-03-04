import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";


const PersonalDetails = () => {
  const navigate = useNavigate()
  return (
    <>
      <NavBar />

      {/* <div className="breadcum_area" style={{ backgroundColor: "#F2F4FB" }}>
        <div className="personal_form_container p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div> */}
      <div className="container  mt-2">
        <div className="personal_form_container">
          <h5 className="mb-4  ">Personal Details</h5>
          <form className="bg-white px-5 py-4 rounded-4 form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label  fs12px ">
                  FULL NAME
                </label>
                <input type="text" name="fullname" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  EMAIL ADDRESS
                </label>
                <input type="email" name="email" className="form-control" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  EMAIL RELATION
                </label>
                <select name="email_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="self">SELF</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  MOBILE NO
                </label>
                <input type="tel" name="phone" className="form-control" />
              </div>
            </div>

            {/* Country & State */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  MOBILE RELATION
                </label>
                <select name="mobile_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="selg">SELF</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">
                  DATE OF BIRTH
                </label>
                <input type="date" name="dob" className="form-control" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">
                  PLACE OF BIRTH
                </label>
                <input type="text" name="pob" className="form-control" />
              </div>

              <div className="col-md-6">
                <label className="form-label fs12px">
                  OCCUPATION
                </label>
                <select name="occupation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="example">example</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onBack={() => {}} onSaveContinue={() => {navigate("/declaration")}} />
    </>
  );
};

export default PersonalDetails;
