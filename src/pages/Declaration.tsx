import NavBar from "../components/Navbar";
import NextBar from "../components/Next-bar";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Declaration = () => {
  return (
    <>
      <NavBar />

      <div className="breadcum_area" style={{ backgroundColor: "#F2F4FB" }}>
        <div className="personal_form_container p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container pt-5">
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">Declarations</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}
            <span className="fw-light text-secondary">INCOME RANGE</span>
            <div role="group" aria-label="Outline radio toggle">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option1"
              >
                Below 1 lakh
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option2"
              >
                1-5 Lakh
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option3"
              >
                5-10 Lakh
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option3"
              >
                10-25 Lakh
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option3"
              >
                25Lakh-1Crore
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label
                className="btn btn-outline-primary declaration-button"
                htmlFor="option3"
              >
                1Crore
              </label>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mt-5">
                <span className="mt-2 fw-light text-secondary">
                  RESIDENT STATUS
                </span>
                <br />
                <input
                  type="radio"
                  className="btn-check"
                  name="a2"
                  id="option11"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-primary declaration-button"
                  htmlFor="option11"
                >
                  Indian
                </label>
              </div>
            </div>

            <div className="row mb-3">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="option1"
                  name="option6"
                  style={{ borderRadius: "2.25em" }}
                />
                <label className="form-check-label m-2" htmlFor="option1">
                  I hereby declare that i'm not a politically person.
                </label>
              </div>

              {/* Checkbox 2 */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="option2"
                  name="option5"
                  style={{ borderRadius: "2.25em" }}
                />
                <label className="form-check-label m-2" htmlFor="option2">
                  I'm not the Tax Payer of any other country other than india.
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onBack={() => {}} onSaveContinue={() => {}} />
    </>
  );
};

export default Declaration;
