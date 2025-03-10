import NavBar from "../components/Navbar";
import empty from "../assets/img/empty-img.svg"
import { useNavigate } from "react-router-dom";

const PortfolioEmpty = () => {
   const navigate = useNavigate()

  const getOtp = () => {
    navigate("/explore")
  }

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
        
          <div className="col-md-12 col-sm-12 ">
            <div className="row  justify-content-center mb-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="d-flex justify-content-center my-4">
                  <img src={empty} alt="" height={300}  />
                </div>
                  <h4 className="text-center">You Have No Investments Yet</h4>
                  <p className="fs16px mt-1 text-center">Start investing today to build your portfolio and achieve your financial goals.</p>
                 
                  <button type="button"  className="customButton px-4 mx-auto d-block" onClick={getOtp}>Explore Funds</button>
              </div>
            </div>
          </div>

        </div>
      </div>


    </>
  );
};

export default PortfolioEmpty;
