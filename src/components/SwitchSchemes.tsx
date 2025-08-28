import { ChevronRight } from "react-bootstrap-icons";
import {  imageUrl } from "../services/utils/urls";
import { Card, Col, Row } from "react-bootstrap";
import Returns from "../pages/explore/SortBy";
import Category from "../pages/explore/Category";
import Filter from "../pages/explore/Amcs";
import { useNavigate } from "react-router-dom";
import {  filteredSchemesKeys } from "../pages/data-interfaces/explore";
import { getValueInSort } from "../services/calculation/percentageCalculate";

interface SchemesProps {
  handleFilter: (value: number, type: string) => void;
  isAvailable: (value: number, type: string) => boolean;
  filteredSchemes: filteredSchemesKeys[]
}

const SwitchSchemes: React.FC<SchemesProps> = ({ handleFilter, isAvailable, filteredSchemes }) => {
  const navigate = useNavigate()
 

  const fundDetails = (item: filteredSchemesKeys) => {
    
    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
  }

  return (
    <>

      <div className="col">
        <Row className="justify-content-between pb-4 pt-md-0 pt-4 align-items-center">
          <Col md={6} className="">
            <h5 className="fw-bold mb-0">{filteredSchemes.length} Mutual Funds</h5>
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
          <div className="col-12 pt-3 d-block d-lg-none">
            <div className="row prody_position_relative">
              <div className="col-4">
                <div className="Prodgymobile_filtering_dataa category_show_data">
                  <span>Category <span><ChevronRight className="" size={18} /></span></span>
                  <div className="category_on_mobile">
                    <Category handleFilter={handleFilter} isAvailable={isAvailable} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="Prodgymobile_filtering_dataa filters_show_mobile">
                  <span>Filter(2) <span><ChevronRight className="" size={18} /></span></span>
                  <div className="filters_on_mobile">
                    <Filter handleFilter={handleFilter} isAvailable={isAvailable} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="Prodgymobile_filtering_dataa float_right_set">
                  <span className="">Return <span><ChevronRight className="" size={18} /></span></span>
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

              <div className="row justify-content-between crPointer">
                <div className="col-8 py-2" onClick={() => fundDetails(item)}>
                  <div className="d-flex">
                    <img src={`${imageUrl + item?.accordAMCCode}.png`} className="logoRadius" height={45} width={45} alt="Image not found" />
                    <div className="ms-2" style={{ flex: 4 }}>
                      <h6 style={{ margin: 0 }}>
                        {item.PRODUCT_LONG_NAME}
                      </h6>
                      <span className="text-secondary">
                        Category - {item.equityType}
                      </span>
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
                  <span className="value-font2 text-success">{item.threeYearCAGR}%</span>
                </div>

                <div className="col-4">
                  <span className="text-secondary">Min. SIP</span>
                  <br />
                  <span className="value-font2">
                    ₹{item.minSIPAmt}
                  </span>
                </div>

                <div className="col-4">
                  <span className="text-secondary">Fund Size</span>
                  <br />
                  <span className="value-font2">₹{getValueInSort(item.fundSize)}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        )) : ""}
      </div>
    </>
  );
}

export default SwitchSchemes;