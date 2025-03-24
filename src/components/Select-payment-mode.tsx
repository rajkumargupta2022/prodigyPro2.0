import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import icici from "../assets/img/bank-logo/icici.png";
interface bankMandate {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SelectPaymentMethod: React.FC<bankMandate> = ({ show, setShow }) => {
  // const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)

  return (
    <>
      <Modal
        show={show}
        oncloseButtonHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Select Payment Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <div>
            <p>PAYMENT MODE</p>

            <div role="group" aria-label="Outline radio toggle">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
                checked
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option1"
              >
                UPI
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option2"
              >
                Net Banking
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option3"
              >
                Bank Mandate
              </label>
            </div>
            <p className="mt-2">BANK ACCOUNT</p>
          </div>

          <div className="borderColor p-3 rounded bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>62XXXXXX5435</h4>
                  <p>State Bank Of India</p>
                </div>
              </div>
              <div className=" round">
                {" "}
                <input type="checkbox" id="mandate" />
                <label htmlFor="mandate"></label>
              </div>
            </div>
          </div>
          <div className="borderColor p-3 rounded bg-white mt-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>62XXXXXX5435</h4>
                  <p>ICICI Bank</p>
                </div>
              </div>
              <div className=" round">
                {" "}
                <input type="checkbox" id="mandate2" />
                <label htmlFor="mandate2"></label>
              </div>
            </div>
          </div>
          <div className="borderColor p-3 rounded bg-white mt-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>62XXXXXX5435</h4>
                  <p>HDFC Bank</p>
                </div>
              </div>
              <div className=" round">
                {" "}
                <input type="checkbox" id="mandate3" />
                <label htmlFor="mandate3"></label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-bg">
          <Button className="customButton buttunCenter">Continue</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SelectPaymentMethod;
