import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import {  useState } from 'react';
import OrderPlaces from './order-places';
import { ArrowDown } from 'react-bootstrap-icons';
import { cartItemKey, switchKeys } from '../pages/data-interfaces/transact';
import { currentDateInStringNumber, dateForApi, daysAdded } from '../services/dates/dateFormater';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints, imageUrl } from '../services/utils/urls';
import DatePicker from 'react-datepicker';
import { fetchAdminUser } from '../services/user/adminUser';
import { errorToast } from '../services/utils/toast';
import { Form } from 'react-bootstrap';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  cartItem: cartItemKey[],
  setCartItem: (value: any) => void
}


const StpConfiramtion: React.FC<investmetProps> = ({ show, setShow, cartItem, setCartItem }) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successData, setSuccessData] = useState<switchKeys[]>([])
  const [isSwitchAmount, setIsSwitchAmount] = useState<boolean>(true)
  const [frequency, setFrequency] = useState<string>("")
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()



  const finalSwitch = async () => {
    
    if (!cartItem[0]?.amount && cartItem[0]?.installment_units) {
      errorToast("Plaese enter amount or units...")
      return
    }
    if (!frequency) {
      errorToast("Plaese select frequency...")
      return
    }
    if (!fromDate) {
      errorToast("Plaese select from date...")
      return
    }
    if (!toDate) {
      errorToast("Plaese select from date...")
      return
    }
    const adminUser = fetchAdminUser()
    if (!adminUser) {
      errorToast("Something went wrong..")
      return
    }
    const reqBody = {
      ucc: adminUser.ucc,
      cartItems: bodyData()
    }
    try {
      const res = await postRequest<any>(endPoints.stp, reqBody)

      if (res.data) {

        setSuccessData(res.data)
        setOpenSuccess(true)
        setShow(false)
      }
    } catch (err) {
      console.log(err);

    }
  }

  const bodyData = () => {
    const data = cartItem.map((item: cartItemKey) => {
      return {
        schemeName: item.toScheme,
        fromAccordProductCode: item.fromAccordProductCode,
        toAccordProductCode: item.toAccordProductCode,
        amount: item.amount || 0,
        folioNumber: item.folioNumber,
        installment_units: item.installment_units || 0,
        from_date: dateForApi(fromDate),
        to_date: dateForApi(toDate)

      }
    })
    return data
  }
  // useEffect(()=>{
  //  setFromDate(daysAdded(7,cartItem[0]?.stpDateList));
  //  setToDate(daysAdded(8,cartItem[0]?.stpDateList))

  // },[show])

  const handleSwitchType = (value: boolean, allUnit: number, index: number) => {
    setIsSwitchAmount(value)
    setCartItem((prev: any) =>
      prev.map((item: cartItemKey, i: number) =>
        i === index ? { ...item, installment_units: !value ? allUnit : 0, all_units: !value, amount: 0 } : item
      )
    );
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>, index: number, item2: cartItemKey
  ): void => {
    let value = Number(e.target.value.trim());
    let chechMax = isSwitchAmount ? item2.fromValue : item2.fromUnit;

    setCartItem((prev: any) =>
      prev.map((item: cartItemKey, i: number) => {
        if (i !== index) return item;

        // If current is already max & new value is also max → no update
        if (item.all_units && value === Number(chechMax)) {
          return item;
        }

        // Less than max → update normally
        if (value < Number(chechMax)) {
          return {
            ...item,
            amount: isSwitchAmount ? value : 0,
            installment_units: isSwitchAmount ? 0 : value,
            all_units: false,
          };
        }

        // Equal to or more than max → set to max
        if (value >= Number(chechMax)) {
          return {
            ...item,
            amount: isSwitchAmount ? item2.fromValue : 0,
            installment_units: isSwitchAmount ? 0 : item2.fromUnit,
            all_units: true,
          };
        }

        return item;
      })
    );
  };
  function addDays(date: Date, days: number) {
    let result = new Date(date); // clone so original isn't changed
    result.setDate(result.getDate() + days);
    setToDate(result)
  }
  const handleFromDate = (e: any) => {
    setFromDate(e)
    addDays(e, 1)
  }
  const handleToDate = (e: any) => {
    setToDate(e)
  }

  // Function to check if date is allowed
  const isAllowedDay = (date: Date): boolean => {
    const allowedDays: number[] = cartItem[0]?.stpDateList.length > 0 ? cartItem[0]?.stpDateList : [];
    const dayOfMonth = date.getDate();
    return allowedDays?.includes(dayOfMonth);
  };
  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title>STP Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          {cartItem?.map((item, index) => {
            return <div className="borderColor p-3 headerRadius bg-white">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item.fromAccordAMCCode + ".png"} height={35} width={35} className='rounded' alt="" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.toScheme}</h4>
                    <p>Selected fund 1</p>
                  </div>
                </div>

              </div>
              <div className="d-flex align-items-center my-2">
                <hr className="flex-grow-1" />
                <div className='rounded-4 lightTrxBtn p-1'><ArrowDown /> STP</div>
                <hr className="flex-grow-1" />
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item.toAccordAMCCode + ".png"} height={35} width={35} className='rounded' alt="" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.fromScheme}</h4>
                    <p>Selected fund 1</p>
                  </div>
                </div>

              </div>
              <hr />
              <div className="row text-center my-3">
                <div className="col-md-6 py-2 py-md-0">
                  <div className={`${isSwitchAmount ? "unitBtnActive" : "unitDeActiveBtn"}`} onClick={() => handleSwitchType(true, Number(item.fromUnit), index)}> Amount</div>
                </div>
                <div className="col-md-6 py-2 py-md-0">
                  <div className={`${isSwitchAmount ? "unitDeActiveBtn" : "unitBtnActive"}`} onClick={() => handleSwitchType(false, Number(item.fromUnit), index)}> Units </div>
                </div>
              </div>
              <div className="row text-start my-2">
                <div className="col-md-6" >
                  <p className='mb-0 fs12px' > Current Value (As on {currentDateInStringNumber()})</p>
                  <small className='fs16px'>₹{item.fromValue}</small>
                </div>
                <div className="col-md-6">
                  <p className='mb-0 fs12px' > Total Units</p>
                  <small className='fs16px'>{item.fromUnit}</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="amountFor" className='fs12px'>SWITCH {isSwitchAmount ? "AMOUNT" : "UNIT"}</label>
                <input type="text" value={isSwitchAmount ? item.amount : item.installment_units} className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder={`${isSwitchAmount ? "Enter Amount" : "Enter Unit"}`} onChange={(e) => handleAmount(e, index, item)} />

              </div>
              <div className="row">
                <div className="form-group col-md-12 col-sm-12">
                  <label htmlFor="amountFor" className='fs12px'>FREQUENCY</label>
                  <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option value={""}>Select Frequency</option>
                    {cartItem[0]?.stpFrequency?.map((item: any) => {
                      return <option value={item}>{item}</option>
                    })}


                  </Form.Select>
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <label htmlFor="amountFor" className='fs12px'>FROM</label><br />
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDate}
                    filterDate={isAllowedDay}
                    placeholderText="Select a date"
                    dateFormat="dd/MM/yyyy"
                    minDate={daysAdded(31, cartItem[0].stpDateList)}
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12 ">
                  <label htmlFor="amountFor" className='fs12px'>TO</label><br />
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDate}
                    filterDate={isAllowedDay}
                    placeholderText="Select a date"
                    dateFormat="dd/MM/yyyy"
                    minDate={daysAdded(32, cartItem[0].stpDateList)}
                    className="form-control"
                  />
                </div>
              </div>

            </div>
          })}

          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Switch orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={finalSwitch}>Transafer</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successData} />
    </>
  );
}

export default StpConfiramtion;