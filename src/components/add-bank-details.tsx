import { Col } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";


function AddBankDetails() {

  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState<string>("")
  const [confirmAccountNumber, setConfirmAccountNumber] = useState<string>("")
  // const [accountType, setAccountType] = useState<string>("")
  const [ifscCode, setIfscCode] = useState<string>("")
  const [bankName, setBankName] = useState<string>("")
  const [branchName, setBranchName] = useState<string>("")
  const [validated, setValidated] = useState(false);

  useEffect(()=>{
     setIfscCode("")
     setBankName("")
     setBranchName("")
  },[])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const form = event.currentTarget;
    event.preventDefault()
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   navigate("/add-verification-details")
    // }

    setValidated(true);
  };

  const handleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!isNaN(Number(value)) && value.length < 20) {
      setAccountNumber(value.trim())
    }
  }
  const handleConfirmAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!isNaN(Number(value)) && value.length < 20) {
      setConfirmAccountNumber(value.trim())
    }
  }
  const handleIfscCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLocaleUpperCase()
    if (value.length < 15) {
      setIfscCode(value.trim())
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
              type="text"
              min={10}
              max={20}
              onChange={handleAccount}
              placeholder="Enter account number"
              // defaultValue="Mark"
              value={accountNumber}
              className="text-muted"
            />
              <Form.Control.Feedback type="invalid">Mandorty Field</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom02" className="mt-2">
            <Form.Label className="mb-0 fs12px">RE-ENTER ACCOUNT NUMBER</Form.Label>
            <Form.Control
              required
              type="text"
              min={10}
              onChange={handleConfirmAccount}
              placeholder="Enter account number"
            value={confirmAccountNumber}
            />
              <Form.Control.Feedback type="invalid">Mandorty Field</Form.Control.Feedback>
          </Form.Group>
          <div className="mt-2">
            <Form.Label className="mb-0 fs12px">ACCOUNT TYPE</Form.Label><br />
            <button type="button" className={`btn ms-1 selectedBtn`}>Saving Account</button>
            <button type="button" className={`btn ms-1 riskProfileBtn`}>Current Account</button>
          </div>
          <Form.Group as={Col} md="12" controlId="validationCustom03" className="mt-2">
            <Form.Label className="mb-0">IFSC CODE</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={handleIfscCode}
              min={10}
              value={ifscCode}
              placeholder="Enter ifsc code"

            // defaultValue="Mark"
            />
            <Form.Control.Feedback type="invalid">Mandorty Field</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustom04" className="mt-2">
            <Form.Label className="mb-0">BANK</Form.Label>
            <Form.Control
              required
              type="text"
              min={10}
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
              min={3}
              value={branchName}
            />
           <Form.Control.Feedback type="invalid">Mandorty Field</Form.Control.Feedback>
          </Form.Group>
        </div>
        <button type="submit" className={`customButton px-2 mt-2`}   >Craete e-Mandate</button>
      </Form>
    </main>
  );
}

export default AddBankDetails;
