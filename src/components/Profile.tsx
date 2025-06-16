import { Link } from "react-router-dom";
import GIRLDP from "../assets/img/girl-dp.png";

function Profile() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h3>
        My Profile
      </h3>

      <hr className="fw-light text-secondary" />
      <form className="d-flex p-4 shadow-sm bg-white border-0 rounded-4">
        <div>
          <img src={GIRLDP} alt="Image not found" height={80} width={80}/>
        </div>
        <div className="m-2 " style={{ flex: 1 }}>
          <h5>Nandani Sahu</h5>
          <p>Member since 2023</p>
        </div>
        <div className="crPointer">
          <Link to="/profile-details" className="logoBlueColor">
            Profile Details
          </Link>
        </div>
        
      </form>
      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mt-4">

        <div className="d-flex">
          <h5 style={{ flex: 1 }}>Family Members</h5>
          <Link className="logoBlueColor" to={"/add-family-member"}>+ Add New</Link>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 py-2">
            <div
              className="profileCard"
            >
              <img src={GIRLDP} alt="Image not found" height={44} width={44}/>
              <h5>Kamini Sahu</h5>
              <p>Spouse</p>
              <p className="logoBlueColor">Switch Profile</p>
            </div>
          </div>
           <div className="col-lg-4 col-md-6 col-sm-12 py-2">
            <div
              className="profileCard"
            >
              <img src={GIRLDP} alt="Image not found" height={44} width={44}/>
              <h5>Kamini Sahu</h5>
              <p>Spouse</p>
              <p className="logoBlueColor">Switch Profile</p>
            </div>
          </div>
           <div className="col-lg-4 col-md-6 col-sm-12 py-2">
            <div
              className="profileCard"
            >
              <img src={GIRLDP} alt="Image not found" height={44} width={44}/>
              <h5>Kamini Sahu</h5>
              <p>Spouse</p>
              <p className="logoBlueColor">Switch Profile</p>
            </div>
          </div>


        

         

      
        </div>
      </div>
    </main>
  );
}

export default Profile;
