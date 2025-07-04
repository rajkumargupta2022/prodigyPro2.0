import icici from "../../assets/img/bank-logo/icici.png"
import sbi from "../../assets/img/bank-logo/sbi.png"
import Card from 'react-bootstrap/Card';

import { CurrencyRupee} from "react-bootstrap-icons";

const PopularFunds = ()=>{
  
  return(
       <Card border="light" className="mb-3 cardRadius">
                <Card.Body>
                  <div className="row">
            <div className="col-sm-12 col-lg-7 d-flex justify-content-between w-100">
              <div className="fw-semibold">Popular Funds</div>
            </div>
            <div className="col-12 mt-2">
              <button type="button" className="btn btn-light popularButton text-primary rounded-3 align-self-start">
                Large Cap
              </button>
              <button type="button" className="btn btn-light popularButton">
                Multi Cap
              </button>
              <button type="button" className="btn btn-light popularButton">
                Mid Cap
              </button>
              <button type="button" className="btn btn-light popularButton">
                Flexi Cap
              </button>
            </div>
            <div className="col-12 mt-2">
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="pb-1">
                  <img src={icici} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee /></small>100
                  </small>
                </div>
              </div>
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={sbi} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    SBI Large Cap funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={icici} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={sbi} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    SBI Large Cap funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>

              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={icici} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={sbi} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    SBI Large Cap funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
              <div className="d-flex gap-3 border-bottom borderColor py-2">
                <div className="">
                  <img src={icici} height={50} width={50} alt="" />
                </div>
                <div className="">
                  <small className="">
                    ICICI Prudential bluechip Funds <br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>
            </div>
          </div>

                </Card.Body>
              </Card>
  )
}
export default PopularFunds