import journeyImage from "../assets/img/leftLogin.png"
const LoginLeftImage = ({LeftImage=journeyImage})=>{
 return(
  <>
   <div className="col-md-6 col-12 hideImage">
          <div className="leftLogin">
            <img className="w-100 login_hight_fixed" src={LeftImage} alt="leftLogin" />
          </div>
        </div>
  </>
 )
}
export default LoginLeftImage