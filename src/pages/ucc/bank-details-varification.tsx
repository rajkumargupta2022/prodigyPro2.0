import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Button } from "react-bootstrap";
import { Upload } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const BankDetailsVarification = () => {
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
              <div className="col-md-8">
                <h4 className="font-weight-bold">Verification Incomplete</h4>
                <p className="py-2">
                  We need additional information to confirm that this bank
                  account belongs to you.
                </p>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row mb-3">
              <div className="col-md-6">
                <span className="mt-2 fw-light text-secondary">
                  BANK ACCOUNT PROOF
                </span>
                <br />
                <input
                  type="file"
                  // ref={fileInputRef1}
                  style={{ display: "none" }}
                  // onChange={handleFileChange}
                />
                <Button
                  variant="primary"
                  style={{
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    width: "100%",
                  }}
                  //   onClick={() => handleButtonClick(fileInputRef1)}
                >
                  <Upload className="me-2" /> Upload Cancelled Cheque
                </Button>

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

                <input
                  type="file"
                  //   ref={fileInputRef2}
                  style={{ display: "none" }}
                  //   onChange={handleFileChange}
                />
                <Button
                  variant="primary"
                  style={{
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    width: "100%",
                  }}
                  //   onClick={() => handleButtonClick(fileInputRef2)}
                >
                  <Upload className="me-2" /> Bank Statement
                </Button>
              </div>
            </div>

            {/* Country & State */}
            <div className="row mb-3">
              <div>
                <h5 className="font-weight-bold">Important Guidelines:</h5>
                <ul>
                  <li className="fw-light  text-secondary">
                    The uploaded document must match the name registered on your
                    mutual fund account.
                  </li>
                  <li className="fw-light  text-secondary">
                    Ensure the document is clear,legible, and in PDF,JPEG, or
                    PNG format.
                  </li>
                  <li className="fw-light  text-secondary">
                    Maximum file size 5MB.
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar  onSaveContinue={() => {navigate("/nomination-details")}} />
    </>
  );
};

export default BankDetailsVarification;
