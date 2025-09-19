import { Col } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { getRequest, postRequest } from "../services/Api/HandleApi";
import { ifscRes, varifyBankRes } from "../pages/data-interfaces/bank-and-mandate";
import { endPoints } from "../services/utils/urls";
import { errorToast } from "../services/utils/toast";
import { bankTypeObj } from "../services/utils/keys";
import { fetchAdminUser } from "../services/user/adminUser";
import AlertModel from "./AlertModel";
import CreateMandate from "./create-mandate";


function AddBankDetails() {

  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState<string>("")
  const [confirmAccountNumber, setConfirmAccountNumber] = useState<string>("")
  const [accountType, setAccountType] = useState<string>(bankTypeObj.SB.code)
  const [ifscCode, setIfscCode] = useState<string>("")
  const [bankName, setBankName] = useState<string>("")
  const [branchName, setBranchName] = useState<string>("")
  const [validated, setValidated] = useState(false);
  const [openAlertModel, setOpenAlertModel] = useState<boolean>(false)
  const [openCreateMandate, setOpenCreateMandate] = useState<boolean>(true)
  const [score, setScore] = useState<number>(0)
  const [inputType,setInputType] = useState<string>("text")


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault()

    if (form.checkValidity()) {
      if (accountNumber !== confirmAccountNumber) {
        errorToast("Account number and confirm account number does not matched.")
        return
      }
      try {
        const adminUser = fetchAdminUser()
        const reqBody = {
          beneficiaryAccount: accountNumber,
          beneficiaryIFSC: ifscCode,
          beneficiaryName: adminUser.name.toUpperCase()
        }
        const res = await postRequest<varifyBankRes>(endPoints.verifyBank, reqBody)
         navigate("/add-verification-details",{state:{accountNumber,ifscCode,accountType}})
        if (res.data.nameMatch.toLocaleLowerCase() === "yes" && Number(res.data.nameMatchScore) === 1) {
          setScore(Number(res.data.nameMatchScore))
          saveBank()
        } else if (res.data.nameMatch.toLocaleLowerCase() === "no" && Number(res.data.nameMatchScore) >= 0.8) {
          setScore(Number(res.data.nameMatchScore))
          setOpenAlertModel(true)
        } else {
          errorToast("Something went wrong")
        }
      } catch (err) {
        errorToast("Something went wrong")

      }
    }

    setValidated(true);
  };

  const saveBank = async () => {
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        account_type: accountType,
        account_number: accountNumber,
        ifsc_code: ifscCode
      }
      const res = await postRequest<any>(endPoints.addBank, reqBody)
      if (res.success) {
        if (score === 1) {
          setOpenCreateMandate(true)
        } else if (score >= 0.8 && score < 1) {
          navigate("/add-verification-details",{state:{accountNumber,ifscCode,accountType}})
        }
      } else {
        errorToast("Something went wromg..")
      }
    } catch (err) {
      errorToast(err)
    }
  }
  const handleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!isNaN(Number(value)) && value.length < 20) {
      setAccountNumber(value.trim())
    }
  }
  const handleConfirmAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!isNaN(Number(value)) && value.length < 20) {
      setInputType("password")
      setConfirmAccountNumber(value.trim())
    }
  }
  const handleIfscCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLocaleUpperCase()
    if (value.length < 12) {
      setIfscCode(value.trim())
      if (value.length == 11) {
        fetchDetailByIfsc(value)
      }
    }
  }
  const fetchDetailByIfsc = async (ifsc: string) => {
    try {
      const res = await getRequest<ifscRes>(endPoints.fetchBankByIfsc + "?ifsc_code=" + ifsc)
      if (res.success) {
        setBankName(res.bank_name)
        setBranchName(res.branch_name)
      } else {
        setBankName("")
        setBranchName("")
        errorToast("Please enter valid Ifsc code")
      }
    } catch (err) {
      setBankName("")
      setBranchName("")
      errorToast(err)
    }
  }


  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={25} onClick={() => navigate(-1)} />
        Add Bank Account Details
      </h4>
      <hr className="fw-light text-secondary" />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">

          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label className="mb-0">ACCOUNT NUMBER</Form.Label>
            <Form.Control
              required
              type={inputType}
              minLength={10}
              // maxLength={20}
              onChange={handleAccount}
              placeholder="Enter account number"
              // defaultValue="Mark"
              value={accountNumber}
            />
            {/* <span className="text-danger">{accountNumber.length=== 0?"":""}</span> */}
            <Form.Control.Feedback type="invalid">{accountNumber.length === 0 ? "Mandotry Field" : accountNumber.length < 10 && "Please enter valid account number"}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom02" className="mt-2">
            <Form.Label className="mb-0 fs12px">RE-ENTER ACCOUNT NUMBER</Form.Label>
            <Form.Control
              required
              type="text"
              minLength={10}
              onChange={handleConfirmAccount}
              placeholder="Enter account number"
              value={confirmAccountNumber}
            />
            <Form.Control.Feedback type="invalid">{confirmAccountNumber.length === 0 ? "Mandotry Field" : confirmAccountNumber.length < 10 && "Please enter valid account number"}</Form.Control.Feedback>

          </Form.Group>
          <div className="mt-2">
            <Form.Label className="mb-0 fs12px">ACCOUNT TYPE</Form.Label><br />
            <button type="button" className={`btn ms-1 ${accountType === bankTypeObj.SB.code ? "selectedBtn" : "riskProfileBtn"}`} onClick={() => setAccountType(bankTypeObj.SB.code)}>Saving Account</button>
            <button type="button" className={`btn ms-1 ${accountType === bankTypeObj.CB.code ? "selectedBtn" : "riskProfileBtn"}`} onClick={() => setAccountType(bankTypeObj.CB.code)}>Current Account</button>
          </div>
          <Form.Group as={Col} md="12" controlId="validationCustom03" className="mt-2">
            <Form.Label className="mb-0">IFSC CODE</Form.Label>
            <Form.Control
              required
              type="text"
              minLength={11}
              onChange={handleIfscCode}
              placeholder="Enter ifsc code"
              value={ifscCode}

            />
            <Form.Control.Feedback type="invalid">{ifscCode.length === 0 ? "Mandotry Field" : ifscCode.length < 11 && "Please enter valid ifsc code"}</Form.Control.Feedback>

          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom04" className="mt-2">
            <Form.Label className="mb-0">BANK</Form.Label>
            <Form.Control
              required
              type="text"
              minLength={5}
              placeholder=""
              value={bankName}
            />
            <Form.Control.Feedback type="invalid">Mandorty Field</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom05" className="mt-2">
            <Form.Label className="mb-0">BRANCH</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              minLength={5}
              value={branchName}
            />
            <Form.Control.Feedback type="invalid">Mandorty Field</Form.Control.Feedback>
          </Form.Group>
        </div>
        <button type="submit" className={`customButton px-2 mt-2`}   >Craete e-Mandate</button>
      </Form>
      <AlertModel show={openAlertModel} setShow={setOpenAlertModel} title={"Proceed"} msg={"The name on your UCC does not match with the bank name on your account. This can lead to possible rejections. \nDo you want to continue?"} apiFun={saveBank} />
      <CreateMandate show={openCreateMandate} setShow={setOpenCreateMandate} accountNumber={accountNumber} ifscCode={ifscCode} accountType={accountType}/>
    </main>
  );
}

export default AddBankDetails;
