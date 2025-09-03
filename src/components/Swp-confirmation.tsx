import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import {  useState } from 'react';
import OrderPlaces from './order-places';
import { Form } from 'react-bootstrap';
import { detailPortfolioSchemeType } from '../pages/data-interfaces/portfolio';
import { endPoints, imageUrl } from '../services/utils/urls';
import { currentDateInStringNumber, dateForApi, daysAdded } from '../services/dates/dateFormater';
import { amountHandler } from '../services/utils/calculatorsFs';
import { schemeDeatilDataKeys, swpResponse } from '../pages/data-interfaces/transact';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errorToast } from '../services/utils/toast';
import { postRequest } from '../services/Api/HandleApi';
import { fetchAdminUser } from '../services/user/adminUser';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  swpList: detailPortfolioSchemeType[],
  schemeList: schemeDeatilDataKeys[];
}


const SwpConfirmation: React.FC<investmetProps> = ({ show, setShow, swpList, schemeList }) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [amount, setAmount] = useState<number>(5000)
  const [frequency, setFrequency] = useState<string>("")
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [successDate, setSuccessDate] = useState<any[]>([])


 



  const handleSwpTransaction = async () => {
    console.log(schemeList);
    return
    if (!amount) {
      errorToast("Please enter amount...")
      return
    }
    if (amount<5000) {
      errorToast("SWP amount can not be less than ₹5000")
      return
    }
    if (!frequency) {
      errorToast("Please select frequency...")
      return
    }
    if (!fromDate) {
      errorToast("Please select from date...")
      return
    }
    if (!toDate) {
      errorToast("Please select to date...")
      return
    }
    const adminUser = fetchAdminUser()
    if(!adminUser){
      errorToast("Something went wrong..")
      return
    }
    const body = {
      ucc: adminUser.ucc,
      cartItems: [
        {
          schemeName: swpList[0]?.scheme,
          NSEProductCode: swpList[0]?.productcode,
          amount: amount,
          folioNumber: swpList[0]?.folioNumber,
          from_date: dateForApi(fromDate),
          frequency,
          to_date: dateForApi(toDate)
        }
      ]
    }


    try {
      const res = await postRequest<swpResponse>(endPoints.swp, body)
      if (res.data) {
        setOpenSuccess(true)
        setSuccessDate(res.data)
        setShow(false)
      } else {
        setSuccessDate([])
      }
    } catch (err) {
      errorToast(err)
    }
  }
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
    const allowedDays: number[] = schemeList[0]?.swpDateList.length > 0 ? schemeList[0]?.swpDateList : [];
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
          <Modal.Title>Swp Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <div className="borderColor p-3 headerRadius bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={imageUrl + swpList[0]?.amcCode + ".png"} height={35} width={35} alt="" className="rounded" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{swpList[0]?.scheme}</h4>
                  <p>Selected fund 1</p>
                </div>
              </div>

            </div>


            <hr />
            <div className="row text-start my-2">
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Current Value (As on {currentDateInStringNumber()})</p>
                <small className='fs16px'>₹{swpList[0]?.currentvalue}</small>
              </div>
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Total Units</p>
                <small className='fs16px'>{swpList[0]?.unit}</small>
              </div>
            </div>


            <div className="form-group">
              <label htmlFor="amountFor" className='fs12px'>SWP AMOUNT</label>
              <input type="text" className="form-control" value={amount} id="amountFor" aria-describedby="emailHelp" onChange={(e) => amountHandler(e, 10000000, setAmount)} placeholder="Enter Amount" />
            </div>
            <div className="row">
              <div className="form-group col-md-12 col-sm-12">
                <label htmlFor="amountFor" className='fs12px'>FREQUENCY</label>
                <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option value={""}>Select Frequency</option>
                  {schemeList[0]?.swpFrequency?.map((item) => {
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
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                  minDate={daysAdded(7,schemeList[0]?.swpDateList)}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6 col-sm-12 ">
                <label htmlFor="amountFor" className='fs12px'>TO</label><br />
                <DatePicker
                  selected={toDate}
                  onChange={handleToDate}
                  filterDate={isAllowedDay}
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                  minDate={daysAdded(8,schemeList[0]?.swpDateList)}
                  className="form-control"
                />
              </div>
            </div>


          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>SWP orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center mx-2'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwpTransaction}>Transfer</Button>
        </Modal.Footer>
      </Modal>
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successDate} />
    </>
  );
}

export default SwpConfirmation;