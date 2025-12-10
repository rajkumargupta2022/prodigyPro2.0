import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import RangeBar from "../calculator/RangeBar";
import { useState } from "react";
import { FV, pmtvalue } from "../../services/utils/calculatorsFs";

const ManualSurplusCalculator = () => {

  const [currentAccountBalance, setCurrentAccountBalance] = useState<Number>(500000)
  const [monthlyInflows, setMonthlyInflows] = useState<Number>(200000)
  const [monthlyOutFlows, setMonthlyOutFlows] = useState<Number>(4500000)
  const navigate = useNavigate()


  const [amount, setAmount] = useState("2500000")
  const [error, setError] = useState("")

  const calculateResult = async () => {
    navigate("/manual-surplus-result")
    if (amount.trim() === "") {
      setError("Plaese enter amount..."); // 🔹 show error below input
      return;
    }

  };


  const handleAmount = (e: any) => {
    if (!isNaN(Number(e.target.value))) {
      setAmount(e.target.value)
    }
  }






  return (
    <>
      <NavBar />
      <style>
        {`
        #exampleInputEmail1::placeholder {
          color: lightgrey;
          font-size: 14px;
          font-style: italic;
        }
      `}
      </style>

      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>MF Savings Account</h4>
          </div>

          <div className="row justify-content-md-center ">
            <div className="col-md-12 co-sm-12 col-lg-8 ">
              <div className="card border-0 shadow p-4">
                <div className="card-body">
                  <p className=" fs18px my-0 fw-normal">Estimate Your Investable Surplus</p>
                  <p className="fs12px mt-0"> Enter your details to see how much more you could earn with Savings+.</p>
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px mb-0">CURRENT ACCOUNT BALANCE</label>
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹5,00,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={amount} onChange={handleAmount} />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px mt-2 mb-0">MONTHLY INFLOWS </label>
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹2,00,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={amount} onChange={handleAmount} />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px mt-2 mb-0">MONTHLY OUTFLOWS</label>
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹4,50,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={amount} onChange={handleAmount} />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              <button className='customButton buttunCenter px-3' onClick={calculateResult}>Calculate My Surplus</button>
            </div>

          </div>
        </div>
      </div>


    </>
  );
};

export default ManualSurplusCalculator;
