import Modal from "react-bootstrap/Modal";

import PortfolioEmpty from "../../../pages/PortfolioEmpty";
import noBankImg from "../../../assets/img/no-bank.png"
import { endPoints, imageUrl } from "../../../services/utils/urls";
import { useEffect, useState } from "react";
import { getAllBankAccKeys, getAllBankAccRes, getConsentLinkRes } from "../../data-interfaces/mf-savings";
import { fetchAdminUser } from "../../../services/user/adminUser";
import { getRequest, postRequest } from "../../../services/Api/HandleApi";
import { errorToast } from "../../../services/utils/toast";
interface ChooseAccountToConsent {
  show: boolean;
  setShow: (show: boolean) => void;

}

// const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
const ChooseAccountToConsent: React.FC<ChooseAccountToConsent> = ({ show, setShow }) => {
  const [bankList, setBankList] = useState<getAllBankAccKeys[]>([])
  const [selectedBank, setSelectedBank] = useState<getAllBankAccKeys>()
  
  useEffect(() => {
    fetchAccountList()
  }, [])

  const fetchAccountList = async () => {
    const adminUser = fetchAdminUser()
    try {
      const res = await getRequest<getAllBankAccRes>(endPoints.getAllBanksAcc + "?ucc=" + adminUser.ucc)
      if (res.success) {
        setBankList(res.data)
        const result = res.data.find((item: getAllBankAccKeys) => item.primary)
        setSelectedBank(result)
      }
    } catch (err) {
      console.log(err);

    }
  }
  const handleBankSelection = (data: getAllBankAccKeys) => {
    setSelectedBank(data)
  }
  const handleConsentLink = async () => {
    const adminUser = fetchAdminUser()
    const reqBody = {
      bank_name: selectedBank?.bank_name,
      account_number: selectedBank?.account_number,
      ucc: adminUser.ucc
    }
    try {
      const res = await postRequest<getConsentLinkRes>(endPoints.getConsentLink,reqBody)
      if (res.success) {
       window.open(res.data.consentUrl, "_blank")
      }
    } catch (err) {
      errorToast(err)

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
          <Modal.Title>Choose Account to Give Consent</Modal.Title>
        </Modal.Header>
     

        <Modal.Body className="modal-bg">
          {bankList.length > 0 ? bankList?.map((item, index) => {
            return <div key={item.account_number} className="borderColor p-3 rounded bg-white m-2 crPointer" onClick={() => handleBankSelection(item)}>
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item?.bank_name?.trim()
                      .toLowerCase()
                      .replace(/\s+/g, '_') + ".png"} height={32} width={32} className="rounded" alt="bank-logo" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{"XXXXXXX" + item.account_number.slice(-4)}</h4>
                    <p>{item.bank_name} {item.primary ? <>| <small className="logoBlueColor">Primary</small></> : ""}</p>
                  </div>

                </div>
                <div className="round">
                  <input
                    type="checkbox"
                    id={`mandate-${index}`}
                    checked={selectedBank?.account_number === item.account_number}
                    readOnly
                  />
                  <label htmlFor={`mandate-${index}`}></label>
                </div>
              </div>


            </div>
          }) : <PortfolioEmpty images={noBankImg} title={"No Mandate found"} body={"Please create a new mandate upto ₹2,00,00,00,000 to continue with this transaction"} btnName={"Create New Mandate"} btnUrl={"/linked-bank-account"} />}

          <div className="row justify-content-center mt-3">
            <div className="col-md-6 col-lg-6" onClick={handleConsentLink}>
              <button
                type="button"
                className={`customButton w-100 px-2 mb-1`}
              >
                Give Consent
              </button>
            </div>


          </div>


        </Modal.Body>

      </Modal>


    </>
  );
};

export default ChooseAccountToConsent;
