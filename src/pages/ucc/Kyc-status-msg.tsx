import React from "react";
import Modal from "react-bootstrap/Modal";
import group from "../../assets/img/Group.png";
import correct from "../../assets/img/correct.png";

interface kycMsgObj {
  firstColor: string;
  secondColor: string;
  heading: string;
  description_1?: string;
  description_2?: string;
  name?: string;
  pan?: string;
  taxStatus?: string;
  image: string;
  url?: string;
  footerMsg?: string
  btnName?: string
}
interface KycStatusMsgProps {
  show: boolean;
  setShow: (show: boolean) => void;
  kycMsg: kycMsgObj
}

const KycStatusMsg: React.FC<KycStatusMsgProps> = ({
  show,
  setShow,
  kycMsg

}) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="bg-transparent border-0"
    >
      <div
        className="d-flex flex-column justify-content-between align-items-center rounded-4 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${kycMsg?.firstColor} 0%, ${kycMsg?.secondColor} 100%)`,
          padding: "30px 20px",
          minHeight: "60vh"
        }}
      >
        <div className="text-center w-100 mt-4">
          <div className="position-relative d-inline-block my-4">

            {/* <img src={group} alt="Group" className="img-fluid" height={110} width={250} /> */}
            <img
              src={kycMsg?.image}
              alt="Correct Symbol"
              className="position-absolute top-50 start-50 translate-middle"
              height={84}
              width={84}
            />
          </div>

          <h3 className="text-white mt-4 fw-bold">{kycMsg.heading}</h3>
          <p className="text-white mb-1" style={{ fontSize: "14px", opacity: 0.9 }}>{kycMsg.description_1}</p>


          <div className="mx-lg-4 mt-4 mb-5">
            <p className="text-white m-0 fs14px" >{kycMsg?.description_2 ?? ""}</p>
          </div>
        </div>

        <div className="w-100 px-3 pb-2 mt-auto">
          <p className="text-white m-0 fs12px text-secondary mb-2 text-center" >{kycMsg?.footerMsg ?? ""}</p>
          <div
            className="btn btn-light w-100 py-2 fw-bold  rounded-2"
            style={{ color: "#2a52e1", fontSize: "14px" }}

            onClick={() => setShow(false)}
          >
            {kycMsg.btnName ?? ""}
          </div>
        </div>
      </div>
    </Modal >
  );
};

export default KycStatusMsg;
