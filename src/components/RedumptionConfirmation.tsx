import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import {  useState } from 'react';
import OrderPlaces from './order-places';
import RedumptionForm from './RedumptionForm';
import { detailPortfolioSchemeType } from '../pages/data-interfaces/portfolio';
import { redeemTransaction } from '../services/utils/transactionApi';
import { errorToast } from '../services/utils/toast';
import { checkIsSIFScheme } from '../services/utils/services';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  redeemList: detailPortfolioSchemeType[],
  setRedeemList: (date: any) => void;
}


const RedumptionConfirmation: React.FC<investmetProps> = ({ show, setShow, redeemList, setRedeemList }) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successData, setSuccessData] = useState<any[]>([])


  const handleSwitch = () => {
    for (const item2 of redeemList) {

      if (!item2.amount && !item2.redemption_units) {
        errorToast(`Please enter amount or units for ${item2.scheme}`);
        return;
      }
      if (checkIsSIFScheme(item2.scheme) && (!(item2.all_units ?? false))) {
        const tenLakh = 1000000
        let inputAmount = item2.redemption_units ? item2.redemption_units * item2.cnav : (item2.amount ?? 0)
        let currentValue = Number(item2.currentvalue)
        let redeemableAmount = currentValue - tenLakh
        if (inputAmount > redeemableAmount) {
          errorToast(`Max partial you can redeem is ${redeemableAmount} of ${item2.scheme} OR full redeem available`);
          return
        }

      }
    }

    redeemTransaction(redeemList, "redemption", setSuccessData).then((res) => {
      console.log(res);

    })
    setOpenSuccess(true)
    setShow(false)
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
          <Modal.Title>Redemption Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <RedumptionForm redeemList={redeemList} setRedeemList={setRedeemList} />
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Redemption orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='px-3 fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwitch}>Redeem</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successData} />
    
    </>
  );
}

export default RedumptionConfirmation;