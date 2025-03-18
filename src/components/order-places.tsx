import Modal from "react-bootstrap/Modal";
import correct from "../assets/img/correct.png";
import group from "../assets/img/Group.png";

interface OrderPlaces {
  show: boolean;
  setShow: (show: boolean) => void;
}

const OrderPlaces: React.FC<OrderPlaces> = ({ show, setShow }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body style={{ padding: 0 }}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="logobg_color text-white text-center rounded-4 shadow-lg">
              {/* Image Wrapper */}
              <div className="position-relative d-inline-block">
                {/* Background Image */}
                <img src={group} alt="Group" className="img-fluid" height={110} width={250}/>
                {/* Overlay Image */}
                <img
                  src={correct}
                  alt="Correct Symbol"
                  className="position-absolute top-50 start-50 translate-middle"
                  height={84}
                  width={84}
                />
              </div>

              <h3>Order Placed</h3>
              <p className="text-white fs18px">
                Units will be alloted subject to realization of funds in AMC’s
                account
              </p>

              <div
               
                className="m-5"
              >
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal  text-start">
                    UNIQUE NUMBER:
                  </p>
                  <h6>32545525</h6>
                </div>

                <div className="d-flex  text-start fs12pxWhite">
                  <p className="order-Placed-modal ">TRXN NUMBER:</p>
                  <h6>32545525</h6>
                </div>

                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal ">FUND:</p>
                  <h6>HDFC Flexi Cap Fund-Regular-Growth</h6>
                </div>
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal">FOLIO NUMBER:</p>
                  <h6>214321513</h6>
                </div>
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal ">AMOUNT:</p>
                  <h6>5000</h6>
                </div>
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal ">STATUS:</p>
                  <h6>Successful</h6>
                </div>
              </div>

              <div className="mt-2" style={{ textAlign: "start" }}>
                <span className="text-white">Note:</span>
                <br />
                <p className="text-white" style={{ textAlign: "start" }}>
                  Authorization link has been sent on your registered mail id
                  and mobile number.The Link shall remain active for the next 48
                  hours.Kindly authorize.
                </p>
              </div>

              <button
                className="btn btn-light fw-bold mt-3"
                style={{ color: "#011efe" }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderPlaces;
