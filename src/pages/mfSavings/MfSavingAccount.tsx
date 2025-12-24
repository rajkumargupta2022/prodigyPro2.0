import MyNavbar from "../../components/Navbar"
import Footer from "../../components/Footer";
import noBank from "../../assets/img/no-bank.png"
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import ChooseAccountToConsent from "./Components/ChooseAccountToGiveConsent";
import { useState } from "react";



const MfSavingAccount = () => {
  const [openChooseAccountToConsent, setOpenChooseAccountToConsent] = useState<boolean>(false)

  const giveConsent = () => {
    setOpenChooseAccountToConsent(true)
  }
  return (
    <>
      <MyNavbar />
      <section className="closeModel">
        <div className="container-fluid">
          <div className="row mt-3 justify-content-md-center">
            <div className="col-lg-9 col-sm-12">
              <h6 className="logoBlueColor crPointer mb-4" ><Link to={"/dashboard"}>Home</Link> <small className="greyColor"> <ChevronRight className="fs14px" /> MF Saving Account</small> </h6>
              <h4>MF Savings Account</h4>
              <Card border="light" className="my-3 lightGreenColor rounded-4">
                <Card.Body>
                  <div className="row">
                    <div className="col d-flex">
                      <h6 className="fw-semibold">Your bank balance deserves an upgrade.</h6>
                    </div>
                    <p className="fs14px" >Shift your idle funds to MF Savings Account and earn extra returns — safely and smartly.</p>
                  </div>
                </Card.Body>
              </Card>

              <div className="container px-4 mt-2" >
                <div className="row">
                  <div className="col-md-12 col-sm-12 ">
                    <div className="row  justify-content-center mb-3">
                      <div className="col-lg-8 col-md-12 col-sm-12 ">
                        <div className="d-flex justify-content-center my-4">
                          <img src={noBank} alt="" height={220} />
                        </div>
                        <h5 className="text-center">Let’s get you started!</h5>
                        <p className="fs14px mt-1 text-center">Link your bank account to see your balances, returns, and discover how your idle money can earn more.</p>
                        <Link to="/manual-surplus-calculator" className="d-block text-center mb-2">Manual calculator</Link>
                        <button type="button" className="customButton px-4 mx-auto d-block" onClick={giveConsent} >Give Consent</button>
                        <small className="fs12px text-dark">Redirecting to Anumati (Perfios NBFC-AA, licensed by RBI) for secure consent verification.</small>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
      <ChooseAccountToConsent show={openChooseAccountToConsent} setShow={setOpenChooseAccountToConsent} />

      <Footer />
    </>
  )
}
export default MfSavingAccount