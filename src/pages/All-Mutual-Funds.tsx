import { Card, Container, Row, Col } from "react-bootstrap";
import { ChevronRight, Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import {  useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Category from "./explore/Category";
import Returns from "./explore/SortBy";
import Filters from "./explore/Amcs";
import { useEffect, useState } from "react";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { filteredSchemeResponse, filteredSchemesKeys } from "./data-interfaces/explore";


const AllMutualFunds = () => {
  const navigate = useNavigate()
  const [amcCode, setAmcCode] = useState<number[]>([])
  const [assetCode, setAssetCode] = useState<number[]>([1])
  const [classCode, setClassCode] = useState<number[]>([])
  const [page, setPage] = useState<number>(1)
  const [retunrs, setretunrs] = useState<number>(3)
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([])

  useEffect(() => {
    fetchFilteredScheme(amcCode,assetCode,classCode)
    setPage(1)
    setretunrs(3)
  }, [])

  const fetchFilteredScheme = async (amc: number[] = amcCode, asset: number[] = assetCode, classArr: number[] = classCode) => {
    const reBody = {
      amc_code: amc,
      asset_code: asset,
      classcode: classArr
    }
    try {
      const res = await postRequest<filteredSchemeResponse>(endPoints.getFilteredScheme + "?page=" + page + "&returns=" + retunrs, reBody)
      if (res.data) {
        setFilteredSchemes(res.data)
      }else{
        setFilteredSchemes([])
      }
    } catch (err) {
      console.log(err);
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
          fetchFilteredScheme(amcCode, assetCode, classArr)
        } else {
          classArr = [...classCode, value]
          setClassCode(classArr)
          fetchFilteredScheme(amcCode, assetCode, classArr)
        }
        break;
      case "asset":
        asset = [value]
        setAssetCode(asset)
        fetchFilteredScheme(amcCode, asset, classCode)
        break;
      case "amc":
        amc= amcCode.filter(item => item !== value)
        if (amcCode.includes(value)) {
          setAmcCode(amc);
          fetchFilteredScheme(amc, assetCode, classCode)
        } else {
          amc =[...amcCode, value]
          setAmcCode(amc)
           fetchFilteredScheme(amc, assetCode, classCode)
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
  const fundDetails = (item:filteredSchemesKeys)=>{
     navigate("/fund-details",{state:{accordSchemeCode:item.Schemecode,fromPortfolio:false}})
  }

  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <div className="d-md-block d-none">
          <h4 className="fw-bold">All Mutual Funds</h4>
          <p>
            Discover mutual funds across all categories using the all mutual funds
            screener
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 border-end d-none d-lg-block">

            <Returns  />

            <Category handleFilter={handleFilter} isAvailable={isAvailable} />

            <Filters handleFilter={handleFilter} isAvailable={isAvailable} />
          </div>
          <div className="col-lg-8">
            <Row className="justify-content-between pb-4 pt-md-0 pt-4 align-items-center">
              <Col md={6} className="">
                <h5 className="fw-bold mb-0">431 Mutual Funds</h5>
              </Col>
              <Col md={6}>
                <div className="position-relative pt-md-0 pt-3">
                  <Search
                    className="mutual-funds-searchbuttonprodgy12 text-secondary "
                    size={20}
                  />

                  <input className="rounded-4 exlore-search-box w-100" type="text" placeholder="Search for mutual funds to invest..."></input>
                </div>
              </Col>
              <div className="col-12 pt-3 d-block d-lg-none">
                <div className="row prody_position_relative">
                  <div className="col-4">
                    <div className="Prodgymobile_filtering_dataa category_show_data">
                      <p>Category <span><ChevronRight className="" size={18} /></span></p>
                      <div className="category_on_mobile">
                        <Category handleFilter={handleFilter} isAvailable={isAvailable} />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="Prodgymobile_filtering_dataa filters_show_mobile">
                      <p>Filter(2) <span><ChevronRight className="" size={18} /></span></p>
                      <div className="filters_on_mobile">
                        <Filters handleFilter={handleFilter} isAvailable={isAvailable} />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="Prodgymobile_filtering_dataa float_right_set">
                      <p>Return <span><ChevronRight className="" size={18} /></span></p>
                      <div className="return_on_mobile">
                        <Returns />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>

            {filteredSchemes.length > 0 ? filteredSchemes.map((item, index) => (
              <Card
                className="mb-3 radius16px"
                key={index}

              >
                <Card.Body>

                  <div className="row justify-content-between">
                    <div className="col-8 py-2" onClick={()=>fundDetails(item)}>
                      <div className="d-flex">
                        <img src={`${imageUrl + item?.AMC_CODE}.png`} className="logoRadius" height={45} width={45} alt="Image not found" />
                        <div className="ms-2" style={{ flex: 4 }}>
                          <h6 style={{ margin: 0 }}>
                            {item.PRODUCT_LONG_NAME}
                          </h6>
                          <span className="text-secondary">
                            Equity - Large Cap
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 py-2 text-md-end text-start">
                      <div className="text-secondary" onClick={()=>fundDetails(item)}>
                        <ChevronRight className="funds-rightsign-prodgy12" size={20} />
                      </div>
                    </div>
                  </div>
                  <hr className="fw-light text-secondary my-1" />
                  <div className="row">
                    <div className="col-4">
                      <span className="text-secondary">Last 3Y</span>
                      <br />
                      <span className="value-font2 text-success">{item.threeyearret}%</span>
                    </div>

                    <div className="col-4">
                      <span className="text-secondary">Min. SIP</span>
                      <br />
                      <span className="value-font2">
                        ₹1000
                      </span>
                    </div>

                    <div className="col-4">
                      <span className="text-secondary">Fund Size</span>
                      <br />
                      <span className="value-font2">₹26,776.87 Cr</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )) : <p className="text-center mt-4">No schemes found</p>}
          </div>
        </div>

      </Container>
      <Footer />
    </>
  );
};

export default AllMutualFunds;
