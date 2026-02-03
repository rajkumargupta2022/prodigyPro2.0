import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { XCircle } from "react-bootstrap-icons";

import PortfolioEmpty from "../../../pages/PortfolioEmpty";
import noBankImg from "../../../assets/img/no-bank.png"
import { endPoints, imageUrl } from "../../../services/utils/urls";
import ChooseAccountToLink from "./ChooseAccountToLink";
import { useState } from "react";
import { getBankInsightsKeys, revokeBankConsentRes } from "../../data-interfaces/mf-savings";
import { inTitleCase } from "../../../services/utils/services";
import { dateInStringNumber } from "../../../services/dates/dateFormater";
import { getRequest } from "../../../services/Api/HandleApi";
import { errorToast } from "../../../services/utils/toast";
interface ManageBankAccounts {
  show: boolean;
  setShow: (show: boolean) => void;
  list: getBankInsightsKeys[];
}

// const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
const ManageBankAccounts: React.FC<ManageBankAccounts> = ({ show, setShow, list }) => {
  const [openChooseLink, setOpenChooseLink] = useState<boolean>(false)


  const handleChaooseAccount = () => {
    setOpenChooseLink(true)
    setShow(false)
  }

  const handleRevokeBankeAccount =async () => {
     try{
          const res = await getRequest<revokeBankConsentRes>(endPoints.revokeBankConsent)
          if(res.success){
            window.open(res.data)
          }
     }catch(err){
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
          <Modal.Title>Manage Bank Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          {list.length > 0 ? list?.map((item) => {

            return <div key={item.account_number} className="borderColor p-3 rounded bg-white m-2">
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item?.bank_name?.trim()
                      .toLowerCase()
                      .replace(/\s+/g, '_') + ".png"} height={32} width={32} className="rounded" alt="bank-logo" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h6 className="mb-0">{inTitleCase(item?.bank_name)}</h6>
                    <small className="fs12px mt-0">XXXXXXXXX{item?.account_number?.slice(-4)}</small>
                  </div>
                </div>
                <div onClick={handleRevokeBankeAccount}>
                  <p className="crPointer fs12px text-danger"><XCircle /> Revoke</p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-6">
                  <div className="fs12px">ACCOUNT HOLDER</div>
                  <div className="fs12px text-dark fw-bold">{item.holder_name}</div>
                </div>
                <div className="col-6">
                  <div className="fs12px">Current Balance  ({dateInStringNumber(item.last_refreshed_data)})</div>
                  <div className="fs12px text-dark fw-bold">
                    ₹{item.current_balance.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          }) : <PortfolioEmpty images={noBankImg} title={"No Mandate found"} body={"Please create a new mandate upto ₹2,00,00,00,000 to continue with this transaction"} btnName={"Create New Mandate"} btnUrl={"/linked-bank-account"} />}


        </Modal.Body>
        {list.length > 0 && <Modal.Footer className="modal-bg ">
          <Button className="customButton buttunCenter" onClick={handleChaooseAccount}>Continue</Button>
        </Modal.Footer>}
      </Modal>
      <ChooseAccountToLink show={openChooseLink} setShow={setOpenChooseLink} />
    </>
  );
};

export default ManageBankAccounts;
