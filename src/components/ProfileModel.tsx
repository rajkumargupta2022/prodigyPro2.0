import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import GIRLDP from "../assets/img/girl-dp.png";
import { SlLogout } from "react-icons/sl";
import { familyResponseType, familyWiseType, ProfileModelProps } from '../pages/data-interfaces/dashboard';
import { useSinglePortfolioContext } from '../context/SinglePortfolioContext';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints } from '../services/utils/urls';



const ProfileModel: React.FC<ProfileModelProps> = ({ show, setShow }) => {
  const {handleSinglePortfolio} = useSinglePortfolioContext()
  const [familyPortfolioData, setFamilyPortfolioData] = useState<familyWiseType[]>([])

  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchFamilyPortfoloData()
  }, [])

  const fetchFamilyPortfoloData = async () => {
    const pan = localStorage.getItem("pan")
    if (pan) {
      const res = await postRequest<familyResponseType>(endPoints.getFamilywisePortfolio, {
        pan
      });
      if (res) {
        setFamilyPortfolioData(res.finalArray)
      }
    }
  }

  // const singlePortfolio = (singleFamilyData: familyWiseType) => {
  //     localStorage.setItem("singlePortfolio",JSON.stringify(singleFamilyData))
  //     setShow(false)
  // }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        contentClassName="modal-bg"
      >
        <Modal.Header closeButton >
        </Modal.Header>
        <Modal.Body >
          <div className='container'>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center" >
                <img src={GIRLDP} className='circleIMg' alt="Image not found" />
              </div>
              <h5 className='text-center mt-1'>Hi User</h5>
              <Link to="/my-profile" className='text-center logoBlueColor'>My Profile</Link>
              <hr />

              {familyPortfolioData.length > 0 && familyPortfolioData.map((item) => {
                return <> <div className="d-flex justify-content-around">
                  <img src={GIRLDP} className='circleImg-2' alt="Image not found" />
                  <div className="ms-2 mt-1" style={{ flex: 4 }}>
                    <h6 className='m-0'>
                      {item.Name}
                    </h6>
                    <span className="text-secondary">
                      Relation
                    </span>
                  </div>
                  <span className="logoBlueColor crPointer" onClick={() => handleSinglePortfolio(item)}>Switch Profile</span>
                </div>
                  <hr /></>
              })}



              <div className="d-flex justify-content-around crPointer">
                {/* <img src={GIRLDP} className='circleImg-2' alt="Image not found" /> */}
                <div className='circleImg-2 logOutBg '>
                  <SlLogout />
                </div>
                <div className="ms-2 mt-2 " style={{ flex: 4 }}>
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