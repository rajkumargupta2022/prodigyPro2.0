import { ArrowLeft } from "react-bootstrap-icons";
import Orders from "./orders";
import SIP from "./Sip";
import { useState } from "react";
import STP from "./STP";
import SWP from "./SWP";

function AllOrders() {
  const [active, setActive] = useState("buy/sell");

  const renderCompo = () => {
    switch (active) {
      case "buy/sell":
        return <Orders />;
      case "sip":
        return <SIP />;
      case "stp":
        return <STP />;
      case "swp":
        return <SWP />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} /> My All Orders
      </h2>
      <hr className="fw-light text-secondary" />
      <div className="row justify-content-around mb-4">
        <div className="col-lg-3 col-md-6 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
              checked={active === "buy/sell"}
              onChange={() => setActive("buy/sell")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 paddingLeftRight py-1"
              htmlFor="option1"
            >
              Buy/Sell
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option2"
              autoComplete="off"
              onChange={() => setActive("sip")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 paddingLeftRight py-1"
              htmlFor="option2"
            >
              SIP
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option3"
              autoComplete="off"
              onChange={() => setActive("stp")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 paddingLeftRight py-1"
              htmlFor="option3"
            >
              STP
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 py-lg-0 py-2">
          <div className="w-100 me-2">
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option4"
              autoComplete="off"
              onChange={() => setActive("swp")}
            />
            <label
              className="btn btn-outline-primary declaration-button w-100 paddingLeftRight py-1"
              htmlFor="option4"
            >
              SWP
            </label>
          </div>
        </div>
      </div>
      {renderCompo()}
    </main>
  );
}

export default AllOrders;
