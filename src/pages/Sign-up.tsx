import Logo from "../assets/img/logo/logo.png";
import LoginLeftImage from "../components/LoginLeftImage";
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { errorToast } from "../services/utils/toast";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import RequestSent from "../components/Request-sent";


const SighnUp = () => {
  const [name, setName] = useState<string>("");
  const [pan, setPan] = useState<string>("");
  const [validated, setValidated] = useState(false);
  const [openRequestModel,setRequestModel] = useState<boolean>(false)

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity()) {
      event.stopPropagation();
      const reqBody = {
        Name: name.trim(),
        PAN: pan
      }
      try {
        const res = await postRequest<any>(endPoints.tempOnboarding, reqBody)

        if (res.success) {
          localStorage.clear()
       setRequestModel(true)
        }
      } catch (err) {
        errorToast(err)
      }

    }

    setValidated(true);
  };



  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value.length < 150) {
      setName(value)
    }

  }
  const handlePan = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim()
    if (value.length <= 10) {
      setPan(value.toUpperCase())
    }
  }


  return (
    <div className="container-fluid">
      <div className="row login_hight_fixed">
        <LoginLeftImage />

        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            <img src={Logo} alt="" className="logoImage" />
            <p className="py-2">From BFC Capital Private Limited</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Row className="">
                <h4>Provide your basic details</h4>
                <p>Please fill the details below to get a call back.</p>
                <Form.Group as={Col} md="12" controlId="validationCustom01" >
                  <Form.Label className="mb-0">FULL  NAME</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={handleName}
                    value={name}

                    placeholder="Enter your full name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>

                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom02" className=" mt-2">
                  <Form.Label className="mb-0">PAN NUMBER</Form.Label>
                  <Form.Control
                    required
                    onChange={handlePan}
                    maxLength={10}
                    minLength={10}
                    value={pan}
                    // pattern="/^[A-Z]{5}[0-9]{4}[A-Z]$/"
                    type="text"
                    placeholder="Enter Pan"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your pan.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <button type="submit" className="customButton col-12 mt-3">
                    Save Info
                  </button>
                </Form.Group>
              </Row>

            </Form>


          </div>
        </div>
      </div>
            <RequestSent show={openRequestModel} setShow={setRequestModel}/>

    </div >
  );
};
export default SighnUp;
