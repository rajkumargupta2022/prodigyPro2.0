import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/logo/logo.png";
import {
  QuestionCircle,
  CurrencyRupee,
  ChevronDown,
  HouseDoorFill,
  GraphUpArrow,
  Person,
} from "react-bootstrap-icons";
import ProfileModel from "./ProfileModel";
import { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { useAdminUser } from "../context/AdminContext";

const MyNavbar = () => {
  const location = useLocation();
  const {adminUser} = useAdminUser()
  const [openProfileModel, setOpenProfileModel] = useState<boolean>(false)
// console.log('Current path:', location.pathname);
  const handleProfileModel = () => {
    setOpenProfileModel(true)
  }



  return (
    <Navbar expand="lg" className="bg-white">
      <Container>
        <Navbar.Brand href="#">
          <Link to="/dashboard">
            <img
              src={logo} // Replace with your logo URL
              alt="Logo"
              height="40"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
          <Nav
            className=" my-lg-0 menu_list"
            style={{ maxHeight: "100vh" }}
            navbarScroll
          >
            <Link className={`prodgy_menu m-2 ${location.pathname==="/dashboard" && "active_menu"}`} to={"/dashboard"}>
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <HouseDoorFill size={24} />
                </div>
                <div className="">Home</div>
              </div>
            </Link>
            <Link className={`prodgy_menu m-2 ${location.pathname==="/explore" && "active_menu"}`} to={"/explore"}>
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <CurrencyRupee size={24} />
                </div>
                <div className="">Explore</div>
              </div>
            </Link>
            <Link className={`prodgy_menu m-2 ${location.pathname==="/portfolio" && "active_menu"}`} to={"/portfolio"}>
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <GraphUpArrow size={24} />
                </div>
                <div className="">Portfolio</div>
              </div>
            </Link>
            <Link className={`prodgy_menu  m-2 ${location.pathname==="/my-profile" && "active_menu"}`} to={"/my-profile"}>
              <div className="d-flex gap-2">
                <div className="">
                  {" "}
                  <Person size={24} />
                </div>
                <div className="">Account</div>
              </div>
            </Link>
          </Nav>
          <div className="user_profile_icon prodgy_menu m-2">
            <Link to="/help&support" className="prodgy_menu">
              <QuestionCircle size={24} />
            </Link>
            {/* <Link to="#" className="prodgy_menu">
              <Bell size={24} />
            </Link> */}
        
            <Link to="#" className="profileNameSize prodgy_menu">
              <div className="d-flex gap-2" onClick={handleProfileModel}>
                {adminUser?.profilePic?
                 <div className="circle">
 <img
                    className=""
                    src={adminUser.profilePic}
                    alt="Logo"
                    height="35"
                  />
                 </div> : <div className="nameTitle">
                   {adminUser?.name?.split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()}
                </div>}
               
                 
                <div className="align-self-center">
                  {adminUser?.name} <ChevronDown />{" "}
                </div>
              </div>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
      <ProfileModel show={openProfileModel} setShow={setOpenProfileModel} />
    </Navbar>
  );
};

export default MyNavbar;
