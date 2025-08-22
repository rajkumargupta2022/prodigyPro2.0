
import Card from 'react-bootstrap/Card';

import { CurrencyRupee } from "react-bootstrap-icons";
import { filteredSchemeResponse, filteredSchemesKeys } from "../data-interfaces/explore";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { postRequest } from "../../services/Api/HandleApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const PopularFunds = () => {
  const navigate = useNavigate()
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([])
  const [category, setCategory] = useState<number>(31)


  useEffect(() => {
    fetchFilteredScheme(31)

  }, [])
  const fetchFilteredScheme = async (value: number) => {
    const reBody = {
      amc_code: [],
      asset_code: [],
      classcode: [value]
    }
    try {
      const res = await postRequest<filteredSchemeResponse>(endPoints.getFilteredScheme + "?page=" + 1 + "&returns=" + 3, reBody)
      if (res.data) {
        setFilteredSchemes(res.data.slice(0, 10))
      } else {
        setFilteredSchemes([])
      }
    } catch (err) {
      setFilteredSchemes([])
    }
  }

  const selectCategory = (value: number) => {
    fetchFilteredScheme(value)
    setCategory(value)
  }
   const fundDetails = (item: filteredSchemesKeys) => {
    
    navigate("/fund-details", { state: { accordSchemeCode: item.Schemecode, fromPortfolio: false } })
  }


  return (
    <Card border="light" className="mb-3 cardRadius">
      <Card.Body>
        <div className="row">
         <div className="col-sm-12 col-lg-7 d-flex justify-content-between w-100 mb-3">
            <div className="fw-semibold">Popular Funds</div>
            <Link to="/all-mutual-funds" className="text-end logoBlueColor crPointer">View all</Link>
          </div>
          <div className="col-12 mt-2">
            <button type="button" className={`btn btn-light popularButton ${category === 31 && "logoBlueColor"}`} onClick={() => selectCategory(31)}>
              Large Cap
            </button>
            <button type="button" className={`btn btn-light popularButton ${category === 32 && "logoBlueColor"}`} onClick={() => selectCategory(32)}>
              Mid Cap
            </button>

            <button type="button" className={`btn btn-light popularButton ${category === 33 && "logoBlueColor"}`} onClick={() => selectCategory(33)}>
              Small Cap
            </button>
            <button type="button" className={`btn btn-light popularButton ${category === 49 && "logoBlueColor"}`} onClick={() => selectCategory(49)}>
              Multi Cap
            </button>
            <button type="button" className={`btn btn-light popularButton ${category === 83 && "logoBlueColor"}`} onClick={() => selectCategory(83)}>
              Flexi Cap
            </button>

          </div>
          {filteredSchemes?.map((item) => {
            return <div className="col-12 mt-2 crPointer">
              <div className="d-flex gap-3 border-bottom borderColor py-2" onClick={()=>fundDetails(item)}>
                <div className="">
                  <img src={imageUrl + item?.accordAMCCode + ".png"} height={45} width={45} alt="" className='rounded' />
                </div>
                <div className="">
                  <small className="">
                    {item.PRODUCT_LONG_NAME}<br />{" "}
                    <small className="congratesColor">25.08%</small> 3Y Returns{" "}
                    <small>
                      {" "}
                      Min. SIP <CurrencyRupee />
                    </small>
                    100
                  </small>
                </div>
              </div>

            </div>
          })}

        </div>

      </Card.Body>
    </Card>
  )
}
export default PopularFunds