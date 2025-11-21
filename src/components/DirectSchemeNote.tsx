import Modal from "react-bootstrap/Modal";

interface DirectSchemeNoteProps {
  show: boolean;
  setShow: (value: boolean) => void;
  msg?: string;
  removeDirectScheme: (value: string) => void;

}

function DirectSchemeNote({ show, setShow, msg, removeDirectScheme }: DirectSchemeNoteProps) {

  const handleBtn = (value: string) => {
      removeDirectScheme(value)
   
    setShow(false)
  }
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >


      <hr className="my-0" />

      <Modal.Body>
        <p className="fs14px">
          {msg}
        </p>
      </Modal.Body>


      <Modal.Footer>

        <button type="button" className="customButtonNoBg px-4 mx-auto d-block" onClick={() => handleBtn("RM")}>{"Connect to our experts"}</button>
        <button type="button" className="customButton px-4 mx-auto d-block" onClick={() => handleBtn("Proceed")}>{"Proceed With Regular Schemes"}</button>
      </Modal.Footer>
    </Modal>
  );
}

export default DirectSchemeNote;
