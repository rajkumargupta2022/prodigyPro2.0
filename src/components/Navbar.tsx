import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/logo/logo.png";
import {
  QuestionCircle,
  Bell,
  CurrencyRupee,
  ChevronDown,
  HouseDoor,
  GraphUpArrow,
  Person,
} from "react-bootstrap-icons";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand href="#">
          <Navbar.Brand href="#">
            <img
              src={logo} // Replace with your logo URL
              alt="Logo"
              height="40"
            />
          </Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
          <Nav
            className="my-2 my-lg-0 menu_list"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="prodgy_menu m-2" href="#action1">
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <HouseDoor size={24} />
                </div>
                <div className="">Home</div>
              </div>
            </Nav.Link>
            <Nav.Link className="prodgy_menu  m-2" href="#action2">
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <CurrencyRupee size={24} />
                </div>
                <div className="">Explore</div>
              </div>
            </Nav.Link>
            <Nav.Link className="prodgy_menu  m-2" href="#action2">
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <GraphUpArrow size={24} />
                </div>
                <div className="">Portfolio</div>
              </div>
            </Nav.Link>
            <Nav.Link className="prodgy_menu  m-2" href="#action2">
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <Person size={24} />
                </div>
                <div className="">Account</div>
              </div>
            </Nav.Link>
          </Nav>
          <div className="d-flex user_profile_icon">
            <Nav.Link href="#">
              <QuestionCircle size={24} />
            </Nav.Link>
            <Nav.Link href="#">
              <Bell size={24} />
            </Nav.Link>
            {/* <Nav.Link href="#">
              <Person size={24} />
            </Nav.Link> */}
            <Nav.Link href="#" className="profileNameSize">
              <div className="d-flex gap-2">
                <div className="">
                  <img
                    className="rounded-pill"
                    src="http://localhost:5173/src/assets/img/icons/hdfc.svg?t=1740982475524"
                    alt="Logo"
                    height="35"
                  />
                </div>
                <div className="align-self-center">
                  Rajkumar <ChevronDown />{" "}
                </div>
              </div>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
