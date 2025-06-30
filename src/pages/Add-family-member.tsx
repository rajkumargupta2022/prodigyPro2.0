import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/Navbar";
import { ArrowLeft, ChevronRight } from "react-bootstrap-icons";
import Footer from "../components/Footer";

const AddFamilyMember = () => {
  const navigate = useNavigate()
  return (
    <>
      <MyNavbar />
      <div className="container-fluid">
        <div className="row add_family_layout mx-lg-5 mx-md-3 mx-0">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-3 d-md-block sidebar sideBarAddFamily">
            <nav className="shadow-sm rounded-4">
              <div className="position-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item d-flex justify-content-between align-items-center border-bottom active">
                    <a className="nav-link" href="#">
                      My Profile
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                  <li className="nav-item d-flex justify-content-between align-items-center  border-bottom ">
                    <a className="nav-link navItemBorder " href="#">
                      All Orders
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                  <li className="nav-item  border-bottom  d-flex justify-content-between align-items-center">
                    <a className="nav-link" href="#">
                      Linked Bank Accounts
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                  <li className="nav-item  border-bottom d-flex justify-content-between align-items-center">
                    <a className="nav-link" href="#">
                      Risk Profile
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li className="nav-item  border-bottom d-flex justify-content-between align-items-center">
                    <a className="nav-link" href="#">
                      Statements
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li className="nav-item  border-bottom d-flex justify-content-between align-items-center">
                    <a className="nav-link" href="#">
                      Change Password
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>

                  <li className="nav-item d-flex justify-content-between align-items-center">
                    <a className="nav-link" href="#">
                      Help & Support
                    </a>
                    <ChevronRight size={15} className="text-secondary" />
                  </li>
                </ul>
              </div>
            </nav>

            <nav className="shadow-sm mt-4  rounded-4">
              <div className="position-sticky">
                <ul className="nav flex-column ">
                  <li className="nav-item border-bottom d-flex justify-content-between align-items-center">
                    <a className="nav-link   pb-2" href="#">
                      Change Password
                    </a>
                    <ChevronRight size={15} className="fw-light" />
                  </li>

                  <li className="nav-item d-flex justify-content-between align-items-center">
                    <a className="nav-link " href="#">
                      Help & Support
                    </a>
                    <ChevronRight size={15} className="fw-light" />
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Form Section */}
          <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
            <p>
              <ArrowLeft size={25} /> Add Family Memberdsd
            </p>
            <hr className="fw-light text-secondary" />
            <form className="card p-4 shadow-sm bg-white border-0 rounded-4">
              <div className="mb-3">
                <button type="button" className="btn btn-outline-primary me-3">
                  Link Accountasa
                </button>
                <button type="submit" className="btn btn-primary me-3">
                  Create Account
                </button>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="tax-status"
                  className="form-label fw-light text-secondary"
                >
                  TAX STATUS
                </label>
                <select id="tax-status" className="form-control">
                  <option>On Behalf of Minor</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="holding-nature"
                  className="form-label fw-light text-secondary"
                >
                  HOLDING NATURE
                </label>
                <select id="holding-nature" className="form-control">
                  <option>Single</option>
                </select>
                <button type="button" onClick={() => { navigate("/kyc-status-check") }} className="btn btn-primary mt-2">
                  Proceed
                </button>
              </div>
            </form>
            <div style={{ marginTop: "2%" }}>
              <span className="font-weight-bold ">Note:</span>

              <p className="fw-light text-secondary">
                Please be ready with these documents before creation of Minor's
                profile to mention the bank account details and upload the bank
                and birth proof-
              </p>
              <p className="fw-light text-secondary">
                1. Bank Account should be in the name of Minor it can either be
                jointly or under the guardianship of the same person as you have
                selected in profile.
              </p>
              <p className="fw-light text-secondary">
                2. Guardian name must be there in birthproof.
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddFamilyMember;
