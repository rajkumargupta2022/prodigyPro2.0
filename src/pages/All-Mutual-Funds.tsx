import { Form, Card, Container, Row, Col, Image } from "react-bootstrap";
import { ChevronRight, Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import AMCLOGO from "../assets/img/icons/AMC Logo.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Category from "./explore/Category";
import Returns from "./explore/Returns";
import Filters from "./explore/Filters";

const AllMutualFunds = () => {
  const navigate = useNavigate()
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

            <Returns />
            <div className="">
              <Category />
            </div>
            <Filters />
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
                  {/* <input
                    type="text"
                    className="form-control rounded-4 search_input exlore-search-box" placeholder="Search for mutual funds to invest..."
                  /> */}
                  <input className="rounded-4 exlore-search-box w-100" type="text" placeholder="Search for mutual funds to invest..."></input>
                </div>
              </Col>
              <div className="col-12 pt-3 d-block d-lg-none">
                <div className="row prody_position_relative">
                  <div className="col-4">
                    <div className="Prodgymobile_filtering_dataa category_show_data">
                      <p>Category <span><ChevronRight className="" size={18} /></span></p>
                      <div className="category_on_mobile">
                        <Category />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="Prodgymobile_filtering_dataa filters_show_mobile">
                      <p>Filter(2) <span><ChevronRight className="" size={18} /></span></p>
                      <div className="filters_on_mobile">
                        <Filters />
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



            {[...Array(8)].map((_, index) => (
              <Card
                className="mb-3"
                key={index}
                style={{ border: "none", borderRadius: "16px" }}
              >
                <Card.Body>

                  <div className="row justify-content-between">
                    <div className="col-8 py-2">
                      <div className="d-flex">
                        <img src={AMCLOGO} alt="Image not found" />
                        <div className="ms-2" style={{ flex: 4 }}>
                          <h6 style={{ margin: 0 }}>
                            Nippon India Large Cap Fund
                          </h6>
                          <span className="text-secondary">
                            Equity - Large Cap
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 py-2 text-md-end text-start">
                      <div className="text-secondary" onClick={() => { navigate("/explore-fund-details") }}>
                        <ChevronRight className="funds-rightsign-prodgy12" size={20} />
                      </div>
                    </div>
                  </div>
                  <hr className="fw-light text-secondary my-1" />
                  <div className="row">
                    <div className="col-4">
                      <span className="text-secondary">Last 3Y</span>
                      <br />
                      <span className="value-font2 text-success">29.35%</span>
                    </div>

                    <div className="col-4">
                      <span className="text-secondary">Min. SIP</span>
                      <br />
                      <span className="value-font2">
                        ₹500
                      </span>
                    </div>

                    <div className="col-4">
                      <span className="text-secondary">Fund Size</span>
                      <br />
                      <span className="value-font2">₹26,776.87 Cr</span>
                    </div>
                  </div>


                  {/* <div className="row justify-content-between align-items-center border-bottom pb-3">
                    <div className="col-10">
                      <div className="d-flex align-items-center">
                        <Image src={AMCLOGO} />
                        <Card.Title className="ps-3 mb-0 funds-list-nameprodgy">
                          <p>Nippon India Large Cap Fund</p>
                          <Card.Subtitle className="text-muted funds-sublist-nameprodgy">
                            Equity - Large Cap
                          </Card.Subtitle>
                        </Card.Title>
                      </div>
                    </div>
                    <div className="col-2 text-md-end" onClick={() => { navigate("/explore-fund-details") }}>
                      <ChevronRight className="funds-rightsign-prodgy12" size={25} />
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="col-lg-4 col-6 py-1">
                      <p className="mb-1">Last 3Y</p>
                      <h5 className="text-success"> 29.35%</h5>
                    </div>
                    <div className="col-lg-4 col-6 py-1">
                      <p className="mb-1">Min. SIP</p>
                      <h5>₹500</h5>
                    </div>
                    <div className="col-lg-4 col-6 py-1">
                      <p className="mb-1">Fund Size</p>
                      <h5>₹26,776.87 Cr</h5>
                    </div>
                  </div> */}

                </Card.Body>
              </Card>
            ))}
          </div>
        </div>

      </Container>
      <Footer />
    </>
  );
};

export default AllMutualFunds;
