import { Container } from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import HDFC from "../assets/img/icons/hdfc.svg";
import SimpleLineChart from "../components/chart";
import MyStackBar from "../components/Stack-bar";
import { useState } from "react";
import SelectFolioPopup from "../components/select-folio-popup";
import { AiOutlineMore } from "react-icons/ai";
import Footer from "../components/Footer";

const FundDetails = () => {
  const [openSelectFolio, setOpenSelectFolio] = useState(false)
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
        <div className="row">

          {/* Sidebar Filters */}
          <div className="col-lg-8 col-md-8 col-12 border-end">
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
              <div className="row pt-4">
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Fund Size</span>
                  <h4 className="fs-6">₹66,304.16 Cr</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Launched</span>
                  <h4 className="fs-6">01 Jan 1995</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Expense Ratio</span>
                  <h4 className="fs-6">0.56%</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Lock-in</span>
                  <h4 className="fs-6">0 Yr</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Plan Type</span>
                  <h4 className="fs-6">Regular</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Plan Option</span>
                  <h4 className="fs-6">Growth</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Risk</span>
                  <h4 className="fs-6">Very High</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Min. Investment</span>
                  <h4 className="fs-6">₹100</h4>
                </div>
                <div className="col-6 py-2">
                  <span className="text-secondary text-uppercase fs-7">Withdrawal Charges</span>
                  <h4 className="fs-6">Exit load 1% if redeemed within 1 year</h4>
                </div>
              </div>
            </div>

            <div
              className="card mt-4 p-4 mb-4"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="fw-bold">Return Calulator</h5>

              <div className="row bottom-border">
                <div className="col-md-6 py-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="option3"
                    autoComplete="off"
                  />
                  <label
                    className="btn_colorfull btn btn-outline-primary declaration-button w-100 "
                    htmlFor="option3"
                  >
                    Monthly SIP
                  </label>
                </div>

                <div className="col-md-6 py-1">
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

              <div className="row justify-content-between gap-lg-5">
                <div className="col-lg-4 col-md-6 py-2">
                  <p>INVESTMENT OF</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1000"
                    style={{ fontWeight: 400, fontSize: "16px" }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 align-self-md-end py-2">
                  <p className="text-uppercase">For a period of</p>
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked />
                    <label className="btn btn-outline-primary px-xl-5 px-4" htmlFor="btnradio1">1Y</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary px-xl-5 px-4" htmlFor="btnradio2">3Y</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                    <label className="btn btn-outline-primary px-xl-5 px-4" htmlFor="btnradio3">5Y</label>
                  </div>
                </div>
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

              <div className="mt-4">
                <h6 className="fs-5 mb-0">Returns Comparison</h6>
                <MyStackBar />
              </div>
            </div>
          </div>

          {/* Mutual Funds List */}
          <div className="col-md-4 col-12" >
            <div
              className="card mb-4"
              style={{
                border: "none",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div className="p-lg-3 p-4">

                <div className="d-flex gap-2 justify-content-around">
                  <div>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="option3"
                      autoComplete="off"
                    />
                    <label
                      className="btn_colorfull rounded-4 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset"
                      htmlFor="option3"
                    >
                      Invest More
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
                      className="btn_colorfull rounded-4 declaration-button w-100 paddingLeftRight px-4 py-2 mobile-fontset"
                      htmlFor="option1"
                    >
                      Switch
                    </label>
                  </div>

                  <div className="">
                    <label
                      className="btn_colorfull dotted_sip_prodyg rounded-4 declaration-button w-100 paddingLeftRight px-3 py-2 mobile-fontset"
                      htmlFor="option1"
                    >
                      <AiOutlineMore />
                    </label>
                  </div>
                </div>
              </div>

            </div>

            <div
              className="card mb-4"
              style={{
                border: "none",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div className="p-lg-3 p-4">

                <div className="mt-2">

                  <div className="d-flex justify-content-between">
                    <div className="port_holding_etails">
                      <h1>Holding Details</h1>
                    </div>
                    <div className="prod_sip_22">
                      <span>SIP: ₹5.5K</span>
                    </div>
                  </div>

                  <div className="row pt-4">
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Units</span>
                      <h4 className="fs-6">1,304.161</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Folio</span>
                      <h4 className="fs-6">323253255</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Total invested</span>
                      <h4 className="fs-6">₹ 1.14L</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Current Nav</span>
                      <h4 className="fs-6">₹ 1,598.62</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">CAGR</span>
                      <h4 className="fs-6">19.56%</h4>
                    </div>
                    <div className="col-6 py-2">
                      <span className="text-secondary text-uppercase fs-7">Avg. Days</span>
                      <h4 className="fs-6">432</h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </Container>
      <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio} />
      <Footer />
    </>
  );
};

export default FundDetails;
