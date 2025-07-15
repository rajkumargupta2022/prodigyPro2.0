import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Calendar4, CurrencyRupee } from 'react-bootstrap-icons';
import icici from "../assets/img/bank-logo/icici.png"
import BankMandate from './BankMandate';
import SipDates from './SipDate';
import { amountHandler } from '../services/utils/calculatorsFs';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
interface addAmountKeys{
  first:number;
  second:number;
  third:number
}

const InvetmentConfirmation: React.FC<investmetProps> = ({ show, setShow }) => {
  const [openBankMandate,setOpenBankMandate] = useState<boolean>(false)
  const [sipDateShow,setSipDateShow] = useState<boolean>(false)
  const [amount,setAmount] = useState<number>(0)
  const [addAmountValues,setAddAmountValues] = useState<addAmountKeys>({
  first:1000,
  second:2000,
  third:5000
})
 const [sipDate, setSipDate] = useState<number>(14)

  const handleSipDate = (value: number) => {
    setSipDate(value)
    setSipDateShow(false)
  }

  const handleBankMandate = ()=>{
    setOpenBankMandate(true)
    setShow(false)
  }

  const addAmount = (value:number)=>{
    setAmount(amount+value)
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
          <Modal.Title>Investment Confirmation</Modal.Title>
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
              <div className="prod_view_fund align-self-center">
                <div className="logoBlueColor crPointer fs12px">View Funds</div>
              </div>
            </div>
            <hr />
            <div className="row text-center mt-2">
              <div className="col-md-6 py-2 py-md-0">
                <div className='text-white w-100 border logobg_color text-center monthly_btn'> Monthly SIP</div>
              </div>
              <div className="col-md-6 py-2 py-md-0">
                <div className='logoBlueColor border w-100 text-center monthly_btn'> One-Time </div>
              </div>
            </div>
            <form>
              <div className="d-flex justify-content-between mt-3" onClick={()=>setSipDateShow(true)}>
                <div className="d-flex">
                  <div className="ms-2 prod_icon_heading">
                    <p>Day of SIP</p>
                    <h4 className='my-2'>{sipDate}th on every month</h4>
                  </div>
                </div>
                <div className="prod_view_fund align-self-center">
                  <div className="crPointer dateIcon"><Calendar4 className='' /></div>
                </div>
              </div>
              <hr className='mt-0' />
              <div className="form-group">
                <label htmlFor="amountFor" className='fs12px'>INVESTMENT AMOUNT</label>
                <input type="text" className="form-control" value={amount} onChange={(e)=>amountHandler(e,1000000,setAmount)}  id="amountFor" aria-describedby="emailHelp" placeholder="Enter Amount" />
                <div className=" mt-2">
                  <button type="button" className="btn shortcutValue">Min.</button>
                  <button type="button" className="btn shortcutValue mx-1" onClick={()=>addAmount(addAmountValues.first)}><CurrencyRupee className='mb-1' />1,000</button>
                  <button type="button" className="btn shortcutValue mx-1" onClick={()=>addAmount(addAmountValues.second)}><CurrencyRupee className='mb-1' />2,000</button>
                  <button type="button" className="btn shortcutValue mx-1" onClick={()=>addAmount(addAmountValues.third)}><CurrencyRupee className='mb-1' />5,000</button>
                </div>
              </div>
            </form>
          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>NAV applicable once amount credited to AMC’s bank account</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center'>By continuing, I agree with the  Disclaimers and Terms & Conditions</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleBankMandate}>Continue</Button>
        </Modal.Footer>
      </Modal>
      <SipDates show={sipDateShow} setShow={setSipDateShow} sipDate={sipDate} handleSipDate={handleSipDate} />
      <BankMandate show={openBankMandate} setShow={setOpenBankMandate}/>
    </>
  );
}

export default InvetmentConfirmation;