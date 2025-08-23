import "bootstrap/dist/css/bootstrap.min.css";
import Tax from "../assets/img/icons/tax.svg";
import EquityFund from "../assets/img/icons/equity fund.svg";
import DebtFund from "../assets/img/icons/debt.svg";
import Ici from "../assets/img/icons/ici.svg";
import SBI from "../assets/img/icons/sbi.png";
import { CurrencyRupee, Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PopularFunds from "./dashboard/Popular-funds";



const Explore = () => {
  const navigate = useNavigate()

  const goToFundPage = (name:string)=>{
    navigate("/all-mutual-funds",{state:name})
  }
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
          <div className="grid-exploreprodgy justify-content-between crPointer">

            {/* <div className="py-2 text-center">
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
            </div>*/}
            <div className="py-2 text-center" onClick={()=>goToFundPage("Tax Saver")}>
              <img src={Tax} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Tax Saver</h6>
            </div> 
            <div className="py-2 text-center" onClick={()=>goToFundPage("Equity Funds")}>
              <img src={EquityFund} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Equity Funds</h6>
            </div>
            <div className="py-2 text-center" onClick={()=>goToFundPage("Debt Funds")}>
              <img src={DebtFund} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack">Debt Funds</h6>
            </div>
            <div className="py-2 text-center crPointer" onClick={()=>{navigate("/all-mutual-funds")}}>
              <img src={DebtFund} alt="" width={28} height={28} />
              <h6 className="fs14pxBlack ">Explore All</h6>
            </div>

          </div>
        </div>

      <PopularFunds/>
      </div>

      <Footer />
    </>
  );
};

export default Explore;
