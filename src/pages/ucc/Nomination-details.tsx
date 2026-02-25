import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import TrackBar from "./Track-bar";

const NominationDetails = () => {
  const navigate = useNavigate()
  return (
    <>
      <NavBar />
      <TrackBar/>
      <div className="container pt-5">
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">Nomination Details</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  NAME
                </label>
                <input type="text" name="fullname" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  DATE OF BIRTH
                </label>
                <input type="date" name="dob" className="form-control" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  RELATIONSHIP
                </label>
                <select name="email_relation" className="form-select">
                  <option value="">Choose...</option>
                  <option value="self">SELF</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  ALLOCATION PERCENTAGE
                </label>
                <input type="tel" name="phone" className="form-control" />
              </div>
            </div>

            {/* Country & State */}

            <div className="row  mb-3" onClick={()=>{navigate('/nomination-list')}}>
              <div className="col-md-6">
                <button type="button" className="btn btn-primary"> Add Nominee</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar  onSaveContinue={() => {navigate('/proof-identity')}} />
    </>
  );
};

export default NominationDetails;
