import MyNavbar from "../components/Navbar"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import money from "../assets/img/icons/rupee 1.svg"
import recomended from "../assets/img/icons/Recommended Funds.svg"
import taxSaving from "../assets/img/icons/tax 1.svg"
import portfolio from "../assets/img/icons/portfolio review.svg"
import nfo from "../assets/img/icons/nfo.svg"
import transact from "../assets/img/icons/transcat.svg"
import { CurrencyRupee ,ArrowUpCircleFill,ArrowDownCircleFill,PlusCircle} from "react-bootstrap-icons";
import Star from "../assets/img/icons/star-1.svg"
import topRated from "../assets/img/icons/award 1.svg"
import taxSaver from "../assets/img/icons/tax.svg"
import equityFund from "../assets/img/icons/equity fund.svg"
import debrFund from "../assets/img/icons/debt.svg"
import retirment from "../assets/img/icons/rocking-chair (1) 1.svg"
import education from "../assets/img/icons/education 1.svg"
import house from "../assets/img/icons/home 1.svg"
import car from "../assets/img/icons/car 1.svg"
import vacation from "../assets/img/icons/vacation.svg"
import ring from "../assets/img/icons/engagement-ring 1.svg"
import plus from "../assets/img/icons/plus 1.svg"


const Dashboard = () => {
  return (
    <>
      <MyNavbar />
      <section>
        <div className="container-fluid">
          <div className="row mt-3 justify-content-md-center">
            <div className="col-lg-7 col-sm-12">
              <Card border="light" className="my-3">
                <Card.Body>
                  <div className="row border-bottom">
                    <div className="col d-flex">
                      <h6 className="fw-semibold">PORTFOLIO SUMMARY </h6> <span className="fs12px ms-2" > As on 14 Jan 2024</span>
                    </div>
                      <h3 className="fw-bold"><CurrencyRupee/>10,91,550</h3>
                  </div>
                  <div className="mt-2 textColor">1 Day change <span className="congratesColor"><ArrowUpCircleFill/><CurrencyRupee/>1,246 (02.5%)</span> <span className="errorColor2"><ArrowDownCircleFill/><CurrencyRupee/>1,246 (02.5%)</span></div>
                </Card.Body>
              </Card>
              <Card border="light">
                <Card.Body>
                  <div className="row ">
                  <h6 className="fw-semibold mb-4">Our Services</h6>
                    <div className="col text-center" ><img src={money} alt="" className="" height={24} /><small className="d-block adjustText">Emergengy Fund </small></div>
                    <div className="col text-center" ><img src={recomended} alt="" className="" height={24} /><small className="d-block  adjustText">Emergengy Fund</small></div>
                    <div className="col text-center" ><img src={taxSaving} alt="" className="" height={24} /><small className="d-block  adjustText">Emergengy Fund</small></div>
                    <div className="col text-center" ><img src={portfolio} alt="" className="" height={24} /><small className="d-block  adjustText">Emergengy Fund</small></div>
                    <div className="col text-center" ><img src={nfo} alt="" className="" height={24} /><small className="d-block  adjustText">Emergengy Fund</small></div>
                    <div className="col text-center" ><img src={transact} alt="" className="" height={24} /><small className="d-block  adjustText">Emergengy Fund</small></div>
                  
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-12">
              <Card border="light" className="my-3">
              <Card.Body>
                  <div className="row">
                  <h6 className="fw-semibold mb-4">Our Services</h6>
                    <div className="col-4 text-center" ><img src={money} alt="" className="" height={24} /><small className="d-block adjustText">Start with <CurrencyRupee/>100</small></div>
                    <div className="col-4 text-center" ><img src={Star} alt="" className="" height={24} /><small className="adjustText d-block">Best Return Funds</small></div>
                    <div className="col-4 text-center" ><img src={topRated} alt="" className="" height={24} /><small className="adjustText d-block">Top Rated Funds</small></div>
                    <div className="col-4 text-center" ><img src={taxSaver} alt="" className="" height={24} /><small className="adjustText d-block">Tax Saver</small></div>
                    <div className="col-4 text-center" ><img src={equityFund} alt="" className="" height={24} /><small className="adjustText d-block">Equity Funds</small></div>
                    <div className="col-4 text-center" ><img src={debrFund} alt="" className="" height={24} /><small className="adjustText d-block">Debt Funds</small></div>
                  
                  </div>
                </Card.Body>
              </Card>
            </div>
            

          </div>
          <div className="row mt-3 justify-content-md-center">
            <div className="col-lg-7 col-sm-12">

              <Card border="light">
                <Card.Body>
                  <div className="row">
                  <h6 className="fw-semibold mb-4">Goal Planing</h6>
                    <div className="col text-center" ><img src={retirment} alt="" className="" height={24} /><small className="d-block adjustText">Retirment </small><PlusCircle color="blue"/></div>
                    <div className="col text-center" ><img src={education} alt="" className="" height={24} /><small className="d-block adjustText">Education</small> <PlusCircle color="blue"/></div>
                    <div className="col text-center" ><img src={house} alt="" className="" height={24} /><small className="d-block adjustText">House</small> <PlusCircle color="blue"/></div>
                    <div className="col text-center" ><img src={car} alt="" className="" height={24} /><small className="d-block adjustText">Car</small> <PlusCircle color="blue"/></div>
                    <div className="col text-center" ><img src={vacation} alt="" className="" height={24} /><small className="d-block adjustText">Vacation</small> <PlusCircle color="blue"/></div>
                    <div className="col text-center" ><img src={ring} alt="" className="" height={24} /><small className="d-block adjustText">Marriage</small> <PlusCircle color="blue"/></div>
                  
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-12 negativeMargin">
              <Card border="light" className="my-3">
              <Card.Body>
                  <div className="row ">
                  <h6 className="fw-semibold mb-4">Quick Link</h6>
                    <div className="col-12 adjustText border-bottom pb-2 crPointer" >All Orders</div>
                    <div className="col-12 adjustText border-bottom pb-2 crPointer" >All Orders</div>
                    <div className="col-12 adjustText border-bottom pb-2 crPointer" >All Orders</div>
                    <div className="col-12 adjustText border-bottom pb-2 crPointer" >All Orders</div>
                   
                  
                  </div>
                </Card.Body>
              </Card>
            </div>
            

          </div>
        </div>
      </section>
    </>
  )
}
export default Dashboard