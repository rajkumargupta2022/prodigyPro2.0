import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OtpInput from 'react-otp-input';
import { postRequest } from '../services/Api/HandleApi';
import { resendOtpRes, varifyOtpRes } from '../pages/data-interfaces/users';
import { endPoints } from '../services/utils/urls';
import { errorToast, successToast } from '../services/utils/toast';
import { useAdminUser } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

interface otpFieldProps {
  show: boolean;
  setShow: (show: boolean) => void;
  requestId: string,
  mobile: string
}

const OtpField: React.FC<otpFieldProps> = ({ show, setShow, requestId, mobile }) => {
  const navigate = useNavigate()
  const { fetchFamilyPortfoloData, switchProfile } = useAdminUser()
  const [otp, setOtp] = useState<string>();
  const [counter, setCounter] = useState<number>(60);

  useEffect(() => {
    if (show) {
      let timer: number;
      if (counter > 0) {
        timer = setTimeout(() => setCounter(prev => prev - 1), 1000);
      }
      return () => clearTimeout(timer);
    }

  }, [counter, show]);

  const handleClose = () => setShow(false);
  const handleVarifyOtp = async () => {
    if (!otp || otp.trim().length !== 4 || isNaN(Number(otp))) {
      errorToast("Please enter a valid 4-digit OTP");
      return;
    }
    try {
      const reqBody = {
        request_id: requestId,
        user_otp: Number(otp)
      }
      const res = await postRequest<varifyOtpRes>(endPoints.verifyFamilyMemberOtp, reqBody)
      if (res.success) {
        localStorage.removeItem("familyList")
        await fetchFamilyPortfoloData()
        let adminData: any = localStorage.getItem("familyList")
        adminData = JSON.parse(adminData)
        const result = adminData?.find((obj: any) => obj.ucc === res?.member_ucc);
        switchProfile(result)
        navigate("/")
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
  const resendOtp = async () => {
    try {
      const res = await postRequest<resendOtpRes>(endPoints.resendFamilyMemberOtp, {
        request_id: requestId,
      });
      if (res.success) {
        successToast(res.msg);
        setCounter(60)
      } else {
        errorToast(res);
      }
    } catch (err) {
      errorToast(err);
    }

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
          <p className='fs14px'>OTP sent to +91 XXXXXXX{mobile.slice(-3)}</p>
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
        <p className="fs12px text-center"> Don’t receive the OTP? {counter}<button className={`${counter === 0 && "logoBlueColor"} crPointer fs12px border-0 bg-transparent`} disabled={(counter > 0)} onClick={resendOtp}>Resend OTP</button></p>
      </Modal>
    </>
  );
}

export default OtpField;