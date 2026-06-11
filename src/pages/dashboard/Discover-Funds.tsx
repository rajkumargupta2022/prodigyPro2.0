

import Card from 'react-bootstrap/Card';
import { Link} from "react-router-dom"
import { ChevronRight, CurrencyRupee} from "react-bootstrap-icons";
import money from "../../assets/img/icons/rupee 1.svg"
import Star from "../../assets/img/icons/star-1.svg"
import hybrid from "../../assets/img/icons/award 1.svg"
import taxSaver from "../../assets/img/icons/tax.svg";
import gold from "../../assets/img/icons/debt.svg";
import TopPerformer from "../../assets/img/icons/equity fund.svg";
// import equityFund from "../../assets/img/dashboard/equity-fund.png"
// import debrFund from "../../assets/img/dashboard/debt-fund.png"
import { useNavigate } from "react-router";


const DiscoverFUnds = ()=>{
    const navigate = useNavigate()
  const content = [
    "Maximize your savings with the right tax-saving mutual funds",
    "Discover top-performing equity funds across various categories",
    "Explore a wide spectrum of debt funds tailored for stability and income",
    "Discover mutual funds across all categories using the all mutual funds screener",
    "Achieve the right blend of risk and returns with hybrid funds"
  ]

  const goToFundPage = (name:string,assetCode:number[]=[],classCode:number[]=[],msg:string)=>{
    navigate("/all-mutual-funds",{state:{name,assetCode,classCode,msg}})
  }
  
 
  return(
        <div className="col-lg-3 col-sm-12">
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row crPointer">
                    <h6 className="fw-semibold mb-4">Discover Funds</h6>
                    <div className="col-4 text-center" onClick={()=>navigate("/fund-with-100")}><img src={money} alt="" className="" height={24} /><small className="d-block adjustText">Start with <CurrencyRupee className="mb-1" />100</small></div>
                    <div className="col-4 text-center" onClick={()=>navigate("/sif-funds")}><img src={Star} alt="" className="" height={24} /><small className="adjustText d-block">SIF</small></div>
                    <div className="col-4 text-center"  onClick={()=>goToFundPage("Tax Saver Funds",[1],[8],content[0])}><img src={taxSaver} alt="" className="" height={24} /><small className="adjustText d-block">Tax Saver Funds</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Hybrid Funds",[2],[],content[4])}><img src={hybrid} alt="" className="" height={24} /><small className="adjustText d-block">Hybrid Funds</small></div>
                    <div className="col-4 text-center" onClick={()=>navigate("/top-performers")}><img src={TopPerformer} alt="" className="" height={24} /><small className="adjustText d-block">Top Performer Funds</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Gold & Silver Funds",[4],[53,85],"")}><img src={gold} alt="" className="" height={24} /><small className="adjustText d-block">Gold & Silver Funds</small></div>

                  </div>
                </Card.Body>
              </Card>
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row px-2">
                    <h6 className="fw-semibold mb-4">Quick Link</h6>
                    <Link to="/all-orders" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >All Orders</Link>
                    <Link to="/all-orders" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/linked-bank-account" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >Linked Bank Accounts</Link>
                    <Link to="/bank-accounts" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/statements" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >Statements</Link>
                    <Link to="/statements" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    {/* <Link to="/calculator-list" className="col-9 adjustText  pb-2 text-dark borderColor" >Financial Calculators</Link>
                    <Link to="/calculator-list" className="col-3 adjustText  pb-2 text-dark  text-end" ><ChevronRight /></Link> */}


                  </div>
                </Card.Body>
              </Card>
            </div>
  )
}
export default DiscoverFUnds