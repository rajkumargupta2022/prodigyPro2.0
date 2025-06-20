
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import { CurrencyRupee } from "react-bootstrap-icons";
import { useEffect, useState } from 'react';
import { useAdminUser } from '../../context/AdminContext';



interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  target: any;
  refData: any;

}
const SwitchPortfolio: React.FC<investmetProps> = ({ show, setShow, target, refData }) => {
  const {familySnapShotData,snapshotData,setSnapshotData} = useAdminUser()
  const [selected, setSelected] = useState<"my" | "family">("my");
  // const [familyPortfolioData, setFamilyPortfolioData] = useState<familyWiseType[]>([])

  useEffect(()=>{
   const portfolioType = localStorage.getItem("portfolioType")
   if(portfolioType==="family"){
     setSelected(portfolioType)
   }else{
     setSelected("my")
   }
  },[])

  const handleCheckboxChange = (type: "my" | "family") => {
    if (type === "my") {
      localStorage.setItem("portfolioType",type)
      console.log("mytype",type);
      
      let family = familySnapShotData?.filter((item) => item?.myPortfolio === true)
      console.log("myyyy",family);
      setSnapshotData(family[0])
    } else {
      localStorage.setItem("portfolioType",type)
      console.log("familytype",type);
      let family = familySnapShotData?.filter((item) => item?.myPortfolio !== true)
      console.log("family",family);
      setSnapshotData(family[0])
    }
    setSelected(type);
    setShow(false)
  };



  return (
    <div ref={refData}>
      <Overlay
        show={show}
        target={target}
        container={refData}
        placement="bottom"
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <div className="my-portfolio-area25 border-bottom">
              <div className="check-box-area25">
                <div className="round">
                  <input
                    type="checkbox"
                    className="roundCheckbox"
                    id="myPortfolio"
                    checked={selected === "my"}
                    onChange={() => handleCheckboxChange("my")}
                  />
                  <label className="mt-0" htmlFor="myPortfolio"></label>
                  <div className="ms-2 my-port-paragraph">
                    <p className="mb-0">My Portfolio</p>
                  </div>
                </div>
              </div>
              <div className="amount-area25">
                <p>
                  <CurrencyRupee className="mb-1" />
                  {snapshotData?.Totalmarketvalue}
                </p>
              </div>
            </div>

            {/* Family Portfolio */}
            <div className="my-portfolio-area25 pt-2">
              <div className="check-box-area25">
                <div className="round">
                  <input
                    type="checkbox"
                    className="roundCheckbox"
                    id="familyPortfolio"
                    checked={selected === "family"}
                    onChange={() => handleCheckboxChange("family")}
                  />
                  <label className="mt-0" htmlFor="familyPortfolio"></label>
                  <div className="ms-2 my-port-paragraph">
                    <p className="mb-0">Family Portfolio</p>
                  </div>
                </div>
              </div>
              <div className="amount-area25">
                <p>
                  <CurrencyRupee className="mb-1" />
                  {snapshotData?.Totalmarketvalue.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

          </Popover.Body>
        </Popover>
      </Overlay>
    </div >
  )
}
export default SwitchPortfolio