import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Calendar4, CurrencyRupee } from 'react-bootstrap-icons';
import CreateNewFolio from './CreateNewFolio';
import icici from "../assets/img/bank-logo/icici.png"
interface bankMandate {
  show: boolean;
  setShow: (show: boolean) => void;
}

const BankMandate: React.FC<bankMandate> = ({ show, setShow }) => {
  // const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)



  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title>Select Bank Mandate</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <div className="borderColor p-3 rounded bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Digital Autopay: | <span className='congratesColor'>dfsf</span></p>
                  <p>Mandate ID: 123211</p>
                </div>
              </div>
                <div className=" round"> <input type="checkbox" id="mandate" />
                <label htmlFor="mandate"></label></div>
              </div>
              <div className="row">
                <div className="col-6">
                <p className='fs12px'>Digital Autopay:</p> 
                <small>Mandate ID: 123211</small>

                </div>
                <div className="col-6"></div>
              </div>
          </div>
          <div className="borderColor p-3 rounded bg-white mt-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Digital Autopay: | <span className='congratesColor'>dfsf</span></p>
                  <p>Mandate ID: 123211</p>
                </div>
              </div>
                <div className=" round"> <input type="checkbox" id="mandate" />
                <label htmlFor="mandate"></label></div>
              </div>
          </div>

        </Modal.Body>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' >Continue</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BankMandate;