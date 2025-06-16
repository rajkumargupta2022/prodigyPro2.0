import { ArrowLeft } from "react-bootstrap-icons";
import BankList from "./bank-list";
import {Link} from "react-router-dom"

function LinkedBankAccount({
  backButton,
  activeInactive,
}: {
  backButton: any;
  activeInactive: any;
}) {
  // const [active, setActive] = useState("bank-list");
  const active = "bank-list"

  const renderCompo = () => {
    switch (active) {
      case "bank-list":
        return <BankList activeInactive={activeInactive} />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-7 col-md-7 py-2">
      
          <span className="ac-heading" >
            <ArrowLeft className="crPointer" size={25} onClick={backButton} /> My
            Linked Bank Accounts
          </span>
        </div>
           
        <div className="col-lg-5 col-md-5 py-2 ps-5 text-md-end text-start">
           <Link  to={"/Add-bank-account-list"}>
          <span
            className="bankbtn"
            onClick={() => activeInactive("add-bank-account")}
          >
            + Add Bank Account
          </span>
          </Link>
        </div>
      </div>
      <hr className="fw-light text-secondary" />

      {renderCompo()}
    </main>
  );
}

export default LinkedBankAccount;
