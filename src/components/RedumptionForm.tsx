import { detailPortfolioSchemeType } from "../pages/data-interfaces/portfolio";
import { imageUrl } from "../services/utils/urls";
import { currentDateInStringNumber } from "../services/dates/dateFormater";
import { checkIsSIFScheme } from "../services/utils/services";
import { Card, Form } from "react-bootstrap";

interface investmetProps {
  redeemList: detailPortfolioSchemeType[],
  setRedeemList: (date: any) => void;
  selectedList?: any;
  setSelectedList?: (date: any) => void;
}


const RedumptionForm: React.FC<investmetProps> = ({ redeemList, setRedeemList, selectedList, setSelectedList }) => {



  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>, index: number, item2: detailPortfolioSchemeType): void => {
    let value = Number(e.target.value.trim());
    let chechMax = item2.isRedeemAmount ? item2.currentvalue : item2.unit;
    if (checkIsSIFScheme(item2.scheme) && (Number(item2.currentvalue) <= 1000000)) {

      setRedeemList?.((prev: any) =>
        prev.map((item: detailPortfolioSchemeType, i: number) => {
          if (i !== index) return item;
          return {
            ...item,
            amount: item.currentvalue,
            redemption_units: item.unit,
            all_units: true,
          };

        })
      );
    }
    else {

      console.log("value4444", selectedList)
      setRedeemList?.((prev: any) =>
        prev.map((item: detailPortfolioSchemeType, i: number) => {
          if (i !== index) return item;

          if (item.all_units && value === Number(chechMax)) {
            return item;
          }

          if (value < Number(chechMax)) {
            console.log("value8888", item.redemption_units, item.all_units)
            return {
              ...item,
              amount: item.isRedeemAmount ? value : 0,
              redemption_units: item.isRedeemAmount ? 0 : value,
              all_units: false,
            };
          }

          if (value >= Number(chechMax)) {
            console.log("value2", value)
            return {
              ...item,
              amount: item.isRedeemAmount ? item2.currentvalue : 0,
              redemption_units: item.isRedeemAmount ? 0 : item2.unit,
              all_units: true,
            };
          }

          return item;
        })
      );
    }



  };
  const handleRedemptionType = (value: boolean, allUnit: number, index: number) => {
    console.log("sdsdd", selectedList);

    setRedeemList?.((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, redemption_units: !value ? allUnit : 0, all_units: !value, amount: 0, isRedeemAmount: value } : item
      )
    );
  }
  const handleAllUnit = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = e.target.checked;
    console.log(checked);

    setRedeemList?.((prev: any) =>
      prev.map((item: detailPortfolioSchemeType, i: number) =>
        i === index
          ? {
            ...item,
            amount: checked ? 0 : item.amount,
            redemption_units: checked ? item.unit : 0,
            all_units: checked,
          }
          : item
      )
    );
  };

  const handleSelectedScheme = (item: any) => {
    setSelectedList?.((prev: any[]) => {
      const exists = prev.some((s) => s.id === item.id);

      if (exists) {
        return prev.filter((s) => s.id !== item.id);
      } else {
        // Scheme is being selected
        return [...prev, { ...item }];
      }
    });
  };





  return (
    <>
      {redeemList?.length > 0 && redeemList.map((item, index) => {
               const checkSelected = selectedList.some((s: any) => {
                    return s.id === item.id;
                  })
        return (
          <>
            <div className={`rounded-4  ${checkSelected&&"border011EFE"} bg-white overflow-hidden mb-3 shadow-sm`} key={index}>
              <div className="p-3" >
                <Form.Check
                  className="m-0 rounded-circle prodigy__selc1212"
                  inline
                  label="Select"
                  name="group1"
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={checkSelected} // This will be false when unselected
                  onChange={() => handleSelectedScheme(item)}
                />




                <hr />
                <div className="d-flex justify-content-between">

                  <div className="d-flex">
                    <div className="prod_icon_img">

                      <img src={imageUrl + item.accordAMCCode + ".png"} height={35} width={35} alt="" className="rounded" />
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
                    <div className={`${item.isRedeemAmount ? "unitBtnActive" : "unitDeActiveBtn"}`}> Amount</div>
                  </div>
                  <div className="col-md-6 py-2 py-md-0" onClick={() => handleRedemptionType(false, Number(item.unit), index)}>
                    <div className={`${item.isRedeemAmount ? "unitDeActiveBtn" : "unitBtnActive"}`}> Units </div>
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
                  <label htmlFor="amountFor" className='fs12px'>REDUMPTION {item.isRedeemAmount ? "AMOUNT" : "UNIT"}</label>
                  <input type="text" className="form-control" value={item.isRedeemAmount ? item.amount : item.redemption_units} id="amountFor" aria-describedby="emailHelp" placeholder={`${item.isRedeemAmount ? "Enter Amount" : "Enter Unit"}`} onChange={(e) => handleAmount(e, index, item)} />

                </div>
                {!item.isRedeemAmount &&
                  <div className=" mt-2 form-check form-switch d-flex justify-content-center ps-0" >
                    <div className="form-check-label greyColor">Redeem All Units</div>
                    &nbsp;&emsp;&emsp;&emsp;<input className="form-check-input" type="checkbox" checked={item.all_units ?? false} onChange={(e) => handleAllUnit(e, index)} role="switch" id={`flexSwitchCheckDefault${index}`} />

                  </div>
                }
              </div>
              <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Redemption orders once placed cannot be cancelled.</Card.Header>
            </div>


          </>
        )
      })}

    </>
  )
}
export default RedumptionForm