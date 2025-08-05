import Modal from "react-bootstrap/Modal";
interface SipDatesProp {
  show: boolean;
  setShow: (show: boolean) => void;
  sipDate:number;
  sipDateList: number[];
  handleSipDate:(value:number)=>void
}

const SipDates: React.FC<SipDatesProp> = ({ show, setShow,sipDate,sipDateList,handleSipDate }) => {


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
          
            {sipDateList?.map((item)=>{
              return <>
               <div key={item} onClick={() => handleSipDate(item)} className={`circleNumber mx-1 ${(item) === sipDate && "select_sipdate"}`}>
                {item}
              </div>
              </>
            })}
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default SipDates;
