import { ArrowLeft, BookFill } from "react-bootstrap-icons";
import Map from "../assets/img/map.svg";

function LocateUs({ backButton }: { backButton: any }) {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />{" "}
        Locate Us
      </h2>
      <hr className="fw-light text-secondary" />

      <img src={Map} alt="image not found" className="mb-2 w-100" />

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
          <span className="fs14px">44 Google Reviews</span>
        </div>

        <div className="d-flex border-bottom mt-2">
          <h6 className="me-1">Address:</h6>
          <p className="m-0">
            C.P.-61, Viraj Khand-4, Viraj Khand, Gomti Nagar, Lucknow, Uttar
            Pradesh 226010
          </p>
        </div>

        <div className="d-flex border-bottom mt-2">
          <h6 className="me-1"> Hours: </h6>
          <p className="m-0"> Mon - Sat 9:30am-5:30pm</p>
        </div>

        <div className="d-flex mt-2">
          <h6 className="me-1"> Phone:</h6>
          <p style={{ color: "#1A35FE" }}>+05223514141</p>
        </div>

        <div className="d-flex ">
          <h6 className="me-1"> Mobile:</h6>
          <p style={{ color: "#1A35FE" }}>+05223514141</p>
        </div>
        <button className="btn btn-primary">
          <BookFill className="me-2" />
          Direction
        </button>
      </div>
    </main>
  );
}

export default LocateUs;
