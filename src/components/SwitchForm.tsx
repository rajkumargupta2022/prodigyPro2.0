import { ArrowDown } from 'react-bootstrap-icons';
import icici from "../assets/img/bank-logo/icici.png"
const SwitchForm = ()=>{
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
                  <p>Selected fund 2</p>
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
                  <img src={icici} height={35} width={35} alt="" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>ICICI Prudential bluechip Funds</h4>
                  <p>Selected fund 2</p>
                </div>
              </div>

            </div>
            <hr />
            <div className="row text-center my-3">
              <div className="col-md-6 py-2 py-md-0">
                <div className='unitBtnActive'> Amount</div>
              </div>
              <div className="col-md-6 py-2 py-md-0">
                <div className='unitDeActiveBtn'> Units </div>
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
                <label htmlFor="amountFor" className='fs12px'>SWITCH UNIT</label>
                <input type="text" className="form-control" id="amountFor" aria-describedby="emailHelp" placeholder="Enter Amount" />
                <div className=" mt-2 form-check form-switch">
                  <label className="form-check-label " htmlFor="flexSwitchCheckDefault">Switch All Units</label>
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                </div>
              </div>
          </div>
    </>
  )
}
export default SwitchForm