import {  Container } from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "./explore/Category";
// import Returns from "./explore/SortBy";
import Filters from "./explore/Amcs";
import { useEffect, useState } from "react";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { filteredSchemeResponse, filteredSchemesKeys } from "./data-interfaces/explore";
import SwitchSchemes from "../components/SwitchSchemes";
import { useLocation } from "react-router-dom";


const AllMutualFunds = () => {
  const location = useLocation()
  const [amcCode, setAmcCode] = useState<number[]>([])
  const [assetCode, setAssetCode] = useState<number[]>([1])
  const [classCode, setClassCode] = useState<number[]>([])
  const [page, setPage] = useState<number>(1)
  const [retunrs, setretunrs] = useState<number>(3)
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([])

  useEffect(() => {
    fetchFilteredScheme(amcCode, assetCode, classCode,page,retunrs)
    setPage(1)
    setretunrs(3)
    
  }, [])

  const fetchFilteredScheme = async (amc: number[] = amcCode, asset: number[] = assetCode, classArr: number[] = classCode,page2:number,return2:number) => {
    const reBody = {
      amc_code: amc,
      asset_code: asset,
      classcode: classArr
    }
    try {
      const res = await postRequest<filteredSchemeResponse>(endPoints.getFilteredScheme + "?page=" + page2 + "&returns=" + return2, reBody)
      if (res.data) {
        setFilteredSchemes(res.data)
      } else {
        setFilteredSchemes([])
      }
    } catch (err) {
      setFilteredSchemes([])
    }
  }

  const handleFilter = (value: number, filterType: string) => {

    let classArr: number[];
    let amc: number[];
    let asset: number[];
    switch (filterType) {
      case "category":
        if (classCode.includes(value)) {
          classArr = classCode.filter(item => item !== value)
          setClassCode(classArr);
          fetchFilteredScheme(amcCode, assetCode, classArr,page,retunrs)
        } else {
          classArr = [...classCode, value]
          setClassCode(classArr)
          fetchFilteredScheme(amcCode, assetCode, classArr,page,retunrs)
        }
        break;
      case "asset":
        asset = [value]
        setAssetCode(asset)
        fetchFilteredScheme(amcCode, asset, classCode,page,retunrs)
        break;
      case "amc":
        amc = amcCode.filter(item => item !== value)
        if (amcCode.includes(value)) {
          setAmcCode(amc);
          fetchFilteredScheme(amc, assetCode, classCode,page,retunrs)
        } else {
          amc = [...amcCode, value]
          setAmcCode(amc)
          fetchFilteredScheme(amc, assetCode, classCode,page,retunrs)
        }
        break;
      default:
        return;
    }

  }
  const isAvailable = (value: number, type: string): boolean => {
    
    switch (type) {
      case "category":
        return classCode.includes(value)

      case "asset":
        return assetCode.includes(value)

      case "amc":
        return amcCode.includes(value)

      default:
        return false
    }
  }
  // const fundDetails = (item: filteredSchemesKeys) => {
  //   navigate("/fund-details", { state: { accordSchemeCode: item.Schemecode, fromPortfolio: false } })
  // }

  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <div className="d-md-block d-none">
          <h4 className="fw-bold">{location.state ? location.state:"All Mutual Funds"}</h4>
          <p>
            Discover mutual funds across all categories using the all mutual funds
            screener
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 border-end d-none d-lg-block">

            {/* <Returns /> */}

            <Category handleFilter={handleFilter} isAvailable={isAvailable} />

            <Filters handleFilter={handleFilter} isAvailable={isAvailable} />
          </div>
        <SwitchSchemes handleFilter={handleFilter} isAvailable={isAvailable} filteredSchemes={filteredSchemes}/>
        </div>

      </Container>
      <Footer />
    </>
  );
};

export default AllMutualFunds;
