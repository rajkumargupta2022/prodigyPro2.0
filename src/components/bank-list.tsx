import HDFC from "../assets/img/icons/hdfc.svg";
import {useNavigate} from "react-router-dom"


function BankList({ activeInactive }: { activeInactive: any }) {
  
  const navigate = useNavigate()

  return (
    <>
      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => navigate("/bank-details-show")}
        
      >
        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-8 col-12 py-2">
            <div className="d-flex">
              <img className="align-self-start" src={HDFC} alt="Image not found" />
              <div className="ms-2" style={{ flex: 1 }}>
                <h6 style={{ margin: 0 }}>State Bank of India</h6>
                <span className="text-secondary">
                  Digital Autopay <span className="mx-2">|</span>
                  <span style={{ color: "#06A358" }}>Approved</span>
                </span>
                <br />
                <span className="text-secondary">Mandate ID: 123211</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
            <span className="info-badge align-self-start">Primary</span>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <div>
            <span className="text-secondary">ACCOUNT NUMBER</span>
            <br />
            <span className="value-font2">****1267</span>
          </div>

          <div>
            <span className="text-secondary">MAX LIMIT</span>
            <br />
            <span className="value-font2">₹25,000</span>
          </div>
          <div></div>
        </div>
      </div >

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("bank-details")}
      >
        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-8 col-12 py-2">
            <div className="d-flex">
              <img className="align-self-start" src={HDFC} alt="Image not found" />
              <div className="ms-2" style={{ flex: 1 }}>
                <h6 style={{ margin: 0 }}>State Bank of India</h6>
                <span className="text-secondary">
                  Digital Autopay <span className="mx-2">|</span>
                  <span style={{ color: "#06A358" }}>Approved</span>
                </span>
                <br />
                <span className="text-secondary">Mandate ID: 123211</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">

          </div>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <div>
            <span className="text-secondary">ACCOUNT NUMBER</span>
            <br />
            <span className="value-font2">****1267</span>
          </div>

          <div>
            <span className="text-secondary">MAX LIMIT</span>
            <br />
            <span className="value-font2">₹25,000</span>
          </div>
          <div></div>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("order-timeline")}
      >
        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-8 col-12 py-2">
            <div className="d-flex">
              <img className="align-self-start" src={HDFC} alt="Image not found" />
              <div className="ms-2" style={{ flex: 1 }}>
                <h6 style={{ margin: 0 }}>State Bank of India</h6>
                <span className="text-secondary">
                  Digital Autopay <span className="mx-2">|</span>
                  <span style={{ color: "#06A358" }}>Approved</span>
                </span>
                <br />
                <span className="text-secondary">Mandate ID: 123211</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">

          </div>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <div>
            <span className="text-secondary">ACCOUNT NUMBER</span>
            <br />
            <span className="value-font2">****1267</span>
          </div>

          <div>
            <span className="text-secondary">MAX LIMIT</span>
            <br />
            <span className="value-font2">₹25,000</span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default BankList;
