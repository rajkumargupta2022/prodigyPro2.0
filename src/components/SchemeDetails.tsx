import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { CurrencyRupee } from "react-bootstrap-icons";
// import CreateNewFolio from "./CreateNewFolio";
// import InvetmentConfirmation from "./InvestmentConfirmation";
interface SchemeDetailsProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SchemeDetails: React.FC<SchemeDetailsProps> = ({ show, setShow }) => {
  // const [openCreateFolio, setOpenCreateFolio] = useState<boolean>(false);
  // const [openInvestmentConfirmation, setOpenInvestmentConfirmation] =
  //   useState<boolean>(false);

  const handleConfirmation = () => {
    // setOpenInvestmentConfirmation(true);
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
          <Modal.Title>Select Folio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">

          <Card className="rounded-4 shadow-lg border-0 mb-2 overflow-hidden">
            <Card.Header className="scheme-bg border-0">
              SBI Liquid Fund - Regular (G)
            </Card.Header>
            <Card.Body>
              
              <div className="row container-fluid">
                <div className="col col-md-8 round">
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2" className=""></label>
                  <small className="folio_latter_prodgy"><b>Folio:246656564</b></small>
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
                    <b>60.2K</b>
                  </p>
                </div>
                <div className="col">
                  <small className="fs12px">Current</small>
                  <p className="fs12px text-dark">
                    <CurrencyRupee />
                    <b>60.2K</b>
                  </p>
                </div>
              </div>
              <div
                className="col p-0 fs12px logoBlueColor crPointer fw-bold"
                // onClick={() => setOpenCreateFolio(true)}
              >
                Change Folio
              </div>
            </Card.Body>
          </Card>

          <Card className="rounded-4 shadow-sm border-0 overflow-hidden">
            <Card.Header className="scheme-bg border-0">
              SBI Liquid Fund - Regular (G)
            </Card.Header>
            <Card.Body>
              <div className="row container-fluid">
                <div className="col col-md-8 round">
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2" className=""></label>
                  <small className="folio_latter_prodgy"><b>Folio:246656564</b></small>
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
                   <b> 60.2K</b>
                  </p>
                </div>
                <div className="col">
                  <small className="fs12px">Current</small>
                  <p className="fs12px text-dark">
                    <CurrencyRupee />
                    <b>60.2K</b>
                  </p>
                </div>
              </div>
              <div
                className="col p-0 fs12px logoBlueColor crPointer fw-bold"
                // onClick={() => setOpenCreateFolio(true)}
              >
                Change Folio
              </div>
            </Card.Body>
          </Card>

        </Modal.Body>
        <Modal.Footer className="modal-bg">
          <Button className="customButton " onClick={handleConfirmation}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <CreateNewFolio show={openCreateFolio} setShow={setOpenCreateFolio} /> */}
      {/* <InvetmentConfirmation
        show={openInvestmentConfirmation}
        setShow={setOpenInvestmentConfirmation}
      /> */}
    </>
  );
};

export default SchemeDetails;
