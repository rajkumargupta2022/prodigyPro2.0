import MyNavbar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Account = ({ Component }: { Component: any }) => {
  const { pathname } = useLocation();

  const navBar = [
    { name: "My Profile", url: "/my-profile" },
    { name: "All Orders", url: "/all-orders" },
    { name: "Linked Bank Accounts", url: "/linked-bank-account" },
    { name: "Risk Profile ", url: "/risk-profile" },
    { name: "Statements", url: "/statements" },
    { name: "Add Family Member", url: "/add-family-member" },
  ];

  const navBar2 = [
    { name: "Change Password", url: "/change-password" },
    { name: "Help & Support", url: "/help&support" },
    { name: "About Us", url: "/about-us" },
    { name: "Locate Us", url: "/locate-us" },
  ];

  return (
    <>
      <MyNavbar />
      <div className="container-fluid">
        <div className="row add_family_layout mx-lg-5 mx-md-3 mx-0">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-3 d-md-block sidebar sideBarAddFamily">
            <nav className="shadow-sm rounded-4 bgNavbar">
              <div className="position-sticky">
                <ul className="nav flex-column">
                  {navBar.map((el,i) => {
                    return (
                      <li
                        className={`nav-item  d-flex justify-content-between align-items-center ${i!==5&&"border-bottom"} ${
                          pathname === el.url ? "active" : ""
                        }`}
                      >
                        <Link className="nav-link" to={el.url}>
                          {el.name}
                        </Link>
                        <ChevronRight size={15} className="text-secondary me-3" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            <nav className="shadow-sm mt-4  rounded-4 bgNavbar">
              <div className="position-sticky">
                <ul className="nav flex-column">
                  {navBar2.map((el,i) => {
                    return (
                      <li
                        className={`nav-item  d-flex justify-content-between  align-items-center ${i!==3&&"border-bottom"} ${
                          pathname === el.url ? "active" : ""
                        }`}
                      >
                        <Link className="nav-link" to={el.url}>
                          {el.name}
                        </Link>
                        <ChevronRight size={15} className="text-secondary me-3" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>
          <Component />
        </div>
      </div>
    </>
  );
};

export default Account;
