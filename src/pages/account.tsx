import MyNavbar from "../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import Profile from "../components/Profile";
import MyProfile from "../components/My-Profile";
import LocateUs from "../components/Locate-us";
import AboutUs from "../components/About-Us";
import AddFamilyMember from "../components/Add-family-member";
import { useEffect, useState } from "react";
import AllOrders from "../components/All-orders";
import OrderDetails from "../components/Order-details";
import SIPOrderDetails from "../components/Sip-order-details";
import STPOrderDetails from "../components/Stp-order-details";
import SWPOrderDetails from "../components/SWP-ORDER-DETAILS";

const Account = () => {
  const [routingStack, setRoutingStack] = useState<string[]>([]);
  const [currentActive, setCurrentActive] = useState("my-profile");

  useEffect(() => {
    activeInactive("my-profile");
  }, []);

  const renderComponent = () => {
    switch (currentActive) {
      case "my-profile":
        return (
          <Profile activeInactive={activeInactive} backButton={backButton} />
        );
      case "locate-us":
        return <LocateUs backButton={backButton} />;
      case "about-us":
        return <AboutUs backButton={backButton} />;
      case "my-profile/profile-details":
        return <MyProfile backButton={backButton} />;
      case "add-family-member":
        return <AddFamilyMember backButton={backButton} />;
      case "all-orders":
        return (
          <AllOrders backButton={backButton} activeInactive={activeInactive} />
        );
      case "order-timeline":
        return <OrderDetails backButton={backButton} />;

      case "sip-order":
        return <SIPOrderDetails backButton={backButton} />;
      case "stp-order":
        return <STPOrderDetails backButton={backButton} />;
      case "swp-order":
        return <SWPOrderDetails backButton={backButton} />;
    }
  };

  const activeInactive = (route: string) => {
    let previousRoute = null;
    if (routingStack.length < 1) {
      routingStack.push(route);
      setActiveClass(route);
    } else if (currentActive === route) return;
    else {
      // its for nesting routing
      if (route.indexOf("/") != -1) {
        setCurrentActive(route);
        routingStack.push(route);
        return;
      }
      previousRoute = routingStack[routingStack.length - 1] as string;
      setUnActiveClass(previousRoute, route, false);
      setActiveClass(route);
    }
  };

  const setActiveClass = (currentActive: string) => {
    let route = currentActive;
    if (currentActive.includes("/")) {
      route = currentActive.split("/")[0];
    }
    const element = document.getElementById(route);
    element?.classList.add("active");
    setCurrentActive(currentActive);
  };

  const setUnActiveClass = (
    previousRoute: string,
    currentActive: string,
    isBack: boolean
  ) => {
    if (previousRoute.indexOf("/") !== -1) {
      previousRoute = previousRoute.split("/")[0];
    }
    const element = document.getElementById(previousRoute);
    element?.classList.remove("active");
    if (!isBack) {
      routingStack.push(currentActive);
    }
  };

  const backButton = () => {
    if (routingStack.length > 1) {
      let previousRoute = routingStack.pop() as string;
      if (previousRoute.indexOf("/") != -1) {
        const arrayOfRoutes = previousRoute.split("/");
        previousRoute = arrayOfRoutes[0];
        setCurrentActive(previousRoute);
        return;
      }
      setActiveClass(routingStack[routingStack.length - 1]);
      setUnActiveClass(previousRoute, "", true);
    }
  };

  return (
    <>
      {console.log(routingStack)}
      <MyNavbar />
      <div className="container-fluid">
        <div className="row add_family_layout">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-3 d-md-block sidebar sideBarAddFamily">
            <nav className="shadow-sm rounded-4">
              <div className="position-sticky">
                <ul className="nav flex-column">
                  <li
                    onClick={() => activeInactive("my-profile")}
                    id="my-profile"
                    className="nav-item d-flex justify-content-between align-items-center border-bottom"
                  >
                    <a className="nav-link" href="#">
                      My Profile
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                  <li
                    onClick={() => activeInactive("all-orders")}
                    id="all-orders"
                    className="nav-item d-flex justify-content-between align-items-center  border-bottom"
                  >
                    <a className="nav-link navItemBorder " href="#">
                      All Orders
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                  <li
                    onClick={() => activeInactive("linked-bank")}
                    id="linked-bank"
                    className="nav-item  border-bottom  d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Linked Bank Accounts
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                  <li
                    onClick={() => activeInactive("risk-profile")}
                    id="risk-profile"
                    className="nav-item  border-bottom d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Risk Profile
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li
                    onClick={() => activeInactive("statements")}
                    id="statements"
                    className="nav-item  border-bottom d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Statements
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li
                    onClick={() => activeInactive("add-family-member")}
                    id="add-family-member"
                    className="nav-item  border-bottom d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Add Family Member
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                </ul>
              </div>
            </nav>

            <nav className="shadow-sm mt-4  rounded-4">
              <div className="position-sticky">
                <ul className="nav flex-column ">
                  <li
                    onClick={() => activeInactive("change-password")}
                    id="change-password"
                    className="nav-item  border-bottom d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Change Password
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li
                    onClick={() => activeInactive("help&support")}
                    id="help&support"
                    className="border-bottom nav-item d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Help & Support
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li
                    onClick={() => activeInactive("about-us")}
                    id="about-us"
                    className="nav-item  border-bottom d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      About Us
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li
                    onClick={() => activeInactive("locate-us")}
                    id="locate-us"
                    className="nav-item d-flex justify-content-between align-items-center"
                  >
                    <a className="nav-link" href="#">
                      Locate Us
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Account;
