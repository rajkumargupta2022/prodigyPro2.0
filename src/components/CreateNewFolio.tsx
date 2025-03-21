import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
interface CreateNewFolioProp {
  show: boolean;
  setShow: (show: boolean) => void;
}

const CreateNewFolio: React.FC<CreateNewFolioProp> = ({ show, setShow }) => {
  const handleInvestmentConfirmation = () => {};

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        contentClassName="modelSize"
        size="sm"
        centered
      >
        <Modal.Body className="bg-white">
          <div className="row container-fluid border-bottom">
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
              <small className="fs12px">Current</small>
              <p className="fs12px text-dark">
                <CurrencyRupee />
                60.2K
              </p>
            </div>
          </div>
          <div className="row container-fluid border-bottom">
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
              <small className="fs12px">Current</small>
              <p className="fs12px text-dark">
                <CurrencyRupee />
                60.2K
              </p>
            </div>
            <hr/>
            <div className="col col-md-8 round">
              <input type="checkbox" id="newFolio" />
              <label htmlFor="newFolio" className="mt-0"></label>
              <h6 className="">Create New Folio</h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="">
          <Button className="customCancelButton" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            className="customButton"
            onClick={handleInvestmentConfirmation}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewFolio;
