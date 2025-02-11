import MyNavbar from "../components/Navbar";

const SuccessPage = () => {
  return (
    <>
      <MyNavbar />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="bg-primary text-white text-center p-5 rounded-4 shadow-lg"
          style={{ maxWidth: "500px" }}
        >
          <div className="mb-3">
            <div className="d-inline-block p-3 bg-white rounded-circle">
              <span className="text-primary fs-3">✔</span>
            </div>
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
