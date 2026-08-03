import { ArrowLeft } from "react-bootstrap-icons";
import OneTime from "../pages/orders/OneTimeOrders";
import MonthlySIP from "../pages/orders/MonthlySIP";
import { useEffect, useState } from "react";
import RedemptionOrders from "../pages/orders/RedumptionOrders";
import SWPOrders from "../pages/orders/SWPOrders";
import { keys } from "../services/utils/keys";
import { useNavigate } from "react-router-dom";
import SwitchOrders from "../pages/orders/Switch-orders";
import StpOrders from "../pages/orders/StpOrders";

function AllOrders() {
  const navigate = useNavigate()
  const [active, setActive] = useState("");

    useEffect(() => {
    const savedTab = localStorage.getItem("activeOrderTab");
    if (savedTab) {
      setActive(savedTab);
    }else{
      setActive("Sip");
    }
  }, [active]);

  
  const renderCompo = () => {
    console.log("active", active);
    switch (active) {
      case "Sip":
        localStorage.setItem("activeOrderTab", active);
        return <MonthlySIP />;
        case "One-time":
          localStorage.setItem("activeOrderTab", active);
          return <OneTime />;
      case "Redemption":
        localStorage.setItem("activeOrderTab", active);
        return <RedemptionOrders />;
      case "swp":
        localStorage.setItem("activeOrderTab", active);
        return <SWPOrders />;
        case "Switch":
        localStorage.setItem("activeOrderTab", active);
        return <SwitchOrders />;
         case "stp":
        localStorage.setItem("activeOrderTab", active);
        return <StpOrders />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={15} onClick={()=>navigate(-1)}/> My All Orders
      </h4>
      <hr className="fw-light text-secondary" />
      <div className="row justify-content-around mb-4">
          <div className="col-lg-2 col-md-4 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option2"
              autoComplete="off"
              checked={active === "Sip"}
              onChange={() => setActive("Sip")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 py-1"
              htmlFor="option2"
            >
             SIP
            </label>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
              checked={active === "One-time"}
              onChange={() => setActive("One-time")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 py-1"
              htmlFor="option1"
            >
              One-time
            </label>
          </div>
        </div>
      
        <div className="col-lg-2 col-md-4 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option3"
              autoComplete="off"
              checked={active === "Redemption"}
              onChange={() => setActive("Redemption")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 py-1"
              htmlFor="option3"
            >
              Redemption
            </label>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option4"
              autoComplete="off"
              checked={active === keys.Switch}
              onChange={() => setActive(keys.Switch)}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 py-1"
              htmlFor="option4"
            >
              Switch
            </label>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option5"
              autoComplete="off"
              checked={active === keys.swp}
              onChange={() => setActive(keys.swp)}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 py-1"
              htmlFor="option5"
            >
              SWP
            </label>
          </div>
        </div>
        
        <div className="col-lg-2 col-md-4 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option6"
              autoComplete="off"
              checked={active === keys.stp}
              onChange={() => setActive(keys.stp)}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 py-1"
              htmlFor="option6"
            >
              STP
            </label>
          </div>
        </div>
      </div>
      {renderCompo()}
    </main>
  );
}

export default AllOrders;
