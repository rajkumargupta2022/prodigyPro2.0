import GIRLDP from "../assets/img/girl-dp.png";

function MyProfile() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h3>
         My
        Profile
      </h3>
      <hr className="fw-light text-secondary" />
      <form className="align-items-center p-4 shadow-sm bg-white border-0 rounded-4">
        <div className="d-flex align-items-center">
          <div className="me-2">
            <img src={GIRLDP} alt="Image not found" height={80} width={80}/>
          </div>

          <div className="">
            <p className="logoBlueColor fs16px mt-2">Change Profile</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="m-0 fs12px">FULL NAME</p>
          <p className="fs16px">Divya Sahu</p>
        </div>

        <div>
          <p className="m-0 fs12px">EMAIL ADDRESS</p>
          <p className="fs16px">divya012@gmail.com</p>
        </div>

        <div>
          <p className="m-0 fs12px">MOBILE NUMBER</p>
          <p className="fs16px">8485457578</p>
        </div>

        <div>
          <p className="m-0 fs12px">DATE OF BIRTH</p>
          <p className="fs16px">10/02/1991</p>
        </div>

        <div>
          <p className="m-0 fs12px">PAN NUMBER</p>
          <p className="fs16px">DFPOL7895W</p>
        </div>
      </form>
      <p className="text-center mt-2 fs14px">
        Your profile is verified and these details are non-editable, in case any
        questions please contact{" "}
        <span className="logoBlueColor">support team.</span>
      </p>
    </main>
  );
}

export default MyProfile;
