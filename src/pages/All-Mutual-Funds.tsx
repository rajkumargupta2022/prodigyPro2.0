import {
  Form,
  InputGroup,
  Card,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import MyNavbar from "../components/Navbar";
import AMCLOGO from "../assets/img/icons/AMC Logo.svg";

const AllMutualFunds = () => {
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
          <Col md={3} className="border-end">
            <div
              className="card p-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5>Sort By</h5>
              <Form>
                <Form.Check
                  type="radio"
                  label="Returns - High to Low"
                  name="sortBy"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  label="Fund Size - High to Low"
                  name="sortBy"
                />
                <Form.Check
                  type="radio"
                  label="Min. Investment - Low to High"
                  name="sortBy"
                />
                <Form.Check
                  type="radio"
                  label="Fund Name - A to Z"
                  name="sortBy"
                />
              </Form>
            </div>
            <div
              className="card p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="mt-3">Category</h5>
              <Form>
                <Form.Check
                  type="radio"
                  label="Equity"
                  name="category"
                  defaultChecked
                />
                <Form.Check type="radio" label="Debt" name="category" />
                <Form.Check type="radio" label="Hybrid" name="category" />
                <Form.Check type="radio" label="Other Funds" name="category" />
              </Form>
            </div>

            <div
              className="card p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="mt-3">Risk</h5>
              <Form>
                <Form.Check type="radio" label="High" name="risk" />
                <Form.Check type="radio" label="Moderate" name="risk" />
                <Form.Check
                  type="radio"
                  label="Low"
                  name="risk"
                  defaultChecked
                />
              </Form>
            </div>
          </Col>

          {/* Mutual Funds List */}
          <Col md={9}>
            <Row className="justify-content-between py-4 align-items-center">
              <Col md={6} className="">
                <h3 className="fw-bold mb-0">431 Mutual Funds</h3>
              </Col>
              <Col md={6}>
                <div className="position-relative">
                  <Search
                    className="position-absolute text-secondary"
                    size={25}
                    style={{ top: "18px", left: "25px" }}
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
                  <Row className="justify-content-between align-items-center border-bottom pb-3">
                    <Col md={10}>
                      <div className="d-flex align-items-center">
                        <Image src={AMCLOGO} style={{ width: "6%" }} />
                        <Card.Title className="ps-3 mb-0">
                          <p>Nippon India Large Cap Fund</p>
                          <Card.Subtitle className="text-muted">
                            Equity - Large Cap
                          </Card.Subtitle>
                        </Card.Title>
                      </div>
                    </Col>
                    <Col md={2} className="text-md-end">
                      <Search size={25} />
                    </Col>
                  </Row>
                  <Row className="pt-3">
                    <Col md={4}>
                      <p className="mb-1">Last 3Y</p>
                      <h5 className="text-success"> 29.35%</h5>
                    </Col>
                    <Col md={4} className="">
                      <p className="mb-1">Min. SIP</p>
                      <h5>₹500</h5>
                    </Col>
                    <Col md={4} className="">
                      <p className="mb-1">Fund Size</p>
                      <h5>₹26,776.87 Cr</h5>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllMutualFunds;
