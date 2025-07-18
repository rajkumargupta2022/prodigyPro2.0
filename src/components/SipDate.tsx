import Modal from "react-bootstrap/Modal";
interface SipDatesProp {
  show: boolean;
  setShow: (show: boolean) => void;
  sipDate:number;
  handleSipDate:(value:number)=>void
}

const SipDates: React.FC<SipDatesProp> = ({ show, setShow,sipDate,handleSipDate }) => {


  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        contentClassName="sip-date-modalesize"
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Date of SIP</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white pt-0">

          <div className="sip_date_prodgy">
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i + 1} onClick={() => handleSipDate(i + 1)} className={`circleNumber mx-1 ${(i + 1) === sipDate && "select_sipdate"}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default SipDates;
