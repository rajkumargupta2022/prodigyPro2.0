import NavBar from "../../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import icici from "../../assets/img/bank-logo/icici.png"
import { ChevronRight } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SchemeDetails from "../../components/SchemeDetails";
import RecomendedSchemes from "../../components/Recomended-schemes";

const RecommendedSchemeGoal = () => {
  const location = useLocation()
  const [openSchemeDetail,setOpenSchemeDetail] = useState<boolean>(false)
  const handleSchemeDetail = ()=>{
    setOpenSchemeDetail(true)
  }
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
        <RecomendedSchemes  from={location?.state?.title}/>
      </div>
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail}/>
    </>
  );
};

export default RecommendedSchemeGoal;
