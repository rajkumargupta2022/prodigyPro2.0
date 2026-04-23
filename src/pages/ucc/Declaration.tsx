import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import { generateOptions } from "../re-used-html/select-box";
import { IncomeRangeEnum, OccupationEnum, WealthSourceEnum } from "../data/ucc-data";
import { fatchDeclarationsForm, uccDataRes, uccDataResKeys, userDataObj } from "../data-interfaces/ucc";
import { getRequest, postRequest, postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import { validateDeclarationForm } from "../validation/ucc-validation";

const Declaration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;

  const [form, setForm] = useState<fatchDeclarationsForm>({
    occupation: undefined,
    wealth_source: undefined,
    income_range: undefined,
    resident_status: 1, // default Indian
    no_politically_exposed: true,
    confirm_resident_indian: true,
    place_of_birth: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof fatchDeclarationsForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "place_of_birth") {
      setForm((prev) => ({ ...prev, [name]: value !== "" ? value : "" }));
    }
    else {
      setForm((prev) => ({ ...prev, [name]: value !== "" ? Number(value) : undefined }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleIncomeRange = (value: number) => {
    setForm((prev) => ({ ...prev, income_range: value }));
    setErrors((prev) => ({ ...prev, income_range: "" }));
  };



  useEffect(() => {
    if (!reference_id || !tax_status || !holding_nature || !pan) {
      navigate("/dashboard");
      return;
    }
    if (pan) {
      fetchKycData(pan)
    }
  }, [])

  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      const profile = response.data[holder] as userDataObj;
      const fatca_declarations = profile.fatca_declarations;

      if (response.success && fatca_declarations) {
        setForm({
          ...fatca_declarations
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
      const fatca_declarations = profile.fatca_declarations;

      if (response.success && fatca_declarations?.income_range && fatca_declarations.occupation && fatca_declarations.wealth_source) {
        setForm({
          ...fatca_declarations
        });
      } else {
        fetchUccData()
      }

    } catch (err) {
      fetchUccData()
    }
  }

  const handleSubmit = async () => {
    if (!validateDeclarationForm(form, setErrors)) return;

    try {
      const payload = {
        reference_id,
        tax_status,
        holding_nature,
        [holder]: {
          fatca_declarations: {
            occupation: form.occupation,
            wealth_source: form.wealth_source,
            income_range: form.income_range,
            resident_status: form.resident_status,
            no_politically_exposed: form.no_politically_exposed,
            confirm_resident_indian: form.confirm_resident_indian,
            place_of_birth: form.place_of_birth,
          },
        },
      };
      await postRequestSimple(endPoints.tempSaveUcc, { data: payload });
      navigate(
        `/address-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
      );
    } catch (err) {
      errorToast(err);
    } finally {
    }
  };

  return (
    <>
      <NavBar />
      <TrackBar />
      <div className="container">
        <div className="personal_form_container">
          <h5 className="mb-4">Declarations</h5>
          <form className="bg-white px-5 py-3 rounded-4 form_shadow">

            {/* Occupation & Source of Income */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-light text-secondary">
                  PLACE OF BIRTH
                </label>
                <input type="text" name="place_of_birth" value={form.place_of_birth} onChange={handleChange} className={`form-control ${errors.place_of_birth ? 'is-invalid' : ''}`} />
                {errors.place_of_birth && <div className="invalid-feedback">{errors.place_of_birth}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fs12px">OCCUPATION</label>
                <select
                  name="occupation"
                  value={form.occupation ?? ""}
                  onChange={handleChange}
                  className={`form-select${errors.occupation ? " is-invalid" : ""}`}
                >
                  <option value="">Choose...</option>
                  {generateOptions(OccupationEnum, "value", "label")}
                </select>
                {errors.occupation && <div className="invalid-feedback">{errors.occupation}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fs12px">SOURCE OF INCOME</label>
                <select
                  name="wealth_source"
                  value={form.wealth_source ?? ""}
                  onChange={handleChange}
                  className={`form-select${errors.wealth_source ? " is-invalid" : ""}`}
                >
                  <option value="">Choose...</option>
                  {generateOptions(WealthSourceEnum, "value", "label")}
                </select>
                {errors.wealth_source && <div className="invalid-feedback">{errors.wealth_source}</div>}
              </div>
            </div>

            {/* Income Range */}
            <div className="row mb-1">
              <div className="col-12">
                <small className="fs14px lightBlack">INCOME RANGE</small>
                <br />
                <div className="mt-1 d-flex flex-wrap gap-1">
                  {IncomeRangeEnum.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`btn riskProfileBtn${form.income_range === item.value ? " activeBtnIncome" : ""}`}
                      onClick={() => handleIncomeRange(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                {errors.income_range && (
                  <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                    {errors.income_range}
                  </div>
                )}
              </div>
            </div>

            {/* Resident Status */}
            <div className="row mb-1">
              <div className="col-md-6 ">
                <span className=" fs14px">RESIDENT STATUS</span>
                <br />
                <div className="mt-1">
                  {/* Fixed as Indian (resident_status: 1) */}
                  <button
                    type="button"
                    className="btn activeBtnIncome"
                  >
                    Indian
                  </button>
                </div>
              </div>
            </div>

            {/* Declarations / Checkboxes */}
            <div className="row mb-0">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className={`form-check-input custom-checkbox${errors.no_politically_exposed ? " is-invalid" : ""}`}
                  id="no_politically_exposed"
                  name="no_politically_exposed"
                  checked={form.no_politically_exposed ?? false}
                  onChange={handleChange}
                  style={{ borderRadius: "2.25em" }}
                />
                <label className="form-check-label mx-1" htmlFor="no_politically_exposed">
                  I hereby declare that I'm not a politically exposed person.
                </label>
                {errors.no_politically_exposed && (
                  <div className="text-danger" style={{ fontSize: "12px" }}>
                    {errors.no_politically_exposed}
                  </div>
                )}
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className={`form-check-input custom-checkbox${errors.confirm_resident_indian ? " is-invalid" : ""}`}
                  id="confirm_resident_indian"
                  name="confirm_resident_indian"
                  checked={form.confirm_resident_indian ?? false}
                  onChange={handleChange}
                  style={{ borderRadius: "2.25em" }}
                />
                <label className="form-check-label mx-1" htmlFor="confirm_resident_indian">
                  I'm not the Tax Payer of any other country other than India.
                </label>
                {errors.confirm_resident_indian && (
                  <div className="text-danger" style={{ fontSize: "12px" }}>
                    {errors.confirm_resident_indian}
                  </div>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>
      <NextBar onSaveContinue={handleSubmit} />
    </>
  );
};

export default Declaration;
