import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const PersonalDetails = () => {
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
          <h3 className="mb-4 text-dark">Personal Details</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">FULL NAME</label>
                <input type="text" name="fullname" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">EMAIL ADDRESS</label>
                <input type="email" name="email" className="form-control" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">EMAIL RELATION</label>
                <select name="email_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="self">SELF</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">MOBILE NO</label>
                <input type="tel" name="phone" className="form-control" />
              </div>
            </div>

            {/* Country & State */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">MOBILE RELATION</label>
                <select name="mobile_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="selg">SELF</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">DATE OF BIRTH</label>
                <input type="date" name="dob" className="form-control" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">PLACE OF BIRTH</label>
                <input type="text" name="pob" className="form-control" />
              </div>

              <div className="col-md-6">
                <label className="form-label">OCCUPATION</label>
                <select name="occupation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="example">example</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onBack={() => {}} onSaveContinue={() => {}} />
    </>
  );
};

export default PersonalDetails;
