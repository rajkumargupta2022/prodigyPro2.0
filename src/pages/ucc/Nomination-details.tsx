import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import { generateOptions } from "../re-used-html/select-box";
import {  NomineeRelationEnum, StatevaluesEnum } from "../data/ucc-data";
import { useEffect, useState } from "react";
import { endPoints } from "../../services/utils/urls";
import { postRequest } from "../../services/Api/HandleApi";
import { errorToast, successToast } from "../../services/utils/toast";
import { nomineeDetailForm, pincodeDetailsRes, uccDataRes, uccDataResKeys } from "../data-interfaces/ucc";
import { formatDateToUTCString, formatUTCToDateOnly } from "../../services/dates/dateFormater";

const NominationDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;
  const edit_index = searchParams.get("edit_index");
  const [nomineeList, setNomineeList] = useState<nomineeDetailForm[]>([]);
  const formKeys = {
    nominee_name: "",
    nominee_email: "",
    nominee_mobile: "",
    nominee_dob: "",
    nominee_relation: "",
    nominee_pan: "",
    nominee_allocation: 100,
    is_nominee_minor: false,
    nominee_guardian_name: "",
    nominee_guardian_pan: "",
    nominee_address: {
      pincode: "",
      address_1: "",
      city: "",
      state: "",
      country: "",
    }
  } as nomineeDetailForm;
  const [form, setForm] = useState<nomineeDetailForm>(formKeys);

  const [errors, setErrors] = useState<any>({});

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
        if (edit_index !== null) {
          const index = parseInt(edit_index);
          let nomineeData = response.data.nominees[index];
          if (!isNaN(index) && nomineeData) {
            setForm({
              ...nomineeData,
              nominee_dob: formatUTCToDateOnly(nomineeData.nominee_dob || ""),
            });
          }
        }
      }
    } catch (err) {
      errorToast(err);
    }
  }

  const pinCodeDetails = async (pincode: string) => {
    if (pincode.length === 6) {
      try {
        const res = await postRequest<pincodeDetailsRes>(endPoints.getPincodeDetails, { pincode });
        if (res.data) {
          setForm((prev) => ({
            ...prev,
            nominee_address: {
              ...prev.nominee_address,
              state: getStateCode(res.data.state),
              country: res.data.country,
              pincode: res.data.pincode,
              city: res.data.district
            }
          }));
        }
      } catch (err) {
        errorToast("Please enter a valid pincode")
      }
    }
  }
