import Modal from "react-bootstrap/Modal";

interface MsgModelProps {
  show: boolean;
  setShow: (value: boolean) => void;
  setNewModelShow?: (value: boolean) => void;
  heading?: string;
  msg?: string[];
  btn?: string;
}

function MsgModel({ show, setShow,setNewModelShow, heading, msg, btn }: MsgModelProps) {
  const handleClose = () => {
    setShow(false);
    setNewModelShow?.(true)
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {heading}
        </Modal.Title>
      </Modal.Header>

      <hr className="my-0" />

      <Modal.Body>
        {msg && msg.length > 0 ? (
          <ul className="mb-0">
            {msg.map((m, i) => (
              <li className="fs14px" key={i}>{m}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </Modal.Body>


      <Modal.Footer>

        <button type="button" className="customButton px-4 mx-auto d-block" onClick={handleClose}>{btn ?? "OK"}</button>
      </Modal.Footer>
    </Modal>
  );
}

export default MsgModel;
