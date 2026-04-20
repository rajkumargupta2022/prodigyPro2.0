import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import Navbar from "../../components/Navbar";
import { generateOptions } from "../re-used-html/select-box";
import { ContactRelationsEnum, UserGenderEnum, GuardianRelationEnum, taxStatus } from "../data/ucc-data";
import { useEffect, useState } from "react";
import { personalDetailForm, personalFormErrors, uccDataRes, uccDataResKeys, userDataObj } from "../data-interfaces/ucc";
import { getRequest, postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import { formatDateToUTCString, formatUTCToDateOnly } from "../../services/dates/dateFormater";
import { validatePersonalForm } from "../validation/ucc-validation";



const PersonalDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;


  const [form, setForm] = useState<personalDetailForm>({
    full_name: "",
    email: "",
    email_relation: "",
    mobile: "",
    mobile_relation: "",
    dob: "",
    gender: "",
    guardian_name: "",
    guardian_relation: "",
    guardian_pan: "",
    guardian_dob: "",
    pan: "",

  });

  const [errors, setErrors] = useState<personalFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    if (!reference_id || !tax_status || !holding_nature) {
      navigate("/dashboard");
      return;
    }
    if (pan) {
      fetchKycData(pan)
      console.log(isSubmitting)
    }
  }, [])


  const fetchKycData = async (pan: string) => {
    try {
      const response = await getRequest<uccDataRes>(endPoints.getKycData + "?pan=" + pan);
      const profile = response.data[holder] as userDataObj;
      if (response.success && profile?.personal_details) {
        const personalDetails = profile.personal_details;
        if (tax_status === taxStatus.ON_BEHALF_OF_MINOR) {
          setForm(prev => ({
            ...prev,
            pan: "",
            email_relation: personalDetails.email_relation || "",
            guardian_relation: "6",
            mobile_relation: personalDetails.mobile_relation || "",
            gender: personalDetails.gender || "",
            guardian_name: personalDetails.full_name || "",
            guardian_pan: pan,
            guardian_dob: formatUTCToDateOnly(personalDetails.dob || ""),
          }));
        } else {
          setIsInputDisabled(true)
          setForm({
            ...personalDetails,
            dob: formatUTCToDateOnly(personalDetails.dob || ""),
          });
        }
      }
    } catch (err) {
      fetchUccData()
    }
  }
  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      const profile = response.data[holder] as userDataObj;
      if (response.success && profile?.personal_details) {
        const personalDetails = profile.personal_details;
        if (tax_status === taxStatus.ON_BEHALF_OF_MINOR) {
          setForm({
            ...personalDetails,
            pan: "",
            dob: formatUTCToDateOnly(personalDetails.dob || ""),
            guardian_dob: formatUTCToDateOnly(personalDetails.guardian_dob || ""),
          });
        } else {
          // setIsInputDisabled(true)
          setForm({
            ...personalDetails,
            dob: formatUTCToDateOnly(personalDetails.dob || ""),
          });
        }
      }
    } catch (err) {
      errorToast(err);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };



  const handleSaveContinue = async () => {
    if (!validatePersonalForm(form, tax_status, setErrors)) return;

    try {
      setIsSubmitting(true);
      const payload: any = {
        reference_id,
        tax_status,
        holding_nature,
        nominee_opt_out: false,
        [holder]: {
          personal_details: {
            pan: form?.pan,
            mobile_verified: true,
            email_verified: true,
            full_name: form.full_name,
            email: form.email,
            email_relation: form.email_relation,
            mobile: form.mobile,
            mobile_relation: form.mobile_relation,
            dob: formatDateToUTCString(form.dob || ""),
            gender: form.gender,
          }
        }
      };

      if (String(tax_status) === taxStatus.ON_BEHALF_OF_MINOR) {
        payload[holder].personal_details.guardian_name = form.guardian_name;
        payload[holder].personal_details.guardian_relation = form.guardian_relation;
        payload[holder].personal_details.guardian_pan = form.guardian_pan?.toUpperCase();
        payload[holder].personal_details.guardian_dob = formatDateToUTCString(form.guardian_dob || "");
      }

      await postRequest(endPoints.tempSaveUcc, { data: payload });
      navigate(
        `/declaration?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
      );
    } catch (err) {
      errorToast(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof personalFormErrors) =>
    `form-control${errors[field] ? " is-invalid" : ""}`;

  const selectClass = (field: keyof personalFormErrors) =>
    `form-select${errors[field] ? " is-invalid" : ""}`;

  return (
    <>
      <Navbar />
      <TrackBar />
      <div className="container mt-2 mb-5">
        <div className="personal_form_container">
          <h4 className="my-4">Personal Details</h4>
          <form
            className="bg-white px-5 py-4 rounded-4 form_shadow"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveContinue();
            }}
          >
            {/* Row 1: Full Name & Email */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">FULL NAME</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className={inputClass("full_name")}
                  placeholder=""
                  disabled={isInputDisabled}
                />
                {errors.full_name && (
                  <div className="invalid-feedback">{errors.full_name}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder=""
                  disabled={isInputDisabled}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Row 2: Email Relation & Mobile */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">EMAIL RELATION</label>
                <select
                  name="email_relation"
                  value={form.email_relation}
                  onChange={handleChange}
                  className={selectClass("email_relation")}
                  disabled={isInputDisabled}
                >
                  <option value="">Choose...</option>
                  {generateOptions(ContactRelationsEnum, "value", "label")}
                </select>
                {errors.email_relation && (
                  <div className="invalid-feedback">{errors.email_relation}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">MOBILE NO</label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  className={inputClass("mobile")}
                  disabled={isInputDisabled}
                  placeholder=""
                />
                {errors.mobile && (
                  <div className="invalid-feedback">{errors.mobile}</div>
                )}
              </div>
            </div>

            {/* Row 3: Mobile Relation & DOB */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">MOBILE RELATION</label>
                <select
                  name="mobile_relation"
                  value={form.mobile_relation}
                  onChange={handleChange}
                  className={selectClass("mobile_relation")}
                  disabled={isInputDisabled}
                >
                  <option value="">Choose...</option>
                  {generateOptions(ContactRelationsEnum, "value", "label")}
                </select>
                {errors.mobile_relation && (
                  <div className="invalid-feedback">
                    {errors.mobile_relation}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">DATE OF BIRTH</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={inputClass("dob")}
                  disabled={isInputDisabled}
                />
                {errors.dob && (
                  <div className="invalid-feedback">{errors.dob}</div>
                )}
              </div>
            </div>

            {/* Row 4: Gender & Guardian Info (Conditional) */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">GENDER</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={selectClass("gender")}
                  disabled={isInputDisabled}
                >
                  <option value="">Choose...</option>
                  {generateOptions(UserGenderEnum, "value", "label")}
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>
              {String(tax_status) === "2" && (
                <div className="col-md-6">
                  <label className="form-label fs12px">GUARDIAN NAME</label>
                  <input
                    type="text"
                    name="guardian_name"
                    value={form.guardian_name}
                    onChange={handleChange}
                    className={inputClass("guardian_name")}
                    placeholder=""
                    disabled={isInputDisabled}
                  />
                  {errors.guardian_name && (
                    <div className="invalid-feedback">{errors.guardian_name}</div>
                  )}
                </div>
              )}
            </div>

            {/* Minor Specific Fields: Guardian PAN & Relation */}
            {String(tax_status) === "2" && (
              <>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fs12px">GUARDIAN PAN</label>
                    <input
                      type="text"
                      name="guardian_pan"
                      value={form.guardian_pan}
                      onChange={handleChange}
                      maxLength={10}
                      className={inputClass("guardian_pan")}
                      placeholder=""
                      disabled={isInputDisabled}
                    />
                    {errors.guardian_pan && (
                      <div className="invalid-feedback">{errors.guardian_pan}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs12px">GUARDIAN RELATION</label>
                    <select
                      name="guardian_relation"
                      value={form.guardian_relation}
                      onChange={handleChange}
                      className={selectClass("guardian_relation")}
                      disabled={isInputDisabled}
                    >
                      <option value="">Choose...</option>
                      {generateOptions(GuardianRelationEnum, "value", "label")}
                    </select>
                    {errors.guardian_relation && (
                      <div className="invalid-feedback">{errors.guardian_relation}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fs12px">GUARDIAN DOB</label>
                    <input
                      type="date"
                      name="guardian_dob"
                      value={form.guardian_dob}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
                      className={inputClass("guardian_dob")}
                      disabled={isInputDisabled}
                    />
                    {errors.guardian_dob && (
                      <div className="invalid-feedback">{errors.guardian_dob}</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <Footer
        onSaveContinue={handleSaveContinue}
      />
    </>
  );
};

export default PersonalDetails;
