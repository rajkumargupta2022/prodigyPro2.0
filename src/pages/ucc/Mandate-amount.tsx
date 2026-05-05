import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import TrackBar from "./Track-bar";
import { useEffect, useState } from "react";
import { bankDetailForm, uccDataRes, uccDataResKeys, uccSubmitRes } from "../data-interfaces/ucc";
import { postRequest, postRequestSimple } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { errorToast } from "../../services/utils/toast";
import { CurrencyRupee } from "react-bootstrap-icons";
import { useAdminUser } from "../../context/AdminContext";
import { holder_type, holdingNature, taxStatus } from "../data/ucc-data";
import NomineeOptOut from "./Nominee-opt-out";

const MandateAmount = () => {
  const shortAmount = {
    minValue: 10000,
    twoKValue: 20000,
    threeKValue: 50000,
    fiveKValue: 100000

  }
  const { fetchFanilyMembersForUcc } = useAdminUser()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const reference_id = searchParams.get("reference_id") ?? "";
  const tax_status = searchParams.get("tax_status") ?? "";
  const holding_nature = searchParams.get("holding_nature") ?? "";
  const pan = searchParams.get("pan") ?? "";
  const holder = searchParams.get("holder") as keyof uccDataResKeys;

  const [mandateAmount, setMandateAmount] = useState<number | undefined>(50000)
  const [mandateAmountError, setMandateAmountError] = useState<string>("")
  const [isNomineeOptOut, setIsNomineeOptOut] = useState<boolean>(false)
  const [bankDetails, setBankDetails] = useState<bankDetailForm>({
    bank_name: "",
    bank_ifsc: "",
    bank_branch: "",
    bank_account_type: "",
    bank_account_number: "",
    is_bank_verified: false,
  })
  useEffect(() => {

    if (!reference_id || !tax_status || !holding_nature || !pan) {
      navigate("/dashboard");
      return;
    }
    if (reference_id) {
      fetchUccData()
    }
  }, [])

  const fetchUccData = async () => {
    try {
      const response = await postRequest<uccDataRes>(endPoints.initiateUcc, { reference_id });
      const data = response.data?.bank_details;
      if (response.success && data) {
        setMandateAmount(response?.data?.mandate_amount ?? 50000)
        setBankDetails({ ...data })
      }
    } catch (err) {
      errorToast(err);
    }
  }
  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>, maxAmount: number,): void => {
    let value = Number(e.target.value.trim());
    if (value <= 100000000) {
      setMandateAmount(value);
      setMandateAmountError("")

    }
    else if (value >= maxAmount) {
      setMandateAmount(maxAmount);
    }

  };
  const updateAmount = (value: number) => {
    setMandateAmount(value)
  }

  const handleSubmit = async () => {

    if (!mandateAmount) {
      setMandateAmountError("Please enter mandate amount")
      return
    }
    if (mandateAmount < 5000) {
      setMandateAmountError("Mandate amount should be atleast ₹5000")
      return
    }

    try {
      const payload = {
        reference_id,
        tax_status,
        holding_nature,
        nominee_opt_out: taxStatus.ON_BEHALF_OF_MINOR === tax_status ? true : false,
        mandate_amount: Number(mandateAmount),
        nominees: []
      };

      await postRequestSimple(endPoints.tempSaveUcc, { data: payload });

      if (holding_nature == holdingNature.AOS && holder === holder_type.third_user && tax_status === taxStatus.RESIDENT_INDIVIDUAL) {
        // navigate(
        //   `/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
        // );
        setIsNomineeOptOut(true)
      } else if (holding_nature === holdingNature.SINGLE && tax_status === taxStatus.ON_BEHALF_OF_MINOR) {
        finalDataSubmit()
      } else if (holding_nature === holdingNature.SINGLE && tax_status === taxStatus.RESIDENT_INDIVIDUAL) {
        // navigate(
        //   `/nomination-details?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
        // );
        setIsNomineeOptOut(true)
      }
      else {
        navigate(
          `/kyc-status-check?reference_id=${reference_id}&tax_status=${tax_status}&holding_nature=${holding_nature}&pan=${pan}&holder=${holder}`
        );
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const finalDataSubmit = async () => {
    try {
      const res = await postRequest<uccSubmitRes>(endPoints.submit, { reference_id });
      if (res.success) {
        localStorage.removeItem("isNewUser")
        localStorage.removeItem("mobile")
        fetchFanilyMembersForUcc(res.data.client_code, pan)
      }
    } catch (err) {
      errorToast(err);
    }
  };




  return (
    <>
      <NavBar />
      <TrackBar />
      <NomineeOptOut show={isNomineeOptOut} setShow={setIsNomineeOptOut} />
      <div className="container pt-3">
        <div className="personal_form_container ">
          <h3 className="mb-4 text-dark fw-bolder">Bank Mandate</h3>
          <div className="borderColor row p-3 rounded-4 bg-white">
            <div className="d-flex justify-content-between col-md-12 col-sm-12">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={imageUrl + bankDetails?.bank_name?.trim()
                    .toLowerCase()
                    .replace(/\s+/g, '_') + ".png"} height={35} width={35} className="rounded-2" alt="bank-logo" />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{bankDetails?.bank_name}</h4>
                  <p>A/c No: {bankDetails?.bank_account_number ?? ""}</p>
                </div>
              </div>
            </div>

            <div className="form-group mt-3 col-md-6 col-sm-12">
              <label htmlFor="amountFor" className="fs12px">
                MANDATE AMOUNT
              </label>
              <input
                type="text"
                className="form-control"
                id="amountFor"
                aria-describedby="emailHelp"
                value={mandateAmount}

                onChange={(e) => amountHandler(e, 1000000)}
              />
              <small className="errorColor">{mandateAmountError}</small>
              <div className=" mt-2">
                <button type="button" className="btn shortcutValue" onClick={() => updateAmount(shortAmount.minValue)} >
                  Min.
                </button>
                <button type="button" className="btn shortcutValue mx-1" onClick={() => updateAmount(shortAmount.twoKValue)}>
                  <CurrencyRupee className="mb-1" />
                  {shortAmount.twoKValue}
                </button>
                <button type="button" className="btn shortcutValue mx-1" onClick={() => updateAmount(shortAmount.threeKValue)}>
                  <CurrencyRupee className="mb-1" />
                  {shortAmount.threeKValue}
                </button>
                <button type="button" className="btn shortcutValue mx-1" onClick={() => updateAmount(shortAmount.fiveKValue)}>
                  <CurrencyRupee className="mb-1" />
                  {shortAmount.fiveKValue}
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <NextBar onSaveContinue={handleSubmit} />
    </>
  );
};

export default MandateAmount;
