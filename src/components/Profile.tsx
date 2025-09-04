import { Link } from "react-router-dom";
import { useAdminUser } from "../context/AdminContext"
import { useEffect } from "react";


function Profile() {
  const { switchProfile, adminUser, familyMemberList } = useAdminUser()
   useEffect(()=>{
 
   },[])
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h3>
        My Profile
      </h3>

      <hr className="fw-light text-secondary" />
      <form className="d-flex p-4 shadow-sm bg-white border-0 rounded-4">
        <div>
          {adminUser?.profilePic ? <img src={adminUser?.profilePic} className='circleIMg' alt="Image not found" /> : <div className="nameTitleMain">
            {adminUser?.name?.split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()}
          </div>}
        </div>
        <div className="m-2 " style={{ flex: 1 }}>
          <h5>{adminUser?.name}</h5>
          <p>Member since {adminUser?.createdAt?.split("-")[0]}</p>
        </div>

        <div className="col-md-4 col-12 text-md-end  mt-md-0 mt-2 crPointer align-items-center">
          <Link to="/profile-details" className="logoBlueColor">
            Profile Details
          </Link>
        </div>

      </form>
     { familyMemberList.length>0 &&
      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mt-4">

        <div className="d-flex">
          <h5 style={{ flex: 1 }}>Family Members</h5>
          {/* <Link className="logoBlueColor" to={"/add-family-member"}>+ Add New</Link> */}
        </div>

        <div className="row">
          {familyMemberList.length > 0 && familyMemberList.map((item) => {
            return <>
              <div className="col-lg-4 col-md-6 col-sm-12 py-2">
                <div
                  className="profileCard"
                >
                  {adminUser?.profilePic ? <img src={adminUser?.profilePic} className='circleImg-2' alt="Image not found" /> : <div className="nameTitle">
                    {item?.name?.split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()}
                  </div>}

                  <h5> {item.name}</h5>
                  <p className="fs14px">    {item.hold_n_code==="SI" ? "Single Holder" : `AOS ( ${item.jh1_name} ${item.jh2_name && ","+item.jh2_name})` }</p>
                  <p className="logoBlueColor" onClick={() => switchProfile(item)}>Switch Profile</p>
                </div>
              </div>
            </>
          })}
        </div>
      </div>}
    </main>
  );
}

export default Profile;
