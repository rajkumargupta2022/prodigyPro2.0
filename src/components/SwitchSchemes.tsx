// import { ChevronRight } from "react-bootstrap-icons";
// import {  imageUrl } from "../services/utils/urls";
// import { Card, Col, Row } from "react-bootstrap";
// import Returns from "../pages/explore/SortBy";
// import Category from "../pages/explore/Category";
// import Filter from "../pages/explore/Amcs";
// import { useNavigate } from "react-router-dom";
// import {  filteredSchemesKeys } from "../pages/data-interfaces/explore";
// import { getValueInSort } from "../services/calculation/percentageCalculate";

// interface SchemesProps {
//   handleFilter: (value: number, type: string) => void;
//   isAvailable: (value: number, type: string) => boolean;
//   filteredSchemes: filteredSchemesKeys[]
// }

// const SwitchSchemes: React.FC<SchemesProps> = ({ handleFilter, isAvailable, filteredSchemes }) => {
//   const navigate = useNavigate()
 

//   const fundDetails = (item: filteredSchemesKeys) => {
    
//     navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
//   }

  // return (
  //   <>

  //     <div className="col">
  //       <Row className="justify-content-between pb-4 pt-md-0 pt-4 align-items-center">
  //         <Col md={6} className="">
  //           <h5 className="fw-bold mb-0">{filteredSchemes.length} Mutual Funds</h5>
  //         </Col>
  //         {/* <Col md={6}>
  //           <div className="position-relative pt-md-0 pt-3">
  //             <Search
  //               className="mutual-funds-searchbuttonprodgy12 text-secondary "
  //               size={20}
  //             />

  //             <input className="rounded-4 exlore-search-box w-100" type="text" placeholder="Search for mutual funds to invest..."></input>
  //           </div>
  //         </Col> */}
  //         <div className="col-12 pt-3 d-block d-lg-none">
  //           <div className="row prody_position_relative">
  //             <div className="col-4">
  //               <div className="Prodgymobile_filtering_dataa category_show_data">
  //                 <span>Category <span><ChevronRight className="" size={18} /></span></span>
  //                 <div className="category_on_mobile">
  //                   <Category handleFilter={handleFilter} isAvailable={isAvailable} />
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="col-4">
//                 <div className="Prodgymobile_filtering_dataa filters_show_mobile">
//                   <span>Filter(2) <span><ChevronRight className="" size={18} /></span></span>
//                   <div className="filters_on_mobile">
//                     <Filter handleFilter={handleFilter} isAvailable={isAvailable} />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-4">
//                 <div className="Prodgymobile_filtering_dataa float_right_set">
//                   <span className="">Return <span><ChevronRight className="" size={18} /></span></span>
//                   <div className="return_on_mobile">
//                     <Returns />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Row>

//         {filteredSchemes.length > 0 ? filteredSchemes.map((item, index) => (
//           <Card
//             className="mb-3 radius16px"
//             key={index}

//           >
//             <Card.Body>

//               <div className="row justify-content-between crPointer">
//                 <div className="col-8 py-2" onClick={() => fundDetails(item)}>
//                   <div className="d-flex">
//                     <img src={`${imageUrl + item?.accordAMCCode}.png`} className="logoRadius" height={45} width={45} alt="Image not found" />
//                     <div className="ms-2" style={{ flex: 4 }}>
//                       <h6 style={{ margin: 0 }}>
//                         {item.PRODUCT_LONG_NAME}
//                       </h6>
//                       <span className="text-secondary">
//                         Equity - Large Cap
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-2 py-2 text-md-end text-start">
//                   <div className="text-secondary" onClick={() => fundDetails(item)}>
//                     <ChevronRight className="funds-rightsign-prodgy12" size={20} />
//                   </div>
//                 </div>
//               </div>
//               <hr className="fw-light text-secondary my-1" />
//               <div className="row">
//                 <div className="col-4">
//                   <span className="text-secondary">Last 3Y</span>
//                   <br />
//                   <span className="value-font2 text-success">{item.threeYearCAGR}%</span>
//                 </div>

//                 <div className="col-4">
//                   <span className="text-secondary">Min. SIP</span>
//                   <br />
//                   <span className="value-font2">
//                     ₹{item.minSIPAmt}
//                   </span>
//                 </div>

//                 <div className="col-4">
//                   <span className="text-secondary">Fund Size</span>
//                   <br />
//                   <span className="value-font2">₹{getValueInSort(item.fundSize)}</span>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         )) : ""}
//       </div>
//     </>
//   );
// }

// export default SwitchSchemes;



