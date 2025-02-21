import NavBar from "../components/Navbar";
import reviewWaiting from "../assets/img/review-waiting.svg"


const PortfolioUnderReview = () => {

 

  return (
    <>
      <NavBar />
      <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-12 d-flex align-items-start">
            <h4>Portfolio Review</h4>
          </div>
          <div className="col-md-12 col-sm-12 bg-white rounded-3">
            <div className="row  justify-content-center mt-4 pt-3">
              <div className="col-lg-6 col-md-12 col-sm-12">
                  <h4 className="">It looks like you don’t have any  investments with us yet. No worries!</h4>
                  <div className="d-flex justify-content-center">
                  <img src={reviewWaiting} alt="" height={260} width={260} />
                </div>
                 </div>
            </div>
          </div>

        </div>
      </div>


    </>
  );
};

export default PortfolioUnderReview;
