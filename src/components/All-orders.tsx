import { ArrowLeft } from "react-bootstrap-icons";
import Orders from "./orders";
import SIP from "./Sip";
import { useState } from "react";
import STP from "./STP";
import SWP from "./SWP";

function AllOrders({
  backButton,
  activeInactive,
}: {
  backButton: any;
  activeInactive: any;
}) {
  const [active, setActive] = useState("buy/sell");

  const renderCompo = () => {
    switch (active) {
      case "buy/sell":
        return <Orders activeInactive={activeInactive} />;
      case "sip":
        return <SIP activeInactive={activeInactive} />;
      case "stp":
        return <STP activeInactive={activeInactive} />;
      case "swp":
        return <SWP activeInactive={activeInactive} />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} /> My
        All Orders
      </h2>
      <hr className="fw-light text-secondary" />
      <div className="d-flex justify-content-around mb-4">
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
            className="btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option1"
          >
            Buy/Sell
          </label>
        </div>

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
            className="btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option2"
          >
            SIP
          </label>
        </div>

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
            className="btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option3"
          >
            STP
          </label>
        </div>
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
            className="btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option4"
          >
            SWP
          </label>
        </div>
      </div>
      {renderCompo()}
    </main>
  );
}

export default AllOrders;
