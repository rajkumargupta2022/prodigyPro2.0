import {  BookFill } from "react-bootstrap-icons";
import Map from "../assets/img/map.svg";

function LocateUs() {

  const handleDirectionClick = () => {
    const destination = encodeURIComponent(
      "C.P.-61, Viraj Khand-4, Gomti Nagar, Lucknow, Uttar Pradesh 226010"
    );
    // Google Maps directions link (origin=My Location lets Google use user’s current location)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); // open in new tab
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        Locate Us
      </h2>
      <hr className="fw-light text-secondary" />

      <img src={Map} alt="image not found" className="mb-2 img-fluid" height={211}/>
      

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mt-4">
        <h6>BFC Capital Pvt Ltd.</h6>

        <div
          style={{ display: "flex", gap: "5px" }}
          className="align-items-center"
        >
          <span>5</span>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <span className="fs14px">266 Google Reviews</span>
        </div>

        <div className="d-md-flex border-bottom mt-2">
          <p className="me-1 fs16px mb-0">Address:</p>
          <p className="m-0 fs14px">
            C.P.-61, Viraj Khand-4, Gomti Nagar, Lucknow, Uttar
            Pradesh 226010
          </p>
        </div>

        <div className="d-flex border-bottom mt-2">
          <h6 className="me-1 fs16px"> Hours: </h6>
          <p className="m-0 fs14px"> Mon - Sat 9:30am-6:00pm</p>
        </div>

        <div className="d-flex mt-2">
          <h6 className="me-1"> Phone:</h6>
          <p className="logoBlueColor crPointer" onClick={() =>
            window.open(
              `tel:05223514141`,
              "_blank"
            )
          }>+05223514141</p>
        </div>

        <div className="d-flex ">
          <h6 className="me-1"> Mobile:</h6>
          <p  className="crPointer logoBlueColor" onClick={() =>
            window.open(
              `tel:7347700888`,
              "_blank"
            )
          }>+917347700888</p>
        </div>
        <button className="btn btn-primary" onClick={handleDirectionClick}>
          <BookFill className="me-2" />
          Direction
        </button>
      </div>
    </main>
  );
}

export default LocateUs;
