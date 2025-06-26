import { Form, Card, Container, Row, Col, Image } from "react-bootstrap";
import { ChevronRight, Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import AMCLOGO from "../assets/img/icons/AMC Logo.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AllMutualFunds = () => {
  const navigate = useNavigate()
  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <h4 className="fw-bold">All Mutual Funds</h4>
        <p>
          Discover mutual funds across all categories using the all mutual funds
          screener
        </p>
        <Row>
          {/* Sidebar Filters */}
          <Col md={4} className="border-end">
            <div
              className="card p-md-4 p-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="font-size-16 mb-3">Sort By</h5>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="Returns - High to Low"
                  name="sortBy"
                  defaultChecked
                />
                <Form.Check
                  type="checkbox"
                  label="Fund Size - High to Low"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Min. Investment - Low to High"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Fund Name - A to Z"
                  name="sortBy"
                />
              </Form>
            </div>

            <div
              className="card p-md-4 p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="mt-3 font-size-16 mb-3">Category</h5>

              <div className="explore-categoryprodgy">
                <p>Type</p>
                <div className="">
                  <button type="button" className="btn riskProfileBtn btn_colorfull ">Equity</button>
                  <button type="button" className="btn riskProfileBtn mx-2">Debt</button>
                  <button type="button" className="btn riskProfileBtn">Hybrid</button>
                  <button type="button" className="btn riskProfileBtn mx-2">Other Funds</button>
                </div>
                <p className="pt-3">Category</p>
              </div>
              <Form>
                <Form.Check type="checkbox" label="Aggressive Hybrid" name="category" defaultChecked />
                <Form.Check type="checkbox" label="Dividend Yield Funds" name="category" />
                <Form.Check type="checkbox" label="Flexi Cap Funds" name="category" />
                <Form.Check type="checkbox" label="Index Funds" name="category" />
                <Form.Check type="checkbox" label="Large & Mid Cap Funds" name="category" />
                <Form.Check type="checkbox" label="Large Cap Funds" name="category" />
              </Form>
            </div>

            <div
              className="card p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="mt-3 font-size-16 mb-3">Risk</h5>
              <Form className="checkbox-grid-setprodgy">
                <Form.Check type="checkbox" label="High" name="risk" defaultChecked />
                <Form.Check type="checkbox" label="Moderate" name="risk" />
                <Form.Check type="checkbox" label="Low" name="risk" />
                <Form.Check type="checkbox" label="Moderate Low" name="risk" />
                <Form.Check type="checkbox" label="Moderate High" name="risk" />
                <Form.Check type="checkbox" label="Very High" name="risk" />
              </Form>
            </div>

            <div
              className="card p-md-4 p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="font-size-16 mb-3">AMC</h5>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="360 ONE"
                  name="sortBy"
                  defaultChecked
                />
                <Form.Check
                  type="checkbox"
                  label="Aditya Birla SL MF"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Axis Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="DSP Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Edelweiss Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Groww Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="HDFC Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="ICICI Prudential Mutual Fund"
                  name="sortBy"
                />
              </Form>
            </div>
          </Col>

          {/* Mutual Funds List */}
          <Col md={8}>
            <Row className="justify-content-between py-4 align-items-center">
              <Col md={6} className="">
                <h5 className="fw-bold mb-0">431 Mutual Funds</h5>
              </Col>
              <Col md={6}>
                <div className="position-relative pt-md-0 pt-3">
                  <Search
                    className="mutual-funds-searchbuttonprodgy12 text-secondary "
                    size={25}
                  />
                  <input
                    type="text"
                    className="form-control rounded-4 p-3 ps-5 search_input"
                    placeholder="Search for mutual funds to invest..."
                  />
                </div>
              </Col>
            </Row>

            {[...Array(8)].map((_, index) => (
              <Card
                className="mb-3"
                key={index}
                style={{ border: "none", borderRadius: "16px" }}
              >
                <Card.Body>
                  <div className="row justify-content-between align-items-center border-bottom pb-3">
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
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AllMutualFunds;