const getStateCode = (name:string) =>
  StatevaluesEnum.find(s => s.label === name)?.value;

  const calculateAge = (dobString: string) => {
    if (!dobString) return 0;
    const today = new Date();
    const dob = new Date(dobString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address_")) {
      const fieldName = name.replace("address_", "");
      const newAddressValue = value;
      setForm((prev) => ({
        ...prev,
        nominee_address: {
          ...prev.nominee_address,
          [fieldName]: newAddressValue
        }
      }));

      if (fieldName === "pincode" && newAddressValue.length === 6) {
        pinCodeDetails(newAddressValue);
      }
    } else {
      setForm((prev) => {
        const newValue = (name === "nominee_pan" || name === "nominee_guardian_pan") ? value.toUpperCase() : value;
        const newForm = { ...prev, [name]: newValue };
        if (name === "nominee_dob") {
          const age = calculateAge(value);
          newForm.is_nominee_minor = age < 18;
          if (newForm.is_nominee_minor) {
            newForm.nominee_pan = "";
          } else {
            newForm.nominee_guardian_name = "";
            newForm.nominee_guardian_pan = "";
          }
        }
        return newForm;
      });
    }
    setErrors((prev: any) => ({ ...prev, [name]: undefined, ...(name.startsWith("address_") && { [`address_${name.replace("address_", "")}`]: undefined }) }));
  };

  const handleAddNominee = async () => {

    const newErrors: any = {};
    if (!form.nominee_name?.trim()) newErrors.nominee_name = "Required";
    if (!form.nominee_email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.nominee_email)) {
      newErrors.nominee_email = "Valid email required";
    }
    if (!form.nominee_mobile?.trim() || !/^[6-9]\d{9}$/.test(form.nominee_mobile)) {
      newErrors.nominee_mobile = "Valid mobile required";
    }
    if (!form.nominee_dob) newErrors.nominee_dob = "Required";
    if (!form.nominee_relation) newErrors.nominee_relation = "Required";
    if (!form.nominee_allocation || form.nominee_allocation <= 0) newErrors.nominee_allocation = "Required";

    if (form.is_nominee_minor) {
      if (!form.nominee_guardian_name?.trim()) newErrors.nominee_guardian_name = "Required";
      if (!form.nominee_guardian_pan?.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.nominee_guardian_pan.toUpperCase())) {
        newErrors.nominee_guardian_pan = "Valid PAN required";
      }
    } else {
      if (!form.nominee_pan?.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.nominee_pan.toUpperCase())) {
        newErrors.nominee_pan = "Valid PAN required";
      }
    }

    if (!form.nominee_address?.pincode?.trim()) newErrors.address_pincode = "Required";
    if (!form.nominee_address?.address_1?.trim()) newErrors.address_address_1 = "Required";
    if (!form.nominee_address?.city?.trim()) newErrors.address_city = "Required";
    if (!form.nominee_address?.state?.trim()) newErrors.address_state = "Required";
    if (!form.nominee_address?.country?.trim()) newErrors.address_country = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const totalAllocation = getTotalAllocation();
    if (totalAllocation > 100) {
      errorToast("Total allocation percentage cannot exceed 100%");
      return;
    }
    const updatedNomineeList = nomineeList.length > 0 ? [...nomineeList] : [];
    const payloadNominee: any = {
      ...form,
      nominee_guardian_name: form.is_nominee_minor ? form.nominee_guardian_name : undefined,
      nominee_guardian_pan: form.is_nominee_minor ? form.nominee_guardian_pan : undefined,
      nominee_pan: !form.is_nominee_minor ? form.nominee_pan : undefined,
      nominee_dob: formatDateToUTCString(form.nominee_dob || ""),
      nominee_allocation: Number(form.nominee_allocation),
      nominee_relation: Number(form.nominee_relation)
    };

    if (edit_index !== null) {
      const index = parseInt(edit_index);
      if (!isNaN(index)) {
        updatedNomineeList[index] = payloadNominee;
      }
    } else {
      updatedNomineeList.push(payloadNominee);
    }

    const payload = {
      reference_id,
      tax_status,
      holding_nature,
      nominees: updatedNomineeList
    };
    const res: any = await postRequest(endPoints.tempSaveUcc, { data: payload });
    if (res.success) {
      successToast(edit_index !== null ? "Nominee updated successfully" : "Nominee added successfully");
      setForm(formKeys);
      if(edit_index !== null) {
              navigate(`/nomination-list?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`);

      }
    }
  };
  const getTotalAllocation = (): number => {
    const editIndex = edit_index !== null ? parseInt(edit_index) : -1;
    const total = nomineeList.reduce((sum, nominee, index) => {
      if (index === editIndex) return sum;
      return Number(sum) + (Number(nominee.nominee_allocation) ?? 0);
    }, 0);
    return total + (Number(form.nominee_allocation) ?? 0);
  }
  const goOnNomineeList = () => {
    const totalAllocation = getTotalAllocation();
    if (totalAllocation >= 100) {
      navigate(
        `/nomination-list?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
      );
    }
  }


  return (
    <>
      <NavBar />
      <TrackBar />
      <div className="container pt-4 mb-5">
        <div className="personal_form_container ">
          <h3 className="mb-4 text-dark fw-bolder">Nomination Details</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  NAME
                </label>
                <input type="text" name="nominee_name" value={form.nominee_name} onChange={handleChange} className={`form-control ${errors.nominee_name ? 'is-invalid' : ''}`} />
                {errors.nominee_name && <div className="invalid-feedback">{errors.nominee_name}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  NOMINEE EMAIL
                </label>
                <input type="text" name="nominee_email" value={form.nominee_email} onChange={handleChange} className={`form-control ${errors.nominee_email ? 'is-invalid' : ''}`} />
                {errors.nominee_email && <div className="invalid-feedback">{errors.nominee_email}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  NOMINEE MOBILE
                </label>
                <input type="text" name="nominee_mobile" value={form.nominee_mobile} onChange={handleChange} maxLength={10} className={`form-control ${errors.nominee_mobile ? 'is-invalid' : ''}`} />
                {errors.nominee_mobile && <div className="invalid-feedback">{errors.nominee_mobile}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  DATE OF BIRTH
                </label>
                <input type="date" name="nominee_dob" value={form.nominee_dob} onChange={handleChange} max={new Date().toISOString().split("T")[0]} className={`form-control ${errors.nominee_dob ? 'is-invalid' : ''}`} />
                {errors.nominee_dob && <div className="invalid-feedback">{errors.nominee_dob}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  RELATIONSHIP
                </label>
                <select name="nominee_relation" value={form.nominee_relation} onChange={handleChange} className={`form-select ${errors.nominee_relation ? 'is-invalid' : ''}`}>
                  <option value="">Choose...</option>
                  {generateOptions(NomineeRelationEnum, "value", "label")}
                </select>
                {errors.nominee_relation && <div className="invalid-feedback">{errors.nominee_relation}</div>}
              </div>

              {form.is_nominee_minor ? (
                <>
                  <div className="col-md-6">
                    <label className="form-label fw-light text-secondary">
                      GUARDIAN NAME
                    </label>
                    <input type="text" name="nominee_guardian_name" value={form.nominee_guardian_name} onChange={handleChange} className={`form-control ${errors.nominee_guardian_name ? 'is-invalid' : ''}`} />
                    {errors.nominee_guardian_name && <div className="invalid-feedback">{errors.nominee_guardian_name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-light text-secondary">
                      GUARDIAN PAN
                    </label>
                    <input type="text" name="nominee_guardian_pan" value={form.nominee_guardian_pan} onChange={handleChange} className={`form-control ${errors.nominee_guardian_pan ? 'is-invalid' : ''}`} style={{ textTransform: 'uppercase' }} />
                    {errors.nominee_guardian_pan && <div className="invalid-feedback">{errors.nominee_guardian_pan}</div>}
                  </div>
                </>
              ) : (
                <div className="col-md-6">
                  <label className="form-label fw-light text-secondary">
                    NOMINEE PAN
                  </label>
                  <input type="text" name="nominee_pan" value={form.nominee_pan} onChange={handleChange} className={`form-control ${errors.nominee_pan ? 'is-invalid' : ''}`} style={{ textTransform: 'uppercase' }} />
                  {errors.nominee_pan && <div className="invalid-feedback">{errors.nominee_pan}</div>}
                </div>
              )}

              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  ALLOCATION PERCENTAGE
                </label>
                <input type="number" name="nominee_allocation" value={form.nominee_allocation} onChange={handleChange} className={`form-control ${errors.nominee_allocation ? 'is-invalid' : ''}`} />
                {errors.nominee_allocation && <div className="invalid-feedback">{errors.nominee_allocation}</div>}
              </div>

              <h6 className="mt-2">Nominee Address</h6>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-light text-secondary">
                    PINCODE
                  </label>
                  <input type="text" name="address_pincode" value={form.nominee_address?.pincode} onChange={handleChange} className={`form-control ${errors.address_pincode ? 'is-invalid' : ''}`} />
                  {errors.address_pincode && <div className="invalid-feedback">{errors.address_pincode}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-light text-secondary">
                    ADDRESS
                  </label>
                  <input type="text" name="address_address_1" value={form.nominee_address?.address_1} onChange={handleChange} className={`form-control ${errors.address_address_1 ? 'is-invalid' : ''}`} />
                  {errors.address_address_1 && <div className="invalid-feedback">{errors.address_address_1}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-light text-secondary">
                    CITY
                  </label>
                  <input type="text" name="address_city" value={form.nominee_address?.city} className={`form-control ${errors.address_city ? 'is-invalid' : ''}`} />
                  {errors.address_city && <div className="invalid-feedback">{errors.address_city}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-light text-secondary">
                    STATE
                  </label>
                  <input type="text" name="address_state" value={form.nominee_address?.state} className={`form-control ${errors.address_state ? 'is-invalid' : ''}`} />
                  {errors.address_state && <div className="invalid-feedback">{errors.address_state}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-light text-secondary">
                    COUNTRY
                  </label>
                  <input type="text" name="address_country" value={form.nominee_address?.country} className={`form-control ${errors.address_country ? 'is-invalid' : ''}`} />
                  {errors.address_country && <div className="invalid-feedback">{errors.address_country}</div>}
                </div>
              </div>
            </div>



            {/* Country & State */}

            <div className="row  mb-3">
              <div className="col-md-6">
                <button type="button" className="customButton px-2" onClick={handleAddNominee}>
                  {edit_index !== null ? "Update Nominee" : "+ Add Nominee"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar onSaveContinue={goOnNomineeList} />
    </>
  );
};

export default NominationDetails;
