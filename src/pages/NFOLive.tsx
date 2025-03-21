import NavBar from "../components/Navbar";
import icici from "../assets/img/bank-logo/icici.png"
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { Card } from "react-bootstrap";

const NFOLive = () => {
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  // const handleSchemeDetail = () => {
  //   setOpenSchemeDetail(true)
  // }
  return (
    <>
      <NavBar />


      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor">Home <small className="greyColor"> <ChevronRight className="fs12px bold" /> NFO Live</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>NFO Live</h4>
              <p className="fs14px">Seize the opportunity to invest in newly launched funds and diversify your portfolio from the start.</p>
            </div>
          </div>

        </div>
      </div>
      <div className="container py-2">
        <div className="personal_form_container">
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
              <div className="prod_view_fund align-self-center">
                <div className="logoBlueColor crPointer fs12px"><ChevronRight /></div>
              </div>
            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Open</small><br />
                <small>14th Jan</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Close</small><br />
                <small>20th Jan</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Min. Invest</small><br />
                <small><CurrencyRupee className="mb-1" />100</small>
              </div>
            </div>
          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs14px'>
            <div className="row">
              <div className="col-6">4 Days to close</div>
              <div className="col-6 text-end"> <Link to="/nfo-apply" className="logoBlueColor">Aplly now</Link> </div>
            </div>
          </Card.Header>


        </div>
      </div>
      <div className="container py-2">
        <div className="personal_form_container">
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
              <div className="prod_view_fund align-self-center">
                <div className="logoBlueColor crPointer fs12px"><ChevronRight /></div>
              </div>
            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Open</small><br />
                <small>14th Jan</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Close</small><br />
                <small>20th Jan</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Min. Invest</small><br />
                <small><CurrencyRupee className="mb-1" />100</small>
              </div>
            </div>
          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs14px'>
            <div className="row">
              <div className="col-6">4 Days to close</div>
              <div className="col-6 text-end"> <Link to="/nfo-apply">Aplly now</Link> </div>
            </div>
          </Card.Header>


        </div>
      </div>
      <div className="container pt-2">
        <div className="personal_form_container">
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
              <div className="prod_view_fund align-self-center">
                <div className="logoBlueColor crPointer fs12px"><ChevronRight /></div>
              </div>
            </div>
            <hr />
            <div className="row text-start mt-2">
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Open</small><br />
                <small>14th Jan</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Close</small><br />
                <small>20th Jan</small>
              </div>
              <div className="col-md-4 py-2 py-md-0">
                <small className="fs14px">Min. Invest</small><br />
                <small><CurrencyRupee className="mb-1" />100</small>
              </div>
            </div>
          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs14px'>
            <div className="row">
              <div className="col-6">4 Days to close</div>
              <div className="col-6 text-end"> <Link to="/nfo-apply">Aplly now</Link> </div>
            </div>
          </Card.Header>


        </div>
      </div>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default NFOLive;
