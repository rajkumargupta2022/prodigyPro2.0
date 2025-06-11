import { ArrowLeft } from "react-bootstrap-icons";
import OTPField from "../components/OtpField";
import { useState } from "react";

function AddFamilyMember({ backButton }: { backButton: any }) {
  const [show, setShow] = useState(false);
  const [accountState, setAccountState] = useState("link");

  return (
    <>
      <OTPField show={show} setShow={setShow} />
      <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
        <h4>
          <ArrowLeft className="crPointer" size={25} onClick={backButton} /> Add
          Family Member
        </h4>
        <hr className="fw-light text-secondary" />
        <div className="p-4 shadow-sm bg-white border-0 rounded-4">
          <div className="d-flex">
            <button type="button" className={`btn statementBtn ${accountState=="link"&&"statementBtnActive"} mx-1`} onClick={() => setAccountState("link")}>Link Account</button>
           

             <button type="button" className={`btn statementBtn ${accountState==""&&"statementBtnActive"} mx-1`} onClick={() => setAccountState("")}>Create Account</button>
          </div>

          {accountState == "link" ? (
            <div className="mt-4">
              <div className="form-group">
                <label className="fs12px" htmlFor="relationship">
                  RELATIONSHIP
                </label>
                <select className="form-control" id="relationship">
                  <option>Select...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="fs12px" htmlFor="pan-number">
                  PAN NUMBER
                </label>
                <input
                  id="pan-number"
                  className="form-control "
                  type="text"
                  placeholder="HAGVF6781G"
                />
              </div>

              <button
                type="button"
                className="customButton align-items-end px-3 mb-3 mt-3"
                onClick={() => setShow(true)}
              >
                Verify Account
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="form-group">
                <label
                  className="text-secondary"
                  htmlFor="exampleFormControlSelect1"
                >
                  TAX STATUS
                </label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Select...</option>
                  <option>On Behalf of Minor</option>
                </select>
              </div>

              <div className="form-group mt-2">
                <label
                  className="text-secondary"
                  htmlFor="exampleFormControlSelect1"
                >
                  HOLDING NATURE
                </label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Select...</option>
                  <option>On Behalf of Minor</option>
                </select>
              </div>

              <button
                type="button"
                className="customButton align-items-end px-2 mb-3 mt-3"
                onClick={() => setShow(true)}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
        {!accountState && (
          <div className="mt-2">
            <h6>Note:</h6>
            <p className="fs14px">Please be ready with these documents before creation of
              Minor's profile to mention the bank account details and upload the
              bank and birth proof-
            </p>
            <p className="fs14px">
              1. Bank Account should be in the name of Minor it can either be
              Jointly or under the guardianship of the same person as you have
              selected in profile.
            </p>
            <p className="fs14px">2. Guardian name must be there in the birthproof.</p>
          </div>
        )}
      </main>
    </>
  );
}

export default AddFamilyMember;
