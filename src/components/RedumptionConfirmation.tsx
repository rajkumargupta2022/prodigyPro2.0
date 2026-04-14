import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import OrderPlaces from './order-places';
import RedumptionForm from './RedumptionForm';
import { redeemTransaction } from '../services/utils/transactionApi';
import { errorToast } from '../services/utils/toast';
import { checkIsSIFScheme } from '../services/utils/services';
import { uccMsg, UccStatusEnum } from '../pages/data/ucc-data';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  redeemList: any[],
  setRedeemList: (date: any) => void;
}


const RedumptionConfirmation: React.FC<investmetProps> = ({ show, setShow, redeemList, setRedeemList }) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successData, setSuccessData] = useState<any[]>([])
  const [selectedList, setSelectedList] = useState<any>(new Map())


  useEffect(() => {
    setSelectedList(JSON.parse(JSON.stringify(redeemList)))
  }, [show])
  const handleSwitch = () => {
    const uccStatus = localStorage.getItem("uccStatus")
    if (uccStatus !== UccStatusEnum.ACTIVE) {
      errorToast(uccMsg.uccUpdateMsg)
      return
    }

    const finalData = redeemList.filter(rs => {
      return selectedList.some((ss: any) => rs.id === ss.id);
    });

    if (finalData.length === 0) {
      errorToast(`Please select at least one scheme for redeem`);
      return
    }


    for (const item2 of finalData) {

      if (!item2.amount && !item2.redemption_units) {
        errorToast(`Please enter amount or units for ${item2.scheme}`);
        return;
      }
      if (checkIsSIFScheme(item2.scheme) && (!(item2.all_units ?? false))) {
        const tenLakh = 1000000
        let inputAmount = item2.redemption_units ? item2.redemption_units ?? 0 * (item2?.cnav ?? 0) : (item2.amount ?? 0)
        let currentValue = Number(item2.currentvalue)
        let redeemableAmount = currentValue - tenLakh
        if (inputAmount > redeemableAmount) {
          errorToast(`Max partial you can redeem is ${redeemableAmount} of ${item2.scheme} OR full redeem available`);
          return
        }

      }
    }

    redeemTransaction(finalData, "redemption", setSuccessData).then((res) => {
      console.log(res);

      setOpenSuccess(true)
      setShow(false)

    })

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
          <RedumptionForm redeemList={redeemList} setRedeemList={setRedeemList} selectedList={selectedList} setSelectedList={setSelectedList} />

        </Modal.Body>
        <small className='px-3 fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwitch}>Redeem</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successData} isRedeem={true} />

    </>
  );
}

export default RedumptionConfirmation;