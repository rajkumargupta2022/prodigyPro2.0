import LoginLeftImage from "../components/LoginLeftImage";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const KycStatusCheck = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <LoginLeftImage />
        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            <Link
              className="back_absolute_btn text-decoration-none"
              style={{ color: "#1a34fe" }}
              to="/"
            >
              <ArrowLeft /> Back
            </Link>
            <h4 className="font-weight-bold">Are you Investment Ready?</h4>
            <p className="py-2">Know it within the seconds</p>
            <form className="pt-3">
              <div className="mb-4">
                <label className="form-label fontFamily fw-light pb-1">
                  MINOR INVESTOR NAME
                </label>

                <input
                  type="text"
                  className="form-control mx-1 rounded"
                  aria-label="Text input with dropdown button"
                  placeholder="Ravi krishna"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fontFamily fw-light pb-1">
                  GUARDIAN'S PAN
                </label>

                <input
                  type="text"
                  className="form-control mx-1 rounded"
                  aria-label="Text input with dropdown button"
                  placeholder="DFPOL7895W"
                />
              </div>

              <div>
                <button className="btn btn-primary w-100">Proceed</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KycStatusCheck;