// New Code with Pagination BUT Make sure about Things Changed as the CHANCES ARE HIGH
import { ChevronRight, ChevronLeft, ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";
import { imageUrl } from "../services/utils/urls";
import { Card, Col, Row, Dropdown, Form } from "react-bootstrap";
// import Returns from "../pages/explore/SortBy";
import Category from "../pages/explore/Category";
import Filter from "../pages/explore/Amcs";
import { useNavigate } from "react-router-dom";
import { assetTypeListKeys, categoryListKeys, filteredSchemesKeys } from "../pages/data-interfaces/explore";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import { useState, useMemo, useEffect, useCallback } from "react";

interface SchemesProps {
  handleFilter: (value: number, type: string) => void;
  isAvailable: (value: number, type: string) => boolean;
  filteredSchemes: filteredSchemesKeys[];
  handlePageChange: (page: number) => void;
  currentApiPage: number;
  hasMore: boolean;
  isNewFilter: boolean;
  from:boolean;
  categoryList:categoryListKeys[];
    assetTypeListData:assetTypeListKeys[]
}

const SwitchSchemes: React.FC<SchemesProps> = ({
  handleFilter,
  isAvailable,
  filteredSchemes,
  handlePageChange,
  currentApiPage,
  hasMore,
  isNewFilter,
  from,
  categoryList,
  assetTypeListData
}) => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousDataLength, setPreviousDataLength] = useState(0);

  // Calculate pagination values (client-side, across all fetched data)
  const totalPages = Math.ceil((filteredSchemes?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page items with memoization
  const currentItems = useMemo(() => {
    if (!filteredSchemes || !Array.isArray(filteredSchemes)) {
      return [];
    }
    return filteredSchemes.slice(startIndex, endIndex);
  }, [filteredSchemes, startIndex, endIndex]);

  // Reset to first page only when filters change (detected by data reset) or items per page changes
  useEffect(() => {
    const currentLength = filteredSchemes?.length || 0;
    
    // If isNewFilter is true, or if data length decreased (indicating filter change), reset to page 1
    if (isNewFilter || (currentLength < previousDataLength && currentLength <= 25)) {
      setCurrentPage(1);
    }
    
    setPreviousDataLength(currentLength);
  }, [filteredSchemes?.length, isNewFilter, previousDataLength]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const fundDetails = useCallback(
    (item: filteredSchemesKeys) => {
      navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } });
    },
    [navigate]
  );

  const handleClientPageChange = useCallback(
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Fetch next API page if reaching the end of current data and more data is available
      if (pageNumber === totalPages && hasMore && filteredSchemes && filteredSchemes.length > 0) {
        handlePageChange(currentApiPage + 1);
      }
    },
    [totalPages, hasMore, handlePageChange, currentApiPage, filteredSchemes?.length || 0]
  );

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  }, []);

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page button
    items.push(
      <button
        key="first"
        className="btn btn-outline-primary btn-sm me-1"
        onClick={() => handleClientPageChange(1)}
        disabled={currentPage === 1}
        title="First Page"
      >
        <ChevronDoubleLeft size={14} />
      </button>
    );

    // Previous button
    items.push(
      <button
        key="prev"
        className="btn btn-outline-primary btn-sm me-1"
        onClick={() => handleClientPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous Page"
      >
        <ChevronLeft size={14} />
      </button>
    );

    // Show first page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <button
          key={1}
          className="btn btn-outline-secondary btn-sm me-1"
          onClick={() => handleClientPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        items.push(
          <span key="start-ellipsis" className="btn btn-sm me-1 disabled">
            ...
          </span>
        );
      }
    }

    // Page number buttons
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <button
          key={page}
          className={`btn btn-sm me-1 ${page === currentPage ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => handleClientPageChange(page)}
        >
          {page}
        </button>
      );
    }

    // Show last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <span key="end-ellipsis" className="btn btn-sm me-1 disabled">
            ...
          </span>
        );
      }
      items.push(
        <button
          key={totalPages}
          className="btn btn-outline-secondary btn-sm me-1"
          onClick={() => handleClientPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    items.push(
      <button
        key="next"
        className="btn btn-outline-primary btn-sm me-1"
        onClick={() => handleClientPageChange(currentPage + 1)}
        disabled={currentPage === totalPages && !hasMore}
        title="Next Page"
      >
        <ChevronRight size={14} />
      </button>
    );

    // Last page button
    items.push(
      <button
        key="last"
        className="btn btn-outline-primary btn-sm"
        onClick={() => handleClientPageChange(totalPages)}
        disabled={currentPage === totalPages && !hasMore}
        title="Last Page"
      >
        <ChevronDoubleRight size={14} />
      </button>
    );

    return items;
  };

  // Quick jump to page input
  const QuickJumpInput = () => {
    const [jumpPage, setJumpPage] = useState("");

    const handleJump = (e: React.FormEvent) => {
      e.preventDefault();
      const page = parseInt(jumpPage);
      if (page >= 1 && page <= totalPages) {
        handleClientPageChange(page);
        setJumpPage("");
      }
    };

    return (
      <div className="d-flex align-items-center">
        <Form onSubmit={handleJump} className="d-flex align-items-center">
          <span className="text-muted me-2 small">Page:</span>
          <Form.Control
            type="number"
            size="sm"
            style={{ width: "60px" }}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            min={1}
            max={totalPages}
            placeholder={currentPage.toString()}
          />
          <button type="submit" className="btn btn-outline-secondary btn-sm ms-1">
            Go
          </button>
        </Form>
      </div>
    );
  };

  return (
    <>
      <div className="col">
        <Row className="justify-content-between pb-4 pt-md-0 pt-4 align-items-center">
          <Col md={6} className="">
            <h5 className="fw-bold mb-0">{filteredSchemes?.length || 0} Mutual Funds</h5>
            {filteredSchemes && filteredSchemes.length > 0 && (
              <div className="d-flex align-items-center mt-2 flex-wrap">
                <span className="text-secondary small me-3">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredSchemes?.length || 0)} of {filteredSchemes?.length || 0} results
                </span>
                <div className="d-flex align-items-center">
                  <span className="text-muted small me-2">Show:</span>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm" className="border-0">
                      {itemsPerPage} per page
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {[10, 25].map((count) => (
                        <Dropdown.Item
                          key={count}
                          active={itemsPerPage === count}
                          onClick={() => handleItemsPerPageChange(count)}
                        >
                          {count} per page
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            )}
          </Col>
          {/* <Col md={6}>
            <div className="position-relative pt-md-0 pt-3">
              <Search
                className="mutual-funds-searchbuttonprodgy12 text-secondary "
                size={20}
              />

              <input className="rounded-4 exlore-search-box w-100" type="text" placeholder="Search for mutual funds to invest..."></input>
            </div>
          </Col> */}
          <Col md={6} className="text-end">
            {totalPages > 1 && (
              <div className="d-none d-md-flex justify-content-end align-items-center">
                <QuickJumpInput />
              </div>
            )}
          </Col>
          <div className="col-12 pt-3 d-block d-lg-none">
            <div className="row prody_position_relative">
              {!from&&
              <div className="col-4">
                <div className="Prodgymobile_filtering_dataa category_show_data">
                  <span>
                    Category <span><ChevronRight className="" size={18} /></span>
                  </span>
                  <div className="category_on_mobile">
                    <Category handleFilter={handleFilter} isAvailable={isAvailable} categoryList={categoryList} assetTypeListData={assetTypeListData}/>
                  </div>
                </div>
              </div>}
              <div className="col-4">
                <div className="Prodgymobile_filtering_dataa filters_show_mobile">
                  <span>
                    Filter <span><ChevronRight className="" size={18} /></span>
                  </span>
                  <div className="filters_on_mobile">
                    <Filter handleFilter={handleFilter} isAvailable={isAvailable} />
                  </div>
                </div>
              </div>
              {/* <div className="col-4">
                <div className="Prodgymobile_filtering_dataa float_right_set">
                  <span className="">
                    Return <span><ChevronRight className="" size={18} /></span>
                  </span>
                  <div className="return_on_mobile">
                    <Returns />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Row>

        {currentItems.length > 0 ? (
          <>
            {currentItems.map((item, index) => (
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
                          <h6 style={{ margin: 0 }}>{item.PRODUCT_LONG_NAME}</h6>
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
                      <span className="text-secondary">Last 3Y</span>
                      <br />
                      <span className="value-font2 text-success">{item.threeYearCAGR? item.threeYearCAGR:0}%</span>
                    </div>
                    <div className="col-4">
                      <span className="text-secondary">Min. SIP</span>
                      <br />
                      <span className="value-font2">₹{item.minSIPAmt}</span>
                    </div>
                    <div className="col-4">
                      <span className="text-secondary">Fund Size</span>
                      <br />
                      <span className="value-font2">₹{getValueInSort(item.fundSize)}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </>
        ) :""}

        {(totalPages > 1 || hasMore) && (
          <div className="d-flex justify-content-between align-items-center mt-4 mb-4 flex-wrap">
            <div className="pagination-info text-muted small mb-2 mb-md-0">
              Page {currentPage} of {totalPages}
              <span className="d-none d-sm-inline"> • {filteredSchemes?.length || 0} total results</span>
            </div>
            <div className="pagination-controls d-flex justify-content-center flex-wrap">
              {renderPaginationItems()}
            </div>
            <div className="d-md-none d-flex justify-content-center mt-2">
              <QuickJumpInput />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwitchSchemes;