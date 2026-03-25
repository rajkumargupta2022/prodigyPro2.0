import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import Navbar from "../../components/Navbar";
import { generateOptions } from "../re-used-html/select-box";
import { ContactRelationsEnum, UserGenderEnum, GuardianRelationEnum } from "../data/ucc-data";
import { useEffect, useState } from "react";
import { personalDetailForm, uccDataRes, uccDataResKeys, userDataObj } from "../data-interfaces/ucc";
import { getRequest, postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import { formatDateToUTCString, formatUTCToDateOnly } from "../../services/dates/dateFormater";

interface FormErrors {
  full_name?: string;
  email?: string;
  email_relation?: string;
  mobile?: string;
  mobile_relation?: string;
  dob?: string;
  gender?: string;
  occupation?: string;
  guardian_name?: string;
  guardian_relation?: string;
  guardian_pan?: string;
}

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
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if(!reference_id || !tax_status || !holding_nature){
      navigate("/dashboard");
      return;
    }
    if (pan) {
      fetchKycData(pan)
      console.log(isSubmitting)
    } 
  }, [])

  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      const profile = response.data[holder] as userDataObj;
      if (response.success && profile?.personal_details) {
        const personalDetails = profile.personal_details;
        setForm({
          ...personalDetails,
          dob: formatUTCToDateOnly(personalDetails.dob || ""),
        });
      }
    } catch (err) {
      errorToast(err);
    }
  }
  const fetchKycData = async (pan: string) => {
    try {
      const response = await getRequest<uccDataRes>(endPoints.getKycData + "?pan=" + pan);
      const profile = response.data[holder] as userDataObj;
      if (response.success && profile?.personal_details) {
        const personalDetails = profile.personal_details;
        setForm({
          ...personalDetails,
          dob: formatUTCToDateOnly(personalDetails.dob || ""),
        });
        if(!profile.personal_details?.full_name){
          fetchUccData()
        }
      }
    } catch (err) {
      console.log(err);
      fetchUccData()
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.full_name?.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (form.full_name.trim().length < 3) {
      newErrors.full_name = "Full name must be at least 3 characters.";
    }

    if (!form.email?.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.email_relation) {
      newErrors.email_relation = "Email relation is required.";
    }

    if (!form.mobile?.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!form.mobile_relation) {
      newErrors.mobile_relation = "Mobile relation is required.";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }

    // DOB Age Validation based on Tax Status
    if (form.dob) {
      const dobDate = new Date(form.dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }

      if (String(tax_status) === "2") {
        if (age >= 18) {
          newErrors.dob = "For minor status, age must be less than 18 years.";
        }
      } else {
        if (age < 18) {
          newErrors.dob = "For this tax status, age must be 18 years or more.";
        }
      }
    }

    // Guardian Fields Validation for Minor
    if (String(tax_status) === "2") {
      if (!form.guardian_name?.trim()) {
        newErrors.guardian_name = "Guardian name is required.";
      }
      if (!form.guardian_relation) {
        newErrors.guardian_relation = "Guardian relation is required.";
      }
      if (!form.guardian_pan?.trim()) {
        newErrors.guardian_pan = "Guardian PAN is required.";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.guardian_pan.toUpperCase())) {
        newErrors.guardian_pan = "Invalid PAN format.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveContinue = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload: any = {
        reference_id,
        tax_status,
        holding_nature,
        [holder]: {
          personal_details: {
            pan: pan,
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

      if (String(tax_status) === "2") {
        payload[holder].personal_details.guardian_name = form.guardian_name;
        payload[holder].personal_details.guardian_relation = form.guardian_relation;
        payload[holder].personal_details.guardian_pan = form.guardian_pan?.toUpperCase();
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

  const inputClass = (field: keyof FormErrors) =>
    `form-control${errors[field] ? " is-invalid" : ""}`;

  const selectClass = (field: keyof FormErrors) =>
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
                  />
                  {errors.guardian_name && (
                    <div className="invalid-feedback">{errors.guardian_name}</div>
                  )}
                </div>
              )}
            </div>

            {/* Minor Specific Fields: Guardian PAN & Relation */}
            {String(tax_status) === "2" && (
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
                  >
                    <option value="">Choose...</option>
                    {generateOptions(GuardianRelationEnum, "value", "label")}
                  </select>
                  {errors.guardian_relation && (
                    <div className="invalid-feedback">{errors.guardian_relation}</div>
                  )}
                </div>
              </div>
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
