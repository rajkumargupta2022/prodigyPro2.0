import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Calendar4, CurrencyRupee } from "react-bootstrap-icons";
import icici from "../assets/img/bank-logo/icici.png";
import BankMandate from "./BankMandate";
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const CreateMandate: React.FC<investmetProps> = ({ show, setShow }) => {
  const [openBankMandate, setOpenBankMandate] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

  const handleBankMandate = () => {
    setOpenBankMandate(true);
    setShow(false);
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
          <Modal.Title>Create Mandate</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <div className="borderColor p-3 rounded-4 bg-white">
            <span className="sub-heading modal-heading">Mandate Details</span>
            <p className="form-label mt-2">MODE</p>
            <div className="row">
              <div>
                <button type="button" className="btn shortcutValue">
                  Debit Card
                </button>

                <button type="button" className="btn shortcutValue mx-1">
                  Net Banking
                </button>
              </div>
            </div>
            <form>
              <div className="form-group mt-3">
                <label htmlFor="amountFor" className="fs12px">
                  MANDATE AMOUNT
                </label>
                <input
                  type="text"
                  className="form-control input-text"
                  id="amountFor"
                  aria-describedby="emailHelp"
                  value={50000}
                />
                <div className=" mt-2">
                  <button type="button" className="btn shortcutValue">
                    Min.
                  </button>
                  <button type="button" className="btn shortcutValue mx-1">
                    <CurrencyRupee className="mb-1" />
                    1,000
                  </button>
                  <button type="button" className="btn shortcutValue mx-1">
                    <CurrencyRupee className="mb-1" />
                    2,000
                  </button>
                  <button type="button" className="btn shortcutValue mx-1">
                    <CurrencyRupee className="mb-1" />
                    5,000
                  </button>
                </div>
                <div className="text-center">
                  <span className="D4D4D4D px-3"> Unit Cancelled</span>
                  <label className="d-inline-flex align-items-center position-relative">
                    <input
                      type="checkbox"
                      className="d-none"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <div
                      className={`position-relative rounded-pill`}
                      style={{
                        width: "50px",
                        height: "10px",
                        transition: "background 0.3s",
                        backgroundColor: checked ? "#CCD2FF" : "#ccc",
                      }}
                    ></div>
                    <div
                      className="position-absolute rounded-circle"
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#1A35FE",
                        left: checked ? "35px" : "0px",
                        transition: "left 0.3s",
                      }}
                    ></div>
                  </label>
                </div>

                {checked && (
                  <div className="d-flex mt-3">
                    <div className="w-100 me-2">
                      <label className="form-label mt-2">FROM</label>
                      <input type="date" className="form-control" />
                    </div>

                    <div className="w-100 ms-2">
                      <label className="form-label mt-2">To</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>

        <small className="fs12px p-2 modal-bg text-center">
          Please click here to view the list of eligible banks for e-mandate. If
          your bank is not listed, kindly raise a query <br />
          to initiate the offline process for mandate registration.
        </small>
        <small className="p-2 fs12px modal-bg text-center">
          The debit mandate amount represents the daily maximum limit per
          transaction.
          <div className="mb-3 mt-3">
            <button className="mandate-button">Proceed</button>
          </div>
        </small>
      </Modal>
    </>
  );
};

export default CreateMandate;
