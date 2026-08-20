import { ArrowDown, ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { imageUrl } from "../../services/utils/urls";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { inTitleCase } from "../../services/utils/services";


function SIPOrderDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const isSwitchOrSTP = location.state?.investment_type;
  useEffect(() => {
    console.log("location.state", location.state);

    const amcCode = location.state?.accord_amc_code;
    const sourceAmcCode = location.state?.source_scheme?.accord_amc_code;

    if (!amcCode && !sourceAmcCode) {
      navigate("/all-orders");
    }
  }, [navigate, location.state]);

  const getOrderValue = (item: any) => {
    if (item.order_amount != null && item.order_amount !== 0) {
      return `₹${item.order_amount}`;
    }

    if (item.units != null && item.units !== 0) {
      return `${item.units} Units`;
    }

    if (item.all_units === true) {
      return "All units";
    }

    return "0";
  };






  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h4>
        <ArrowLeft className="crPointer" size={20} onClick={() => navigate(-1)} />
        Order Details
      </h4>
      <hr className="fw-light text-secondary " />
      {isSwitchOrSTP === "SWITCH" || isSwitchOrSTP === "STP" ?
        <>
          <div className="d-flex justify-content-between">

            <div className="d-flex">
              <div className="d-flex align-items-center">
                <img
                  src={imageUrl + location?.state?.source_scheme?.accord_amc_code + ".png"}
                  alt="image not found"
                  height={35}
                  width={35}
                  className="rounded"
                />
              </div>
              <div className="ms-2 prod_icon_heading mt-2">
                <h4 >{location.state?.source_scheme?.scheme_name}</h4>
                {/* <p>Selected fund 1</p> */}
              </div>
            </div>

          </div>
          <div className="d-flex align-items-center">
            <hr className="flex-grow-1" />
            <div className='rounded-4 lightTrxBtn p-1'><ArrowDown /> SWITCH TO</div>
            <hr className="flex-grow-1" />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex">
              <div className="prod_icon_img">
                <img src={imageUrl + location.state?.target_scheme?.accord_amc_code + ".png"} className='rounded' height={35} width={35} alt="" />
              </div>
              <div className="ms-2 prod_icon_heading mt-2">
                <h4>{location.state?.target_scheme?.scheme_name}</h4>
                {/* <p>Selected fund 1</p> */}
              </div>
            </div>

          </div></> : <div className="d-flex mb-3 align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={imageUrl + location?.state?.accord_amc_code + ".png"}
              alt="image not found"
              height={40}
              width={40}
              className="rounded"
            />
            <span className="fw-bold ms-2">{location.state.scheme_name}</span>
          </div>
        </div>}


      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
        <span className="fw-bold"> Order Details</span>
        <div className="d-flex justify-content-between mb-2 mt-3">
          <span className="text-secondary">ORDER DATE</span>
          <span className="value-font2">{dateInStringNumber(location.state?.order_date || "N/A")}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">ORDER ID</span>
          <span className="value-font2">{location.state?.transaction_id || "N/A"}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">ORDER STATUS</span>
          <span className="value-font2">{inTitleCase(location.state?.status) || "N/A"}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">ORDER TYPE</span>
          <span className="value-font2">{inTitleCase(location.state?.investment_type) || "N/A"}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">ORDER VALUE</span>
          <span className="value-font2">{getOrderValue(location.state)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">FOLIO NUMBER</span>
          <span className="value-font2">{location.state?.folio_number || "N/A"}</span>
        </div>
      </div>




    </main>

  );
}

export default SIPOrderDetails;
