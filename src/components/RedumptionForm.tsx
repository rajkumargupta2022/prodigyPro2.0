import { useState } from "react";
import icici from "../assets/img/bank-logo/icici.png"
const RedumptionForm = ()=>{
  const [amount,setAmount] =useState<number>(0)
  const [redeemType,setRedeemType] =useState<string>("N")

  const handleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxAmount: number,
    setter: (value: number) => void
  ): void => {
    let value = Number(e.target.value.trim());
    if (value <= 1000000000) {
      setter(value);
    } else if (value >= maxAmount) {
      setter(maxAmount);
    }
  };
 const handleRedemptionType = (value:string)=>{
    setRedeemType(value)
 }
  
  return(
    <>
     <div className="borderColor p-3 headerRadius bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Equity: Flexi Cap</p>
                </div>
              </div>

            </div>
          
            <hr />
            <div className="row text-center my-3">
              <div className="col-md-6 py-2 py-md-0" onClick={()=>handleRedemptionType("N")}>
                <div className={`${redeemType==="N" ? "unitBtnActive" :"unitDeActiveBtn" }`}> Amount</div>
              </div>
              <div className="col-md-6 py-2 py-md-0"  onClick={()=>handleRedemptionType("Y")}>
                <div className={`${redeemType==="N" ? "unitDeActiveBtn" :"unitBtnActive" }`}> Units </div>
              </div>
            </div>
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
                <label htmlFor="amountFor" className='fs12px'>REDUMPTION {redeemType==="N" ? "AMOUNT" :"UNIT" }</label>
                <input type="text" className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder={`${redeemType==="N"?"Enter Amount":"Enter Unit"}`} onChange={(e)=>handleAmount(e,10000000,setAmount)}/>
      
              </div>
              {redeemType==="Y"&&
               <div className=" mt-2 form-check form-switch d-flex justify-content-center ps-0" >
                  <div className="form-check-label greyColor">Redeem All Units</div>
                  &nbsp;&emsp;&emsp;&emsp;<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                </div>}
          </div>
    </>
  )
}
export default RedumptionForm