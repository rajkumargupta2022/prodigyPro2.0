import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
import icici from "../assets/img/bank-logo/icici.png";
import { useEffect, useState } from "react";
import OrderPlaces from "./order-places";
import { postRequest } from "../services/Api/HandleApi";
import { bankMandateKeys, bankMandateResponse, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { endPoints } from "../services/utils/urls";
import { fetchAdminUser } from "../services/user/adminUser";
interface bankMandate {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
    setSchemeList: (date: any) => void
}

const BankMandate: React.FC<bankMandate> = ({ show, setShow,schemeList,setSchemeList }) => {
  // const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
  const [openSuccess,setOpenSuccess] = useState(false)
  const [mandateList,setMandateList] = useState<bankMandateKeys[]>([])


  useEffect(()=>{
      fetchMandateList()
  },[show])

  const fetchMandateList =async()=>{
    const adminUser = fetchAdminUser()
    try{
      const res =await postRequest<bankMandateResponse>(endPoints.getMandateList,{ucc:109780})
     setMandateList(res.mandates)
      handleMandate(res.mandates[0].umrn_no)

    }catch(err){
       setMandateList([])
    }
  }
   const [selectedUrn, setSelectedUrn] = useState<string | null>(null);

  const handleMandate = (urn: string) => {
    setSelectedUrn(urn);

    const updatedSchemes = schemeList.map((scheme) => ({
      ...scheme,
      urn_no: urn, // ✅ only update urn_no
    }));

    setSchemeList(updatedSchemes);
  };

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
          {mandateList?.map((item,index)=>{
            const isChecked = selectedUrn === item.umrn_no;
            return  <div key={item.umrn_no} className="borderColor p-3 rounded bg-white m-2">
            <div className="d-flex justify-content-between" onClick={() => handleMandate(item.umrn_no)}>
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="bank-logo" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{item.bank_name}</h4>
                  <p>
                    Digital Autopay: | <span className="congratesColor">Approved</span>
                  </p>
                  <p>Mandate ID: {item.umrn_no}</p>
                </div>
              </div>
              <div className="round">
                <input
                  type="checkbox"
                  id={`mandate-${index}`}
                  checked={isChecked}
                  readOnly
                />
                <label htmlFor={`mandate-${index}`}></label>
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
