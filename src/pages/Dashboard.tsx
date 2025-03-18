import MyNavbar from "../components/Navbar"
import Card from 'react-bootstrap/Card';
import money from "../assets/img/icons/rupee 1.svg"
import recomended from "../assets/img/icons/Recommended Funds.svg"
import taxSaving from "../assets/img/icons/tax 1.svg"
import portfolio from "../assets/img/icons/portfolio review.svg"
import nfo from "../assets/img/icons/nfo.svg"
import transact from "../assets/img/icons/transcat.svg"
import { CurrencyRupee , ArrowUpCircleFill, ArrowDownCircleFill, PlusCircle, ChevronRight, ChevronDown } from "react-bootstrap-icons";
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
import icici from "../assets/img/bank-logo/icici.png"
import sbi from "../assets/img/bank-logo/sbi.png"
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [openPortfolioSwitch, setOpenPortfolioSwitch] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event: any) => {
    setOpenPortfolioSwitch(!openPortfolioSwitch);
    setTarget(event.target);
  };
  return (
    <>
      <MyNavbar />
      <section>
        <div className="container-fluid">
          <div className="row mt-3 justify-content-md-center">
            <div className="col-lg-7 col-sm-12">
              <Card border="light" className="my-3 kycWarningColor">
                <Card.Body>
                  <div className="row">
                    <div className="col d-flex">
                      <h6 className="fw-semibold">Your KYC is under review </h6>
                    </div>
                    <p className="fs14px" >Please contact customer service if you have any <br /> concerns or questions during the review process.</p>
                  </div>
                  <button type="button" className="btn contactSupportButton">Contact Support</button>
                </Card.Body>
              </Card>
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row border-bottom">
                    <div className="col d-flex">
                      <h6 className="fw-semibold">PORTFOLIO SUMMARY </h6> <span className="fs12px ms-2" > As on 14 Jan 2024</span>
                    </div>
                    <h3 className="fw-bold"><CurrencyRupee className="mb-1" />10,91,550 <small className="fs-6" onClick={handleClick}><ChevronDown /></small></h3>
                  </div>
                  <div className="mt-2 textColor">1 Day change <span className="congratesColor"><ArrowUpCircleFill /><CurrencyRupee className="mb-1" />1,246 (02.5%)</span> <span className="errorColor2"><ArrowDownCircleFill /><CurrencyRupee className="mb-1" />1,246 (02.5%)</span></div>
                </Card.Body>
              </Card>
              <Card border="light mb-3 cardRadius">
                <Card.Body>
                  <div className="row ">
                    <h6 className="fw-semibold mb-4">Our Services</h6>
                    <Link className="col text-center"  to="/emergency-funds"><img src={money} alt="" className="" height={24} /><small className="d-block adjustText ">Emergengy Fund </small></Link>
                    <Link to="/recommended-funds" className="col text-center " ><img src={recomended} alt="" className="" height={24} /><small className="d-block  adjustText">Recommended Funds</small></Link>
                    <Link to="/tax-saving"  className="col text-center " ><img src={taxSaving} alt="" className="" height={24} /><small className="d-block  adjustText">Tax Saving</small></Link>
                    <Link to="/portfolio-review" className="col text-center" ><img src={portfolio} alt="" className="" height={24} /><small className="d-block  adjustText">Portfolio Review</small></Link>
                    <Link to="/nfo-live" className="col text-center" ><img src={nfo} alt="" className="" height={24} /><small className="d-block  adjustText">NFO Live</small></Link>
                    <Link to="/emergency-funds" className="col text-center" ><img src={transact} alt="" className="" height={24} /><small className="d-block  adjustText">All Orders</small></Link>

                  </div>
                </Card.Body>
              </Card>
              <Card border="light mb-3 cardRadius">
                <Card.Body>
                  <div className="row">
                  <div className="col-sm-12 col-lg-7 d-flex justify-content-between w-100 mb-3">
                      <div className="fw-semibold">Goal Planning</div>
                      <Link to="/goal-planning" className="text-end logoBlueColor crPointer">View all</Link>
                    </div>
                    <div className="col text-center" ><img src={retirment} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Retirment </small><PlusCircle color="blue" /></div>
                    <div className="col text-center" ><img src={education} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Education</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center" ><img src={house} alt="" className="" height={24} /><small className="d-block adjustTextGrey">House</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center" ><img src={car} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Car</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center" ><img src={vacation} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Vacation</small> <PlusCircle color="blue" /></div>
                    <div className="col text-center" ><img src={ring} alt="" className="" height={24} /><small className="d-block adjustTextGrey">Marriage</small> <PlusCircle color="blue" /></div>

                  </div>
                </Card.Body>
              </Card>
              <Card border="light" className="mb-3 cardRadius">
                <Card.Body>
                  <div className="row">
                    <div className="col-sm-12 col-lg-7 d-flex justify-content-between w-100">
                      <div className="fw-semibold">Popular Funds</div>
                      <div className="text-end logoBlueColor crPointer">View all</div>
                    </div>
                    <div className="col-12 mt-2">
                      <button type="button" className="btn btn-light popularButton">Large Cap</button>
                      <button type="button" className="btn btn-light popularButton">Multi Cap</button>
                      <button type="button" className="btn btn-light popularButton">Mid Cap</button>
                      <button type="button" className="btn btn-light popularButton">Flexi Cap</button>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1 pb-1">
                          <img src={icici} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">ICICI Prudential bluechip Funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>
                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1">
                          <img src={sbi} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">SBI Large Cap funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>
                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1">
                          <img src={icici} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">ICICI Prudential bluechip Funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>
                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1">
                          <img src={sbi} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">SBI Large Cap funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>

                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1">
                          <img src={icici} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">ICICI Prudential bluechip Funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>
                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1">
                          <img src={sbi} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">SBI Large Cap funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>
                      <div className="row border-bottom borderColor py-2">
                        <div className="col-1">
                          <img src={icici} height={50} width={50} alt="" />
                        </div>
                        <div className="col-10">
                          <small className="">ICICI Prudential bluechip Funds <br />  <small className="congratesColor">25.08%</small> 3Y Returns <small> Min. SIP <CurrencyRupee className="mb-1" /></small>100</small>
                        </div>
                      </div>

                    </div>
                  </div>

                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-12">
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row">
                    <h6 className="fw-semibold mb-4">Discover Funds</h6>
                    <div className="col-4 text-center" ><img src={money} alt="" className="" height={24} /><small className="d-block adjustText">Start with <CurrencyRupee className="mb-1" />100</small></div>
                    <div className="col-4 text-center" ><img src={Star} alt="" className="" height={24} /><small className="adjustText d-block">Best Return Funds</small></div>
                    <div className="col-4 text-center" ><img src={topRated} alt="" className="" height={24} /><small className="adjustText d-block">Top Rated Funds</small></div>
                    <div className="col-4 text-center" ><img src={taxSaver} alt="" className="" height={24} /><small className="adjustText d-block">Tax Saver</small></div>
                    <div className="col-4 text-center" ><img src={equityFund} alt="" className="" height={24} /><small className="adjustText d-block">Equity Funds</small></div>
                    <div className="col-4 text-center" ><img src={debrFund} alt="" className="" height={24} /><small className="adjustText d-block">Debt Funds</small></div>

                  </div>
                </Card.Body>
              </Card>
              <Card border="light" className="my-3 cardRadius">
                <Card.Body>
                  <div className="row px-2">
                    <h6 className="fw-semibold mb-4">Quick Link</h6>
                    <Link to="/all-orders" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >All Orders</Link>
                    <Link to="/all-orders" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/bank-accounts" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >Linked Bank Accounts</Link>
                    <Link to="/bank-accounts" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/statements" className="col-9 adjustText border-bottom pb-2 text-dark borderColor" >Statements</Link>
                    <Link to="/statements" className="col-3 adjustText  pb-2 text-dark border-bottom text-end" ><ChevronRight /></Link>
                    <Link to="/calculator-list" className="col-9 adjustText  pb-2 text-dark borderColor" >Financial Calculators</Link>
                    <Link to="/calculator-list" className="col-3 adjustText  pb-2 text-dark  text-end" ><ChevronRight /></Link>


                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <div ref={ref}>


        <Overlay
          show={openPortfolioSwitch}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Body>
              <div className="row">
                <div className="col-2">
                  <div className="round">
                    <input type="checkbox" className="roundCheckbox" checked id="checkbox" />
                    <label htmlFor="checkbox"></label>

                  </div>
                </div>
                <div className="col-6"></div>
                <div className="col-4"></div>
              </div>

            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  )
}
export default Dashboard