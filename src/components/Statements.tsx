import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import FolioDetailsList from "./folio-details-list";
import MySipStpSwp from "./Elss-statements";
import Dividends from "./Dividends";
import CapitalGain from "./Capital-gains";
import PortfolioViaEmail from "./Portfolio-via-email";


function Statements() {
 
  const [active, setActive] = useState("folio-details");
  const [previousActive, setPreviousActive] = useState<string>("");

  const handleSetActive = (newActive:string) => {
    setPreviousActive(active); 
    setActive(newActive);
  };

  const handleBack = () => {
    if (previousActive) {
      setActive(previousActive);
      setPreviousActive("");
    }
  };

  const renderCompo = () => {
    switch (active) {
      case "folio-details":
        return <FolioDetailsList />;
      case "elss-statements":
        return <MySipStpSwp />;
      case "dividendts":
        return <Dividends />;
      case "capital-gain":
        return <CapitalGain />;
      case "portfolio-via-email":
        return <PortfolioViaEmail />;
      default:
        return null;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h3>
        <ArrowLeft
          className="crPointer"
          size={25}
          onClick={handleBack}
        />
        Statements
      </h3>
      <hr className="fw-light text-secondary" />
      <div className="d-flex justify-content-around mb-4 row">
        <div className="col-lg-12 col-sm-md-6 my-1">
          <button
            type="button"
            className={`btn statementBtn ${active === "folio-details" && "statementBtnActive"} mx-1 my-md-0 my-1`}
            onClick={() => handleSetActive("folio-details")}
          >
            Folio Details
          </button>
          <button
            type="button"
            className={`btn statementBtn ${active === "elss-statements" && "statementBtnActive"} mx-1 my-md-0 my-1`}
            onClick={() => handleSetActive("elss-statements")}
          >
            ELSS Statements
          </button>
          <button
            type="button"
            className={`btn statementBtn ${active === "dividendts" && "statementBtnActive"} mx-1 my-md-0 my-1`}
            onClick={() => handleSetActive("dividendts")}
          >
            Dividends
          </button>
          <button
            type="button"
            className={`btn statementBtn ${active === "capital-gain" && "statementBtnActive"} mx-1 my-md-0 my-1`}
            onClick={() => handleSetActive("capital-gain")}
          >
            Capital Gains
          </button>
          <button
            type="button"
            className={`btn statementBtn ${active === "portfolio-via-email" && "statementBtnActive"} mx-1 my-md-0 my-1`}
            onClick={() => handleSetActive("portfolio-via-email")}
          >
            Portfolio (via Email)
          </button>
        </div>
      </div>

      {renderCompo()}
    </main>
  );
}

export default Statements;
