import { Link } from "react-router-dom";
import { useAdminUser } from "../context/AdminContext"
import { dateInStringNumber } from "../services/dates/dateFormater";


function MyProfile() {
  const { adminUser } = useAdminUser()


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
           {adminUser?.profilePic ? <img src={adminUser?.profilePic} className='circleIMg' alt="Image not found" /> : <div className="nameTitleMain">
            {adminUser?.name?.split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()}
          </div>}
          </div>

          <div className="">
            <Link to="/my-profile" className="logoBlueColor fs16px mt-2">Change Profile</Link>
          </div>
        </div>

        <div className="mt-4">
          <p className="m-0 fs12px">FULL NAME</p>
          <p className="fs16px">{adminUser?.name}</p>
        </div>
        {adminUser?.jh1_name &&   <div className="mt-4">
          <p className="m-0 fs12px">SECOND HOLDER NAME</p>
          <p className="fs16px">{adminUser?.jh1_name}</p>
        </div>}
          {adminUser?.jh2_name &&   <div className="mt-4">
          <p className="m-0 fs12px">SECOND HOLDER NAME</p>
          <p className="fs16px">{adminUser?.jh2_name}</p>
        </div>}
       

        <div>
          <p className="m-0 fs12px">EMAIL ADDRESS</p>
          <p className="fs16px">{adminUser?.email}</p>
        </div>

        <div>
          <p className="m-0 fs12px">MOBILE NUMBER</p>
          <p className="fs16px">{adminUser?.mobile}</p>
        </div>

        <div>
          <p className="m-0 fs12px">DATE OF BIRTH</p>
          <p className="fs16px">{dateInStringNumber(adminUser?.dob)}</p>
        </div>

        <div>
          <p className="m-0 fs12px">{adminUser?.gPan?"GUARDIAN":"PAN NUMBER"}</p>
          <p className="fs16px">{adminUser?.pan ?
            adminUser?.pan :
            adminUser?.gPan ?
              adminUser?.gPan : ""}</p>
        </div>
            <div>
          <p className="m-0 fs12px">HOLDING NATURE</p>
          <p className="fs16px">{adminUser?.hold_n_code=="AS"?"Anyone / Survivor":"Individual"}</p>
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
