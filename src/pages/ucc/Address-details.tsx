import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import Footer from "../../components/Footer";
import TrackBar from "./Track-bar";
import { generateOptions } from "../re-used-html/select-box";
import { StatevaluesEnum } from "../data/ucc-data";
import { addressDetailForm, pincodeDetailsRes, uccDataRes, uccDataResKeys, userDataObj } from "../data-interfaces/ucc";
import { endPoints } from "../../services/utils/urls";
import { getRequest, postRequest } from "../../services/Api/HandleApi";
import { errorToast } from "../../services/utils/toast";


const AddressDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;

  const [form, setForm] = useState<addressDetailForm>({});
  const [errors, setErrors] = useState<Partial<addressDetailForm>>({});

  useEffect(() => {
    if (pan) {
      fetchKycData(pan)
    } else if (reference_id) {
      fetchUccData()
    }
  }, [])

  const fetchKycData = async (pan: string) => {
    try {
      const response = await getRequest<uccDataRes>(endPoints.getKycData + "?pan=" + pan);
      const profile = response.data[holder] as userDataObj;
      const address_details = profile.address_details;

      if (response.success && address_details) {
        setForm({
          ...address_details
        });
      }
    } catch (err) {
      errorToast(err);
    }
  }

  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      const profile = response.data[holder] as userDataObj;
      const address_details = profile.address_details;

      if (response.success && address_details) {
        setForm({
          ...address_details
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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "pincode" && value.length === 6) {
      pinCodeDetails(value)
    }

    // clear error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const pinCodeDetails = async (pincode: string) => {
    if (pincode.length === 6) {
      try {
        const res = await postRequest<pincodeDetailsRes>(endPoints.getPincodeDetails, { pincode });
        if (res.data) {
          setForm({ ...form, state: res.data.state, country: res.data.country, pincode: res.data.pincode, city: res.data.district });
        }
      } catch (err) {

      }
    }
  }
  const validate = (): boolean => {
    const newErrors: Partial<addressDetailForm> = {};

    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Valid 6 digit pincode required";
    }

    if (!form.address_1?.trim()) {
      newErrors.address_1 = "Address is required";
    }

    if (!form.city) {
      newErrors.city = "City is required";
    }

    if (!form.state) {
      newErrors.state = "State is required";
    }

    if (!form.country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const payload = {
        reference_id,
        tax_status,
        holding_nature,
        [holder]: {
          address_details: {
            address_1: form.address_1,
            address_2: form.address_2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            country: form.country,
          }
        }
        ,
      };
      await postRequest(endPoints.tempSaveUcc, { data: payload });
      if (holding_nature == "AS" && holder === "third_user") {
        navigate(
          `/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
        );
      } else if (holding_nature == "AS" && holder === "secondary_user") {
        navigate(
          `/kyc-status-check?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
        );
      } else {
        navigate(`/bank-details-form?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`);
      }
    } catch (err) {
      errorToast(err);
    }
  };


  return (
    <>
      <NavBar />
      <TrackBar />

      <div className="container">
        <div className="personal_form_container">
          <h3 className="mb-3 text-dark fw-bolder">Address Details</h3>

          <form className="bg-white px-5 py-4 rounded-4 form_shadow">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">PINCODE</label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  value={form.pincode || ""}
                  onChange={handleChange}
                />
                {errors.pincode && (
                  <small className="text-danger">{errors.pincode}</small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fs12px">ADDRESS</label>
                <input
                  type="text"
                  name="address_1"
                  className="form-control"
                  value={form.address_1 || ""}
                  onChange={handleChange}
                />
                {errors.address_1 && (
                  <small className="text-danger">{errors.address_1}</small>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">LANDMARK(Optional)</label>
                <input
                  type="text"
                  name="address_2"
                  className="form-control"
                  value={form.address_2 || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fs12px">STATE</label>
                <select
                  name="state"
                  className="form-select"
                  value={form.state || ""}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  {generateOptions(StatevaluesEnum, "label", "label")}
                </select>
                {errors.state && (
                  <small className="text-danger">{errors.state}</small>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fs12px">CITY</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={form.city || ""}
                  onChange={handleChange}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fs12px">COUNTRY</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={form.country || ""}
                  onChange={handleChange}
                />
                {errors.country && (
                  <small className="text-danger">{errors.country}</small>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <NextBar onSaveContinue={handleSubmit} />
      <Footer />
    </>
  );
};

export default AddressDetails;