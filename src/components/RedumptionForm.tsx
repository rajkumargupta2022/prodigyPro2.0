import { useState } from "react";
import { detailPortfolioSchemeType } from "../pages/data-interfaces/portfolio";
import { imageUrl } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";

interface investmetProps {
  redeemList: detailPortfolioSchemeType[],
  setRedeemList: (date: any) => void;
}


const RedumptionForm: React.FC<investmetProps> = ({ redeemList, setRedeemList }) => {

  const [isRedeemAmount, setIsRedeemAmount] = useState<boolean>(true)
  const [isAllUnit, setIsAllUnit] = useState<string>("false")



  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>, index: number, item2: detailPortfolioSchemeType
  ): void => {
    let value = Number(e.target.value.trim());
    let chechMax = isRedeemAmount ? item2.currentvalue : item2.unit;

    setRedeemList((prev: any) =>
      prev.map((item: detailPortfolioSchemeType, i: number) => {
        if (i !== index) return item;

        // If current is already max & new value is also max → no update
        if (item.all_units && value === Number(chechMax)) {
          return item;
        }

        // Less than max → update normally
        if (value < Number(chechMax)) {
          return {
            ...item,
            amount: isRedeemAmount ? value : 0,
            redemption_units: isRedeemAmount ? 0 : value,
            all_units: false,
          };
        }

        // Equal to or more than max → set to max
        if (value >= Number(chechMax)) {
          return {
            ...item,
            amount: isRedeemAmount ? item2.currentvalue : 0,
            redemption_units: isRedeemAmount ? 0 : item2.unit,
            all_units: true,
          };
        }

        return item;
      })
    );


  };
  const handleRedemptionType = (value: boolean, allUnit: number, index: number) => {
    setIsRedeemAmount(value)
    setRedeemList((prev: any) =>
      prev.map((item: detailPortfolioSchemeType, i: number) =>
        i === index ? { ...item, redemption_units: !value ? allUnit : 0, all_units: !value, amount: 0 } : item
      )
    );
  }
  const handleAllUnit = (e: React.ChangeEvent<HTMLInputElement>, allUnit: number, index: number) => {
    let value = e.target.value
    setIsAllUnit(value === "true" ? "false" : "true")
    setRedeemList((prev: any) =>
      prev.map((item: detailPortfolioSchemeType, i: number) =>
        i === index ? { ...item, amount: value === "true" && 0, redemption_units: value === "true" ? allUnit : 0, all_units: value === "true" ? true : false } : item
      )
    );

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
              <div className="col-md-6 py-2 py-md-0" onClick={() => handleRedemptionType(true, Number(item.unit), index)}>
                <div className={`${isRedeemAmount ? "unitBtnActive" : "unitDeActiveBtn"}`}> Amount</div>
              </div>
              <div className="col-md-6 py-2 py-md-0" onClick={() => handleRedemptionType(false, Number(item.unit), index)}>
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
              <input type="text" className="form-control" value={isRedeemAmount ? item.amount : item.redemption_units} id="amountFor" aria-describedby="emailHelp" placeholder={`${isRedeemAmount ? "Enter Amount" : "Enter Unit"}`} onChange={(e) => handleAmount(e, index, item)} />

            </div>
            {!isRedeemAmount &&
              <div className=" mt-2 form-check form-switch d-flex justify-content-center ps-0" >
                <div className="form-check-label greyColor">Redeem All Units</div>
                &nbsp;&emsp;&emsp;&emsp;<input className="form-check-input" type="checkbox" value={isAllUnit} checked={item.all_units} onChange={(e) => handleAllUnit(e, Number(item.unit), index)} role="switch" id="flexSwitchCheckDefault" />

              </div>}
          </div>
        )
      })}

    </>
  )
}
export default RedumptionForm