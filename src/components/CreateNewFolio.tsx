import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
import { foliosKeys, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";

interface CreateNewFolioProp {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
  setSchemeList: (data: schemeDeatilDataKeys[]) => void;
  folioList: foliosKeys[];
  selectedFolioIndex: number;
}

const CreateNewFolio: React.FC<CreateNewFolioProp> = ({
  show,
  setShow,
  schemeList,
  setSchemeList,
  folioList,
  selectedFolioIndex,
}) => {
  // Temporary selection state per scheme index
  const [tempSelectedFolio, setTempSelectedFolio] = useState<Record<number, foliosKeys | null>>({});
  const [newFolioMap, setNewFolioMap] = useState<Record<number, boolean>>({});

  const handleSelectFolio = (selectedFolioObj: foliosKeys) => {
    setTempSelectedFolio((prev) => ({ ...prev, [selectedFolioIndex]: selectedFolioObj }));
    setNewFolioMap((prev) => ({ ...prev, [selectedFolioIndex]: false }));
  };

  const handleCreateNewFolio = () => {
    setTempSelectedFolio((prev) => ({ ...prev, [selectedFolioIndex]: null }));
    setNewFolioMap((prev) => ({ ...prev, [selectedFolioIndex]: true }));
  };

  const handleInvestmentConfirmation = () => {
    const updatedList = [...schemeList];
    const isNewFolio = newFolioMap[selectedFolioIndex];
    const selectedFolio = tempSelectedFolio[selectedFolioIndex];

    if (isNewFolio) {
      updatedList[selectedFolioIndex].selectedFolio = {
        folio_number: "",
        scheme_code:0,
        invested_amt: 0,
        current_value: 0,
        is_recommended: false,
      };
    } else if (selectedFolio) {
      updatedList[selectedFolioIndex].selectedFolio = selectedFolio;
    }

    setSchemeList(updatedList);
    setShow(false);
  };

  const currentScheme = schemeList[selectedFolioIndex];
  const currentSelectedFolio = currentScheme?.selectedFolio;

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      contentClassName="modelSize"
      size="sm"
      centered
    >
      <Modal.Body className="bg-white">
        {folioList?.map((item) => {
          const isChecked =
            !newFolioMap[selectedFolioIndex] &&
            (tempSelectedFolio[selectedFolioIndex]?.folio_number === item.folio_number ||
              (!tempSelectedFolio[selectedFolioIndex] &&
                currentSelectedFolio?.folio_number === item.folio_number));

          return (
            <div key={item.folio_number} className="row container-fluid border-bottom">
              <div className="col col-md-8 round" onClick={() => handleSelectFolio(item)}>
                <input
                  type="checkbox"
                  id={`checkbox-${item.folio_number}`}
                  checked={isChecked}
                  readOnly
                />
                <label htmlFor={`checkbox-${item.folio_number}`}></label>
                <small>Folio: {item.folio_number}</small>
              </div>

              {item.is_recommended && (
                <div className="col col-md-4 text-end fs12px">
                  <button
                    type="button"
                    className="btn scheme-bg rounded-5 logoBlueColor popularButton"
                  >
                    Recommended
                  </button>
                </div>
              )}

              <div className="col p-0">
                <small className="fs12px">INVESTED</small>
                <p className="fs12px text-dark">
                  <CurrencyRupee />
                  {item.invested_amt}
                </p>
              </div>

              <div className="col">
                <small className="fs12px">Current</small>
                <p className="fs12px text-dark">
                  <CurrencyRupee />
                  {item.current_value}
                </p>
              </div>
            </div>
          );
        })}

        <div className="form-check prdogy-checkbox12 mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="createFolio"
            checked={newFolioMap[selectedFolioIndex] === true}
            onChange={handleCreateNewFolio}
          />
          <label className="form-check-label logoBlueColor" htmlFor="createFolio">
            Create New Folio
          </label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="customCancelButton" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button className="customButton" onClick={handleInvestmentConfirmation}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewFolio;
