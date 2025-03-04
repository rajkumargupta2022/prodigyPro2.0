import journeyImage from "../assets/img/left-login.svg"
const LoginLeftImage = ({ LeftImage = journeyImage }) => {
  return (
    <>
        <div className="col-md-6 col-12 m-0 loginBg px-lg-5">
          <img className="w-lg-85 mx-auto d-block loginimg" height={500} src={LeftImage} alt="leftLogin" />
          <h4 className="text-white px-5">Your Journey to Wealth
            Begins Today</h4>
          <ul className="text-white px-5 ">
            <li className="fs16px text-white">
              Explore a world of mutual funds designed to help you achieve your financial dreams, one step at a time
            </li>
            <li className="fs16px text-white logincontent">AMFI Registered Mutual Fund Distributor ARN: 21399</li>
          </ul>
        </div>
    </>
  )
}
export default LoginLeftImage