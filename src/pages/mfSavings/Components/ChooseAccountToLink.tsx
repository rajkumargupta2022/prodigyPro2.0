import Modal from "react-bootstrap/Modal";

import PortfolioEmpty from "../../../pages/PortfolioEmpty";
import noBankImg from "../../../assets/img/no-bank.png"
import { imageUrl } from "../../../services/utils/urls";
interface ChooseAccountToLink {
  show: boolean;
  setShow: (show: boolean) => void;

}

// const [openCreateFolio,setOpenCreateFolio] = useState<boolean>(false)
const ChooseAccountToLink: React.FC<ChooseAccountToLink> = ({ show, setShow }) => {
  const mandateList = [{
    "bank_name": "HDFC BANK",
    "umrn_no": "1677",
    "acc_type": "SB",
    "bank_code": "HDFC0000296",
    "account_no": "02961050001764",
    "holederName": "Chitranshu Srivastwa",
    "amount": "1000",
    "from_date": "2015-11-09T18:30:00.000Z",
    "to_date": "2999-12-30T18:30:00.000Z"
  },
  {
    "bank_name": "HDFC BANK",
    "umrn_no": "5026",
    "acc_type": "SB",
    "bank_code": "HDFC0000296",
    "account_no": "02961050001764",
    "holederName": "Rajkumar Gupta",
    "amount": "10000",
    "from_date": "2016-03-08T18:30:00.000Z",
    "to_date": "2999-12-30T18:30:00.000Z"
  }]

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Choose Account to link</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          {mandateList.length > 0 ? mandateList?.map((item, index) => {

            return <div key={item.umrn_no} className="borderColor p-3 rounded bg-white m-2">
              <div className="d-flex justify-content-between" >
                <div className="d-flex">
                  <div className="prod_icon_img">
                    <img src={imageUrl + item?.bank_name?.trim()
                      .toLowerCase()
                      .replace(/\s+/g, '_') + ".png"} height={32} width={32} className="rounded" alt="bank-logo" />
                  </div>
                  <div className="ms-2 prod_icon_heading">
                    <h4>{item.account_no.slice(0, 2) + "XXXXXXX" + item.account_no.slice(-4)}</h4>
                    <p>HDFC Bank</p>
                  </div>

                </div>
                <div className="round">
                  <input
                    type="checkbox"
                    id={`mandate-${index}`}
                    checked={true}
                    readOnly
                  />
                  <label htmlFor={`mandate-${index}`}></label>
                </div>
              </div>


            </div>
          }) : <PortfolioEmpty images={noBankImg} title={"No Mandate found"} body={"Please create a new mandate upto ₹2,00,00,00,000 to continue with this transaction"} btnName={"Create New Mandate"} btnUrl={"/linked-bank-account"} />}

          <div className="row justify-content-center mt-3">
            <div className="col-md-6 col-lg-6">
              <button
                type="button"
                className={`customButton w-100 px-4 mb-1`}
              >
                Link Bank Account
              </button>
            </div>

            <div className="col-md-6 col-lg-6">
              <button
                type="button"
                className={`customButtonNoBg w-100 px-4 mb-1`}
              >
                Close
              </button>
            </div>
          </div>


        </Modal.Body>

      </Modal>


    </>
  );
};

export default ChooseAccountToLink;
