import NavBar from "../components/Navbar";
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { nfoLiveRes } from "./data-interfaces/nfo";
import { dateInStringNumber } from "../services/dates/dateFormater";
import { schemeDeatilDataKeys } from "./data-interfaces/transact";

const NFOLive = () => {
  const navigate = useNavigate()

  const [nfoSchemeList, setNfoSchemeList] = useState<schemeDeatilDataKeys[]>([])


  useEffect(() => {
    fetchNfoLiveScheme()
  }, [])
  const fetchNfoLiveScheme = async () => {
    try {
      const res = await getRequest<nfoLiveRes>(endPoints.liveNfo)
      if (res.success) {
        let data = res.data.filter((item: schemeDeatilDataKeys) => {
          return (item.sipAllowed || item.purchaseAllowed || item?.sipDateList?.length > 0)
        })
        const validData = removeExpired(data);
        setNfoSchemeList(validData)
      }
    } catch (err) {
      setNfoSchemeList([])
    }
  }
  function removeExpired(items: schemeDeatilDataKeys[]): schemeDeatilDataKeys[] {
  const now = new Date();

  return items
    .filter(item => {
      const closeDate = new Date(item?.nfo_close_date ?? "");
      return closeDate.getTime() > now.getTime(); // keep only future ones
    })
    .sort((a, b) => {
      const dateA = new Date(a.nfo_close_date ?? "").getTime();
      const dateB = new Date(b.nfo_close_date ?? "").getTime();
      return dateA - dateB; // ascending: nearest closing date first
    });
}


function getRemainingDays(closeDate: Date | string): string {
  const now = new Date();
  const close = new Date(closeDate);

  // Force 6:30 PM on the close date (18:30 hours)
  close.setHours(18, 30, 0, 0);

  // Format closing time (in local time)
  const options: Intl.DateTimeFormatOptions = { 
    hour: "numeric", 
    minute: "2-digit", 
    hour12: true 
  };
  const closingTime = close.toLocaleTimeString("en-US", options);

  // Reset times to midnight for day-difference calculation
  const msInDay = 1000 * 60 * 60 * 24;
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const closingDay = new Date(close);
  closingDay.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor((closingDay.getTime() - today.getTime()) / msInDay);
  console.log("diffInDays",diffInDays);
  
  if (diffInDays === 1) {
    if (now.getTime() > close.getTime()) {
      return "Already closed";
    } else {
      return `Closing today at ${closingTime}`;
    }
  } else if (diffInDays === 2) {
    return `${diffInDays-1} Day to close`;
  } else if (diffInDays > 2) {
    return `${diffInDays-1} Days to close`;
  } else {
    return "Closed";
  }
}










  const applyNow = async (data: schemeDeatilDataKeys) => {
    navigate("/nfo-apply", { state: data })

  }
  return (
    <>
      <NavBar />


      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" onClick={() => navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs12px bold" /> NFO Live</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>NFO Live</h4>
              <p className="fs14px">Seize the opportunity to invest in newly launched funds and diversify your portfolio from the start.</p>
            </div>
          </div>

        </div>
      </div>
      {nfoSchemeList.length > 0 ? nfoSchemeList.map((item) => {
        return <div className="container py-2">
          <div className="personal_form_container">
            <div className="borderColor p-3 headerRadius bg-white">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={`${imageUrl + item.accordAMCCode}.png`} height={35} width={35} alt="" className="rounded" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.scheme}</h4>
                    {/* <p>Selected fund 2</p> */}
                  </div>
                </div>
                <div className="prod_view_fund align-self-center" onClick={() => applyNow(item)}>
                  <div className="logoBlueColor crPointer fs12px"><ChevronRight /></div>
                </div>
              </div>
              <hr />
              <div className="row text-start mt-2">
                <div className="col-md-4 col-4 col-lg-4">
                  <small className="fs14px">Open</small><br />
                  <small>{dateInStringNumber(item.launchDate)}</small>
                </div>
                <div className="col-md-4 col-4 col-lg-4">
                  <small className="fs14px">Close</small><br />
                  <small>{dateInStringNumber(item.nfo_close_date)}</small>
                </div>
                <div className="col-md-4 col-4 col-lg-4">
                  <small className="fs14px">Min. Invest</small><br />
                  <small><CurrencyRupee className="mb-1" />{item.sipAllowed ? item.minSIPAmt : item.purchaseAllowed && item.minLumSumAmt}</small>
                </div>
              </div>
            </div>
            <Card.Header className='scheme-bg footerRadius px-3 py-2 fs14px'>
              <div className="row">
                <div className="col-6"> {getRemainingDays(item.nfo_close_date ?? "")}</div>
                <div className="col-6 text-end"> <div className="logoBlueColor crPointer fw-bold" onClick={() => applyNow(item)}>Apply now</div> </div>
              </div>
            </Card.Header>


          </div>
        </div>
      }) : ""}

    </>
  );
};

export default NFOLive;
