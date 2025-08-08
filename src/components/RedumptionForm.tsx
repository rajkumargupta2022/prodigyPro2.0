import { useState } from "react";
import { useLocation } from "react-router-dom";
import { detailPortfolioSchemeType } from "../pages/data-interfaces/portfolio";
import { imageUrl } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { redeemBody, redeemBodyKeys } from "../pages/data-interfaces/transact";

interface investmetProps {
  redeemList: detailPortfolioSchemeType[]
}


const RedumptionForm: React.FC<investmetProps> = ({ redeemList }) => {

  const [amount, setAmount] = useState<number>(0)
  const [isRedeemAmount, setIsRedeemAmount] = useState<boolean>(false)



  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>, maxAmount: number, setter: (value: number) => void, index: number
  ): void => {
    let value = Number(e.target.value.trim());
    console.log("value", value);

    if (value <= 1000000000) {
      console.log("gggg");


      setter(value);
    } else if (1000000000 >= maxAmount && value > 0) {
      console.log("ggggrrr");

      setter(value);

    }
  };

  const handleRedemptionType = (value: boolean) => {
    setIsRedeemAmount(value)
    console.log(amount);
  }


  return (
    <>
      {redeemList?.length > 0 && redeemList.map((item, index) => {
        return (
          <div className="borderColor p-3 headerRadius bg-white" key={index}>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={imageUrl + item.amcCode + ".png"} height={35} width={35} alt="" className="rounded" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{item.scheme}</h4>
                  <p>Equity: {item.equity}</p>
                </div>
              </div>

            </div>

            <hr />
            <div className="row text-center my-3">
              <div className="col-md-6 py-2 py-md-0" onClick={() => handleRedemptionType(true)}>
                <div className={`${isRedeemAmount ? "unitBtnActive" : "unitDeActiveBtn"}`}> Amount</div>
              </div>
              <div className="col-md-6 py-2 py-md-0" onClick={() => handleRedemptionType(false)}>
                <div className={`${isRedeemAmount ? "unitDeActiveBtn" : "unitBtnActive"}`}> Units </div>
              </div>
            </div>
            <div className="row text-start my-2">
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Current Value (As on {currentDateInStringNumber()})</p>
                <small className='fs16px'>₹{Number(item?.currentvalue)?.toLocaleString("en-IN")}</small>
              </div>
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Total Units</p>
                <small className='fs16px'>{Number(item?.unit)?.toLocaleString("en-IN")}</small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amountFor" className='fs12px'>REDUMPTION {isRedeemAmount ? "AMOUNT" : "UNIT"}</label>
              <input type="text" className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder={`${isRedeemAmount ? "Enter Amount" : "Enter Unit"}`} onChange={(e) => handleAmount(e, 10000000, setAmount, index)} />

            </div>
            {isRedeemAmount &&
              <div className=" mt-2 form-check form-switch d-flex justify-content-center ps-0" >
                <div className="form-check-label greyColor">Redeem All Units</div>
                &nbsp;&emsp;&emsp;&emsp;<input className="form-check-input"  type="checkbox"  role="switch" id="flexSwitchCheckDefault" />

              </div>}
          </div>
        )
      })}

    </>
  )
}
export default RedumptionForm