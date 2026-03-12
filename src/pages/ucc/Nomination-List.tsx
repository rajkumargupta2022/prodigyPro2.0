import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import { Card } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import NomineeModal from "../../components/Nominee-Modal";
import { nomineeDetailForm, uccDataRes, uccDataResKeys } from "../data-interfaces/ucc";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import TrackBar from "./Track-bar";

const NominationList = () => {
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
      if (response.success && (response.data?.nominees?.length ?? 0 > 0)) {
        setNomineeList(response.data?.nominees ?? []);
      }
    } catch (err) {
      errorToast(err);
    }
  }
  return (
    <>
      <NavBar />
      <NomineeModal toggle={true} />
      <TrackBar />
      <div className="container pt-5">
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">List of Nominee(s)</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">

            {nomineeList.length > 0 ? nomineeList.map((nominee: nomineeDetailForm, index: number) =>
              <Card className="d-flex align-items-center p-3 border-0 shadow-sm rounded-3 mt-2">
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
                      {nominee.nominee_dob ?? ""} • {nominee.nominee_relation ?? ""} • Allocation: {nominee.nominee_allocation ?? ""}%
                    </small>
                  </div>

                  {/* Menu Icon */}
                  <ThreeDotsVertical size={20} className="text-muted" />
                </div>
              </Card>
            ) : "No nominee added yet"}

            <div className="logoBlueColor mt-2 crPointer" >+ Add New</div>

          </form>
        </div>
      </div>
      <NextBar onSaveContinue={() => { }} />
    </>
  );
};

export default NominationList;
