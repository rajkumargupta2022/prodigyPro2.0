import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
import icici from "../assets/img/bank-logo/icici.png";
import { useEffect, useState } from "react";
import OrderPlaces from "./order-places";
import { postRequest } from "../services/Api/HandleApi";
import { bankMandateKeys, bankMandateResponse, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { endPoints } from "../services/utils/urls";
import { finalTransaction } from "../services/utils/transactionApi";
import { keys } from "../services/utils/keys";
import { fetchAdminUser } from "../services/user/adminUser";
import { errorToast } from "../services/utils/toast";
interface bankMandate {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
  setSchemeList: (date: any) => void,
  isSipTransaction: boolean
}

const BankMandate: React.FC<bankMandate> = ({ show, setShow, schemeList, setSchemeList,isSipTransaction }) => {
  // const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [mandateList, setMandateList] = useState<bankMandateKeys[]>([])
  const [successData,setSuccessData] = useState<any[]>([])


  useEffect(() => {
    fetchMandateList()
    
  }, [show])

  const fetchMandateList = async () => {
    const adminUser = fetchAdminUser()
    if(!adminUser){
      errorToast("Something went wrong")
      return
    }
    try {
      const res = await postRequest<bankMandateResponse>(endPoints.getMandateList, { ucc: adminUser?.ucc })
      setMandateList(res.mandates)
     await handleMandate(res.mandates[0]?.umrn_no, res?.mandates[0]?.from_date, res.mandates[0]?.to_date)

    } catch (err) {
      setMandateList([])
    }
  }
  const [selectedUrn, setSelectedUrn] = useState<string | null>(null);

  const handleMandate =async (urn: string, from_date: string, to_date: string) => {
    setSelectedUrn(urn);

    const updatedSchemes = schemeList.map((scheme) => ({
      ...scheme,
      urn_no: urn,
      from_date: from_date.replace("T", " "),
      to_date: to_date.replace("T", " ")
      // ✅ only update urn_no
    }));

    setSchemeList(updatedSchemes);
  };




  const handleTransaction =  () => {
      finalTransaction(schemeList,isSipTransaction?keys.sip:keys.purchase,setSuccessData).then((res)=>{
     console.log(res);
     
    setOpenSuccess(true)
      setShow(false)
      })
  

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
          {mandateList?.map((item, index) => {
            const isChecked = selectedUrn === item.umrn_no;
            return <div key={item.umrn_no} className="borderColor p-3 rounded bg-white m-2">
              <div className="d-flex justify-content-between" onClick={() => handleMandate(item.umrn_no, item.from_date, item.to_date)}>
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
          <Button className="customButton buttunCenter" onClick={handleTransaction}>Continue</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successData} />
    </>
  );
};

export default BankMandate;
