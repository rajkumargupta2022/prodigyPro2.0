import LeftImage from "../assets/img/leftLogin.png"
import Logo from "../assets/img/logo/logo.png"
const Login = () => {
  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-12 hideImage">
          <div className="leftLogin">
            <img className="w-100 login_hight_fixed" src={LeftImage} alt="leftLogin" />
          </div>
        </div>

        <div className="col-12 col-md-6 align-self-center">
          <div className="mrgin_With20">
            <img src={Logo} alt="" className="logoImage"/>
            <p className="py-2">From BFC Capital Private Limited</p>
            <form className="pt-3" action="">
              <label className="form-label fontFamily fw-bold pb-1">Enter your phone number</label>

              <div className="input-group mb-3">
                <button className="btn rounded border" type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>              
                <input type="text" className="form-control mx-1 rounded" aria-label="Text input with dropdown button" placeholder="Phone Number" />
              </div>
              <button type="button" className="customButton col-12">Get OTP</button>
            </form>
            <p className="mt-3">By logging in, you agree to our Terms & Conditions</p>
          </div>
        </div>
      </div>

    </div>

  )
}
export default Login