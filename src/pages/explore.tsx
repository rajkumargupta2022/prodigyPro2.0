import "bootstrap/dist/css/bootstrap.min.css";
import Rupee from "../assets/img/icons/rupee 1.svg";
import Star from "../assets/img/icons/star-1.svg";
import Award from "../assets/img/icons/award 1.svg";
import Tax from "../assets/img/icons/tax.svg";
import EquityFund from "../assets/img/icons/equity fund.svg";
import DebtFund from "../assets/img/icons/debt.svg";
import NipponImage from "../assets/img/icons/AMC Logo.svg";
import Ici from "../assets/img/icons/ici.svg";
import SBI from "../assets/img/icons/sbi.png";
import HDFC from "../assets/img/icons/hdfc.svg";
import DSP from "../assets/img/icons/dsp.svg";
import { CurrencyRupee, Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";

const funds = [
  {
    name: "Nippon India Large Cap Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: NipponImage,
  },
  {
    name: "ICICI Prudential Bluechip Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: Ici,
  },
  {
    name: "SBI Large Cap Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: SBI,
  },
  {
    name: "HDFC Large Cap Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: HDFC,
  },
  {
    name: "DSP Top 100 Equity Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: DSP,
  },
];

const Explore = () => {
  return (
    <>
      <MyNavbar />
      <div className="container mt-4">
        <div className="input-group mb-3">
          <span className="input-group-text ">
            <Search />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for mutual funds to invest..."
          />
        </div>
        <div
          className="card p-3 mb-3"
          style={{ border: "none", borderRadius: "16px" }}
        >
          <h4 className="mb-4 fw-bold">Discover Funds</h4>
          <div className="d-flex justify-content-between">
            <div className="text-center">
              <img src={Rupee} alt="" width={28} height={28} />
              <h6>Start with ₹100</h6>
            </div>
            <div className="text-center">
              <img src={Star} alt="" width={28} height={28} />
              <h6>Best Return Funds</h6>
            </div>
            <div className="text-center">
              <img src={Award} alt="" width={28} height={28} />
              <h6>Top Rated Funds</h6>
            </div>
            <div className="text-center">
              <img src={Tax} alt="" width={28} height={28} />
              <h6>Tax Saver</h6>
            </div>
            <div className="text-center">
              <img src={EquityFund} alt="" width={28} height={28} />
              <h6>Equity Funds</h6>
            </div>
            <div className="text-center">
              <img src={DebtFund} alt="" width={28} height={28} />
              <h6>Debt Funds</h6>
            </div>
            <div className="text-center">
              <img src={DebtFund} alt="" width={28} height={28} />
              <h6>Explore All</h6>
            </div>
          </div>
        </div>

        <div
          className="card p-3"
          style={{ border: "none", borderRadius: "16px" }}
        >
          <div className="row">
            <div className="col-sm-12 col-lg-7 d-flex justify-content-between w-100">
              <div className="fw-semibold">Popular Funds</div>
            </div>
            <div className="col-12 mt-2">
              <button type="button" className="btn btn-light popularButton">
                Large Cap
              </button>
              <button type="button" className="btn btn-light popularButton">
                Multi Cap
              </button>
              <button type="button" className="btn btn-light popularButton">
                Mid Cap
              </button>
              <button type="button" className="btn btn-light popularButton">
                Flexi Cap
              </button>
            </div>
            <div className="col-12 mt-2">
              <div className="row border-bottom borderColor py-2">
                <div className="col-1 pb-1">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="row border-bottom borderColor py-2">
                <div className="col-1">
                  <img src={SBI} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    SBI Large Cap funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="row border-bottom borderColor py-2">
                <div className="col-1">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="row border-bottom borderColor py-2">
                <div className="col-1">
                  <img src={SBI} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    SBI Large Cap funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>

              <div className="row border-bottom borderColor py-2">
                <div className="col-1">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="row border-bottom borderColor py-2">
                <div className="col-1">
                  <img src={SBI} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    SBI Large Cap funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="row border-bottom borderColor py-2">
                <div className="col-1">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="col-10">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
