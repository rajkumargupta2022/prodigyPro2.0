import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
import icici from "../assets/img/bank-logo/icici.png";
import { useEffect, useState } from "react";
import OrderPlaces from "./order-places";
import { postRequest } from "../services/Api/HandleApi";
import { bankMandateKeys, bankMandateResponse } from "../pages/data-interfaces/transact";
import { endPoints } from "../services/utils/urls";
interface bankMandate {
  show: boolean;
  setShow: (show: boolean) => void;
}

const BankMandate: React.FC<bankMandate> = ({ show, setShow }) => {
  // const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
  const [openSuccess,setOpenSuccess] = useState(false)
  const [mandateList,setMandateList] = useState<bankMandateKeys[]>([])


  useEffect(()=>{
      fetchMandateList()
  },[])

  const fetchMandateList =async()=>{
    try{
      const res =await postRequest<bankMandateResponse>(endPoints.getMandateList,{ucc:"asa"})
     setMandateList(res.data)
    }catch(err){
      console.log(err);
       setMandateList([])
    }
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
          <Modal.Title>Select Bank Mandate</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          {mandateList?.map((item)=>{
            return <div className="borderColor p-3 rounded bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{item.bank_name}</h4>
                  <p>
                    Digital Autopay: |{" "}
                    <span className="congratesColor">Approved</span>
                  </p>
                  <p>Mandate ID: {item.umrn_no}</p>
                </div>
              </div>
              <div className=" round">
                {" "}
                <input type="checkbox" id="mandate" />
                <label htmlFor="mandate"></label>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <div className="fs12px">ACCOUNT NUMBER</div>
                <div className="fs12px text-dark fw-bold">{item.account_no}</div>
              </div>
              <div className="col-6">
                <div className="fs12px">MAX LIMIT</div>
                <div className="fs12px text-dark fw-bold">
                  <CurrencyRupee />
                  {item.amount}
                </div>
              </div>
            </div>
          </div>
          })}
          
       
        </Modal.Body>
        <Modal.Footer className="modal-bg ">
          <Button className="customButton buttunCenter" onClick={()=>{setOpenSuccess(true)}}>Continue</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess}/>
    </>
  );
};

export default BankMandate;
