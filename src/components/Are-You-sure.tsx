import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
interface AreYouSureProps {
  show: boolean;
  setShow: (show: boolean) => void
}

const AreYouSure: React.FC<AreYouSureProps> = ({ show, setShow }) => {
  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("pan")
    localStorage.removeItem("isNewUser")
    localStorage.removeItem("mobile")
    localStorage.removeItem("adminUser")
    localStorage.removeItem("familyList")
    localStorage.removeItem("uccStatus")
    localStorage.removeItem("portfolioType")
    localStorage.removeItem("loanAgainstMFVisited")
    navigate("/")
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
              Are you sure you want to <br /> logout?
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <button className='customCancelButton buttunCenter px-3' onClick={handleClose}>Cancel</button>
            <button className='customButton buttunCenter px-3' onClick={logout}>Logout</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>

  );
}

export default AreYouSure;