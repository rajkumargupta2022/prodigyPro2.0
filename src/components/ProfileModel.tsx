
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import {  ProfileModelProps } from '../pages/data-interfaces/dashboard';
import {useAdminUser} from "../context/AdminContext"


const ProfileModel: React.FC<ProfileModelProps> = ({ show, setShow }) => {
  const navigate = useNavigate()
  const {switchProfile,adminUser,familyMemberList} = useAdminUser()
  const handleClose = () => setShow(false);

  const logOut = ()=>{
    localStorage.clear()
    navigate("/")
  }

  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        contentClassName="modal-bg smallModel"
      >
        <Modal.Header closeButton >
        </Modal.Header>
        <Modal.Body >
          <div className='container'>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center" >
                  {adminUser?.profilePic?  <img src={adminUser?.profilePic} className='circleIMg' alt="Image not found" />: <div className="nameTitleMain">
                   {adminUser?.name?.split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()}
                </div>}
                
              </div>
              <h5 className='text-center'>{adminUser?.name}</h5>
              <Link to="/my-profile" className='text-center logoBlueColor'>My Profile</Link>
              <hr />

              {familyMemberList.length > 0 && familyMemberList.map((item) => {
                return <> <div className="d-flex justify-content-around">
                    {adminUser?.profilePic?  <img src={adminUser?.profilePic} className='circleImg-2' alt="Image not found" />: <div className="nameTitle">
                   {item?.name?.split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()}
                </div>}
                  
                  <div className="ms-2" style={{ flex: 4 }}>
                    <h6 className='m-0'>
                      {item.name}
                    </h6>
                    <span className="text-secondary fs12px">
                      {item.relation}
                    </span>
                  </div>
                  <span className="logoBlueColor crPointer"onClick={() => switchProfile(item, setShow)}>Switch Profile</span>
                </div>
                  <hr /></>
              })}



              <div className="d-flex justify-content-around crPointer">
                {/* <img src={GIRLDP} className='circleImg-2' alt="Image not found" /> */}
                <div className='circleImg-2 logOutBg '>
                  <SlLogout />
                </div>
                <div className="ms-2 mt-2 " style={{ flex: 4 }} onClick={logOut}>
                  <h6 className='m-0'>
                    Log Out
                  </h6>

                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default ProfileModel;