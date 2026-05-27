import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useState } from "react";
import { amountHandler } from "../../services/utils/calculatorsFs";
import { fetchAdminUser } from "../../services/user/adminUser";
import { endPoints } from "../../services/utils/urls";
import { calculateManualInsightsRes } from "../data-interfaces/mf-savings";
import { postRequest } from "../../services/Api/HandleApi";

const ManualSurplusCalculator = () => {
  const navigate = useNavigate();

  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [monthlyInflows, setMonthlyInflows] = useState<number>(0);
  const [monthlyOutFlows, setMonthlyOutFlows] = useState<number>(0);

  const [errors, setErrors] = useState({
    currentBalance: "",
    monthlyInflows: "",
    monthlyOutFlows: "",
  });

  const validateFields = () => {
    const newErrors = {
      currentBalance: "",
      monthlyInflows: "",
      monthlyOutFlows: "",
    };

    let isValid = true;

    if (!currentBalance) {
      newErrors.currentBalance = "Please enter your current balance.";
      isValid = false;
    }

    if (!monthlyInflows) {
      newErrors.monthlyInflows = "Please enter your monthly inflows.";
      isValid = false;
    }

    if (!monthlyOutFlows) {
      newErrors.monthlyOutFlows = "Please enter your monthly outflows.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const calculateResult = async () => {
    if (!validateFields()) return;

    const adminUser = fetchAdminUser();

    const reqBody = {
      ucc: adminUser?.ucc,
      current_balance: currentBalance,
      monthly_inflows: monthlyInflows,
      monthly_outflows: monthlyOutFlows,
    };

    try {
      const res = await postRequest<calculateManualInsightsRes>(
        endPoints.calculateManualInsights,
        reqBody
      );

      if (res.success) {
        navigate("/mf-saving-dashboard");
      }
    } catch (err) {
      console.log(err);
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

      <div className="container px-4 mt-3">
        <div className="row">
          <div className="col-12 align-items-start mb-3">
            <h4>MF Savings Account</h4>
          </div>

          <div className="row justify-content-md-center">
            <div className="col-md-12 co-sm-12 col-lg-8">
              <div className="card border-0 shadow p-4">
                <div className="card-body">
                  <p className="fs18px my-0 fw-normal">
                    Estimate Your Investable Surplus
                  </p>

                  <p className="fs12px mt-0">
                    Enter your details to see how much more you could earn with
                    Savings+.
                  </p>

                  {/* CURRENT BALANCE */}
                  <label
                    htmlFor="currentBalance"
                    className="form-label fs12px mb-0"
                  >
                    CURRENT ACCOUNT BALANCE
                  </label>

                  <input
                    type="text"
                    id="currentBalance"
                    className={`form-control ${
                      errors.currentBalance ? "is-invalid" : ""
                    }`}
                    placeholder="₹6,00,000"
                    value={currentBalance || ""}
                    onChange={(e) => {
                      amountHandler(
                        e,
                        10000000,
                        setCurrentBalance
                      );

                      setErrors((prev) => ({
                        ...prev,
                        currentBalance: "",
                      }));
                    }}
                  />

                  {errors.currentBalance && (
                    <div className="invalid-feedback">
                      {errors.currentBalance}
                    </div>
                  )}

                  {/* MONTHLY INFLOWS */}
                  <label
                    htmlFor="monthlyInflows"
                    className="form-label fs12px mt-2 mb-0"
                  >
                    MONTHLY INFLOWS
                  </label>

                  <input
                    type="text"
                    id="monthlyInflows"
                    className={`form-control ${
                      errors.monthlyInflows ? "is-invalid" : ""
                    }`}
                    placeholder="₹80,000"
                    value={monthlyInflows || ""}
                    onChange={(e) => {
                      amountHandler(
                        e,
                        10000000,
                        setMonthlyInflows
                      );

                      setErrors((prev) => ({
                        ...prev,
                        monthlyInflows: "",
                      }));
                    }}
                  />

                  {errors.monthlyInflows && (
                    <div className="invalid-feedback">
                      {errors.monthlyInflows}
                    </div>
                  )}

                  {/* MONTHLY OUTFLOWS */}
                  <label
                    htmlFor="monthlyOutFlows"
                    className="form-label fs12px mt-2 mb-0"
                  >
                    MONTHLY OUTFLOWS
                  </label>

                  <input
                    type="text"
                    id="monthlyOutFlows"
                    className={`form-control ${
                      errors.monthlyOutFlows ? "is-invalid" : ""
                    }`}
                    placeholder="₹50,000"
                    value={monthlyOutFlows || ""}
                    onChange={(e) => {
                      amountHandler(
                        e,
                        10000000,
                        setMonthlyOutFlows
                      );

                      setErrors((prev) => ({
                        ...prev,
                        monthlyOutFlows: "",
                      }));
                    }}
                  />

                  {errors.monthlyOutFlows && (
                    <div className="invalid-feedback">
                      {errors.monthlyOutFlows}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-12 mt-4">
              <button
                className="customButton buttunCenter px-3"
                onClick={calculateResult}
              >
                Calculate My Surplus
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManualSurplusCalculator;