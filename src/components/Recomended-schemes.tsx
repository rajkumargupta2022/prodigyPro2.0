import { ChevronRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InvetmentConfirmation from "../components/InvestmentConfirmation";
import { endPoints, imageUrl } from "../services/utils/urls";
import { errorToast } from "../services/utils/toast";
import { schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { getRequest, postRequest } from "../services/Api/HandleApi";

interface pageProps {
  from: string,
  url?: string,
  risk?: number,
  duration?: number
}

const RecomendedSchemes: React.FC<pageProps> = ({ from, url = endPoints.goalPlanningSchemes, risk, duration }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sipDateList, setSipDateList] = useState<number[]>([])

  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([])
  const [selectedSchemeList, setSelectedSchemeList] = useState<schemeDeatilDataKeys[]>([])

  const [openInvestmentConfirmation, setOpenInvestmentConfirmation] =
    useState<boolean>(false);

  useEffect(() => {
    if (url === endPoints.getRecommendedSchemes) {
      fetchRecomendedSchemeList()
    } else if (url === endPoints.getEmergencyFunds) {
      fetchEmergencyScheme()
    } else if (url === endPoints.getTaxPlanningScheme) {
      fetchTaxSavingScheme()
    } else {

      fetchSchemeList()
    }
  }, [risk, duration])

  const fetchTaxSavingScheme = async () => {
    try {
      const res = await getRequest<any>(endPoints.getTaxPlanningScheme)
      if (res) {
        await filterData(res.data)
      }
    } catch (err) {
      console.log(err);

    }
  }
  const fetchEmergencyScheme = async () => {
    try {
      const res = await getRequest<any>(endPoints.getEmergencyFunds)
      if (res) {
        await filterData(res.data)
      }
    } catch (err) {
      console.log(err);

    }
  }

  const handleInvestmentConfirmation = () => {
    if (selectedSchemeList.length <= 0) {
      errorToast("Plaese select schemes..")
      return
    }
    handleSipIntersection()
    setOpenInvestmentConfirmation(true)
  }
  const filterData = async (data: schemeDeatilDataKeys[]) => {
    const arr = data.filter(item => item.nseProductCode
    )
    setSchemeList(arr)
    setSelectedSchemeList(arr)
  }
  const handleSipIntersection = () => {
    const sipIntersectionData = selectedSchemeList?.map(scheme => scheme.sipDateList)
      .reduce((acc, curr) => acc.filter(date => curr.includes(date)))
    setSipDateList(sipIntersectionData)
    if (url === endPoints.goalPlanningSchemes) {
      setSelectedSchemeList((prev: any) =>
        prev.map((obj: any) => {
          return {
            ...obj,
            totalAmount: location.state?.newsipamt,
          };
        })
      );
    }
  }

  const handleSelectedScheme = (item: any) => {

    setSelectedSchemeList(prev => {
      const alreadySelected = prev.find(scheme => scheme.accordSchemeCode === item.accordSchemeCode);
      if (alreadySelected) {
        return prev.filter(scheme => scheme.accordSchemeCode !== item.accordSchemeCode);
      } else {
        return [...prev, item];
      }
    });
  };

  const fetchSchemeList = async () => {
    try {
      const res = await postRequest<any>(endPoints.goalPlanningSchemes, { durationValues: location.state.investmentPeriod })
      await filterData(res.data)

    } catch (err) {
      setSchemeList([])
    }
  }
  const fetchRecomendedSchemeList = async () => {
    try {
      const reqBody = {
        risk, duration
      }
      const res = await postRequest<any>(endPoints.getRecommendedSchemes, reqBody)
      await filterData(res.data)

    } catch (err) {
      setSchemeList([])
    }
  }
  const fundDetails = (item: any) => {

    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
  }

  return (
    <>

      <div className="container pt-2">
        <div className="personal_form_container">
          <p className="mb-2 ">Recommended Schemes</p>
          {schemeList.map((item, index) => {
            const isChecked = selectedSchemeList?.some(scheme => scheme?.accordSchemeCode === item.accordSchemeCode);

            return (
              <div className="bg-white px-4 my-2 rounded form_shadow" key={index}>
                <div className="row borderColor py-2 crPointer" onClick={() => handleSelectedScheme(item)}>
                  <div className="round col-11">
                    <input
                      type="checkbox"
                      id={"checkbox" + index}
                      checked={isChecked}
                      onClick={() => handleSelectedScheme(item)}
                    />
                    <label htmlFor={"checkbox" + index}></label>
                    <img
                      src={`${imageUrl + item?.accordAMCCode}.png`}
                      className="rounded"
                      height={30}
                      width={30}
                      alt=""
                    />
                    <small className="mx-2">{item.scheme}</small>
                  </div>
                  <div className="col-1 adjustText pb-2 crPointer text-end" onClick={() => fundDetails(item)}>
                    <ChevronRight />
                  </div>
                </div>
              </div>
            );
          })}




         {(url === endPoints.goalPlanningSchemes)&&<> <Link to={"/all-mutual-funds"} className="logoBlueColor"> Add Mutual Fund</Link><br /></>}
          <button type="button" className="customButton px-2 mt-3" onClick={handleInvestmentConfirmation}>Continue</button>
        </div>
      </div>
      <InvetmentConfirmation
        show={openInvestmentConfirmation}
        setShow={setOpenInvestmentConfirmation}
        schemeList={selectedSchemeList}
        setSchemeList={setSelectedSchemeList}
        sipDateList={sipDateList}
        from={location.state?.title || from}

      />

    </>
  );
};

export default RecomendedSchemes;
