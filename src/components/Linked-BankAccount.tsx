import { ArrowLeft } from "react-bootstrap-icons";
import BankList from "./bank-list";
import {Link, useNavigate} from "react-router-dom"

function LinkedBankAccount() {
  const navigate = useNavigate()
 
 

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-7 col-md-7 py-2">
      
          <h4 onClick={()=>navigate(-1)}>
            <ArrowLeft className="crPointer" size={25} /> My
            Linked Bank Accounts
          </h4>
        </div>
           
        <div className="col-lg-5 col-md-5 py-2 ps-5 text-md-end text-start">
           <Link  to={"/add-bank-details"}>
          <span
            className="bankbtn"
          
          >
            + Add Bank Account
          </span>
          </Link>
        </div>
      </div>
      <hr className="fw-light text-secondary" />

      <BankList  />
    </main>
  );
}

export default LinkedBankAccount;
