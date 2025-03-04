import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ArrowDown } from 'react-bootstrap-icons';
import sbi from "../assets/img/bank-logo/sbi.png"
import SwitchConfirmation from './SwitchConfirmation';
interface SwitchFundProp {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SwitchFund: React.FC<SwitchFundProp> = ({ show, setShow }) => {
  const [openInvestmentConfirmation, setOpenInvestmentConfirmation] = useState<boolean>(false)

  const handleInvestmentConfirmation = () => {
    setOpenInvestmentConfirmation(true)
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
          <Modal.Title>Select Folio</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <Card className='rounded-4 shadow-lg border-0 mb-2'>
            <Card.Body>
              <div className="row">
                <div className="col-12 d-flex align-items-start">
                  <img src={sbi} alt="" />
                  <div className=" ps-2">
                    <p className="fs16px">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</p>
                  </div>
                </div>
                <div className="col-5 d-flex justify-content-end mt-2">
                  <p className='fs14px'>IDEAL INVEST. HORIZEN</p>
                </div>
                <div className="col-7 d-flex justify-content-end">
                  <p className='fs14px text-dark'>7 Years</p>
                </div>
                <div className="col-5 d-flex justify-content-end mb-0">
                  <p className='fs14px'>FUND RETURN</p>
                </div>
                <div className="col-5 progress sqrBar mb-0">
                  <div className="progress-bar logobg_color " style={{ width: "100%" }}></div>
                </div>
                <div className="col-2 d-flex justify-content-end mb-0">
                  <p className='fs14px text-dark'>14.98%</p>
                </div>
                <div className="col-5 d-flex justify-content-end mb-0">
                  <p className='fs14px'>BENCHMARK RETURN</p>
                </div>
                <div className="col-5 progress sqrBar bg-white mb-0">
                  <div className="progress-bar orangeBg " style={{ width: "40%" }}></div>
                </div>
                <div className="col-2 d-flex justify-content-end mb-0">
                  <p className='fs14px text-dark'>14.98%</p>
                </div>
                <div className="col-5 d-flex justify-content-end bg-white mb-0">
                  <p className='fs14px'>CATEGORY RETURN</p>
                </div>
                <div className="col-5 progress sqrBar bg-white mb-0">
                  <div className="progress-bar orangeBg " style={{ width: "30%" }}></div>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <p className='fs14px text-dark'>14.98%</p>
                </div>
                <div className="col-10">
                  <p className='fs14px'>NEGATIVE OBSERVATIONS</p>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <p className='fs14px text-dark'>2</p>
                </div>
                <div className="col-6">
                  <p className='fs14px'>NOTE</p>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <p className='fs14px text-dark'>RAJKUMAR GUPTA</p>
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="d-flex align-items-center my-2">
            <hr className="flex-grow-1" />
            <div className='rounded-4 lightTrxBtn'><ArrowDown /> SWITCH</div>
            <hr className="flex-grow-1" />
          </div>
          <Card className='rounded-4 shadow-sm border-0 mb-3'>
            <Card.Body>
              <div className="row">
                <div className="col-12 d-flex align-items-start">
                  <img src={sbi} alt="" />
                  <div className=" ps-2">
                    <p className="fs16px">Kotak Nifty Small Cap 250 Index Fund - Regular (G)</p>
                  </div>
                </div>
                <div className="col-5 d-flex justify-content-end mt-2">
                  <p className='fs14px'>IDEAL INVEST. HORIZEN</p>
                </div>
                <div className="col-7 d-flex justify-content-end">
                  <p className='fs14px text-dark'>7 Years</p>
                </div>
                <div className="col-5 d-flex justify-content-end mb-0">
                  <p className='fs14px'>FUND RETURN</p>
                </div>
                <div className="col-5 progress sqrBar mb-0">
                  <div className="progress-bar logobg_color " style={{ width: "100%" }}></div>
                </div>
                <div className="col-2 d-flex justify-content-end mb-0">
                  <p className='fs14px text-dark'>14.98%</p>
                </div>
                <div className="col-5 d-flex justify-content-end mb-0">
                  <p className='fs14px'>BENCHMARK RETURN</p>
                </div>
                <div className="col-5 progress sqrBar bg-white mb-0">
                  <div className="progress-bar orangeBg " style={{ width: "40%" }}></div>
                </div>
                <div className="col-2 d-flex justify-content-end mb-0">
                  <p className='fs14px text-dark'>14.98%</p>
                </div>
                <div className="col-5 d-flex justify-content-end bg-white mb-0">
                  <p className='fs14px'>CATEGORY RETURN</p>
                </div>
                <div className="col-5 progress sqrBar bg-white mb-0">
                  <div className="progress-bar orangeBg " style={{ width: "30%" }}></div>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <p className='fs14px text-dark'>14.98%</p>
                </div>
                <div className="col-10">
                  <p className='fs14px'>NEGATIVE OBSERVATIONS</p>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <p className='fs14px text-dark'>2</p>
                </div>
                <div className="col-6">
                  <p className='fs14px'>NOTE</p>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <p className='fs14px text-dark'>RAJKUMAR GUPTA</p>
                </div>
              </div>
            </Card.Body>
          </Card>

        </Modal.Body>
        <Modal.Footer className='modal-bg'>
          <Button className='customButton ' onClick={handleInvestmentConfirmation}>Switch</Button>
        </Modal.Footer>
      </Modal>
      <SwitchConfirmation show={openInvestmentConfirmation} setShow={setOpenInvestmentConfirmation}/>
    </>
  );
}

export default SwitchFund;