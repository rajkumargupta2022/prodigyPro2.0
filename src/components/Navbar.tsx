import { Navbar, Container, Nav } from "react-bootstrap";
import { QuestionCircle, Person } from "react-bootstrap-icons";
import logo from "../assets/img/logo/logo.png";

const MyNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#">
          <img
            src={logo} // Replace with your logo URL
            alt="Logo"
            height="40"
          />
        </Navbar.Brand>

        {/* Icons on the right */}
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link href="#">
            <QuestionCircle size={24} />
          </Nav.Link>
          <Nav.Link href="#">
            <Person size={24} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
