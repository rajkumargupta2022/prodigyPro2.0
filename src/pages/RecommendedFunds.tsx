import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { Link } from "react-router-dom";
import RecomendedSchemes from "../components/Recomended-schemes";
import { endPoints } from "../services/utils/urls";
import { getRequest } from "../services/Api/HandleApi";
import { durationKeys, riskDurationRes, riskKeys } from "./data-interfaces/explore";

const RecommendedFunds = () => {
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  const [selectedRiskType, setSelectedRiskType] = useState<number>()
  const [selectedYear, setSelectedYear] = useState<number>()
  const [years, setYears] = useState<riskKeys[]>()
  const [duration, setDuration] = useState<durationKeys[]>()

  useEffect(() => {
    fetchDurationAndRisk()
  }, [])
  const handleRisk = (type: number) => {
    setSelectedRiskType(type)
  }
  const handleYears = (year: number) => {
    setSelectedYear(year)
  }
  const fetchDurationAndRisk = async () => {
    try {
    const res = await  getRequest<riskDurationRes>(endPoints.getRightSchemeDurationRisk)

        setDuration(res.dataDuration)
        setYears(res.dataRisk)
        setSelectedRiskType(res.dataRisk[2].risk)
        setSelectedYear(res.dataDuration[4].durationValues)
     
    } catch (err) {

    }
  }
  return (
    <>
      <NavBar />


      <div className="container pt-2">

        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" ><Link to={"/dashboard"}>Home</Link>  <small className="greyColor"> <ChevronRight className="fs14px" /> Recommended Funds </small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Recommended Funds</h4>
              <p className="fs14px">Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!</p>
            </div>
          </div>
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Risk Profile</small>
              <div className="">
                {years?.map((item)=>{
                  return   <button type="button" className={`btn ms-1 ${item.risk === selectedRiskType ? "selectedBtn" : "riskProfileBtn"}`} onClick={() => handleRisk(item.risk)}>{item.Constellation}</button>
                })}
                
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Investment horizon</small>
              <div className="">
                   {duration?.map((item,i)=>{
               return <button type="button" key={i} className={`btn mx-1  ${item.durationValues === selectedYear ? "selectedBtn" : "riskProfileBtn"}`} onClick={() => handleYears(item.durationValues)}> {item.duration}</button>
                })}
             
              </div>
            </div>
          </div>

        </div>
      </div>
      <RecomendedSchemes from={"Recomended"} url={endPoints.getRecommendedSchemes} risk={selectedRiskType} duration={selectedYear} />
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default RecommendedFunds;
