import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Card } from 'react-bootstrap';
import { currentDateInStringNumber } from '../../services/dates/dateFormater';
import { detailPortfolioSchemeType } from '../data-interfaces/portfolio';
import { imageUrl } from '../../services/utils/urls';
import { useEffect, useState } from 'react';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  redeemList: detailPortfolioSchemeType,
  

}


const InstaRedeem: React.FC<investmetProps> = ({ show, setShow, redeemList }) => {
  const [redemptionDetail, setRedemptionDetail] = useState<detailPortfolioSchemeType>(redeemList)
    useEffect(() => { 
      setRedemptionDetail(redeemList) 
    }, [show])


    const amonutHandle = (e: React.ChangeEvent<HTMLInputElement>) => { 
      let value = Number(e.target.value.trim());
      if(value > Number(redemptionDetail.currentvalue)){
        value = Number(redemptionDetail.currentvalue);
      }
      setRedemptionDetail((prev) => ({
        ...prev,
        amount: value,
      }));
    }
      
    const handleFinalRedeem = () => { 
       console.log(redemptionDetail);
       

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
          <Modal.Title>Insta Redeem Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <div className={`rounded-4 p-4   bg-white overflow-hidden mb-3 shadow-sm`} >

            <div className="d-flex justify-content-between">

              <div className="d-flex">
                <div className="prod_icon_img">

                  <img src={imageUrl + redemptionDetail.accordAMCCode + ".png"} height={35} width={35} alt="" className="rounded" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{redemptionDetail.scheme}</h4>
                  {redemptionDetail.equity ? <p>Equity: {redemptionDetail.equity}</p> : ""}
                </div>
              </div>
            </div>
            <hr />

            <div className="row text-start my-2">
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Current Value (As on {currentDateInStringNumber()})</p>
                <small className='fs16px'>₹{Number(redemptionDetail?.currentvalue)?.toLocaleString("en-IN")}</small>
              </div>
              <div className="col-md-6">
                <p className='mb-0 fs12px'> Total Units</p>
                <small className='fs16px'>{Number(redemptionDetail?.unit)?.toLocaleString("en-IN")}</small>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amountFor" className='fs12px'>REDUMPTION AMOUNT</label>
              <input type="text" className="form-control" value={redemptionDetail.amount ?? 0} id="amountFor" onChange={amonutHandle} aria-describedby="emailHelp" placeholder={`${"Enter Amount"}`} />

            </div>



          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>Redemption orders once placed cannot be cancelled.</Card.Header>


        </Modal.Body>
        <small className='px-3 fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleFinalRedeem}>Redeem</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default InstaRedeem;