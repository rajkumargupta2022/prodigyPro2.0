import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';
import OrderPlaces from './order-places';
import icici from "../assets/img/bank-logo/icici.png"
import { Form } from 'react-bootstrap';
import { detailPortfolioSchemeType } from '../pages/data-interfaces/portfolio';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
   swpList:detailPortfolioSchemeType[],
      setSwpList: (date: any) => void;
}


const SwpConfirmation: React.FC<investmetProps> = ({ show, setShow,swpList,setSwpList }) => {
  const [openSuccess, setOpenSuccess] = useState(false)

  const handleSwpTransaction = () => {
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
          <Modal.Title>Swp Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <div className="borderColor p-3 headerRadius bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Selected fund 2</p>
                </div>
              </div>

            </div>


            <hr />
            <div className="row text-start my-2">
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Current Value (As on 14 Jan)</p>
                <small className='fs16px'>₹56,304.16</small>
              </div>
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Total Units</p>
                <small className='fs16px'>56,304.16</small>
              </div>
            </div>


            <div className="form-group">
              <label htmlFor="amountFor" className='fs12px'>SWP AMOUNT</label>
              <input type="text" className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder="Enter Amount" />
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="amountFor" className='fs12px'>FREQUENCY</label>
                <Form.Select >
                  <option>Monthly</option>
                  <option>Quarterly </option>
                  <option>Half Yearly</option>
                  <option>Yearly</option>
                </Form.Select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="amountFor" className='fs12px'>SWP DAY</label>
                 <Form.Select >
                  <option>14th of every month</option>
                </Form.Select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="amountFor" className='fs12px'>FROM</label>
                <input type="date" className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder="Enter Amount" />
              </div>
              <div className="form-group col-6 ">
                <label htmlFor="amountFor" className='fs12px'>TO</label>
                <input type="date" className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder="Enter Amount" />
              </div>
            </div>


          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>SWP orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center mx-2'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwpTransaction}>Trnsfer</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={[]} />
    </>
  );
}

export default SwpConfirmation;