import { Link } from "react-router-dom";
import GIRLDP from "../assets/img/girl-dp.png";
import { ArrowLeft } from "react-bootstrap-icons";

function Profile() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft size={25} /> My Profile
      </h2>

      <hr className="fw-light text-secondary" />
      <form className="d-flex p-4 shadow-sm bg-white border-0 rounded-4">
        <div>
          <img src={GIRLDP} alt="Image not found" />
        </div>
        <div className="m-2" style={{ flex: 1 }}>
          <h5>Nandani Sahu</h5>
          <p>Member since 2023</p>
        </div>
        <div className="crPointer">
          <Link to="/profile-details" style={{ color: "#2841fe" }}>
            Profile Details
          </Link>
        </div>
      </form>
      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mt-4">
        <div className="d-flex">
          <h5 style={{ flex: 1 }}>Family Members</h5>
          <p style={{ color: "#2841fe" }}>+ Add New</p>
        </div>

        <div className="d-flex">
          <div
            className="me-2"
            style={{
              border: "2px solid #D0DBEA80",
              padding: "12px",
              borderRadius: "12px",
              width: "20%",
            }}
          >
            <img src={GIRLDP} alt="Image not found" />
            <h5>Kamini Sahu</h5>
            <p>Spouse</p>
            <p style={{ color: "#2841fe" }}>Profile Details</p>
          </div>

          <div
            className="me-2"
            style={{
              border: "2px solid #D0DBEA80",
              padding: "12px",
              borderRadius: "12px",
              width: "20%",
            }}
          >
            <img src={GIRLDP} alt="Image not found" />
            <h5>Sashi Sahu</h5>
            <p>Brother</p>
            <p style={{ color: "#2841fe" }}>Profile Details</p>
          </div>

          <div
            style={{
              border: "2px solid #D0DBEA80",
              padding: "12px",
              borderRadius: "12px",
              width: "20%",
            }}
            className="me-2"
          >
            <img src={GIRLDP} alt="Image not found" />
            <h5>Sharli Sahu</h5>
            <p>Spouse</p>
            <p style={{ color: "#2841fe" }}>Profile Details</p>
          </div>

          <div
            className="me-2"
            style={{
              border: "2px solid #D0DBEA80",
              padding: "12px",
              borderRadius: "12px",
              width: "20%",
            }}
          >
            <img src={GIRLDP} alt="Image not found" />
            <h5>Ruchi Sahu</h5>
            <p>Spouse</p>
            <p style={{ color: "#2841fe" }}>Profile Details</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
