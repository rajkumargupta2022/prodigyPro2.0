import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee, XCircle } from "react-bootstrap-icons";

import PortfolioEmpty from "../../../pages/PortfolioEmpty";
import noBankImg from "../../../assets/img/no-bank.png"
import { imageUrl } from "../../../services/utils/urls";
import ChooseAccountToLink from "./ChooseAccountToLink";
import { useState } from "react";
interface ManageBankAccounts {
  show: boolean;
  setShow: (show: boolean) => void;

}

 // const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
 const ManageBankAccounts: React.FC<ManageBankAccounts> = ({ show, setShow}) => {
    const [openChooseLink,setOpenChooseLink] = useState<boolean>(false)
  const mandateList=[{
            "bank_name": "HDFC BANK",
            "umrn_no": "1677",
            "acc_type": "SB",
            "bank_code": "HDFC0000296",
            "account_no": "02961050001764",
            "holederName": "Chitranshu Srivastwa",
            "amount": "1000",
            "from_date": "2015-11-09T18:30:00.000Z",
            "to_date": "2999-12-30T18:30:00.000Z"
        },
        {
            "bank_name": "HDFC BANK",
            "umrn_no": "5026",
            "acc_type": "SB",
            "bank_code": "HDFC0000296",
            "account_no": "02961050001764",
            "holederName": "Rajkumar Gupta",
            "amount": "10000",
            "from_date": "2016-03-08T18:30:00.000Z",
            "to_date": "2999-12-30T18:30:00.000Z"
        }]
  
        const handleChaooseAccount=()=>{
            setOpenChooseLink(true)
            setShow(false)
        }
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Manage Bank Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          {mandateList.length>0?mandateList?.map((item, index) => {
         
            return <div key={item.umrn_no} className="borderColor p-3 rounded bg-white m-2">
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item?.bank_name?.trim()
                      .toLowerCase()
                      .replace(/\s+/g, '_') + ".png"} height={32} width={32} className="rounded" alt="bank-logo" />
                  </div>
                  <div className="ms-2 mt-2 prod_icon_heading">
                    <h4>{item.bank_name+"..."+ item.account_no.slice(-4)}</h4>
                       
                  </div>
                </div>
                <div >
                      <p className="crPointer fs12px text-danger"><XCircle /> Remove</p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-6">
                  <div className="fs12px">ACCOUNT HOLDER</div>
                  <div className="fs12px text-dark fw-bold">{item.holederName}</div>
                </div>
                <div className="col-6">
                  <div className="fs12px">Connected Number</div>
                  <div className="fs12px text-dark fw-bold">
                  
             {item.amount}787
                  </div>
                </div>
              </div>
            </div>
          }):<PortfolioEmpty images={noBankImg} title={"No Mandate found"} body={"Please create a new mandate upto ₹2,00,00,00,000 to continue with this transaction"} btnName={"Create New Mandate"} btnUrl={"/linked-bank-account"} />}


        </Modal.Body>
      {mandateList.length>0&&  <Modal.Footer className="modal-bg ">
          <Button className="customButton buttunCenter"  onClick={handleChaooseAccount}>Continue</Button>
        </Modal.Footer>}
      </Modal>
         <ChooseAccountToLink show={openChooseLink} setShow={setOpenChooseLink}/>  
    </>
  );
};

export default ManageBankAccounts;
