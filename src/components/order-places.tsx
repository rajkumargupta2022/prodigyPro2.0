import Modal from "react-bootstrap/Modal";
import correct from "../assets/img/correct.png";
import group from "../assets/img/Group.png";
import successImg from "../assets/img/bg-image/successImg.png"
import { Link } from "react-router-dom";

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
            <div className=" text-white text-center rounded-4 shadow-lg" style={{ backgroundImage: `url(${successImg})`,backgroundSize:"cover",backgroundPosition:"center" }}>
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
               
                className="m-5 schemeDetailBox"
              >
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal  text-start">
                    UNIQUE NUMBER:
                  </p>
                  <p className="fs16">32545525</p>
                </div>

                <div className="d-flex  text-start fs12pxWhite">
                  <p className="order-Placed-modal ">TRXN NUMBER:</p>
                  <p className="fs16">32545525</p>
                </div>

                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal ">FUND:</p>
                  <p className="fs16">HDFC Flexi Cap Fund-Regular-Growth</p>
                </div>
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal">FOLIO NUMBER:</p>
                  <p className="fs16">214321513</p>
                </div>
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal ">AMOUNT:</p>
                  <p className="fs16">5000</p>
                </div>
                <div className="d-flex text-start fs12pxWhite">
                  <p className="order-Placed-modal ">STATUS:</p>
                  <p className="fs16">Successful</p>
                </div>
              </div>

              <div className="mt-2 px-5" style={{ textAlign: "start" }}>
                <span className="text-white">Note:</span>
                <br />
                <p className="text-white fs14px" style={{ textAlign: "start" }}>
                  Authorization link has been sent on your registered mail id
                  and mobile number.The Link shall remain active for the next 48
                  hours.Kindly authorize.
                </p>
              </div>

              <Link
                className="btn btn-light my-3 logoBlueColor"
                to="/dashboard"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderPlaces;
