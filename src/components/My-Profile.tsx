import GIRLDP from "../assets/img/girl-dp.png";
import { ArrowLeft } from "react-bootstrap-icons";

function MyProfile({ backButton }: { backButton: any }) {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} /> My
        Profile
      </h2>
      <hr className="fw-light text-secondary" />
      <form className="align-items-center p-4 shadow-sm bg-white border-0 rounded-4">
        <div className="d-flex align-items-center">
          <div className="me-2">
            <img src={GIRLDP} alt="Image not found" />
          </div>

          <div className="">
            <p style={{ color: "#2841fe" }}>Change Details</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="m-0">FULL NAME</p>
          <h6>Divya Sahu</h6>
        </div>

        <div>
          <p className="m-0">EMAIL ADDRESS</p>
          <h6>divya012@gmail.com</h6>
        </div>

        <div>
          <p className="m-0">MOBILE NUMBER</p>
          <h6>8485457578</h6>
        </div>

        <div>
          <p className="m-0">DATE OF BIRTH</p>
          <h6>10/02/1991</h6>
        </div>

        <div>
          <p className="m-0">PAN NUMBER</p>
          <h6>DFPOL7895W</h6>
        </div>
      </form>
      <p className="text-center mt-2">
        Your profile is verified and these details are non-editable, in case any
        questions please contact{" "}
        <span style={{ color: "#2841fe" }}>support team.</span>
      </p>
    </main>
  );
}

export default MyProfile;
