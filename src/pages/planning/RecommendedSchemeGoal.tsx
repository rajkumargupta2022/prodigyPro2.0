import NavBar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import RecomendedSchemes from "../../components/Recomended-schemes";

const RecommendedSchemeGoal = () => {
  const location = useLocation()

  return (
    <>
      <NavBar />

     
      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="row">
            <div className=" col">
              <h4>{location?.state?.title}</h4>
              <p className="small">{location?.state?.paragraph}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-2">
        <RecomendedSchemes  from={location?.state}/>
      </div>
    </>
  );
};

export default RecommendedSchemeGoal;
