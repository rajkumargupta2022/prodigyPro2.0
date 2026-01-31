import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Rating } from "react-simple-star-rating";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { errorToast, successToast } from "../services/utils/toast";

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  rmId?:string
}

const RateYourRM: React.FC<investmetProps> = ({ show, setShow,rmId }) => {
  const [rating, setRating] = useState<number>(5);
  const [msg,setMsg] = useState<string>("")

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  const handleRating = (rate:number) => {
    setRating(rate);
  };
  const handleMsg = (e:any)=>{
    setMsg(e.target.value)
  }
const saveRm =async ()=>{
  const reqBody = {
    RMID:rmId,
    rating,
    msg
  }
  try{
    await postRequest<any>(endPoints.rateRm,reqBody)
    successToast({msg:"Thankyou. Your rating submit successfully."})
    setShow(false)
  }catch(err){
    errorToast(err);
    
  }

}
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
            fillColor="#059851ff"
            initialValue={rating}
            /* Available Props */
          />
          <textarea
            cols={10}
            rows={5}
            onChange={handleMsg}
            value={msg}
            className="form-control mt-4"
            placeholder="Describe your experience"
          />

          <div className="text-center mt-3">
            <button className="mandate-button" onClick={saveRm}>Submit</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RateYourRM;
