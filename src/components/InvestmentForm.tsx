import { useEffect, useState } from "react"
import { fetchAdminUser } from "../services/user/adminUser";
import { foliosResponse, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { Calendar4, CurrencyRupee } from "react-bootstrap-icons";
import { Card, Form } from "react-bootstrap";
import SelectFolioPopup from "./select-folio-popup";
import { checkTransactionAllowed } from "../services/utils/services";
import { keys } from "../services/utils/keys";
import { daysAdded } from "../services/dates/dateFormater";
import DatePicker from "react-datepicker";
// import { errorToast } from "../services/utils/toast";

interface addAmountKeys {
  min: number,
  first: number;
  second: number;
  third: number
}
interface InvestmentFormProps {
  schemeList: schemeDeatilDataKeys[]
  setSchemeList: (date: any) => void;
  sipDateList: number[]
}
const InvestmentForm: React.FC<InvestmentFormProps> = ({ schemeList, setSchemeList, sipDateList }) => {
  const [isSipTransaction, setIsSipTransaction] = useState<boolean>(true)
  const [addAmountValues, setAddAmountValues] = useState<addAmountKeys>({
    min: 1000,
    first: 2000,
    second: 3000,
    third: 5000
  })
  const [openSelectFolio, setOpenSelectFolio] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("")
  const [dateErrorMsg, setDateErrorMsg] = useState<string>("")
    const [minimumDate, setMinimumDate] = useState<Date>()

  useEffect(() => {
    if (
      schemeList.length > 0 &&
      schemeList[0].folioList === undefined && // Run only if folioList is not yet fetched
      schemeList[0].sipDateList?.length > 0
    ) {
      handleMinAmount(true);
      fetchFolios();
     setMinimumDate(daysAdded(31,sipDateList))
      setSchemeList((prev: any) =>
        prev.map((obj: any) => {
          return {
            ...obj,
            firstSIPToday: true,
            to_date: "",
            from_date: "",
            amount: Number(obj.minSIPAmt),
            totalAmount: 0,
            start_date: daysAdded(31, sipDateList),
          };
        })
      );
      setAmount(schemeList[0].minSIPAmt ?? 1000);
      if (!checkTransactionAllowed(schemeList, keys.sip) && checkTransactionAllowed(schemeList, keys.purchase)) {
        handleTransactionType(false)
      }
    }
  }, [schemeList]);



  const addAmount = (value: number) => {
    const updatedAmount = amount + value;

    const updatedList = [
      {
        ...schemeList[0],
        amount: updatedAmount,
      },
    ];

    setSchemeList(updatedList);
    setAmount(updatedAmount);
  };

  const handleTransactionType = (type: boolean) => {
    setIsSipTransaction(type)
    if (type) {
      setAddAmountValues({
        min: 1000,
        first: 2000,
        second: 3000,
        third: 5000
      })
      setAmount(1000)
    } else {
      setAddAmountValues({
        min: 5000,
        first: 10000,
        second: 15000,
        third: 25000
      })
      setAmount(5000)
    }
    handleMinAmount(type)
  }
  const dateHandle = (e: Date | null) => {

    setSchemeList((prev: any) =>
      prev.map((obj: any) => ({
        ...obj,
        start_date: e,
      })))

    // Clear date error when user selects a date
    if (e) {
      setDateErrorMsg("")
    }
  }
  const isAllowedDay = (date: Date): boolean => {
    const allowedDays: number[] = schemeList[0]?.sipDateList.length > 0 ? schemeList[0]?.sipDateList : [];
    const dayOfMonth = date.getDate();
    return allowedDays?.includes(dayOfMonth);
  };

  const fetchFolios = async () => {
    const adminUser = fetchAdminUser();

    if (!adminUser?.ucc || schemeList.length === 0) return;

    const reqBody = {
      ucc: adminUser.ucc,
      product_code: schemeList[0].accordSchemeCode,
    };

    try {
      const res = await postRequest<foliosResponse>(endPoints.getSchemeFolios, reqBody);

      const updatedList = [
        {
          ...schemeList[0],
          folioList: res.data || [],
        },
      ];

      setSchemeList(updatedList);
    } catch (error) {

      const updatedList = [
        {
          ...schemeList[0],
          folioList: [],
        },
      ];

      setSchemeList(updatedList);
    }

  };



  const handleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxAmount: number,
    setter: (value: number) => void
  ): void => {
    let value = Number(e.target.value.trim());

    if (value <= 1000000000) {

      const updatedList = [
        {
          ...schemeList[0],
          amount: value,
        },
      ];
      setter(value);
      setSchemeList(updatedList)
    } else if (1000000000 >= maxAmount && value > 0) {
      const updatedList = [
        {
          ...schemeList[0],
          amount: 1000000000,
        },
      ];
      setter(value);
      setSchemeList(updatedList)

    }
  };
  const handleMinAmount = (type: boolean = isSipTransaction) => {
    if (schemeList?.length > 0) {
      let total = 0;

      const updatedSchemes = schemeList.map((scheme) => {
        const minAmount = type ? scheme.minSIPAmt : scheme.minLumSumAmt;
        total += minAmount;

        return {
          ...scheme,
          amount: minAmount,
        };
      });

      setSchemeList(updatedSchemes);

    }
  };

  const handleFolioSelection = () => {
    const minTotal = isSipTransaction ? schemeList[0]?.minSIPAmt : schemeList[0]?.minLumSumAmt

    if (!schemeList[0]?.start_date && isSipTransaction) {
      setDateErrorMsg("Please select sip day")
      return
    }
    if (amount <= 0) {
      setAmountErrorMsg("Enter investment amount")
      return
    }
    setAmountErrorMsg("")
    if (minTotal > amount) {
      setAmountErrorMsg("Minimum investment amount is ₹" + minTotal)
      return
    }
    setAmountErrorMsg("")
    setOpenSelectFolio(true)

  }
  const handleSipDeduction = () => {
     setMinimumDate(!schemeList[0].firstSIPToday ?  daysAdded(31, sipDateList): daysAdded(7, sipDateList))

    setSchemeList((prev: any) =>
      prev.map((obj: any, index: number) =>
        index === 0
          ? { ...obj, firstSIPToday: !obj.firstSIPToday,start_date:null } // Toggle the value
          : obj
      )
    );
  };
  return (<>

    <div className="col-md-4 col-12 position-relative">

      <div className="bg-white p-3 rounded">
        <h5>Invest Now</h5>
        <hr />
        <div className="row text-center mt-2 ">
          {checkTransactionAllowed(schemeList, keys.sip) &&
            <div className="col-md-6 py-2 py-md-0">
              <div className={`${isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(true) }}> Monthly SIP</div>
            </div>}
          {checkTransactionAllowed(schemeList, keys.purchase) &&
            <div className="col-md-6 py-2 py-md-0">
              <div className={`${!isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(false) }}> One-Time </div>
            </div>}
        </div>

        {isSipTransaction && <>

          <div className="form-group mt-3">
            <label className='fs12px'>Date of SIP</label>
            <div className="position-relative">
              <div className="d-flex justify-content-between crPointer form-control date-picker-container" onClick={() => {
                const dateInput = document.querySelector('.focus_datepickers121') as HTMLInputElement | null;
                dateInput?.click();
              }}
              >
                <DatePicker
                  selected={schemeList[0]?.start_date}
                  onChange={(e) => dateHandle(e)}
                  filterDate={isAllowedDay}
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                  minDate={minimumDate}
                  className="focus_datepickers121"
                />
                <div className="prod_view_fund align-self-center">
                  <div className="crPointer dateIcon"><Calendar4 className='' /></div>
                </div>
              </div>

            </div>
          </div>
          <span className='errorColor'>{dateErrorMsg}</span>
        </>}


        <div className="form-group mt-1">
          <label htmlFor="amountFor" className='fs12px'>INVESTMENT AMOUNT</label>
          <input type="text" className="form-control" value={amount} onChange={(e) => handleAmount(e, 1000000, setAmount)} id="amountFor" aria-describedby="emailHelp" placeholder="Enter Amount" />
          <span className="errorColor"> {amount >= (isSipTransaction ? schemeList[0]?.minSIPAmt : schemeList[0]?.minLumSumAmt) ? "" : amountErrorMsg}</span>
          <div className=" mt-2">
            <button type="button" className="btn shortcutValue" onClick={() => handleMinAmount(isSipTransaction)}>Min.</button>
            <button type="button" className="btn shortcutValue mx-1" onClick={() => addAmount(addAmountValues.first)}>+<CurrencyRupee className='mb-1' />{addAmountValues.first.toLocaleString("en-In")}</button>
            <button type="button" className="btn shortcutValue mx-1" onClick={() => addAmount(addAmountValues.second)}>+<CurrencyRupee className='mb-1' />{addAmountValues.second.toLocaleString("en-In")}</button>
            <button type="button" className="btn shortcutValue mx-1" onClick={() => addAmount(addAmountValues.third)}>+<CurrencyRupee className='mb-1' />{addAmountValues.third.toLocaleString("en-In")}</button>
          </div>
        </div>
        {isSipTransaction &&
          <div className="d-flex justify-content-center align-items-center mt-2 mb-0">
            <Form.Check
              type="checkbox"
              id="circleCheckbox"
              className="circle-checkbox textColor"
              onChange={handleSipDeduction}
              checked={schemeList[0]?.firstSIPToday ?? true}
              label="First instalment will be deducted today."
              name="Sip deduction"
            />
          </div>}

      </div>
      <div className="text-white logobg_color  py-2 mb-2 mx-3 order  text-center monthly_btn crPointer" onClick={handleFolioSelection}> {isSipTransaction ? "Invest as SIP" : "Invest Now"}</div>

      <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>NAV applicable once amount credited to AMC's bank account</Card.Header>
    </div>
    <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio} schemeList={schemeList} setSchemeList={setSchemeList} isSipTransaction={isSipTransaction} />
  </>)
}
export default InvestmentForm