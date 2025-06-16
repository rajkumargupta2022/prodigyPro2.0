import { ArrowLeft } from "react-bootstrap-icons";
import { useState } from "react";
import SBI from "../assets/img/icons/sbi.png";
import CreateMandate from "./create-mandate";

function BankDetails({ backButton }: { backButton: any }) {
  const [show, setShow] = useState(false);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <CreateMandate setShow={setShow} show={show} />
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Bank Details
      </h2>
      <hr className="fw-light text-secondary" />

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <div className="d-flex justify-content-between">
          <img className="align-self-start" src={SBI} alt="Image not found" />
          <div className="ms-2" style={{ flex: 1 }}>
            <h6 style={{ margin: 0 }}>State Bank of India</h6>
            <span style={{ color: "#06A358" }}>Verified</span>
          </div>
        </div>

        <div className="row justify-content-between mt-2">

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">ACCOUNT NUMBER</span>
            <br />
            <span className="value-font2">24566522141267</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">IFSC CODE</span>
            <br />
            <span className="value-font2">SBIN000121</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">BRANCH NAME</span>
            <br />
            <span className="value-font2">Bhukum pune </span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">ACCOUNT TYPE</span>
            <br />
            <span className="value-font2">Saving</span>
          </div>

          <div></div>
        </div>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <h6 style={{ margin: 0 }}>Existing Mandate</h6>

        <div className="row justify-content-between mt-2">
          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">URMN NO</span>
            <br />
            <span className="value-font2">24566522141267</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">AMOUNT</span>
            <br />
            <span className="value-font2">25,000</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">FROM</span>
            <br />
            <span className="value-font2">10 Jan 2023</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">To</span>
            <br />
            <span className="value-font2">31 Dec 2099</span>
          </div>

          <div></div>
        </div>
      </div>

      <button className="mandate-button  mt-2" onClick={() => setShow(true)}>
        Create e-Mandate
      </button>
    </main>
  );
}

export default BankDetails;
