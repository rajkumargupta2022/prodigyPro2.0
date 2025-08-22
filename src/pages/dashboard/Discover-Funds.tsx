

import Card from 'react-bootstrap/Card';
import { Link} from "react-router-dom"
import { ChevronRight} from "react-bootstrap-icons";


const DiscoverFUnds = ()=>{
  // const navigate = useNavigate()
  // const goToFundPage = (name:string)=>{
  //   navigate("/all-mutual-funds",{state:name})
  // }
 
  return(
        <div className="col-lg-3 col-sm-12">
              {/* <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row crPointer">
                    <h6 className="fw-semibold mb-4">Discover Funds</h6>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Start with ₹100")}><img src={money} alt="" className="" height={24} /><small className="d-block adjustText">Start with <CurrencyRupee className="mb-1" />100</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Best Return Funds")}><img src={Star} alt="" className="" height={24} /><small className="adjustText d-block">Best Return Funds</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Top Rated Funds")}><img src={topRated} alt="" className="" height={24} /><small className="adjustText d-block">Top Rated Funds</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Tax Saver")}><img src={taxSaver} alt="" className="" height={24} /><small className="adjustText d-block">Tax Saver</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Equity Funds")}><img src={equityFund} alt="" className="" height={24} /><small className="adjustText d-block">Equity Funds</small></div>
                    <div className="col-4 text-center" onClick={()=>goToFundPage("Debt Funds")}><img src={debrFund} alt="" className="" height={24} /><small className="adjustText d-block">Debt Funds</small></div>

                  </div>
                </Card.Body>
              </Card> */}
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row px-2">
                    <h6 className="fw-semibold mb-4">Quick Link</h6>
                    {/* <Link to="/all-orders" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >All Orders</Link>
                    <Link to="/all-orders" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/linked-bank-account" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >Linked Bank Accounts</Link>
                    <Link to="/bank-accounts" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/statements" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >Statements</Link>
                    <Link to="/statements" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link> */}
                    <Link to="/calculator-list" className="col-9 adjustText  pb-2 text-dark borderColor" >Financial Calculators</Link>
                    <Link to="/calculator-list" className="col-3 adjustText  pb-2 text-dark  text-end" ><ChevronRight /></Link>


                  </div>
                </Card.Body>
              </Card>
            </div>
  )
}
export default DiscoverFUnds