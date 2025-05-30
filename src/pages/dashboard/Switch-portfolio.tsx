
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import { CurrencyRupee } from "react-bootstrap-icons";
import { useState } from 'react';
import { familyDataType, familyResponseType, familyWiseType } from '../data-interfaces/dashboard';
import { postRequest } from '../../services/Api/HandleApi';
import { endPoints } from '../../services/utils/urls';
import { errorToast } from '../../services/utils/toast';

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  target: any;
  refData: any;
  familySnapShotData: familyDataType
}
const SwitchPortfolio: React.FC<investmetProps> = ({ show, setShow, target, refData, familySnapShotData }) => {
  const [selected, setSelected] = useState<"my" | "family">("family");
  const [familyPortfolioData, setFamilyPortfolioData] = useState<familyWiseType[]>([])

  const handleCheckboxChange = (type: "my" | "family") => {
    setSelected(type);
    setShow(false)
    fetchFamilyPortfoloData()
  };

  const fetchFamilyPortfoloData = async () => {
    const pan = localStorage.getItem("pan")
    try {
      if (pan) {
        const res = await postRequest<familyResponseType>(endPoints.getFamilywisePortfolio, {
          pan: "DKMPS2157D"
        });
        if (res) {
          console.log("res.data.finalArray", res.finalArray);

          setFamilyPortfolioData(res.finalArray)
        }
      }
    } catch (err) {
      errorToast(err)
    }

  }

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
                  {familySnapShotData.Totalmarketvalue}
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
                  {familySnapShotData.Totalmarketvalue.toLocaleString("en-IN")}
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