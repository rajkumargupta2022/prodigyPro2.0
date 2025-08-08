import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';
import OrderPlaces from './order-places';
import RedumptionForm from './RedumptionForm';
import { schemeDeatilDataKeys } from '../pages/data-interfaces/transact';
import { detailPortfolioSchemeType } from '../pages/data-interfaces/portfolio';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
    setSchemeList: (date: any) => void;
    redeemList:detailPortfolioSchemeType[]
}


const RedumptionConfirmation: React.FC<investmetProps> = ({ show, setShow,schemeList,setSchemeList,redeemList }) => {
  const [openSuccess,setOpenSuccess] = useState(false)

  const handleSwitch = ()=>{
    setOpenSuccess(true)
    setShow(false)
  }
  console.log("schemelsit redumption",schemeList);
  

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
            <RedumptionForm redeemList={redeemList} />
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Redemption orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='px-3 fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwitch}>Redeem</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={[]}/>
    </>
  );
}

export default RedumptionConfirmation;