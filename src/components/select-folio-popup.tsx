import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { CurrencyRupee } from "react-bootstrap-icons";
import CreateNewFolio from "./CreateNewFolio";
import BankMandate from "../components/BankMandate";
import { foliosKeys, schemeDeatilDataKeys, sipPurchaseRedemptionKey } from "../pages/data-interfaces/transact";
import OrderPlaces from "./order-places";
import { finalTransaction } from "../services/utils/transactionApi";

interface SchemeDetailsProps {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
  setSchemeList: (date: any) => void
  isSipTransaction: boolean
}

const SelectFolioPopup: React.FC<SchemeDetailsProps> = ({ show, setShow, schemeList, setSchemeList, isSipTransaction }) => {
  const [openCreateFolio, setOpenCreateFolio] = useState<boolean>(false);
  const [openBankMandate, setOpenBankMandate] = useState(false)
  const [folioList, setFolioList] = useState<foliosKeys[]>([])
  const [openSuccess, setOpenSuccess] = useState(false)
  const [selectedFolioIndex, setSelectedFolioIndex] = useState<number>(0)
  const [successData, setSuccessData] = useState<sipPurchaseRedemptionKey[]>([])
  const [tempSchemeList, setTempSchemeList] = useState<schemeDeatilDataKeys[]>([])
  const sip = isSipTransaction
  useEffect(() => {
    defaultSelectFolio()
    
  }, [show])
  const defaultSelectFolio = () => {

    schemeList?.forEach((scheme: any) => {
      const recommendedFolio = scheme?.folioList?.find((folio: any) => folio?.is_recommended);
      scheme.selectedFolio = recommendedFolio || {};
    });
    setTempSchemeList(schemeList)
  }


  const handleMandate = () => {
    if (sip) {
      setOpenBankMandate(true);
      setShow(false);
    } else {
      finalTransaction(tempSchemeList, "purchase", setSuccessData, false).then((res) => {
        console.log(res);
        setOpenSuccess(true)
        setShow(false);
      })

    }
  }
  const handleFolioSelection = (data: foliosKeys[] = [], index: number) => {
    setFolioList(data)
    setSelectedFolioIndex(index)
    setOpenCreateFolio(true)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className=""
      // select-folio-popup
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Select Folio</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          {schemeList?.map((item, index) => {
            return <Card className="rounded-4 shadow-lg border-0 mb-2" key={index}>
              <Card.Body>
                <div className="row container-fluid">
                  <h6>{item.scheme}</h6>
                  {item?.selectedFolio?.folio_number ? <>
                    <div className="col col-md-8 round">
                      <input type="checkbox" id={"foliochechbox" + index} checked={true} />
                      <label htmlFor={"foliochechbox" + index} className=""></label>
                      <small className="">Folio:{item?.selectedFolio?.folio_number}</small>
                    </div>

                    <div className="col col-md-4 text-end fs12px">
                      <button
                        type="button"
                        className="btn scheme-bg rounded-5 logoBlueColor popularButton"
                      >
                        Recommended
                      </button>
                    </div>

                    <div className="col p-0">
                      <small className="fs12px">INVESTED</small>
                      <p className="fs12px text-dark">
                        <CurrencyRupee />
                        {item?.selectedFolio?.invested_amt}
                      </p>
                    </div>
                    <div className="col">
                      <small className="fs12px">Current Value</small>
                      <p className="fs12px text-dark">
                        <CurrencyRupee />
                        {item?.selectedFolio?.current_value}
                      </p>
                    </div>
                    <span className="logoBlueColor fs14px crPointer" onClick={() => handleFolioSelection(item?.folioList, index)}> Change Folio</span>
                  </> : <div className="form-check prdogy-checkbox12">
                    <input className="form-check-input" type="checkbox" value="" id="selectFolioPopup" checked={true} />
                    <label className="form-check-label logoBlueColor" htmlFor="selectFolioPopup" >
                      Create New Folio
                    </label>
                    {folioList.length > 0 &&
                      <p className="logoBlueColor fs14px crPointer mb-0" onClick={() => handleFolioSelection(item?.folioList, index)}> Change Folio</p>
                    }
                  </div>}
                </div>
              </Card.Body>
            </Card>
          })}



          <div className="text-center">
            <button
              onClick={handleMandate}
              className="text-white logobg_color rounded-3 fs-7 p-2 border-0"
            >
              Continue with Selected Folio
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <CreateNewFolio show={openCreateFolio} setShow={setOpenCreateFolio} schemeList={schemeList} setSchemeList={setSchemeList} folioList={folioList} selectedFolioIndex={selectedFolioIndex} />

      <BankMandate show={openBankMandate} setShow={setOpenBankMandate} schemeList={tempSchemeList} setSchemeList={setSchemeList} isSipTransaction={isSipTransaction} additionalPurchase={false} />
      <OrderPlaces show={openSuccess} setShow={setOpenSuccess} successData={successData} />


    </>
  );
};

export default SelectFolioPopup;
