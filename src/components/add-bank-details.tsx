import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


function AddBankDetails({
  backButton,
  activeInactive,
}: {
  backButton: any;
  activeInactive: any;
}) {

  const navigate = useNavigate();

  
    return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Add Bank Account Details
      </h2>
      <hr className="fw-light text-secondary" />
      <h2 className="sub-heading">HDFC Bank Details</h2>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        <div>
          <label className="form-label">ACCOUNT NUMBER</label>
          <input
            type="text"
            className="form-control"
            placeholder="1235457454554"
          />
        </div>
        <div>
          <label className="form-label">RE-ENTER ACCOUNT NUMBER</label>
          <input
            type="text"
            className="form-control"
            placeholder="1235457454554"
          />
        </div>
        <div>
          <label className="form-label">ACCOUNT TYPE</label>
          <div className="d-flex mb-4">

            <div className="me-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
                checked
              />
              <label
                className="btn btn_colorfull btn-outline-primary declaration-button w-100 paddingLeftRight py-1 px-lg-5 px-md-2 px-2"
                htmlFor="option1"
              >
                Saving Account
              </label>
            </div>

            <div className="me-2">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button w-100 paddingLeftRight py-1 px-lg-5 px-md-2 px-2"
                htmlFor="option2"
              >
                Current Account
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="form-label">IFSC CODE</label>
          <input
            type="text"
            className="form-control"
            placeholder="SBI0000123"
          />
        </div>
        <div>
          <label className="form-label">BANK</label>
          <input
            type="text"
            className="form-control"
            placeholder="State Bank Of India"
          />
        </div>

        <div>
          <label className="form-label">BRANCH</label>
          <input
            type="text"
            className="form-control"
            placeholder="Connaught Place, New Delhi"
          />
        </div>
      </div>

      <button
        className="mandate-button mt-2"
        onClick={() => navigate("/add-verification-details")}
      >
        Create e-Mandate
      </button>
    </main>
  );
}

export default AddBankDetails;
