import LeftImage from "../assets/img/leftLogin.png"
import Logo from "../assets/img/logo/logo.png"
const Login = ()=>{
return (

  <div className="container-fluid">

<div className="row">

    <div className="col-md-6">
      <div className="leftLogin">
      <img className="w-100 login_hight_fixed" src={LeftImage} alt="leftLogin" />
      </div>
    </div>

    <div className="col-md-6 align-self-center">
      <div className="mrgin_With20">
        <img src={Logo} alt="" />
        <p className="py-2">From BFC Capital Private Limited</p>
          <form className="pt-3" action=""> 
            <label className="form-label fontFamily fw-bold pb-1">Enter your phone number</label>
            
            <div className="input-group mb-3">
  <button className="btn rounded border" type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
    <li><hr className="dropdown-divider"/></li>
    <li><a className="dropdown-item" href="#">Separated link</a></li>
  </ul>
  <input type="text" className="form-control mx-1 rounded" aria-label="Text input with dropdown button" placeholder="Phone Number"/>
</div>
            <button type="button" className="customButton col-md-12 col-sd-12">Get otp</button>
        </form>
      </div>
    </div>
</div>

  </div>

)
}
export default Login