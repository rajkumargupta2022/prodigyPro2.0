import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import { useAdminUser } from "../../context/AdminContext";
import { uccDataResKeys, uccSubmitRes } from "../data-interfaces/ucc";

interface NomineeOptOutProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const NomineeOptOut: React.FC<NomineeOptOutProps> = ({ show, setShow }) => {
  const { fetchFanilyMembersForUcc } = useAdminUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;

  const [isOptOut, setIsOptOut] = useState(false);

  const handleClose = () => setShow(false);

  const handleAddNominee = () => {
    navigate(`/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`);
  };

  const finalDataSubmit = async () => {
    if (!isOptOut) return;

    // First save opt-out choice to true
    try {
      const payload = {
        reference_id,
        tax_status,
        holding_nature,
        nominee_opt_out: true
      };

      const saveRes: any = await postRequest(endPoints.tempSaveUcc, { data: payload });

      if (saveRes.success) {
        // Then call final submit API
        const res = await postRequest<uccSubmitRes>(endPoints.submit, { reference_id });
        if (res.success) {
          fetchFanilyMembersForUcc(res.data.client_code, pan);
          handleClose();
        }
      }
    } catch (err) {
      errorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title className="w-100 text-center fw-bolder fs-5 text-dark ms-4">Nominations</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        <div className="bg-light p-3 rounded" style={{ backgroundColor: "#f8f9fb" }}>
          <p className="text-secondary mb-0" style={{ lineHeight: "1.6", fontSize: "0.9rem" }}>
            As per SEBI regulations, adding nominees ensures a smooth,
            legal, and rapid transfer of assets to beneficiaries in case of
            investor's demise. You may skip adding nominee details now
            and update it later via customer support.
          </p>
        </div>

        <button
          className="btn btn-primary w-100 mb-4 mt-4 py-2"
          style={{ backgroundColor: "#0220e8", border: "none", borderRadius: "8px", fontWeight: 500 }}
          onClick={handleAddNominee}
          disabled={isOptOut}
        >
          Add Nominee
        </button>

        <div className="d-flex align-items-center justify-content-center" >

          <Form.Check
            className="m-0 rounded-circle prodigy__selc1212"
            inline
            label="I wish to Opt-out of the nomination."
            name="group1"
            type="checkbox"
            id={`checkbox`}
            checked={isOptOut}
            onChange={() => setIsOptOut(!isOptOut)}
          />
        </div>

      </Modal.Body>

      <Modal.Footer className="justify-content-center border-top-0 pt-0 pb-4 px-4">
        <button
          className={`btn w-100 py-2 fw-bold text-white`}
          style={{ backgroundColor: "#0220e8", border: "none", borderRadius: "8px", fontWeight: 500 }}
          onClick={finalDataSubmit}
          disabled={!isOptOut}
        >
          Save & Continue
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NomineeOptOut;