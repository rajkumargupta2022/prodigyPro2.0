import { Container, Row, Col } from "react-bootstrap";
import { CurrencyRupee, Calendar2 } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import HDFC from "../assets/img/icons/hdfc.svg";
import SimpleLineChart from "../components/chart";
import MyStackBar from "../components/Stack-bar";
import { useState } from "react";
import SelectFolioPopup from "../components/select-folio-popup";

const FundDetails = () => {
  const [openSelectFolio , setOpenSelectFolio] = useState(false)
  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <div className="d-flex align-items-center">
          <img src={HDFC} alt="Image not found" width={70} height={70} />
          <div style={{ marginLeft: "2%", marginTop: "2%" }}>
            <h4 className="fw-bold">HDFC Flexi Cap Fund</h4>
            <p>Equity: Flexi Cap</p>
          </div>
        </div>
        <Row>
          {/* Sidebar Filters */}
          <Col md={8} className="border-end">
            <div
              style={{
                width: "100%",
                height: "30%",
                border: "none",
                padding: "2%",
                borderRadius: "16px",
              }}
              className="mt-2 card"
            >
              <SimpleLineChart />
            </div>

            <div
              className="card mt-4 p-4"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="fw-bold">Fund Details</h5>
              <div className="row mt-4">
                <div className="col-md-6">
                  <p className="fw-bold">FUND SIZE</p>
                  <h6 className="fw-bold">
                    <CurrencyRupee size={20} />
                    66,304.16 Cr
                  </h6>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">Launched</p>
                  <h6 className="fw-bold">01 Jan 1995</h6>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p className="fw-bold">EXPENSE RATIO</p>
                  <h6 className="fw-bold">66,304.16 Cr</h6>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">LOCKED IN</p>
                  <h6 className="fw-bold">0 Yr</h6>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p className="fw-bold">PLAN TYPE</p>
                  <h6 className="fw-bold">Regular</h6>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">PLAN OPTION</p>
                  <h6 className="fw-bold">Growth</h6>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p className="fw-bold">RISK</p>
                  <h6 className="fw-bold">Very High</h6>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">MIN. INVESTMENT</p>
                  <h6 className="fw-bold">
                    <CurrencyRupee size={20} />
                    100
                  </h6>
                </div>
              </div>

              <div className="mt-4">
                <p className="fw-bold">RISK</p>
                <h6 className="fw-bold">
                  EXIT load 1% if redeemed within 1 year
                </h6>
              </div>
            </div>

            <div
              className="card mt-4 p-4 mb-4"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="fw-bold">Return Calulator</h5>

              <div className="row bottom-border">
                <div className="col-md-6">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option3"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary declaration-button w-100 "
                    htmlFor="option3"
                  >
                    Monthly SIP
                  </label>
                </div>

                <div className="col-md-6">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option1"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary declaration-button w-100 "
                    htmlFor="option1"
                  >
                    One-time
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p>INVESTMENT OF</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1000"
                    style={{ fontWeight: 400, fontSize: "16px" }}
                  />
                </div>
                <div className="col-md-6"></div>
              </div>

              <div className="mt-2 border-bottom">
                <p>
                  Investment of
                  <span className="fw-bold" style={{ color: "black" }}>
                    {" "}
                    ₹36k{" "}
                  </span>
                  could have been
                </p>
                <h6 className="fw-bold">
                  ₹50,028.46 <span style={{ color: "#00b860" }}>(+22.56%)</span>
                </h6>
              </div>

              <div className="mt-2">
                <h6 className="fw-bold">Returns Comparison</h6>
                <MyStackBar />
              </div>
            </div>
          </Col>

          {/* Mutual Funds List */}
          <Col md={4}>
            <div
              className="card mb-4"
              style={{
                border: "none",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div className="p-4">
                <h5 className="fw-bold bottom-border">Invest Now</h5>

                <div className="d-flex justify-content-around">
                  <div>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="option3"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary declaration-button w-100 paddingLeftRight"
                      htmlFor="option3"
                    >
                      Monthly SIP
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="option1"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary declaration-button w-100 paddingLeftRight"
                      htmlFor="option1"
                    >
                      One-time
                    </label>
                  </div>
                </div>

                <div className="mt-2">
                  <p>DAY OF SIP</p>
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-bold bottom-border">
                      14th of very month
                    </h6>
                    <Calendar2 />
                  </div>
                </div>

                <div className="mt-2">
                  <p>INVESTMENT AMOUNT</p>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      color: "black",
                      fontWeight: 300,
                      fontSize: "24px",
                    }}
                    placeholder="1000"
                  />
                </div>

                <div className="d-flex">
                  <span className="badge m-2 ">Min</span>
                  <span className="badge m-2">₹1,000</span>
                  <span className="badge m-2">₹2,000</span>
                  <span className="badge m-2">₹5,000</span>
                </div>
                <button className="btn btn-primary" onClick={()=>{setOpenSelectFolio(true)}}>Invest</button>
              </div>
              <span
                className="text-center p-3"
                style={{
                  backgroundColor: "#E6E8FF",
                  fontSize: "14px",
                  marginTop: "20%",
                }}
              >
                Nav applicable once amount credited to AMC's bank account
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio}/>
    </>
  );
};

export default FundDetails;
