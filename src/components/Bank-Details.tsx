import { ArrowLeft } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import CreateMandate from "./create-mandate";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { userBankDetailKeys, userMandateRes } from "../pages/data-interfaces/bank-and-mandate";
import { dateInStringNumber } from "../services/dates/dateFormater";
import { bankType } from "../services/utils/keys";
import { maskString } from "../services/utils/services";

function BankDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [openCreateMandate, setOpenCreateMandate] = useState(false);
  const [mandateList, setMandateList] = useState<userBankDetailKeys[]>([])
  useEffect(() => {
    fetchankDetail()
  }, [])

  const fetchankDetail = async () => {
    const adminUser = fetchAdminUser()
    if (adminUser?.ucc) {
      const reqBody = {
        ucc: adminUser.ucc,
        account_number: location.state
      }
      try {
        const res = await postRequest<userMandateRes>(endPoints.getUserMandates, reqBody)
        if (res) {
          setMandateList(res.data)
        }
      } catch (err) {
        console.log(err);

      }
    }
  }
  const createMandate = () => {
       setOpenCreateMandate(true)
  }


  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <CreateMandate show={openCreateMandate} setShow={setOpenCreateMandate} accountNumber={mandateList[0]?.account_number} ifscCode={mandateList[0]?.ifsc_code} accountType={mandateList[0]?.account_type}/>
      <h3>
        <ArrowLeft className="crPointer" size={25} onClick={() => navigate(-1)} />
        Bank Details
      </h3>
      <hr className="fw-light text-secondary" />

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <div className="d-flex justify-content-between">
          <img className="align-self-start rounded" height={40} width={40} src={"https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/demo-bank.png"} alt="Image not found" />
          <div className="ms-2" style={{ flex: 1 }}>
            <h6 style={{ margin: 0 }}>{mandateList[0]?.bank_name}</h6>
            {mandateList[0]?.verified && <span style={{ color: "#06A358" }}>Verified</span>}
          </div>
        </div>

        <div className="row justify-content-between mt-2">

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">ACCOUNT NUMBER</span>
            <br />
            <span className="value-font2">{mandateList[0]?.account_number}</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">IFSC CODE</span>
            <br />
            <span className="value-font2">{mandateList[0]?.ifsc_code}</span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">BRANCH NAME</span>
            <br />
            <span className="value-font2">{mandateList[0]?.branch_name} </span>
          </div>

          <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
            <span className="text-secondary">ACCOUNT TYPE</span>
            <br />
            <span className="value-font2">{bankType[mandateList[0]?.account_type as keyof typeof bankType]}</span>
          </div>

          <div></div>
        </div>
      </div>
      <h6 className="my-3">Existing Mandate</h6>
      {mandateList[0]?.mandates?.length > 0 ? mandateList[0]?.mandates?.map((item) => {
        return <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
          <p className="fs12px my-0">STATUS:{item.umrn_no===""||item.umrn_no===" "? <span className="text-danger"> NOT APPROVED</span>: <span className="text-success"> APPROVED</span>}</p>
          <div className="row justify-content-between mt-2">
            <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
              <span className="text-secondary">URMN NO</span>
              <br />
              <span className="value-font2">{item.umrn_no===""||item.umrn_no===" " ?"NA":maskString(item.umrn_no)}</span>
            </div>

            <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
              <span className="text-secondary">AMOUNT</span>
              <br />
              <span className="value-font2">{item.mandate_limit}</span>
            </div>

            <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
              <span className="text-secondary">FROM</span>
              <br />
              <span className="value-font2">{dateInStringNumber(item.mandate_start)}</span>
            </div>

            <div className="col-lg-3 col-md-4 col-12 py-lg-0 py-1">
              <span className="text-secondary">To</span>
              <br />
              <span className="value-font2">{dateInStringNumber(item.mandate_end)}</span>
            </div>

            <div></div>
          </div>
        </div>
      }) : <p className="text-center mt-3">No mandate available</p>}


      <button type="submit" className={`customButton px-2 mt-2`} onClick={createMandate}>Craete e-Mandate</button>

    </main>
  );
}

export default BankDetails;
