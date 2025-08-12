import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';
import OrderPlaces from './order-places';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
}


const SwitchSchemeModel: React.FC<investmetProps> = ({ show, setShow }) => {
  const [openSuccess,setOpenSuccess] = useState(false)

  const handleSwitch = ()=>{
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
          <Modal.Title >Select a New Fund to Switch</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
            {/* <SwitchSchemes filteredSchemes={[]}/> */}
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Switch orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwitch}>Switch</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={[]} />
    </>
  );
}

export default SwitchSchemeModel;