import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

interface otpFieldProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const OtpField: React.FC<otpFieldProps> = ({ show, setShow }) => {
  const [otp, setOtp] = useState<string>();
  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleVarifyOtp = () => {
    setShow(false)
    navigate("/portfolio-under-review")
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
        contentClassName="modal-bg smallModel"
      >
        <Modal.Header closeButton >
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <p className='fs14px'>OTP sent to +91 876167 7761 via MF Central</p>
          <div className="mb-2">
            <OtpInput
              value={otp}
              inputStyle="col otpBox"
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className='modal-bg justify-content-center'>
          <Button className='customButton' onClick={handleVarifyOtp}>Varify OTP</Button>
        </Modal.Footer>
        <p className="fs12px text-center">Don’t receive the OTP? Resend</p>
      </Modal>
    </>
  );
}

export default OtpField;