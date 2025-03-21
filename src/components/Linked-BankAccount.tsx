import { ArrowLeft } from "react-bootstrap-icons";
import BankList from "./bank-list";
import { useState } from "react";

function LinkedBankAccount({
  backButton,
  activeInactive,
}: {
  backButton: any;
  activeInactive: any;
}) {
  const [active, setActive] = useState("bank-list");

  const renderCompo = () => {
    switch (active) {
      case "bank-list":
        return <BankList activeInactive={activeInactive} />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <div className="d-flex justify-content-between align-items-center">
        <span className="ac-heading">
          <ArrowLeft className="crPointer" size={25} onClick={backButton} /> My
          Linked Bank Accounts
        </span>
        <span
          className="bankbtn"
          onClick={() => activeInactive("add-bank-account")}
        >
          + Add Bank Account
        </span>
      </div>
      <hr className="fw-light text-secondary" />

      {renderCompo()}
    </main>
  );
}

export default LinkedBankAccount;
