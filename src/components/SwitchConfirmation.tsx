import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useState } from 'react';
import OrderPlaces from './order-places';
import { ArrowDown } from 'react-bootstrap-icons';
import { cartItemKey, switchKeys, switchResponse } from '../pages/data-interfaces/transact';
import { currentDateInStringNumber } from '../services/dates/dateFormater';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints, imageUrl } from '../services/utils/urls';
import { fetchAdminUser } from '../services/user/adminUser';
import { errorToast } from '../services/utils/toast';
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
  const [isSwitchAmount, setIsSwitchAmount] = useState<boolean>(false)

  const finalSwitch = async () => {
    const adminUser = fetchAdminUser()
    if(!adminUser){
      errorToast("Something went wrong..")
      return
    }
    if(!cartItem[0]?.amount && isSwitchAmount){
     errorToast("Plaese enter amount...")
     return
    }
    if(!cartItem[0]?.installment_units && (!isSwitchAmount) ){
     errorToast("Plaese enter units...")
     return
    }
    const reqBody = {
      ucc: adminUser?.ucc,
      cartItems: cartItem
    }
    try {
      const res = await postRequest<switchResponse>(endPoints.switch, reqBody)
      console.log(res);
      if (res.data) {

        setSuccessData(res.data)
        setOpenSuccess(true)
        setShow(false)
      }
    } catch (err) {
      console.log(err);

    }


  }
  const handleSwitchAllUnit = (e: React.ChangeEvent<HTMLInputElement>, allUnit: number, index: number) => {
    const checked = e.target.checked; // <-- boolean, correct way
    setCartItem((prev: any) =>
      prev.map((item: cartItemKey, i: number) =>
        i === index
          ? {
            ...item,
            amount: checked ? 0 : item.amount, // reset amount if all_units true
            installment_units: checked ? allUnit : 0,
            all_units: checked,
          }
          : item
      )
    );
  };

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
            return <div className="borderColor p-3 headerRadius bg-white">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl+item.fromAccordAMCCode+".png"} className='rounded' height={35} width={35} alt="" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.toScheme}</h4>
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
                    <img src={imageUrl+item.toAccordAMCCode+".png"} className='rounded' height={35} width={35} alt="" />
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
                {!isSwitchAmount &&
                  <div className=" mt-2 form-check form-switch">
                    <label className="form-check-label " htmlFor="flexSwitchCheckDefault">Switch All Units</label>
                    <input className="form-check-input"
                      type="checkbox"
                      checked={item.all_units}
                      onChange={(e) => handleSwitchAllUnit(e, Number(item.fromUnit), index)} id={`switch-${index}`} />
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