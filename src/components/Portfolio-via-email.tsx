
import capitalGain from "../assets/img/capital-gain.png"
import {   useState } from "react";
import { Form } from "react-bootstrap";
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { capitalGainRes } from "../pages/data-interfaces/reports";
import { endPoints } from "../services/utils/urls";
import { errorToast, successToast } from "../services/utils/toast";
import { convertDateInDDFromMM } from "../services/dates/dateFormater";


const PortfolioViaEmail = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date(Date.now() - 86400000).toISOString().split("T")[0])
  const today = new Date(Date.now() - 86400000).toISOString().split("T")[0];



  const getEmailStatement = async () => {
    if (!selectedDate) {
      errorToast("Please select date.")
      return
    }
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        portfolio_date: convertDateInDDFromMM(selectedDate)
      }
      const res = await postRequest<capitalGainRes>(endPoints.requestPortfolioStatement, reqBody)

      if (res.success) {
        successToast("Your request has been received, and it shall be responded shortly.")
      }
    } catch (err) {
      errorToast(err)
    }
  }


  const dateHandler = (e: any) => {
    setSelectedDate(e.target.value)

  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="">
            <Form.Group className="mb-3 " controlId="formBasicDAte">
              <Form.Control type="date" placeholder="Enter date" max={today} className="selectBoxBg" value={selectedDate} onChange={dateHandler} />

            </Form.Group>
          </div>
        </div>

      </div>
      <div className="container px-4" >
        <div className="row">
          <div className="col-md-12 col-sm-12 ">
            <div className="row  justify-content-center mb-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="d-flex justify-content-center">
                  <img src={capitalGain} alt="" height={240} />
                </div>
                {/* {title?  <h5 className="text-center">{title}</h5>:""}   */}
                <p className="fs16px mt-1 text-center">Please select the date from the dropdown above to get portfolio statement on email.</p>

                <button type="button" className="customButton px-4 mx-auto d-block" onClick={getEmailStatement}>Email Statement</button>
              </div>
            </div>
          </div>


        </div>
      </div>


    </>
  );
};

export default PortfolioViaEmail;
