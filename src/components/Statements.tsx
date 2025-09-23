import FolioDetailsList from "./folio-details-list";
import MySipStpSwp from "./Elss-statements";
import Dividends from "./Dividends";

import { useState } from "react";
import MyTransactions from "./My-transactions";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
function Statements() {
  const navigate = useNavigate()
  const [active, setActive] = useState("folio-details");

  const renderCompo = () => {
    switch (active) {
      case "folio-details":
        return <FolioDetailsList />;
      case "elss-statements":
        return <MySipStpSwp />;
           case "dividendts":
        return <Dividends />
      case "dividends":
        return <MyTransactions />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h3>
        <ArrowLeft className="crPointer" size={25} onClick={()=>navigate(-1)} />
        Statements
      </h3>
      <hr className="fw-light text-secondary" />
      <div className="d-flex justify-content-around mb-4 row">
        <div className="col-lg-12 col-sm-md-6 my-1">
          <button type="button" className={`btn statementBtn ${active=="folio-details"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("folio-details")}>Folio Details</button>
          <button type="button" className={`btn statementBtn ${active=="elss-statements"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("elss-statements")}>ELSS Statements</button>
          <button type="button" className={`btn statementBtn ${active=="dividendts"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("dividendts")}>Dividends</button>
          <button type="button" className={`btn statementBtn ${active=="folio-details"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("swp")}> Capital Gains</button>
          <button type="button" className={`btn statementBtn ${active=="folio-details"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("dividends")}> Portfolio (via Email)</button>
        </div>


      </div>
      {renderCompo()}
    </main>
  );
}

export default Statements;
