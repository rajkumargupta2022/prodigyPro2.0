// import empty from "../assets/img/empty-img.svg"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PortfolioEmptyProps{
  images:any;
  title?:string;
  body?:string;
  btnName? : string;
  btnUrl?:string

}
const PortfolioEmpty: React.FC<PortfolioEmptyProps> = ({
  images,  // Replace with a default value or imported image
  title,
  body,
  btnName,
  btnUrl = "#"
}) => {
  const navigate = useNavigate()
  const navigateOnPage = () => {
    navigate(btnUrl)
  }
    useEffect(() => {
    const timer = setTimeout(() => {
    }, 1000); // Delay 2 seconds

  return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <div className="container px-4 mt-2" >
        <div className="row">
        <div className="col-md-12 col-sm-12 ">
            <div className="row  justify-content-center mb-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="d-flex justify-content-center my-4">
                  <img src={images} alt="" height={240}  />
                </div>
               {title?  <h5 className="text-center">{title}</h5>:""}  
                 {body?<p className="fs14px mt-1 text-center">{body}</p>:""} 
                 
                 {btnName?<button type="button"  className="customButton px-4 mx-auto d-block" onClick={navigateOnPage}>{btnName}</button>:""} 
              </div>
            </div>
          </div>
          

        </div>
      </div>


    </>
  );
};

export default PortfolioEmpty;
