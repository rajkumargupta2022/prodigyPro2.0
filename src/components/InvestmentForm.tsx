import { useEffect, useState } from "react"
import { fetchAdminUser } from "../services/user/adminUser";
import { foliosResponse, schemeDeatilDataKeys } from "../pages/data-interfaces/transact";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { Calendar4, CurrencyRupee } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import SipDates from "./SipDate";
import SelectFolioPopup from "./select-folio-popup";
import { checkTransactionAllowed } from "../services/utils/services";
import { keys } from "../services/utils/keys";

interface addAmountKeys {
  min: number,
  first: number;
  second: number;
  third: number
}
interface InvestmentFormProps {
  schemeList: schemeDeatilDataKeys[]
  setSchemeList: (date: any) => void;

}
const InvestmentForm: React.FC<InvestmentFormProps> = ({ schemeList, setSchemeList }) => {
  const [isSipTransaction, setIsSipTransaction] = useState<boolean>(true)
  const [addAmountValues, setAddAmountValues] = useState<addAmountKeys>({
    min: 1000,
    first: 2000,
    second: 3000,
    third: 5000
  })
  const [openSelectFolio, setOpenSelectFolio] = useState<boolean>(false)
  const [sipDate, setSipDate] = useState<number>(1)
  const [amount, setAmount] = useState<number>(0)
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("")
  const [sipDateShow, setSipDateShow] = useState<boolean>(false)

  useEffect(() => {
    if (
      schemeList.length > 0 &&
      schemeList[0].folioList === undefined && // Run only if folioList is not yet fetched
      schemeList[0].sipDateList?.length > 0
    ) {
      handleMinAmount(true);
      fetchFolios();
      handleNearSipDate(schemeList[0].sipDateList);
      setAmount(schemeList[0].minSIPAmt ?? 1000);
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
  const handleSipDate = (value: number) => {
    setSipDate(value)
    setSipDateShow(false)

    //only for making build
    setAddAmountValues({
      min: isSipTransaction ? 1000 : 5000,
      first: isSipTransaction ? 2000 : 10000,
      second: isSipTransaction ? 3000 : 15000,
      third: isSipTransaction ? 5000 : 25000
    })
  }

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
      console.error("Error fetching folio:", error);

      const updatedList = [
        {
          ...schemeList[0],
          folioList: [],
        },
      ];

      setSchemeList(updatedList);
    }

    console.log("Folios updated in schemeList[0]");
  };


  const handleNearSipDate = (dateList: number[]) => {
    console.log("dateList===", dateList);

    const today = new Date();
    const currentDay = today.getDate();
    const sipDateNumbers = dateList?.map(Number);
    let nearestDate = sipDateNumbers?.find(date => date >= currentDay);
    if (!nearestDate) {
      nearestDate = sipDateNumbers[0];
    }
    console.log("nearestDate", dateList);
   
    setSipDate(Number(String(nearestDate).padStart(2, '0')))
  }
  const handleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxAmount: number,
    setter: (value: number) => void
  ): void => {
    let value = Number(e.target.value.trim());
    console.log("value",value);
    
    if (value <= 1000000000) {
      console.log("gggg");
      
      const updatedList = [
        {
          ...schemeList[0],
          amount: value,
        },
      ];
      setter(value);
      setSchemeList(updatedList)
    } else if (1000000000 >= maxAmount && value > 0) {
        console.log("ggggrrr");
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

    if (amount <= 0) {
      setAmountErrorMsg("Enter investment amount")
      return
    }
    setAmountErrorMsg("")
    if (minTotal > amount) {
      setAmountErrorMsg("Minimum investment amount is ₹" + minTotal)
      return
    }
    console.log("schemelist", schemeList);

    setAmountErrorMsg("")
    setOpenSelectFolio(true)

  }
  return (<>
    <div className="col-md-4 col-12 position-relative">

      <div className="bg-white p-3 rounded">
        <h5>Invest Now</h5>
        <hr />
        <div className="row text-center mt-2 ">
          {checkTransactionAllowed(schemeList,keys.sip) &&
          <div className="col-md-6 py-2 py-md-0">
            <div className={`${isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(true) }}> Monthly SIP</div>
          </div>}
          {checkTransactionAllowed(schemeList,keys.purchase) &&
          <div className="col-md-6 py-2 py-md-0">
            <div className={`${!isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(false) }}> One-Time </div>
          </div>}
        </div>

        {isSipTransaction && <>

          <div className="d-flex justify-content-between mt-3" onClick={() => setSipDateShow(true)}>
            <div className="d-flex">
              <div className="ms-2 prod_icon_heading">
                <p>Day of SIP</p>
                <h4 className='my-2'>{sipDate}th on every month</h4>
              </div>
            </div>
            <div className="prod_view_fund align-self-center">
              <div className="crPointer dateIcon"><Calendar4 className='' /></div>
            </div>
          </div> <hr className='mt-0' /> </>}

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

      </div>
      <div className="text-white logobg_color  py-2 mb-2 mx-3 order  text-center monthly_btn crPointer" onClick={handleFolioSelection}> {isSipTransaction ? "Invest as SIP" : "Invest Now"}</div>

      <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>NAV applicable once amount credited to AMC’s bank account</Card.Header>
    </div>
    <SipDates show={sipDateShow} setShow={setSipDateShow} sipDate={sipDate} sipDateList={schemeList[0]?.sipDateList} handleSipDate={handleSipDate} />
    <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio} schemeList={schemeList} setSchemeList={setSchemeList} isSipTransaction={isSipTransaction} />
  </>)
}
export default InvestmentForm