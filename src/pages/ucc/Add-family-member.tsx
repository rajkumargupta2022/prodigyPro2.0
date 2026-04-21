import { ArrowLeft } from "react-bootstrap-icons";
import OTPField from "../../components/OtpField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { addFamilyRes, familyRelationKeys, familyRelationRes } from "../data-interfaces/users";
import { errorToast } from "../../services/utils/toast";
import { generateOptions } from "../re-used-html/select-box";
import { HoldingNatureEnum, TaxStatusEnum } from "../data/ucc-data";

function AddFamilyMember() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState<number>(0)
  const [requestId, setRequestId] = useState<string>("")
  const [memberPan, setMemberPan] = useState<string>("")
  const [familyRelationList, setFamilyRelationList] = useState<familyRelationKeys[]>([])
  const [mobile, setMobile] = useState<string>("")
  const [holdingNature, setHoldingNature] = useState<string>("SI")
  const [taxStatus, setTaxStatus] = useState<string>("2")
  // const accountState = "link";
  const [accountState, setAccountState] = useState<string>("")

  useEffect(() => {
    fetchRelation()
  }, [])

  const fetchRelation = async () => {
    try {
      const res = await getRequest<familyRelationRes>(endPoints.getFamilyRelations)
      if (res.success) {
        setFamilyRelationList(res.data)
      }
    } catch (err) {
      setFamilyRelationList([])
    }
  }
  const panHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim()
    if (value.length <= 10) {
      setMemberPan(value.toUpperCase())
    }
  }

  const addFamilyMember = async () => {
    if (!selectedRelation) {
      errorToast("Plaese select Relation")
      return
    }
    if (!memberPan) {
      errorToast("Plaese enter pan")
      return
    }
    try {
      const admin_pan = localStorage.getItem("pan")
      if (!admin_pan) {
        errorToast("Please login firrst")
        return
      }
      const reqBody = {
        family_code: selectedRelation,
        admin_pan,
        member_pan: memberPan
      }
      const res = await postRequest<addFamilyRes>(endPoints.addFamilyMember, reqBody)
      if (res.success && res.request_id) {
        localStorage.setItem("request_id", res?.request_id)
        setRequestId(res?.request_id)
        setMobile(res.mobile)
        setShow(true)
      }
      else {
        errorToast(res.msg)
      }
    } catch (err) {
      errorToast(err)
    }
  }

  const handleHolding = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setHoldingNature(value)
  }

  const handleTaxStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setTaxStatus(value)
    if (value === "2" && holdingNature === "AS") {
      setHoldingNature("")
    }
  }
  const proceddForKyc = async () => {
    if (!holdingNature) {
      errorToast("Plaese select holding nature")
      return
    }
    if (!taxStatus) {
      errorToast("Plaese select tax status")
      return
    }

    if (holdingNature === "SI") {
      navigate(`/pan-verification?tax_status=${taxStatus}&holding_nature=${holdingNature}`)
    } else {
      navigate(`/kyc-status-check?tax_status=${taxStatus}&holding_nature=${holdingNature}`)
    }
  }
  return (
    <>
      <OTPField show={show} setShow={setShow} requestId={requestId} mobile={mobile} />
      <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
        <h4 onClick={() => navigate(-1)}>
          <ArrowLeft className="crPointer" /> Add
          Family Member
        </h4>
        <hr className="fw-light text-secondary" />
        <div className="p-4 shadow-sm bg-white border-0 rounded-4">
          <div className="d-flex">
            <button type="button" className={`btn statementBtn ${accountState == "link" && "statementBtnActive"} mx-1`} onClick={() => setAccountState("link")}>Link Account</button>


            <button type="button" className={`btn statementBtn ${accountState == "" && "statementBtnActive"} mx-1`} onClick={() => setAccountState("")}>Create Account</button>
          </div>

          {accountState == "link" ? (
            <div className="mt-2">
              <div className="form-group">
                <label className="fs12px" htmlFor="relationship">
                  RELATIONSHIP
                </label>
                <select className="form-control" value={selectedRelation} id="relationship" onChange={(e) => setSelectedRelation(Number(e.target.value))}>
                  <option value={0} >Select Relation...</option>
                  {familyRelationList?.length > 0 && familyRelationList?.map((item, i) => {
                    return <option value={item.relation_code} key={i}>{item.relation}</option>
                  })}
                </select>
              </div>

              <div className="mt-2">
                <label className="fs12px" htmlFor="pan-number">
                  PAN NUMBER
                </label>
                <input
                  id="pan-number"
                  className="form-control "
                  type="text"
                  placeholder="Enter Pan"
                  value={memberPan}
                  onChange={panHandler}
                />
              </div>

              <button
                type="button"
                className="customButton align-items-end px-3 mb-3 mt-3"
                onClick={addFamilyMember}
              >
                Verify Account
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <div className="form-group">
                <label
                  className="fs12px"
                  htmlFor="exampleFormControlSelect1"
                >
                  TAX STATUS
                </label>
                <select className="form-control" id="exampleFormControlSelect1" value={taxStatus} onChange={handleTaxStatus}>
                  <option value="">Select...</option>
                  {generateOptions(TaxStatusEnum, "value", "label")}
                </select>
              </div>

              <div className="form-group mt-2">
                <label
                  className="fs12px"
                  htmlFor="exampleFormControlSelect1"
                >
                  HOLDING NATURE
                </label>
                <select className="form-control" id="exampleFormControlSelect1" value={holdingNature} onChange={handleHolding}>
                  <option value="">Select...</option>
                  {HoldingNatureEnum.map((item) => (
                    <option key={item.value} value={item.value} disabled={(taxStatus === "2" && item.value === "AS") || (taxStatus === "1" && item.value === "SI")}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="customButton align-items-end px-2 mb-3 mt-3"
                onClick={proceddForKyc}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
        {!accountState && (
          <div className="mt-2">
            <h6>Note:</h6>
            <p className="fs14px">Please be ready with these documents before creation of
              Minor's profile to mention the bank account details and upload the
              bank and birth proof-
            </p>
            <p className="fs14px">
              1. Bank Account should be in the name of Minor it can either be
              Jointly or under the guardianship of the same person as you have
              selected in profile.
            </p>
            <p className="fs14px">2. Guardian name must be there in the birthproof.</p>
          </div>
        )}
      </main>
    </>
  );
}

export default AddFamilyMember;
