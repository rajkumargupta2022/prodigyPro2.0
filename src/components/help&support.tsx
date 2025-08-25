import {
  ArrowLeft,
  Telephone,
  Envelope,
  ChatDots,
  Star,
} from "react-bootstrap-icons";
import RateYourRM from "../components/Rate-Your-RM";
import {  useEffect, useState } from "react";
import { helpAndSupportKey, helpAndSupportResponse } from "../pages/data-interfaces/accounts";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";


function HelpSupport({ backButton }: { backButton: any; activeInactive: any }) {
  const [show, setShow] = useState(false);
  const [helpAndSupportData,setHelpAndSupportData] = useState<helpAndSupportKey>()

useEffect(()=>{
    fetchSupportData()
},[])

const fetchSupportData =async ()=>{
  const pan:string|null = localStorage.getItem("pan")
    if(pan){

      const res= await postRequest<helpAndSupportResponse>(endPoints.getHelpandSupport,{pan})
      if(res.data){
        setHelpAndSupportData(res.data)
      }
    }
}


  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <RateYourRM show={show} setShow={setShow} rmId={helpAndSupportData?.RMID}/>
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Help & Support
      </h2>
      <hr className="fw-light text-secondary" />

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        
        <span>
          Phone Support: <span className="link">{helpAndSupportData?.phoneSupport}</span>
        </span>
        <br />
        <span className="note">
          Time: 9:30 AM to 6:00 PM on market Trading days. Standard calling
          rates apply.
        </span>
        <br />
        <button className="mandate-button mt-2">
          <Telephone size={20} className="me-2" />
          Call Us
        </button>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        <span>
          Email Support: <span className="link">{helpAndSupportData?.emailSupport}</span>
        </span>
        <br />
        <span className="note">Available 24x7 for users</span>
        <br />
        <button className="mandate-button mt-2">
          <Envelope size={20} className="me-2" />
          Email Us
        </button>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        <span>
          Phone Support: <span className="link"> {helpAndSupportData?.whatsappSupport}</span>
        </span>
        <br />
        <span className="note">
          Time: 9:30 AM to 6:00 PM on market Trading days. Standard calling
          rates apply.
        </span>
        <br />
        <button className="mandate-button mt-2">
          <ChatDots size={20} className="me-2" /> Message Us
        </button>
      </div>
 {helpAndSupportData?.rmSupport&&
      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        <span>
          Relationship Manager: <span className="link">{helpAndSupportData?.rmSupport}</span>
        </span>
        <br />
        <span className="note">
          Time: 9:30 AM to 6:00 PM on market Trading days. Standard calling
          rates apply.
        </span>
        <br />
        <button className="mandate-button mt-2">
          <Telephone size={20} className="me-2" /> Call Us
        </button>
        {helpAndSupportData?.RMID &&
        <button className="outline-button  ms-2" onClick={() => setShow(true)}>
          <Star size={20} className="me-2" />
          Rate your RM
        </button>}
      </div>}
    </main>
  );
}

export default HelpSupport;
