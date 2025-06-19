import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import GIRLDP from "../assets/img/girl-dp.png";
// import GIRLDP from "../assets/img/icici.png";
import { SlLogout } from "react-icons/sl";
import { allFamilyListKeys, allFamilyResponseType, ProfileModelProps } from '../pages/data-interfaces/dashboard';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints } from '../services/utils/urls';
import {useAdminUser} from "../context/AdminContext"


const ProfileModel: React.FC<ProfileModelProps> = ({ show, setShow }) => {
  const navigate = useNavigate()
  const {switchProfile,adminUser,familyMemberList} = useAdminUser()
  // const [familyMemberList, setFamilyMemberList] = useState<allFamilyListKeys[]>([])
  // const [adminUser, setAdminUser] = useState<allFamilyListKeys>()

  const handleClose = () => setShow(false);

  // useEffect(() => {
  //   fetchFamilyPortfoloData()
  // }, [])

  // const fetchFamilyPortfoloData = async () => {
  //   const pan = localStorage.getItem("pan")
  //   let adminData:any = localStorage.getItem("familyList")
  //   adminData = JSON.parse(adminData)

  //   if (pan && (!adminData[0]?.ucc)) {
  //     const res = await postRequest<allFamilyResponseType>(endPoints.getAllFamily, {
  //       pan
  //     });
  //     if (res) {
  //       localStorage.setItem("familyList",JSON.stringify(res.data))
  //       filterAdmin(res.data)
  //     }
  //   }else if(adminData[0]?.pan){
  //      filterAdmin(adminData)

  //   }
  // }

  // const filterAdmin = (data: allFamilyListKeys[]) => {
  //   let familyMember: allFamilyListKeys[] = []
  //   let adminData: any = localStorage.getItem("adminUser")
  //   adminData= JSON.parse(adminData)
  //   if (!adminData?.ucc) {
  //     for (const item of data) {
  //       if (item.relation === "Self") {
  //         item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  //         localStorage.setItem("adminUser", JSON.stringify(item))
  //         setAdminUser(item)
  //       } else {
  //         item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  //         familyMember.push(item)
  //       }
  //     }
  //     setFamilyMemberList(familyMember)
  //   }else{
  //     for (const item of data) {
  //       if (item.ucc === adminData.ucc) {
  //         item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  //         localStorage.setItem("adminUser", JSON.stringify(item))
  //         setAdminUser(item)
  //       } else {
  //         item.name = item.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
  //         familyMember.push(item)
  //         console.log("item",item);
          
  //       }
  //     }
  //     setFamilyMemberList(familyMember)
  //   }

  // }
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