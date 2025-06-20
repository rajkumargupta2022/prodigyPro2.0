import FolioDetailsList from "./folio-details-list";
import MySipStpSwp from "./Sip-Stp-Swp";
import Dividends from "./Dividends";

import { useState } from "react";
import MyTransactions from "./My-transactions";
function Statements({
  activeInactive,
}: {
  activeInactive: any;
}) {
  const [active, setActive] = useState("folio-details");

  const renderCompo = () => {
    switch (active) {
      case "folio-details":
        return <FolioDetailsList activeInactive={activeInactive} />;
      case "sip-stp-swp":
        return <MySipStpSwp />;
           case "my-transactions":
        return <MyTransactions />;
      case "dividends":
        return <Dividends />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h3>
        {/* <ArrowLeft className="crPointer" size={25} onClick={backButton} /> */}
        Statements
      </h3>
      <hr className="fw-light text-secondary" />
      <div className="d-flex justify-content-around mb-4 row">
        <div className="col-lg-12 col-sm-md-6 my-1">
          <button type="button" className={`btn statementBtn ${active=="folio-details"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("folio-details")}>Folio Details</button>
          <button type="button" className={`btn statementBtn ${active=="sip-stp-swp"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("sip-stp-swp")}>My SIP STP SWP</button>
          <button type="button" className={`btn statementBtn ${active=="my-transactions"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("my-transactions")}>My Transactions</button>
          <button type="button" className={`btn statementBtn ${active=="folio-details"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("swp")}> Capital Gains</button>
          <button type="button" className={`btn statementBtn ${active=="folio-details"&&"statementBtnActive"} mx-1 my-md-0 my-1`} onClick={() => setActive("dividends")}> Portfolio (via Email)</button>
        </div>


      </div>
      {renderCompo()}
    </main>
  );
}

export default Statements;
