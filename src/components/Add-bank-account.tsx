import { ArrowLeft, Search, ChevronRight } from "react-bootstrap-icons";
import SBI from "../assets/img/icons/sbi.png";
import HDFC from "../assets/img/icons/hdfc.svg";
import ICI from "../assets/img/icons/ici.svg";
import Arun from "../assets/img/icons/arun.svg";

function AddBankAccount({ backButton }: { backButton: any }) {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Add Bank Account
      </h2>
      <hr className="fw-light text-secondary" />

      <div className="position-relative">
        <Search
          className="position-absolute text-secondary"
          size={25}
          style={{ top: "10px", left: "25px" }}
        />
        <input
          type="text"
          className="form-control rounded-4 p-3 ps-5 search_input"
          placeholder="Search by bank name"
          style={{ height: "44px" }}
        />
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        <div className="row">
          <div className="col-md-2 text-center">
            <img src={SBI} alt="image not found" />
            <div>
              <span className="bank-name">State Bank Of India</span>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <img src={HDFC} alt="image not found" />
            <div>
              <span className="bank-name">HDFC</span>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <img src={ICI} alt="image not found" />
            <div>
              <span className="bank-name">ICICI</span>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <img src={HDFC} alt="image not found" />
            <div>
              <span className="bank-name">HDFC</span>
            </div>
          </div>
          <div className="col-md-2 text-center">
            <img src={ICI} alt="image not found" />
            <div>
              <span className="bank-name">ICICI</span>
            </div>
          </div>
          <div className="col-md-2 text-center">
            <img src={HDFC} alt="image not found" />
            <div>
              <span className="bank-name">HDFC</span>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-2 text-center">
            <img src={SBI} alt="image not found" />
            <div>
              <span className="bank-name">State Bank Of India</span>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <img src={HDFC} alt="image not found" />
            <div>
              <span className="bank-name">HDFC</span>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <img src={ICI} alt="image not found" />
            <div>
              <span className="bank-name">ICICI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-sm bg-white border-0 rounded-4 mb-2">
        <h6 className="heading">Other Banks</h6>

        <div className="d-flex justify-content-between mt-2 bottom-border">
          <div className="ms-4">
            <img src={Arun} className="me-2" />
            <span>Arunachal Pradesh Rural Bank</span>
          </div>

          <ChevronRight
            className="me-4"
            size={25}
            style={{ color: "#999999" }}
          />
        </div>

        <div className="d-flex justify-content-between mt-2 bottom-border">
          <div className="ms-4">
            <img src={Arun} className="me-2" />
            <span>Arunachal Pradesh Rural Bank</span>
          </div>

          <ChevronRight
            className="me-4"
            size={25}
            style={{ color: "#999999" }}
          />
        </div>

        <div className="d-flex justify-content-between mt-2 bottom-border">
          <div className="ms-4">
            <img src={Arun} className="me-2" />
            <span>Arunachal Pradesh Rural Bank</span>
          </div>

          <ChevronRight
            className="me-4"
            size={25}
            style={{ color: "#999999" }}
          />
        </div>

        <div className="d-flex justify-content-between mt-2 bottom-border">
          <div className="ms-4">
            <img src={Arun} className="me-2" />
            <span>Arunachal Pradesh Rural Bank</span>
          </div>

          <ChevronRight
            className="me-4"
            size={25}
            style={{ color: "#999999" }}
          />
        </div>

        <div className="d-flex justify-content-between mt-2 bottom-border">
          <div className="ms-4">
            <img src={Arun} className="me-2" />
            <span>Arunachal Pradesh Rural Bank</span>
          </div>

          <ChevronRight
            className="me-4"
            size={25}
            style={{ color: "#999999" }}
          />
        </div>

        <div className="d-flex justify-content-between mt-2 bottom-border">
          <div className="ms-4">
            <img src={Arun} className="me-2" />
            <span>Arunachal Pradesh Rural Bank</span>
          </div>

          <ChevronRight
            className="me-4"
            size={25}
            style={{ color: "#999999" }}
          />
        </div>
      </div>
    </main>
  );
}

export default AddBankAccount;
