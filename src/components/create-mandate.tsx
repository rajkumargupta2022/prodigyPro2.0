import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
import { amountHandler } from "../services/utils/calculatorsFs";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { errorToast, successToast } from "../services/utils/toast";

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  accountNumber:string,
  ifscCode:string,
  accountType:string
}
const shortAmount={
  minValue:1000,
  twoKValue:2000,
  threeKValue:3000,
  fiveKValue:5000
  
}

const CreateMandate: React.FC<investmetProps> = ({ show, setShow,accountNumber,ifscCode,accountType }) => {
  // const [openBankMandate, setOpenBankMandate] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [amount,setAmount] = useState<number>(1000)
  const [fromDate,setFromDate] = useState<string>()
  const [toDate,setToDate] = useState<string>()
   const today = new Date().toISOString().split("T")[0];

  
  const updateAmount = (value:number)=>{
       setAmount(amount+value)
  }
  const fromDateHandle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFromDate(e.target.value)
  }

  const toDateHandle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setToDate(e.target.value)
  }

  const createMandate =async ()=>{

    try{
      const reqBody ={
        account_number:accountNumber,
        ifsc_code:ifscCode,
        account_type:accountType,
        amount:amount.toString(),
        start_date:`${fromDate} 00:00:00.000`,
        end_date:`${toDate} 00:00:00.000`
      }
   
       const res = await postRequest<any>(endPoints.createMandate,reqBody)
       if(res.success){
         successToast("Successfully created")
       }
    }catch(err){
       errorToast(err)
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Create Mandate</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <div className="borderColor p-3 rounded-4 bg-white">
            <span className="sub-heading modal-heading">Mandate Details</span>
             {/*  <p className="form-label mt-2">MODE</p>
          <div className="row">
              <div>
                <button type="button" className="btn shortcutValue">
                  Debit Card
                </button>

                <button type="button" className="btn shortcutValue mx-1">
                  Net Banking
                </button>
              </div>
            </div> */}
            <form>
              <div className="form-group mt-3">
                <label htmlFor="amountFor" className="fs12px">
                  MANDATE AMOUNT
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amountFor"
                  aria-describedby="emailHelp"
                  value={amount}

                  onChange={(e)=>amountHandler(e,1000000,setAmount)}
                />
                <div className=" mt-2">
                  <button type="button" className="btn shortcutValue"onClick={()=>updateAmount(shortAmount.minValue)} >
                    Min.
                  </button>
                  <button type="button" className="btn shortcutValue mx-1" onClick={()=>updateAmount(shortAmount.twoKValue)}>
                    <CurrencyRupee className="mb-1" />
                    {shortAmount.twoKValue}
                  </button>
                  <button type="button" className="btn shortcutValue mx-1" onClick={()=>updateAmount(shortAmount.threeKValue)}>
                    <CurrencyRupee className="mb-1" />
                   {shortAmount.threeKValue}
                  </button>
                  <button type="button" className="btn shortcutValue mx-1"onClick={()=>updateAmount(shortAmount.fiveKValue)}>
                    <CurrencyRupee className="mb-1" />
                    {shortAmount.fiveKValue}
                  </button>
                </div>
                <div className="text-center">
                  <span className="D4D4D4D px-3"> Unit Cancelled</span>
                  <label className="d-inline-flex align-items-center position-relative">
                    <input
                      type="checkbox"
                      className="d-none"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <div
                      className={`position-relative rounded-pill`}
                      style={{
                        width: "45px",
                        height: "8px",
                        transition: "background 0.3s",
                        backgroundColor: checked ? "#CCD2FF" : "#ccc",
                      }}
                    ></div>
                    <div
                      className="position-absolute rounded-circle"
                      style={{
                        width: "17px",
                        height: "17px",
                        backgroundColor: "#1A35FE",
                        left: checked ? "35px" : "0px",
                        transition: "left 0.3s",
                      }}
                    ></div>
                  </label>
                </div>

                {checked && (
                  <div className="d-flex mt-3">
                    <div className="w-100 me-2">
                      <label className="form-label mt-2">FROM</label>
                      <input type="date" className="form-control" value={fromDate} onChange={fromDateHandle} min={fromDate || today}/>
                    </div>

                    <div className="w-100 ms-2">
                      <label className="form-label mt-2">To</label>
                      <input type="date" className="form-control" value={toDate} onChange={toDateHandle} min={toDate || today}/>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>

        <small className="fs12px p-2 modal-bg text-center">
          Please click here to view the list of eligible banks for e-mandate. If
          your bank is not listed, kindly raise a query <br />
          to initiate the offline process for mandate registration.
        </small>
        <small className="p-2 fs12px modal-bg text-center">
          The debit mandate amount represents the daily maximum limit per
          transaction.
          <div className="mb-3 mt-3">
            <button className="mandate-button" onClick={createMandate}>Proceed</button>
          </div>
        </small>
      </Modal>
    </>
  );
};

export default CreateMandate;
