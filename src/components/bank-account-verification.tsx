import { ArrowLeft, Upload } from "react-bootstrap-icons";
import CreateMandate from "./create-mandate";
import { useState } from "react";


function AddAccountVerification({ backButton }: { backButton: any }) {
   const [show, setShow] = useState(false);


  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
       <CreateMandate setShow={setShow} show={show} />
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Add Bank Account
      </h2>
      <hr className="fw-light text-secondary" />
      <h2 className="sub-heading">Verification Incomplete</h2>
      <span className="note">
        We need additional information to confirm that this bank account belongs
        to you
      </span>

      <div className="row mb-3 mt-4">
        <div className="col-md-6">
          <span className="xs-heading">BANK ACCOUNT PROOF</span>
          <br />
          <input type="file" style={{ display: "none" }} />
          <button className="upload-button">
            <Upload className="me-2" /> Upload Cancelled Cheque
          </button>

          <div
            className="d-flex justify-content-center align-items-center my-3"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #D0DBEA",
              fontWeight: "bold",
              margin: "0 auto",
              color: "#6778fe",
            }}
          >
            OR
          </div>

          <input type="file" style={{ display: "none" }} />
          <button className="upload-button">
            <Upload className="me-2" /> Bank Statement
          </button>
        </div>
      </div>

      <div>
        <p className="mini-heading">Important Guidlines :</p>
        <ul>
          <li className="note">
            The uploaded document must match the name registered on your mutual
            fund account.
          </li>
          <li className="note">
            Ensure the document is clear, legible, and in PDF, JPEG, or PNG
            format.
          </li>
          <li className="note">Maximum file size: 5 MB.</li>
        </ul>
      </div>

      <button className="mandate-button mt-4" onClick={()=>setShow(true)}>Submit</button>
    </main>
  );
}

export default AddAccountVerification;
