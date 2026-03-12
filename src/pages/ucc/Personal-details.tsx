import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import Navbar from "../../components/Navbar";
import { generateOptions } from "../re-used-html/select-box";
import { ContactRelationsEnum, UserGenderEnum } from "../data/ucc-data";
import { useEffect, useState } from "react";
import { personalDetailForm, uccDataRes, uccDataResKeys, userDataObj } from "../data-interfaces/ucc";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast, successToast } from "../../services/utils/toast";
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
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (reference_id) {

      fetchUccData()
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

    if (!form.dob) {
      newErrors.dob = "Date of birth is required.";
    } else {
      const dob = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob >= today) newErrors.dob = "Date of birth must be in the past.";
      else if (age > 120) newErrors.dob = "Please enter a valid date of birth.";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveContinue = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload = {
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
        ,
      };
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
      <div className="container mt-2">
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

            {/* Row 4: Gender & Occupation */}
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

            </div>
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
