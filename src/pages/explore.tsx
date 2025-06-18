import "bootstrap/dist/css/bootstrap.min.css";
import Rupee from "../assets/img/icons/rupee 1.svg";
import Star from "../assets/img/icons/star-1.svg";
import Award from "../assets/img/icons/award 1.svg";
import Tax from "../assets/img/icons/tax.svg";
import EquityFund from "../assets/img/icons/equity fund.svg";
import DebtFund from "../assets/img/icons/debt.svg";
import Ici from "../assets/img/icons/ici.svg";
import SBI from "../assets/img/icons/sbi.png";
import { CurrencyRupee, Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";



const Explore = () => {
  const navigate = useNavigate()
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
          <h4 className="mb-4 fw-bold fs16px">Discover Funds</h4>
          <div className="grid-exploreprodgy justify-content-between">

            <div className="py-2 text-center">
              <img src={Rupee} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Start with ₹100</h6>
            </div>
            <div className="py-2 text-center">
              <img src={Star} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Best Return Funds</h6>
            </div>
            <div className="py-2 text-center">
              <img src={Award} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Top Rated Funds</h6>
            </div>
            <div className="py-2 text-center">
              <img src={Tax} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Tax Saver</h6>
            </div>
            <div className="py-2 text-center">
              <img src={EquityFund} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Equity Funds</h6>
            </div>
            <div className="py-2 text-center">
              <img src={DebtFund} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Debt Funds</h6>
            </div>
            <div className="py-2 text-center" onClick={()=>{navigate("/all-mutual-funds")}}>
              <img src={DebtFund} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Explore All</h6>
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
              <button type="button" className="btn btn-light popularButton text-primary rounded-3 align-self-start">
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
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="pb-1">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="">
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
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={SBI} height={50} width={50} alt="" />
                </div>
                <div className="">
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
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="">
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
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={SBI} height={50} width={50} alt="" />
                </div>
                <div className="">
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

              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="">
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
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={SBI} height={50} width={50} alt="" />
                </div>
                <div className="">
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
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={Ici} height={50} width={50} alt="" />
                </div>
                <div className="">
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
