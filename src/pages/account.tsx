import MyNavbar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import {
  Person,
} from "react-bootstrap-icons";
import Footer from "../components/Footer";

const Account = ({ Component }: { Component: any }) => {
  const { pathname } = useLocation();

  const navBar = [
    { name: "My Profile", url: "/my-profile" },
    { name: "All Orders", url: "/all-orders" },
    { name: "Linked Bank Accounts", url: "/linked-bank-account" },
    { name: "Risk Profile ", url: "/risk-profile" },
    { name: "Financial Calculators", url: "/calculator-list" },
    { name: "Statements", url: "/statements" },
    { name: "Add Family Member", url: "/add-family-member" },
  ];

  const navBar2 = [
    // { name: "Change Password", url: "/change-password" },
    { name: "Help & Support", url: "/help&support" },
    { name: "About Us", url: "/about-us" },
    { name: "Locate Us", url: "/locate-us" },
    { name: "Privacy Policy", url: "/privacyPolicy " },
  ];

  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <MyNavbar />
      <div className="container-fluid">
        <div className="row add_family_layout mx-lg-5 mx-md-3 mx-0 position-relative">
          {/* Sidebar */}
          <button className="hide_on_desktop_btn" onClick={handleToggle}>
            <div className="d-flex gap-2">
              <div className=""> <Person size={20} /></div>
              <div className=""> <p className="mb-0">Account</p> </div>
            </div>
          </button>
          <div className={isActive ? 'col-md-3 col-lg-3 d-md-block sidebar sideBarAddFamily' : 'col-md-3 col-lg-3 d-md-block sidebar sideBarAddFamily filter_acounts_mobile'}>
            <nav className="shadow-sm rounded-4 bgNavbar">
              <div className="position-sticky">
                <ul className="nav flex-column">
                  {navBar.map((el, i) => {
                    return (
                      <Link className="nav-link" to={el.url}>
                        <li
                          className={`nav-item  d-flex justify-content-between align-items-center ${i !== 6 && "border-bottom"} ${pathname === el.url ? "active" : ""
                            }`}
                        >

                          {el.name}
                          <ChevronRight size={15} className="text-secondary me-3" />
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </nav>

            <nav className="shadow-sm mt-4  rounded-4 bgNavbar">
              <div className="position-sticky">
                <ul className="nav flex-column">
                  {navBar2.map((el, i) => {
                    return (
                      <Link className="nav-link" to={el.url}>
                        <li
                          className={`nav-item  d-flex justify-content-between  align-items-center ${i !== 3 && "border-bottom"} ${pathname === el.url ? "active" : ""
                            }`}
                        >
                          {el.name}
                          <ChevronRight size={15} className="text-secondary me-3" />
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>

          <Component />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
