import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { CurrencyRupee } from "react-bootstrap-icons";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { errorToast, successToast } from "../services/utils/toast";
import { addYearsForApi, currentDayForApi } from "../services/dates/dateFormater";
import { fetchAdminUser } from "../services/user/adminUser";
import { useNavigate } from "react-router-dom";

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  accountNumber: string,
  ifscCode: string,
  accountType: string
}
const shortAmount = {
  minValue: 10000,
  twoKValue: 20000,
  threeKValue: 50000,
  fiveKValue: 100000

}

const CreateMandate: React.FC<investmetProps> = ({ show, setShow, accountNumber, ifscCode, accountType }) => {
   const navigate = useNavigate()
  const [amount, setAmount] = useState<number>(shortAmount.minValue)
  const [amountError, setAmountError] = useState<string>("")



  const updateAmount = (value: number) => {
    setAmount(amount + value)
  }
  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>, maxAmount: number,): void => {
    let value = Number(e.target.value.trim());
    if (value <= 1000000000) {
      setAmount(value);
      setAmountError("")

    }
    else if (value >= maxAmount) {
      setAmount(maxAmount);
    }
  };


  const createMandate = async () => {
    if (!amount) {
      setAmountError("Please enter amount")
      return
    }
    if (amount < 1000) {
      setAmountError(`Amount should be greater than or equal to ${shortAmount.minValue}`)
      return
    }


    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        account_number: accountNumber,
        ifsc_code: ifscCode,
        account_type: accountType,
        amount: amount.toString(),
        start_date: currentDayForApi(),
        end_date: addYearsForApi(40)
      }

      const res = await postRequest<any>(endPoints.createMandate, reqBody)
      if (res.success) {
        successToast("Mandate created successfully! You'll receive a confirmation link on your registered mail id.")
        setShow(false)
        navigate("/bank-details-show")
      }
    } catch (err) {
      errorToast(err)
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Create Mandate</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <div className="borderColor p-3 rounded-4 bg-white">
            <span className="sub-heading modal-heading">Mandate Details</span>
            {/*  <p className="form-label mt-2">MODE</p>
          <div className="row">
              <div>
                <button type="button" className="btn shortcutValue">
                  Debit Card
                </button>

                <button type="button" className="btn shortcutValue mx-1">
                  Net Banking
                </button>
              </div>
            </div> */}
            <form>
              <div className="form-group mt-3">
                <label htmlFor="amountFor" className="fs12px">
                  MANDATE AMOUNT
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amountFor"
                  aria-describedby="emailHelp"
                  value={amount}

                  onChange={(e) => amountHandler(e, 1000000)}
                />
                <small className="errorColor">{amountError}</small>
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
            </form>
          </div>
        </Modal.Body>

        <small className="fs12px p-2 modal-bg text-center">
          Please click here to view the list of eligible banks for e-mandate. If
          your bank is not listed, kindly raise a query <br />
          to initiate the offline process for mandate registration.
        </small>
        <small className="p-2 fs12px modal-bg text-center">
          The debit mandate amount represents the daily maximum limit per
          transaction.
          <div className="mb-3 mt-3">
            <button className="mandate-button" onClick={createMandate}>Proceed</button>
          </div>
        </small>
      </Modal>
    </>
  );
};

export default CreateMandate;
