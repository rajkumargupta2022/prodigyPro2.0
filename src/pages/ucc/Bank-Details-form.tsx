import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import { bankDetailForm, bankNameRes, uccDataRes, uccDataResKeys } from "../data-interfaces/ucc";
import { useEffect, useState } from "react";
import { getRequest, getRequestSimple, postRequest, postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import { varifyBankRes } from "../data-interfaces/bank-and-mandate";
import CheckUpload from "./Check-upload";
import { taxStatus } from "../data/ucc-data";

const BankDetailForm = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;

  const [errors, setErrors] = useState<any>({});

  const [bankDetailForm, setBankDetailForm] = useState<bankDetailForm>({
    bank_name: "",
    bank_ifsc: "",
    bank_branch: "",
    bank_account_type: "SB",
    bank_account_number: "",
    is_bank_verified: false,
  });

  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [accountHidden, setAccountHidden] = useState(false);
  const [holderName, setHolderName] = useState<string>("")
  const [showCheckUpload, setShowCheckUpload] = useState<boolean>(false)

  useEffect(() => {
    if (!reference_id || !tax_status || !holding_nature || !pan) {
      navigate("/dashboard");
      return;
    }
    if (pan) {
      fetchKycData(pan)
    }
  }, [])

  const fetchKycData = async (pan: string) => {
    try {
      const response = await getRequest<uccDataRes>(endPoints.getKycData + "?pan=" + pan);
      const data = response.data?.bank_details;
      if (response.success && data) {
        const holderData = response.data?.primary_user?.personal_details
        setHolderName(response.data?.tax_status === taxStatus.ON_BEHALF_OF_MINOR ? holderData?.guardian_name ?? "" : holderData?.full_name ?? "")
        setBankDetailForm({
          ...data
        });
        setConfirmAccountNumber(data.bank_account_number ?? "");

      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // When user edits account number, reveal it again
    if (name === "bank_account_number") {
      setAccountHidden(false);
    }

    const updatedValue = name === "bank_ifsc" ? value.toUpperCase() : value;

    setBankDetailForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "bank_ifsc" && updatedValue.length === 11) {
      fetchBankName(updatedValue);
    }
  };

  const handleConfirmAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hide account number field as soon as confirm starts
    if (!accountHidden) setAccountHidden(true);
    setConfirmAccountNumber(e.target.value);

    setErrors((prev: any) => ({
      ...prev,
      bank_account_number_confirm: "",
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Account Number — required, digits only, 9–18 chars
    if (!bankDetailForm.bank_account_number?.trim()) {
      newErrors.bank_account_number = "Account number is required";
    } else if (!/^\d{9,18}$/.test(bankDetailForm.bank_account_number)) {
      newErrors.bank_account_number = "Enter a valid account number (9–18 digits, numbers only)";
    }

    // Confirm Account Number — required + must match
    if (!confirmAccountNumber.trim()) {
      newErrors.bank_account_number_confirm = "Please re-enter account number";
    } else if (confirmAccountNumber !== bankDetailForm.bank_account_number) {
      newErrors.bank_account_number_confirm = "Account numbers do not match";
    }

    // Account Type
    if (!bankDetailForm.bank_account_type) {
      newErrors.bank_account_type = "Please select an account type";
    }

    // IFSC — required, valid 11-char format, bank must be fetched
    if (!bankDetailForm.bank_ifsc?.trim()) {
      newErrors.bank_ifsc = "IFSC code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetailForm.bank_ifsc)) {
      newErrors.bank_ifsc = "Enter a valid 11-character IFSC code (e.g. KKBK0005197)";
    } else if (!bankDetailForm.bank_name) {
      newErrors.bank_ifsc = "Bank details not fetched yet. Please wait or re-enter IFSC";
    }

    // Bank name (auto-filled by IFSC API)
    if (!bankDetailForm.bank_name?.trim()) {
      newErrors.bank_name = "Bank not found. Check your IFSC code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchBankName = async (ifsc: string) => {
    try {
      const response = await getRequestSimple<bankNameRes>(
        `${endPoints.fetchBankByIfsc}?ifsc_code=${ifsc}`
      );

      if (response.success) {
        setBankDetailForm((prev) => ({
          ...prev,
          bank_name: response.bank_name,
          bank_branch: response.branch_name,
          is_bank_verified: true,
        }));
      } else {
        setBankDetailForm((prev) => ({
          ...prev,
          bank_name: "",
          bank_branch: "",
          is_bank_verified: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching bank name:", error);
    }
  };

  const varifyBank = async () => {
    try {
      //   setShowCheckUpload(true)
      //  return false
      const reqBody = {
        beneficiaryAccount: bankDetailForm?.bank_account_number ?? "",
        beneficiaryIFSC: bankDetailForm?.bank_ifsc ?? "",
        beneficiaryName: holderName
      }
      const res = await postRequest<varifyBankRes>(endPoints.verifyBank, reqBody)
      if (res.data.nameMatchScore === 100 || bankDetailForm?.is_bank_verified) {
        handleSubmit()

      } else if (res.data.nameMatchScore < 100) {
        setShowCheckUpload(true)

      }
    } catch (err) {
      errorToast("Something went wrong")

    }


  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        reference_id,
        tax_status,
        holding_nature,
        bank_details: {
          bank_name: bankDetailForm.bank_name,
          bank_ifsc: bankDetailForm.bank_ifsc,
          bank_branch: bankDetailForm.bank_branch,
          bank_account_type: bankDetailForm.bank_account_type,
          bank_account_number: bankDetailForm.bank_account_number,
          is_bank_verified: true,
        },
      };

      await postRequest(endPoints.tempSaveUcc, { data: payload });
      navigate(
        `/mandate-amount?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
      );
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <>
      <NavBar />
      <CheckUpload show={showCheckUpload} setShow={setShowCheckUpload} handleSubmit={handleSubmit} />
      <TrackBar />

      <div className="container">
        <div className="personal_form_container">
          <h5 className="mb-3 mt-1">Bank Details</h5>

          <form className="bg-white px-5 py-4 rounded form_shadow">

            <div className="row mb-3">

              <div className="col-md-6">
                <label className="form-label fs12px">
                  ACCOUNT NUMBER
                </label>

                <input
                  type={accountHidden ? "password" : "text"}
                  name="bank_account_number"
                  className="form-control"
                  value={bankDetailForm.bank_account_number}
                  onChange={handleChange}
                />

                {errors.bank_account_number && (
                  <small className="text-danger">
                    {errors.bank_account_number}
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fs12px">
                  RE-ENTER ACCOUNT NUMBER
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={confirmAccountNumber}
                  onChange={handleConfirmAccount}
                />

                {errors.bank_account_number_confirm && (
                  <small className="text-danger">
                    {errors.bank_account_number_confirm}
                  </small>
                )}
              </div>

            </div>

            <div className="row mb-3">

              <div className="col-md-6">

                <span className="mt-2 fs12px">
                  ACCOUNT TYPE
                </span>

                <br />

                <button
                  type="button"
                  className={`btn riskProfileBtn ${bankDetailForm.bank_account_type === "SB"
                    ? "activeBtnIncome"
                    : ""
                    }`}
                  onClick={() =>
                    setBankDetailForm({
                      ...bankDetailForm,
                      bank_account_type: "SB",
                    })
                  }
                >
                  Saving Account
                </button>

                <button
                  type="button"
                  className={`btn riskProfileBtn mx-1 ${bankDetailForm.bank_account_type === "CA"
                    ? "activeBtnIncome"
                    : ""
                    }`}
                  onClick={() =>
                    setBankDetailForm({
                      ...bankDetailForm,
                      bank_account_type: "CA",
                    })
                  }
                >
                  Current Account
                </button>

                {errors.bank_account_type && (
                  <small className="text-danger d-block">
                    {errors.bank_account_type}
                  </small>
                )}
              </div>

              <div className="col-md-6">

                <label className="form-label fs12px">
                  IFSC CODE
                </label>

                <input
                  type="text"
                  name="bank_ifsc"
                  value={bankDetailForm.bank_ifsc}
                  className="form-control"
                  onChange={handleChange}
                />

                {errors.bank_ifsc && (
                  <small className="text-danger">
                    {errors.bank_ifsc}
                  </small>
                )}

              </div>
            </div>

            <div className="row mb-3">

              <div className="col-md-6">

                <label className="form-label fs12px">
                  BANK
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={bankDetailForm.bank_name}
                  readOnly

                />

                {errors.bank_name && (
                  <small className="text-danger">{errors.bank_name}</small>
                )}

              </div>

              <div className="col-md-6">

                <label className="form-label fs12px">
                  BRANCH
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={bankDetailForm.bank_branch}
                  readOnly
                />

              </div>

            </div>

          </form>
        </div>
      </div>

      <NextBar onSaveContinue={varifyBank} />
    </>
  );
};

export default BankDetailForm;