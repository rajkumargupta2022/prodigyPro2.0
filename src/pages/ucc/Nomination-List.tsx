import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import { Card, Dropdown } from "react-bootstrap";
import { Pencil,  Trash } from "react-bootstrap-icons";
import NomineeModal from "../../components/Nominee-Modal";
import { nomineeDetailForm, uccDataRes, uccDataResKeys, uccSubmitRes } from "../data-interfaces/ucc";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast, successToast } from "../../services/utils/toast";
import TrackBar from "./Track-bar";
import { formatUTCToDateOnly } from "../../services/dates/dateFormater";

const NominationList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;
  const [nomineeList, setNomineeList] = useState<nomineeDetailForm[]>([]);

  useEffect(() => {
    if (reference_id) {
      fetchUccData()
    }
  }, [])

  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      if (response.success && (response.data?.nominees && response.data?.nominees?.length > 0)) {
        setNomineeList(response.data?.nominees ?? []);
      }
    } catch (err) {
      errorToast(err);
    }
  }

  const handleDelete = async (index: number) => {
    const updatedList = nomineeList.filter((_, i) => i !== index);
    try {
      const payload = {
        reference_id,
        tax_status,
        holding_nature,
        nominees: updatedList
      };
      const res: any = await postRequest(endPoints.tempSaveUcc, { data: payload });
      if (res.success) {
        setNomineeList(updatedList);
        successToast("Nominee removed successfully");
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleEdit = (index: number) => {
    navigate(`/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}&edit_index=${index}`);
  };

  const handleAddNew = () => {
    navigate(`/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`);
  };
  const finalDataSubmit = async () => {
    try {
      const res = await postRequest<uccSubmitRes>(endPoints.submit, { reference_id });
      if (res.success) {
        navigate("/ucc-submit");
      }
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <>
      <NavBar />
      <NomineeModal toggle={false} />
      <TrackBar />
      <div className="container pt-5">
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">List of Nominee(s)</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">

            {nomineeList.length > 0 ? nomineeList.map((nominee: nomineeDetailForm, index: number) =>
              <Card key={index} className="d-flex align-items-center p-3 border-0 shadow-sm rounded-3 mt-2">
                <div className="d-flex align-items-center w-100">
                  {/* Profile Circle */}
                  <div
                    className="rounded-circle  d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "16px",
                      backgroundColor: "#6778fe",
                    }}
                  >
                    {(nominee.nominee_name ?? "").split(" ")?.slice(0, 2).map(word => word[0]).join("").toUpperCase()
                    }
                  </div>

                  {/* Details */}
                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1 fw-bold">{nominee.nominee_name ?? ""}</h6>
                    <small className="text-muted text-secondary">
                      {formatUTCToDateOnly(nominee.nominee_dob??"") ?? ""} • {nominee.nominee_relation ?? ""} • Allocation: {nominee.nominee_allocation ?? ""}%
                    </small>
                  </div>

                  {/* Dropdown Menu */}
                  <Dropdown align="end">
                    <Dropdown.Toggle as="div" className="crPointer shadow-none border-0 p-0 m-0 no-caret">
                      {/* <ThreeDotsVertical size={20} className="text-muted" /> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="border-0 shadow-sm">
                      <Dropdown.Item onClick={() => handleEdit(index)} className="d-flex align-items-center gap-2">
                        <Pencil size={14} className="text-primary" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(index)} className="d-flex align-items-center gap-2 text-danger">
                        <Trash size={14} /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card>
            ) : <p className="text-muted mb-0">No nominee added yet</p>}

            <div className="logoBlueColor mt-4 crPointer fw-bold d-inline-block" onClick={handleAddNew}>
              + Add New Nominee
            </div>

          </form>
        </div>
      </div>
      <NextBar onSaveContinue={finalDataSubmit} />
    </>
  );
};

export default NominationList;
