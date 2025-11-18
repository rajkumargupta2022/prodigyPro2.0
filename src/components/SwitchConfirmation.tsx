import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react';
import OrderPlaces from './order-places';
import { ArrowDown } from 'react-bootstrap-icons';
import { cartItemKey, switchKeys, switchResponse } from '../pages/data-interfaces/transact';
import { currentDateInStringNumber } from '../services/dates/dateFormater';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints, imageUrl } from '../services/utils/urls';
import { fetchAdminUser } from '../services/user/adminUser';
import { errorToast } from '../services/utils/toast';
import { switchFilterBody } from '../services/utils/transactionBody';
import { Form } from 'react-bootstrap';
// import { FaArrowLeftLong } from "react-icons/fa6";

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  cartItem: cartItemKey[],
  setCartItem: (value: any) => void
}


const SwitchConfirmation: React.FC<investmetProps> = ({ show, setShow, cartItem, setCartItem }) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successData, setSuccessData] = useState<switchKeys[]>([])
  const [finalCartData, setFinalCartData] = useState<cartItemKey[]>([])


  useEffect(()=>{
       setFinalCartData(cartItem)
  },[show])
  const finalSwitch = async () => {

    const adminUser = fetchAdminUser()
    if (!adminUser) {
      errorToast("Something went wrong..")
      return
    }
    for (const item2 of finalCartData) {
      if (!item2?.installment_units && (!item2.isSwitchAmount)) {
        errorToast("Plaese enter units or amounts...")
        return
      }

    }


    const reqBody = {
      ucc: adminUser?.ucc,
      cartItems: switchFilterBody(cartItem)
    }

    try {
      const res = await postRequest<switchResponse>(endPoints.switch, reqBody)

      if (res.data) {

        setSuccessData(res.data)
        setOpenSuccess(true)
        setShow(false)
      }
    } catch (err) {
      console.log(err);

    }

  }
  const handleSwitchAllUnit = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const checked = e.target.checked; // <-- boolean, correct way

    setCartItem((prev: any) =>
      prev.map((item: cartItemKey, i: number) =>
        i === index
          ? {
            ...item,
            amount: checked ? 0 : item.amount, // reset amount if all_units true
            installment_units: checked ? item.fromUnit ?? 0 : 0,
            all_units: checked,
          }
          : item
      )
    );


  };

  const handleSwitchType = (value: boolean, allUnit: number, index: number) => {

    setCartItem((prev: any) =>
      prev.map((item: cartItemKey, i: number) =>
        i === index ? { ...item, installment_units: !value ? allUnit : 0, all_units: !value, amount: 0, isSwitchAmount: value } : item
      )
    );
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>, index: number, item2: cartItemKey
  ): void => {
    let value = Number(e.target.value.trim());
    let chechMax = item2?.isSwitchAmount ? item2.fromValue : item2.fromUnit;

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
            amount: item?.isSwitchAmount ? value : 0,
            installment_units: item?.isSwitchAmount ? 0 : value,
            all_units: false,
          };
        }

        // Equal to or more than max → set to max
        if (value >= Number(chechMax)) {
          return {
            ...item,
            amount: item?.isSwitchAmount ? item2.fromValue : 0,
            installment_units: item?.isSwitchAmount ? 0 : item2.fromUnit,
            all_units: true,
          };
        }

        return item;
      })
    );


  };
  const handleSelectedScheme = (item: any) => {
    setFinalCartData((prev: any[]) => {
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

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop={true}
        keyboard={true}

      >
        <Modal.Header closeButton className='modal-bg'>
          {/* <FaArrowLeftLong onClick={()=>{setShow(false)}}/> */}
          <Modal.Title>Switch Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          {cartItem?.map((item, index) => {
             const checkSelected = finalCartData.some((s: any) => {
                    return s.id === item.id;
                  })
            return <div className={`p-3 rounded-3 ${checkSelected&&"border011EFE"} bg-white mb-3`}>
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
                    <img src={imageUrl + item.toAccordAMCCode + ".png"} className='rounded' height={35} width={35} alt="" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.fromScheme}</h4>
                    <p>Selected fund 1</p>
                  </div>
                </div>

              </div>
              <div className="d-flex align-items-center my-2">
                <hr className="flex-grow-1" />
                <div className='rounded-4 lightTrxBtn p-1'><ArrowDown /> SWITCH</div>
                <hr className="flex-grow-1" />
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item.fromAccordAMCCode + ".png"} className='rounded' height={35} width={35} alt="" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.toScheme}</h4>
                    <p>Selected fund 1</p>
                  </div>
                </div>

              </div>
              <hr />
              <div className="row text-center my-3">
                <div className="col-md-6 py-2 py-md-0">
                  <div className={`${item?.isSwitchAmount ? "unitBtnActive" : "unitDeActiveBtn"}`} onClick={() => handleSwitchType(true, Number(item.fromUnit), index)}> Amount</div>
                </div>
                <div className="col-md-6 py-2 py-md-0">
                  <div className={`${item?.isSwitchAmount ? "unitDeActiveBtn" : "unitBtnActive"}`} onClick={() => handleSwitchType(false, Number(item.fromUnit), index)}> Units </div>
                </div>
              </div>
              <div className="row text-start my-2">
                <div className="col-md-6" >
                  <p className='mb-0 fs12px' > Current Value (As on {currentDateInStringNumber()})</p>
                  <small className='fs16px'>₹{item.fromValue}</small>
                </div>
                <div className="col-md-6">
                  <p className='mb-0 fs12px' > Total Units</p>
                  <small className='fs16px'>{item.installment_units}</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="amountFor" className='fs12px'>SWITCH {item?.isSwitchAmount ? "AMOUNT" : "UNIT"}</label>
                <input type="text" value={item?.isSwitchAmount ? item.amount : item.installment_units} className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder={`${item?.isSwitchAmount ? "Enter Amount" : "Enter Unit"}`} onChange={(e) => handleAmount(e, index, item)} />
                {!item?.isSwitchAmount &&
                  <div className=" mt-2 form-check form-switch">
                    <label className="form-check-label " htmlFor="flexSwitchCheckDefault">Switch All Units</label>
                    <input className="form-check-input"
                      type="checkbox"
                      checked={item.all_units}
                      onChange={(e) => handleSwitchAllUnit(e, index)} id={`switch-${index}`} />
                  </div>}
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

export default SwitchConfirmation;