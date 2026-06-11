import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Card } from 'react-bootstrap';
import { currentDateInStringNumber } from '../../services/dates/dateFormater';
import { detailPortfolioSchemeType } from '../data-interfaces/portfolio';
import { endPoints, imageUrl } from '../../services/utils/urls';
import { useEffect, useState } from 'react';
import { fetchAdminUser } from '../../services/user/adminUser';
import { postRequest } from '../../services/Api/HandleApi';
import { errorToast } from '../../services/utils/toast';
import { bajanjInstaRedeemRes } from '../data-interfaces/emergency-portfolio';
import InstaRedeemOtp from './InstaRedeemOtp';
import RedumptionConfirmation from '../../components/RedumptionConfirmation';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  redeemList: detailPortfolioSchemeType,


}


const InstaRedeem: React.FC<investmetProps> = ({ show, setShow, redeemList }) => {
  const [redemptionDetail, setRedemptionDetail] = useState<detailPortfolioSchemeType[]>([redeemList])
  const [openOtmpModel, setOpenOtmpModel] = useState<boolean>(false)
  const [transactionReferenceNo, setTransactionReferenceNo] = useState<string>("")
  const [openRedumptionModel, setOpenRedumptionModel] = useState<boolean>(false)
  const [amountMsg,setAmountMsg] = useState<string>("")
  useEffect(() => {
    setRedemptionDetail([redeemList])
    updateDefaultAmount()
    
  }, [show])
  const updateDefaultAmount = () => {
    const maxAmount = getMaxRedeemableAmount(Number(redemptionDetail[0]?.currentvalue) ?? 0, 50000);  
     setRedemptionDetail(prev => {
    const updated = [...prev];
    updated[0] = {
      ...updated[0],
      amount: maxAmount
    };
    return updated;
  });
  }


function getMaxRedeemableAmount(currentValue:number, maxRedeemableAmount:number) {
  if (currentValue === 0) {
    return 0;
  }

  const maxFromCurrentValue = 0.9 * currentValue; // 90% of current value

  return Math.floor(
    maxFromCurrentValue < maxRedeemableAmount
      ? maxFromCurrentValue
      : maxRedeemableAmount
  );
}

  const amountHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
   setAmountMsg("");


  let value = Number(inputValue);
  if (Number.isNaN(value)) return;

  const maxAmount = getMaxRedeemableAmount(Number(redemptionDetail[0]?.currentvalue)??0, 50000);

  if (value > maxAmount) {
    value = maxAmount;
    setAmountMsg(`Maximum redeemable amount is ₹${maxAmount.toLocaleString("en-IN")}`);
  }

  setRedemptionDetail(prev => {
    const updated = [...prev];
    updated[0] = {
      ...updated[0],
      amount: value
    };
    return updated;
  });
};


  const handleFinalRedeem = async () => {
    if (!redemptionDetail[0]?.amount) {
      errorToast("Please enter amount")
      return
    }
    const adminUser = fetchAdminUser()
    const reqBody = {
      ucc: adminUser?.ucc,
      folio_number: redemptionDetail[0]?.folio??"",
      accord_product_code: redemptionDetail[0].accordSchemeCode,
      scheme_name: redemptionDetail[0]?.scheme,
      amount: redemptionDetail[0]?.amount,
    }
    try {

      const res = await postRequest<bajanjInstaRedeemRes>(endPoints.initiateInstaRedeem, reqBody);
      if (res.success) {
        setOpenOtmpModel(true)
        setShow(false)
        setTransactionReferenceNo(res.transaction_reference_no)
      }
    } catch (err) {
      errorToast(err)
    }

  }
  const normalRedeem  = ()=>{
     setShow(false)
     setOpenRedumptionModel(true)
  }
  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title>Insta Redeem Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <div className={`rounded-4 bg-white overflow-hidden mb-3 shadow-sm`} >
            <div className="p-4">

            <div className="d-flex justify-content-between">

              <div className="d-flex">
                <div className="prod_icon_img">

                  <img src={imageUrl + redemptionDetail[0].accordAMCCode + ".png"} height={35} width={35} alt="" className="rounded" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{redemptionDetail[0].scheme}</h4>
                  {redemptionDetail[0].folio ? <p>Folio: {redemptionDetail[0].folio}</p> : ""}
                </div>
              </div>
            </div>
            <hr />

            <div className="row text-start ">
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Current Value (As on {currentDateInStringNumber()})</p>
                <small className='fs16px'>₹{Number(redemptionDetail[0]?.currentvalue)?.toLocaleString("en-IN")}</small>
              </div>
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Total Units</p>
                <small className='fs16px'>{Number(redemptionDetail[0]?.unit)?.toLocaleString("en-IN")}</small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amountFor" className='fs12px'>REDEMPTION AMOUNT</label>
              <input type="text" className="form-control" value={redemptionDetail[0].amount ?? 0} id="amountFor" onChange={amountHandle} aria-describedby="emailHelp" placeholder={`${"Enter Amount"}`} />
              {amountMsg && <small className='text-danger'>{amountMsg}</small>}
            </div>



            </div>
            <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Redemption orders once placed cannot be cancelled.</Card.Header>
          </div>


        </Modal.Body>
        <small className='px-3 fs12px modal-bg text-center'>Get instant access to your money, subject to the prescribed limit.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleFinalRedeem}>Redeem</Button>
        </Modal.Footer>
        <small className='mt-0 mb-3 fs12px modal-bg text-center' >To redeem an amount beyond the prescribed limit, <small className='crPointer logoBlueColor' onClick={normalRedeem}>click here
        </small> .</small>
      </Modal>

      <InstaRedeemOtp show={openOtmpModel} setShow={setOpenOtmpModel} requestId={transactionReferenceNo} />
      <RedumptionConfirmation show={openRedumptionModel} setShow={setOpenRedumptionModel} redeemList={redemptionDetail} setRedeemList={setRedemptionDetail} />


    </>
  );
}

export default InstaRedeem;