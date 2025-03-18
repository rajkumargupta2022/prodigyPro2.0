import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { CurrencyRupee } from "react-bootstrap-icons";
import CreateNewFolio from "./CreateNewFolio";
import InvetmentConfirmation from "./InvestmentConfirmation";
import BankMandate from "../components/BankMandate";

interface SchemeDetailsProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SelectFolioPopup: React.FC<SchemeDetailsProps> = ({ show, setShow }) => {
  const [openCreateFolio, setOpenCreateFolio] = useState<boolean>(false);
  const [openInvestmentConfirmation, setOpenInvestmentConfirmation] =
    useState<boolean>(false);
  const [openBankMandate,setOpenBankMandate] = useState(false)


  

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className="select-folio-popup"
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Select Folio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <Card className="rounded-4 shadow-lg border-0 mb-2">
            <Card.Body>
              <div className="row container-fluid">
                <div className="col col-md-8 round">
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2" className=""></label>
                  <small className="">Folio:246656564</small>
                </div>
                <div className="col col-md-4 text-end fs12px">
                  <button
                    type="button"
                    className="btn scheme-bg rounded-5 logoBlueColor popularButton"
                  >
                    Recommended
                  </button>
                </div>

                <div className="col p-0">
                  <small className="fs12px">INVESTED</small>
                  <p className="fs12px text-dark">
                    <CurrencyRupee />
                    60.2K
                  </p>
                </div>
                <div className="col">
                  <small className="fs12px">Current Value</small>
                  <p className="fs12px text-dark">
                    <CurrencyRupee />
                    60.2K
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="rounded-4 shadow-sm border-0">
            <Card.Body>
              <div className="row container-fluid">
                <div className="col col-md-8 round">
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2" className=""></label>
                  <small className="">Folio:246656564</small>
                </div>
                <div className="col col-md-4 text-end fs12px">
                  <button
                    type="button"
                    className="btn scheme-bg rounded-5 logoBlueColor popularButton"
                  >
                    Recommended
                  </button>
                </div>

                <div className="col p-0">
                  <small className="fs12px">INVESTED</small>
                  <p className="fs12px text-dark">
                    <CurrencyRupee />
                    60.2K
                  </p>
                </div>
                <div className="col">
                  <small className="fs12px">Current Value</small>
                  <p className="fs12px text-dark">
                    <CurrencyRupee />
                    60.2K
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          <h6 className="text-center m-4" style={{ color: "#011efe" }}>
            Create New Folio
          </h6>
          <div className="text-center">
            <Button
              variant="primary" onClick={()=>{setOpenBankMandate(true); setShow(false);}}
              style={{ backgroundColor: "#011efe", borderRadius: "12px" }}
            >
              Continue with Selected Folio
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <CreateNewFolio show={openCreateFolio} setShow={setOpenCreateFolio} />
      <InvetmentConfirmation
        show={openInvestmentConfirmation}
        setShow={setOpenInvestmentConfirmation}
      />
            <BankMandate show={openBankMandate} setShow={setOpenBankMandate}/>

    </>
  );
};

export default SelectFolioPopup;
