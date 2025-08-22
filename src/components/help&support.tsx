import {
  ArrowLeft,
  Telephone,
  Envelope,
  ChatDots,
  Star,
} from "react-bootstrap-icons";
import RateYourRM from "../components/Rate-Your-RM";
import {  useState } from "react";
// import axios from "axios";

function HelpSupport({ backButton }: { backButton: any; activeInactive: any }) {
  const [show, setShow] = useState(false);


//   const [phoneSupport, setPhoneSupport] = useState("");

// useEffect(() => {
//   const fetchHelpandSupport = async () => {
//     try {
//       const response = await axios.get<{ data: HelpandSupport }>(getHelpandSupport);

//       const { phoneSupport } = response.data.data;
//       setPhoneSupport(phoneSupport);
//     } catch (error) {
//       console.error("Error fetching support data:", error);
//     }
//   };

//   fetchHelpandSupport();
// }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <RateYourRM show={show} setShow={setShow} />
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />
        Help & Support
      </h2>
      <hr className="fw-light text-secondary" />

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        
        <span>
          Phone Support: <span className="link">phoneSupport</span>
        </span>
        <br />
        <span className="note">
          Time: 9:00 AM to 6:00 PM on market Trading days. Standard calling
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
          Email Support: <span className="link">support@bfccapital.com</span>
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
          Phone Support: <span className="link">(+91) 9876789156</span>
        </span>
        <br />
        <span className="note">
          Time: 9:00 AM to 6:00 PM on market Trading days. Standard calling
          rates apply.
        </span>
        <br />
        <button className="mandate-button mt-2">
          <ChatDots size={20} className="me-2" /> Message Us
        </button>
      </div>

      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 mt-2">
        <span>
          Relationship Manager: <span className="link">(+91) 9876789156</span>
        </span>
        <br />
        <span className="note">
          Time: 9:00 AM to 6:00 PM on market Trading days. Standard calling
          rates apply.
        </span>
        <br />
        <button className="mandate-button mt-2">
          <Telephone size={20} className="me-2" /> Call Us
        </button>
        <button className="outline-button  ms-2" onClick={() => setShow(true)}>
          <Star size={20} className="me-2" />
          Rate your RM
        </button>
      </div>
    </main>
  );
}

export default HelpSupport;
