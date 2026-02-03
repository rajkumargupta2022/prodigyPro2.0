import {  useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useState } from "react";
import { amountHandler } from "../../services/utils/calculatorsFs";
import { errorToast } from "../../services/utils/toast";
import { fetchAdminUser } from "../../services/user/adminUser";
import { endPoints } from "../../services/utils/urls";
import {  calculateManualInsightsRes } from "../data-interfaces/mf-savings";
import { postRequest } from "../../services/Api/HandleApi";

const ManualSurplusCalculator = () => {

  const navigate = useNavigate()
  const [currentBalance, setCurrentBalance]  = useState<number>(100000)
  const [monthlyInflows, setMonthlyInflows]  = useState<number>(120000)
  const [monthlyOutFlows, setMonthlyOutFlows]  = useState<number>(50000)
  const error= ""

  const calculateResult = async () => {
    if(!currentBalance){
      errorToast("Please enter current balance")
      return
    }
      if(!monthlyInflows){
      errorToast("Please enter current monthly inflows")
      return
    }
      if(!monthlyOutFlows){
      errorToast("Please enter current monthly outflows")
      return
    }
    const adminUser = fetchAdminUser()
  const reqBody = {
      ucc: adminUser?.ucc,
      current_balance: currentBalance,
      monthly_inflows: monthlyInflows,
      monthly_outflows: monthlyOutFlows,
    }
    try {
      const res = await postRequest<calculateManualInsightsRes>(endPoints.calculateManualInsights,reqBody)
      if (res.success) {
        navigate("/mf-saving-dashboard")
      }
    } catch (err) {
      errorToast(err);
    }




  };







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
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹5,00,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={currentBalance} onChange={(e)=>amountHandler(e,10000000,setCurrentBalance)} />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px mt-2 mb-0">MONTHLY INFLOWS </label>
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹2,00,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={monthlyInflows} onChange={(e)=>amountHandler(e,10000000,setMonthlyInflows)} />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <label htmlFor="exampleInputEmail1" className="form-label fs12px mt-2 mb-0">MONTHLY OUTFLOWS</label>
                  <input type="text" className={`form-control ${error ? "is-invalid" : ""}`} placeholder="₹4,50,000" id="exampleInputEmail1" aria-describedby="emailHelp" value={monthlyOutFlows} onChange={(e)=>amountHandler(e,10000000,setMonthlyOutFlows)} />
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
