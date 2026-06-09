import NavBar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endPoints, imageUrl } from "../services/utils/urls";
import { getRequest } from "../services/Api/HandleApi";
import { schemeDeatilDataKeys, topPerformersRes } from "./data-interfaces/transact";
import Card from 'react-bootstrap/Card';
import { getValueInSort } from "../services/calculation/percentageCalculate";
import { yearKeys } from "../services/utils/keys";
import { Dropdown } from "react-bootstrap";

const TopPerformers = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState<number>(3)
  const [schemeList, setSchemeList] = useState<schemeDeatilDataKeys[]>([])


  useEffect(() => {
    fetchTopPerformers()
  }, [selectedYear])

  const handleYears = (year: number) => {
    setSelectedYear(year)
  }
  const fetchTopPerformers = async () => {
    try {
      const res = await getRequest<topPerformersRes>(endPoints.getTopPerformers + "?filter_by_year=" + selectedYear + "&page=" + 1)

      if (res.data) {
        console.log("Top Performers", res.data)
        setSchemeList(res.data)
      }

    } catch (err) {
      setSchemeList([])
    }
  }
  const fundDetails = (item: schemeDeatilDataKeys) => {

    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
  }

  // function PaginatedItems({ itemsPerPage:any }) {
  // // Here we use item offsets; we could also use page offsets
  // // following the API or data you're working with.
  // const [itemOffset, setItemOffset] = useState(0);

  // // Simulate fetching items from another resources.
  // // (This could be items from props; or items loaded in a local state
  // // from an API endpoint with useEffect and useState)
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };
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
              <h4>Top Performers Funds</h4>
              <p className="fs14px">Discover expertly curated fund baskets tailored to your financial goals. Simplify your investment journey with the right mix of funds for every need!</p>
            </div>
          </div>
          <div className="row">
            <div className=" col">
              <small className="fs14px lightBlack">Select Year</small>
                <Dropdown>
                    <Dropdown.Toggle variant="selectBoxBg" size="sm" className="selectBoxBg">
                      {selectedYear} Year Returns
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {[1,2,3, 4,5,7,10].map((count) => (
                        <Dropdown.Item
                          key={count}
                          active={selectedYear === count}
                          onChange={() => handleYears(count)}
                          onClick={() => setSelectedYear(count)}
                        >
                          {count} Year Returns
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
            </div>
          </div>
        
          <div className="row mt-2">
            <div className=" col">
              <>
                {schemeList?.map((item: schemeDeatilDataKeys, index) => (
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
                          <span className="value-font2 text-success">{item[yearKeys[selectedYear]] ? item[yearKeys[selectedYear]] : 0}%</span>
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
               {/* <Paginate currentItems={currentItems} />
               <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}
            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default TopPerformers;
