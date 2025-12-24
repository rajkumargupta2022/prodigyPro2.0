import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OtpInput from 'react-otp-input';
import { postRequest } from '../../services/Api/HandleApi';
import { endPoints } from '../../services/utils/urls';
import { errorToast, successToast } from '../../services/utils/toast';
import { fetchAdminUser } from '../../services/user/adminUser';
import OrderPlaces from '../../components/order-places';

interface InstaRedeemOtpProps {
  show: boolean;
  setShow: (show: boolean) => void;
  requestId: string
}

const InstaRedeemOtp: React.FC<InstaRedeemOtpProps> = ({ show, setShow, requestId }) => {
  
  const [otp, setOtp] = useState<string>();
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<any[]>([]);

 

  const handleClose = () => setShow(false);
  const handleVarifyOtp = async () => {
    if (!otp || otp.trim().length !== 6 || isNaN(Number(otp))) {
      errorToast("Please enter a valid 6-digit OTP");
      return;
    }
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        transaction_reference_no: requestId,
        otp: otp
      }
      const res = await postRequest<any>(endPoints.confirmInstaRedeemOtp, reqBody)
      if (res.success) {
          setSuccessData(res.data)
          setOpenSuccess(true)
        successToast(res.msg)
      } else {
        errorToast(res.msg)
      }
    } catch (err) {
      errorToast(err)
    }
    setShow(false)
    // navigate("/portfolio-under-review")
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
          <p className='fs14px'>An OTP has been sent to your registered mobile number for redemption confirmation.</p>
          <div className="mb-2">
            <OtpInput
              value={otp}
              inputStyle="col otpBox"
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className='modal-bg justify-content-center'>
          <Button className='customButton' onClick={handleVarifyOtp}>Varify OTP</Button>
        </Modal.Footer>
      </Modal>
          <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successData} />
    </>
  );
}

export default InstaRedeemOtp;