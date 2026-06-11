import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endPoints, imageUrl } from "../services/utils/urls";
import { postRequest, getRequestSimple } from "../services/Api/HandleApi";
import { schemeDeatilDataKeys, topPerformersRes } from "./data-interfaces/transact";
import Card from 'react-bootstrap/Card';
import { getValueInSort } from "../services/calculation/percentageCalculate";
import { yearKeys } from "../services/utils/keys";
import { Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Category from "./explore/Category";
import Filters from "./explore/Amcs";
import { categoryListKeys, assetTypeListKeys, assetTypeListResponse, categoryListResponse } from "./data-interfaces/explore";
import emptyScheme from "../assets/img/empty-scheme.svg";
import PortfolioEmpty from "./PortfolioEmpty";
import { AllMutualFundsSkeleton } from "./AllMutualFundsSkeleton";

const TopPerformers = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState<number>(3)
  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  const [amcCode, setAmcCode] = useState<number[]>([]);
  const [assetCode, setAssetCode] = useState<number[]>([1]);
  const [classCode, setClassCode] = useState<number[]>([]);
  const [categoryList, setCategoryList] = useState<categoryListKeys[]>([])
  const [assetTypeListData, setAssetTypeListData] = useState<assetTypeListKeys[]>([])
  const [riskValue, setRiskValue] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTopPerformers()
  }, [selectedYear, currentPage, amcCode, assetCode, classCode, riskValue])

  useEffect(() => {
    fetchCategoryList(assetCode[0])
    fetchAssetTypeList()
  }, [])

  const fetchCategoryList = async (data: number) => {
    try {
      const res = await getRequestSimple<categoryListResponse>(endPoints.getCategoryTypesList + "?asset_code=" + data)
      if (res.data) {
        setCategoryList(res.data)
      }
    } catch (err) {
    }
  }

  const fetchAssetTypeList = async () => {
    try {
      const res = await getRequestSimple<assetTypeListResponse>(endPoints.getAssetTypesList)
      if (res.data) {
        setAssetTypeListData(res.data)
      }
    } catch (err) {
    }
  }

  const handleYears = (year: number) => {
    setSelectedYear(year)
    setCurrentPage(1)
  }

  const handleFilter = (value: number, filterType: string) => {
    let classArr: number[];
    let amc: number[];
    let asset: number[];

    switch (filterType) {
      case "category":
        if (classCode.includes(value)) {
          classArr = classCode.filter((item) => item !== value);
        } else {
          classArr = [...classCode, value];
        }
        setClassCode(classArr);
        break;
      case "asset":
        asset = [value];
        setClassCode([])
        fetchCategoryList(value)
        setAssetCode(asset);
        break;
      case "amc":
        if (amcCode.includes(value)) {
          amc = amcCode.filter((item) => item !== value);
        } else {
          amc = [...amcCode, value];
        }
        setAmcCode(amc);
        break;
      default:
        return;
    }
    setCurrentPage(1);
  };

  const isAvailable = (value: number, type: string): boolean => {
    switch (type) {
      case "category":
        return classCode.includes(value);
      case "asset":
        return assetCode.includes(value);
      case "amc":
        return amcCode.includes(value);
      default:
        return false;
    }
  };

  const fetchTopPerformers = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        filter_by_year: selectedYear,
        page: currentPage,
        amc_code: amcCode,
        classcode: classCode,
        asset_code: assetCode,
        risk_code: riskValue > 0 ? riskValue : null
      };

      const res = await postRequest<topPerformersRes>(endPoints.getTopPerformers, requestBody);

      if (res.data) {
        setSchemeList(res.data)
        setTotalPages(res.totalPages || 0)
      } else {
        setSchemeList([])
        setTotalPages(0)
      }
    } catch (err) {
      setSchemeList([])
      setTotalPages(0)
    } finally {
      setIsLoading(false);
    }
  }
  const fundDetails = (item: schemeDeatilDataKeys) => {
    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
  }

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  return (
    <>
      <NavBar />
      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" ><Link to={"/dashboard"}>Home</Link>  <small className="greyColor"> <ChevronRight className="fs14px" /> Top Performer Funds </small> </h6>
          </div>
          <div className="row">
            <div className=" col">
                <Dropdown className="">
                    <Dropdown.Toggle variant="selectBoxBg" size="sm" className="selectBoxBg">
                      {selectedYear} Year 
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {[1,2,3, 4,5,7,10].map((count) => (
                        <Dropdown.Item
                          key={count}
                          active={selectedYear === count}
                          onChange={() => handleYears(count)}
                          onClick={() => setSelectedYear(count)}
                        >
                          {count} Year
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
            </div>
          </div>
        
          <div className="row">
            <div className="col-lg-4 border-end d-none d-lg-block">
               <Category handleFilter={handleFilter} isAvailable={isAvailable} categoryList={categoryList} assetTypeListData={assetTypeListData} />
               <Filters handleFilter={handleFilter} isAvailable={isAvailable} riskValue={riskValue} setRiskValue={setRiskValue} />
            </div>
            <div className="col-lg-8">
              {schemeList?.length > 0 ? (
                <>
                  {schemeList.map((item: schemeDeatilDataKeys, index) => (
                    <Card className="mb-3 radius16px" key={`${item.accordSchemeCode}-${index}`}>
                      <Card.Body>
                        <div className="row justify-content-between crPointer">
                          <div className="col-8 py-2" onClick={() => fundDetails(item)}>
                            <div className="d-flex">
                              <img
                                src={`${imageUrl + item?.accordAMCCode}.png`}
                                className="logoRadius"
                                height={45}
                                width={45}
                                alt="AMC Logo"
                              />
                              <div className="ms-2" style={{ flex: 4 }}>
                                <h6 style={{ margin: 0 }}>{item.scheme}</h6>
                                <span className="text-secondary">Category-{item.equityType}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 py-2 text-md-end text-start">
                            <div className="text-secondary" onClick={() => fundDetails(item)}>
                              <ChevronRight className="funds-rightsign-prodgy12" size={20} />
                            </div>
                          </div>
                        </div>
                        <hr className="fw-light text-secondary my-1" />
                        <div className="row">
                          <div className="col-4">
                            <span className="text-secondary">Last {selectedYear}Y</span>
                            <br />
                            <span className="value-font2 text-success">{item[yearKeys[selectedYear]] ? item[yearKeys[selectedYear]]?.toFixed(2) : 0}%</span>
                          </div>
                          <div className="col-4">
                            {item.sipAllowed ?
                              <>
                                <span className="text-secondary">Min. SIP</span>
                                <br />
                                <span className="value-font2">{item.minSIPAmt ? "₹" + item.minSIPAmt : "N/A"}</span>
                              </>
                            : 
                              <>
                                <span className="text-secondary">Min. Lumpsum</span>
                                <br />
                                <span className="value-font2">{item.minLumSumAmt ? "₹" + item.minLumSumAmt : "N/A"}</span>
                              </>
                            }
                          </div>
                          <div className="col-4">
                            <span className="text-secondary">Fund Size</span>
                            <br />
                            <span className="value-font2">₹{getValueInSort(item.fundSize??0)}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              ) : isLoading ? (
                <AllMutualFundsSkeleton />
              ) : (
                <div className="text-center py-5">
                  <PortfolioEmpty images={emptyScheme} title={"No Funds Available"} body={"Looks like there aren't any funds to display. Fresh opportunities are on the way!"} btnName={""} btnUrl={""} />
                </div>
              )}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={totalPages}
                    previousLabel="< Previous"
                    forcePage={currentPage - 1}
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPerformers;
