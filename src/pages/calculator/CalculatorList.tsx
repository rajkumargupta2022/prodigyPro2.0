import NavBar from "../../components/Navbar";
import retirment from "../../assets/img/icons/rocking-chair (1) 1.svg"
import education from "../../assets/img/icons/education 1.svg"
import swpIcon from "../../assets/img/icons/swp cal.svg"
import elssIcon from "../../assets/img/icons/ELSS calculator.svg"
import wealth from "../../assets/img/icons/wealth creation.svg"
import ring from "../../assets/img/icons/engagement-ring 1.svg"
import SipIcon from "../../assets/img/icons/SIP calculator.svg"
import fdIcon from "../../assets/img/icons/wealth cal 1.svg"
import emiIcon from "../../assets/img/icons/EMI calculator 1.svg"
import targetAmount from "../../assets/img/calculator/target-amount-sip.svg"
import annualSip from "../../assets/img/calculator/annual-sip.svg"
import delayInvestment from "../../assets/img/calculator/cost-delay.svg"  
import sipWithAnnual from "../../assets/img/calculator/sip-with-anual.svg"
import { Link } from "react-router-dom";

const CalculatorList = () => {


  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row crPointer">
          <div className="col-12 align-items-start mb-3">
            <h4>Financial Calculators</h4>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/sip-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={SipIcon} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">SIP Calculator</p>
                <p className="fs14px mb-0">Know returns from SIP or plan a future goal</p>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 mb-3">
            <Link to="/marriage-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={ring} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Marriage Planning</p>
                <p className="fs14px mb-0">Plan your dream wedding expenses or set a savings goal</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/education-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={education} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Education Planning</p>
                <p className="fs14px mb-0">Estimate future education costs and start saving wisely</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/future-value-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={wealth} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Future Value Calculator</p>
                <p className="fs14px mb-0">See how your investments can grow over time</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/retirment-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={retirment} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Retirement Calculator</p>
                <p className="fs14px mb-0">Plan your retirement corpus and secure your future</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/emi-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={emiIcon} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">EMI Calculator</p>
                <p className="fs14px mb-21px">Calculate your monthly EMI amount</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/fd-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={fdIcon} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">FD Calculator</p>
                <p className="fs14px mb-0">Calculate FD Interest Rates & Return Online</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/elss-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={elssIcon} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">ELSS Calculator</p>
                <p className="fs14px mb-0">Know your tax savings and potential returns with ELSS</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/swp-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={swpIcon} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">SWP Calculator</p>
                <p className="fs14px mb-0">Plan your regular withdrawals for a steady income</p>
              </div>
            </Link>
          </div>
         
         <div className="col-lg-3 mb-3">
            <Link to="/target-amount-sip-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={targetAmount} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Target Amount SIP</p>
                <p className="fs14px mb-0">Find the monthly SIP needed to reach your financial goal.</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/sip-with-annual-increase-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={sipWithAnnual} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">SIP with Annual Increase</p>
                <p className="fs14px mb-0">See how yearly SIP step-ups accelerate your wealth creation.</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/annual-sip-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={annualSip} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Annual SIP Calculator</p>
                <p className="fs14px mb-0">Calculate your investment growth with yearly SIP contributions.</p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 mb-3">
            <Link to="/cost-of-delay-in-sip-calculator" className="card border-0 shadow rounded-3" >
              <div className="card-body border-0 card px-3">
                <img src={delayInvestment} className="" alt="..." height={44} width={44} />
                <p className="fs18pxHeading mb-0 mt-2">Cost of Investment Delay</p>
                <p className="fs14px mb-0">Understand how postponing your investment affects your long-term wealth.</p>
              </div>
            </Link>
          </div>

        </div>
      </div>


    </>
  );
};

export default CalculatorList;
