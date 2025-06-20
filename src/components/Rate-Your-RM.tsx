import Modal from "react-bootstrap/Modal";
import { Rating } from "react-simple-star-rating";

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const RateYourRM: React.FC<investmetProps> = ({ show, setShow }) => {
  // const [rating, setRating] = useState(0);

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  const handleRating = () => {
    // setRating(rate);

    // other logic
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
          <Modal.Title>Rate Your RM</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <span className="rate">Rate your experinces</span>
          <br />

          <Rating
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            fillColor="#1bb66a"
            /* Available Props */
          />
          <textarea
            cols={10}
            rows={5}
            className="form-control mt-4"
            placeholder="Describe your experience"
          />

          <div className="text-center mt-3">
            <button className="mandate-button">Submit</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RateYourRM;
