import { ArrowLeft } from "react-bootstrap-icons";
import FolioDetails from "./folio-details-list";
import ElssInvestments from "./ElssInvestments";
import Dividends from "./Dividends";

import { useState } from "react";
function Statements({
  backButton,
  activeInactive,
}: {
  backButton: any;
  activeInactive: any;
}) {
  const [active, setActive] = useState("folio-details");

  const renderCompo = () => {
    switch (active) {
      case "folio-details":
        return <FolioDetails activeInactive={activeInactive} />;
      case "elss-investments":
        return <ElssInvestments />;
      case "dividends":
        return <Dividends />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Statements
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
            checked={active === "folio-details"}
            onChange={() => setActive("folio-details")}
          />
          <label
            className="fs12px btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option1"
          >
            Folio Details
          </label>
        </div>

        <div className="w-100 me-2">
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option2"
            autoComplete="off"
            onChange={() => setActive("elss-investments")}
          />
          <label
            className="fs12px btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option2"
          >
            ELSS Investments
          </label>
        </div>

        <div className="w-100 me-2">
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option3"
            autoComplete="off"
            onChange={() => setActive("dividends")}
          />
          <label
            className="fs12px btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option3"
          >
            Dividends
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
            className="fs12px btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option4"
          >
            Capital Gains
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
            className="fs12px btn btn-outline-primary declaration-button w-100 paddingLeftRight"
            htmlFor="option4"
          >
            Portfolio (via Email)
          </label>
        </div>
      </div>
      {renderCompo()}
    </main>
  );
}

export default Statements;
