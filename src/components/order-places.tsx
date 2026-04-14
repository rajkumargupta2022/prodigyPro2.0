import Modal from "react-bootstrap/Modal";
import correct from "../assets/img/correct.png";
import failed from "../assets/img/icons/failed-icon.png";
import group from "../assets/img/Group.png";
import successImg from "../assets/img/bg-image/successImg.png"
import errorImg from "../assets/img/bg-image/errorBg.png"
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from "react";

interface OrderPlaces {
  show: boolean;
  setShow: (show: boolean) => void;
  successData: any[]
  isRedeem?: boolean
}

const OrderPlaces: React.FC<OrderPlaces> = ({ show, setShow, successData,isRedeem=false }) => {
  useEffect(() => {
    if (show) {
     console.log("Success Data:", successData);
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop={true}
        keyboard={false}
      >
        <Modal.Body style={{ padding: 0 }}>
          <Carousel className="custom-carousel"
            controls={false}
            indicators={true}>
            {successData?.map((item: any, index: number) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center align-items-center ">
                  <div className=" text-white text-center rounded-4 shadow-lg" style={{ backgroundImage: `url(${item.reg_status ? successImg : errorImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    {/* Image Wrapper */}
                    <div className="position-relative d-inline-block">
                      {/* Background Image */}
                      <img src={group} alt="Group" className={`img-fluid ${item.reg_status || "opacity-grpimg-none"}`} height={110} width={250} />
                      {/* Overlay Image */}
                      <img
                        src={item.reg_status ? correct : failed}
                        alt="Correct Symbol"
                        className="position-absolute top-50 start-50 translate-middle"
                        height={84}
                        width={84}
                      />
                    </div>

                    <h3 className="mb-3">Order {item.reg_status ? "Placed" : "Failed"}</h3>
                    {item.reg_status && <p className="text-white fs18px mb-0">
                      {isRedeem ? "Your redemption request has been submitted successfully. Proceeds will be credited to your registered bank account as per AMC processing timelines." : " Units will be alloted subject to realization of funds in AMC’s account."}
                      
                     
                    </p>}



                    <div className={`mx-md-5 m-2 ${item.reg_status ? "schemeDetailBox" : "schemeDetailBoxRed"} my-md-3 my-1`}>
                      {item?.reg_id && <div className="d-flex text-start fs12pxWhite">
                        <p className="order-Placed-modal text-start">TRXN NUMBER:</p>
                        <p className="fs16">{item.reg_id}</p>
                      </div>}

                      <div className="d-flex text-start fs12pxWhite">
                        <p className="order-Placed-modal">FUND:</p>
                        <p className="fs16">{item.schemeName}</p>
                      </div>


                      <div className="d-flex text-start fs12pxWhite">
                        <p className="order-Placed-modal">FOLIO NUMBER:</p>
                        <p className="fs16">{item.folio_no === " " ? "New Folio" : item.folio_no}</p>
                      </div>
                      {item?.amount &&
                        <div className="d-flex text-start fs12pxWhite">
                          <p className="order-Placed-modal">AMOUNT:</p>
                          <p className="fs16">₹{item.amount}</p>
                        </div>}
                      {item?.unit &&
                        <div className="d-flex text-start fs12pxWhite">
                          <p className="order-Placed-modal">Unit:</p>
                          <p className="fs16">{item.unit}</p>
                        </div>}
                      <div className="d-flex text-start fs12pxWhite">
                        <p className="order-Placed-modal">STATUS:</p>
                        <p className="fs16">{item.reg_status ? "Pending for authorization" : "Failed"}</p>
                      </div>
                      {item?.reg_remark !== " " &&
                        <div className="d-flex text-start fs12pxWhite">
                          <p className="order-Placed-modal">REMARK:</p>
                          <p className="fs16">{item.reg_remark}</p>
                        </div>}
                    </div>




                    <div className="mt-2 px-md-5 px-2" style={{ textAlign: "start" }}>
                      <span className="text-white">Note:</span>
                      <br />
                      <p className="text-white fs14px" style={{ textAlign: "start" }}>
                        Authorization link has been sent on your registered mail id
                        and mobile number.The Link shall remain active for T+3 days.Kindly authorize.
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
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderPlaces;
