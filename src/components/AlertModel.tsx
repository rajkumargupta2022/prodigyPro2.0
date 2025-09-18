import Modal from 'react-bootstrap/Modal';
interface AlertModelProps {
  show: boolean;
  setShow: (show: boolean) => void,
  title:string,
  msg:string,
  apiFun:()=>void
}

const AlertModel: React.FC<AlertModelProps> = ({ show, setShow,title,msg,apiFun }) => {
  // const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const proceed =async ()=>{
    await apiFun()
  }
  return (

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="modal-bg smallModel shadow-lg"
    >

      <Modal.Body className='p-3 rounded-4 w-fit-contet m-auto  my-2'>
        <div className="p-2">
          <div className="text-center">
            
            <p className='fs-5'>
             {msg}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <button className='customCancelButton buttunCenter px-3' onClick={handleClose}>Cancel</button>
            <button className='customButton buttunCenter px-3' onClick={proceed}>{title}</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>

  );
}

export default AlertModel;