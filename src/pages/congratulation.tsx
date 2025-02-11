import MyNavbar from "../components/Navbar";
import correct from "../assets/img/correct.png";
import group from "../assets/img/Group.png";

const SuccessPage = () => {
  return (
    <>
      <MyNavbar />
      <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
        <div
          className="bg-primary text-white text-center p-5 rounded-4 shadow-lg"
          style={{ maxWidth: "600px" }}
        >
          {/* Image Wrapper */}
          <div className="position-relative d-inline-block">
            {/* Background Image */}
            <img src={group} alt="Group" className="img-fluid" />
            {/* Overlay Image */}
            <img
              src={correct}
              alt="Correct Symbol"
              className="position-absolute top-50 start-50 translate-middle"
              style={{ width: "50px", height: "50px" }} // Adjust size as needed
            />
          </div>

          <h2>Congratulations!</h2>
          <p className="text-white">
            Your IIN application has been submitted successfully.
          </p>
          <p className="small fw-light text-white">
            To activate your IIN, you need to approve the IIN & FATCA
            authorization link for all the holder(s) sent to the respective mail
            id(s).
          </p>
          <p className="small fw-light text-white">
            IIN will get approved within 2 working days.
          </p>
          <button
            className="btn btn-light fw-bold mt-3"
            style={{ color: "#011efe" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
