import { useNavigate } from "react-router-dom"
import Logo from "../assets/img/logo/logo.png"
import LoginLeftImage from "../components/LoginLeftImage"
const Login = () => {
  const navigate = useNavigate()
  const getOpt = ()=>{
    navigate("/otp")
}
  return (

    <div className="container-fluid">
      <div className="row">
       <LoginLeftImage/>
        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            <img src={Logo} alt="" className="logoImage"/>
            <p className="py-2">From BFC Capital Private Limited</p>
            <form className="pt-3" action="">
              <label className="form-label fw-bold pb-1">Enter your phone number</label>

              <div className="input-group mb-3">
                <button className="btn rounded border" type="button" >+91</button>              
                <input type="text" className="form-control mx-1 rounded"  placeholder="Phone Number" />
              </div>
              <button type="button" onClick={getOpt} className="customButton col-12">Get OTP</button>
            </form>
            <p className="mt-3">By logging in, you agree to our Terms & Conditions</p>
          </div>
        </div>
      </div>

    </div>

  )
}
export default Login