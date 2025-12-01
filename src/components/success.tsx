import Modal from "react-bootstrap/Modal";
import correct from "../assets/img/correct.png";
import group from "../assets/img/Group.png";
import successImg from "../assets/img/bg-image/successImg.png"
import { Link } from "react-router-dom";

interface SuccessModelProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SuccessModel: React.FC<SuccessModelProps> = ({ show, setShow }) => {

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop={true}
        keyboard={false}
      >
        <Modal.Body style={{ padding: 0 }}>
          <div className="justify-content-center align-items-center">
            <div className=" text-white text-center rounded-4 shadow-lg " style={{ backgroundImage: `url(${successImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              {/* Image Wrapper */}
              <div className="position-relative d-inline-block pt-4">
                {/* Background Image */}
                <img src={group} alt="Group" className={`img-fluid`} height={80} width={210} />
                {/* Overlay Image */}
                <img
                  src={correct}
                  alt="Correct Symbol"
                  className="position-absolute top-50 start-50 translate-middle mt-4"
                  height={50}
                  width={50}
                />
              </div>

              <h3 className="mb-3">Rate submit successfully</h3>

              {/* <p className="text-white">We will get back to you soon</p> */}
              <Link
                className="btn btn-light mb-3 logoBlueColor"
                to="/dashboard"
                style={{ marginTop: "50px" }}>
                Back to Home
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SuccessModel;
