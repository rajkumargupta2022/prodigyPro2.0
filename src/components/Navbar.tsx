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
  Stars
} from "react-bootstrap-icons";
import ProfileModel from "./ProfileModel";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchAdminUser } from "../services/user/adminUser";
import { renderAdminAvatar } from "../pages/re-used-html/avtar";
import ChatBoatUi from "../AI-assistant/Chat-with-ai";
import { playAIVoice } from "../services/utils/soundFs";

interface NavbarProps {
  autoOpenAi?: boolean;
}

const MyNavbar = ({ autoOpenAi }: NavbarProps = {}) => {
  const location = useLocation();
  const adminUser = fetchAdminUser()
  const [openProfileModel, setOpenProfileModel] = useState<boolean>(false)
  const [openAiBoat, setOpenAiBoat] = useState<boolean>(false)
  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (!autoOpenAi) return;
    // Only auto-open once per browser session
    if (localStorage.getItem("ai_greeted")) return;
    if (hasAutoOpened.current) return;
    hasAutoOpened.current = true;

    const timer = setTimeout(() => {
      setOpenAiBoat(true);
      localStorage.setItem("ai_greeted", "1");

      playAIVoice()
    }, 1200);

    return () => clearTimeout(timer);
  }, [autoOpenAi]);
  // console.log('Current path:', location.pathname);
  const handleProfileModel = () => {
    setOpenProfileModel(true)
  }

  const handleAiBoat = () => {
    setOpenAiBoat(true)
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
          {adminUser?.name &&
            <Nav
              className=" my-lg-0 menu_list"
              style={{ maxHeight: "100vh" }}
              navbarScroll
            >
              <Link className={`prodgy_menu m-2 mx-3 ${location.pathname === "/dashboard" && "active_menu"}`} to={"/dashboard"}>
                <div className="d-flex gap-2">
                  <div className="">
                    {" "}
                    <HouseDoorFill size={24} />
                  </div>
                  <div className="">Home</div>
                </div>
              </Link>
              <Link className={`prodgy_menu m-2 mx-4 ${location.pathname === "/explore" && "active_menu"}`} to={"/explore"}>
                <div className="d-flex gap-2">
                  <div className="">
                    {" "}
                    <CurrencyRupee size={24} />
                  </div>
                  <div className="">Explore</div>
                </div>
              </Link>
              <Link className={`prodgy_menu m-2 mx-4 ${location.pathname === "/portfolio" && "active_menu"}`} to={"/portfolio"}>
                <div className="d-flex gap-2">
                  <div className="">
                    {" "}
                    <GraphUpArrow size={24} />
                  </div>
                  <div className="">Portfolio</div>
                </div>
              </Link>
              <Link className={`prodgy_menu  m-2 mx-4 ${location.pathname === "/my-profile" && "active_menu"}`} to={"/my-profile"}>
                <div className="d-flex gap-2">
                  <div className="">
                    {" "}
                    <Person size={24} />
                  </div>
                  <div className="">Account</div>
                </div>
              </Link>
            </Nav>}
          <div className="user_profile_icon prodgy_menu m-2">
            <Link to="/help-and-support" className="prodgy_menu">
              <QuestionCircle size={24} />
            </Link>
            <div className="prodgy_menu crPointer" onClick={handleAiBoat}>
              <Stars size={20} color="#1A35FE" />
            </div>

            <div className="profileNameSize prodgy_menu crPointer">
              <div className="d-flex gap-2" onClick={handleProfileModel}>
                {renderAdminAvatar(adminUser)}
                <div className="align-self-center">
                  {adminUser?.name} <ChevronDown />
                </div>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
      <ProfileModel show={openProfileModel} setShow={setOpenProfileModel} />
      <ChatBoatUi show={openAiBoat} setShow={setOpenAiBoat} />
    </Navbar>
  );
};

export default MyNavbar;
