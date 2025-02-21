import journeyImage from "../assets/img/left-login.svg"
const LoginLeftImage = ({ LeftImage = journeyImage }) => {
  return (
    <>
      <div className="col-md-6 col-12 hideImage m-0 loginBg">
        <div className="row container">
          <div className="col-12 offset-1">
            <img className="w-100 login_hight_fixed  p-0" src={LeftImage} height={500} width={500}  alt="leftLogin" />
            <h4 className="text-white">Your Journey to Wealth
              Begins Today</h4>
            <ul className="text-white">
              <li className="fs16px text-white">
                Explore a world of mutual funds designed to help you achieve your financial dreams, one step at a time
              </li>
              <li className="fs16px text-white">AMFI Registered Mutual Fund Distributor ARN: 21399</li>
            </ul>
          </div>

        </div>

      </div>
    </>
  )
}
export default LoginLeftImage