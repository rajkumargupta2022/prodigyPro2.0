import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Calendar4, CurrencyRupee } from 'react-bootstrap-icons';
import money from "../assets/img/icons/rupee 1.svg"
import SipDates from './SipDate';
import { foliosResponse, schemeDeatilDataKeys } from '../pages/data-interfaces/transact';
import { Link } from 'react-router-dom';
import SelectFolioPopup from './select-folio-popup';
import { postRequest } from '../services/Api/HandleApi';
import { fetchAdminUser } from '../services/user/adminUser';
import { endPoints, imageUrl } from '../services/utils/urls';
import BankMandate from './BankMandate';
import { convertDayToFullDate } from '../services/dates/dateFormater';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
  setSchemeList: (date: any) => void;
  sipDateList: number[],
  from: string
}
interface addAmountKeys {
  min: number,
  first: number;
  second: number;
  third: number
}

const InvetmentConfirmation: React.FC<investmetProps> = ({ show, setShow, schemeList, setSchemeList, sipDateList, from }) => {
  const [openSelectFolio, setOpenSelectFolio] = useState(false)
  const [openBankMandate, setOpenBankMandate] = useState(false)
  const [isSipTransaction, setIsSipTransaction] = useState<boolean>(true)
  const [sipDateShow, setSipDateShow] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("")
  const [foliosFetched, setFoliosFetched] = useState(false);
  const [addAmountValues, setAddAmountValues] = useState<addAmountKeys>({
    min: 1000,
    first: 2000,
    second: 3000,
    third: 5000
  })
  const [sipDate, setSipDate] = useState<number>(1)

  const handleSipDate = (value: number) => {
    setSipDate(value)
    setSipDateShow(false)
    setSchemeList(schemeList.map(obj => ({
      ...obj,
      start_date: convertDayToFullDate(Number(value))
    })))
  }


  useEffect(() => {
    handleNearSipDate()
    fetchFolios()
  }, [show]);

  useEffect(() => {
    if (foliosFetched) {
      handleMinAmount(true);
      setFoliosFetched(false);
    }
  }, [foliosFetched,schemeList]);

  const fetchFolios = async () => {
    const adminUser = fetchAdminUser();

    if (!adminUser?.ucc) return;


    Promise.all(
      schemeList.map(async (item) => {
        const reqBody = {
          ucc: adminUser.ucc,
          product_code: item.accordSchemeCode,
        };

        try {
          const res = await postRequest<foliosResponse>(endPoints.getSchemeFolios, reqBody);
          console.log("resssssss", res);

          return {
            ...item,
            folioList: res.data || [],
          };
        } catch (error) {
          console.error("Error fetching folio for", item.accordSchemeCode, error);
          return {
            ...item,
            folioList: [],
          };
        }
      })
    ).then(updatedSchemeList => {
      setSchemeList(updatedSchemeList);
      setFoliosFetched(true);
    }).catch(err=>{
      console.log("This is error",err)
    })

  };

  const handleNearSipDate = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const sipDateNumbers = sipDateList?.map(Number);
    let nearestDate = sipDateNumbers?.find(date => date >= currentDay);
    if (!nearestDate) {
      nearestDate = sipDateNumbers[0];
    }

    let day = String(nearestDate).padStart(2, '0')
    setSipDate(Number(day))
    setSchemeList(schemeList.map(obj => {
      obj.start_date = convertDayToFullDate(Number(day));
       return obj;
    }))
  }
  const handleFolioSelection = () => {

    const total = schemeList.reduce((acc, scheme) => {
      const minAmount = scheme.amount ?? 0; // use 0 if undefined
      return acc + minAmount;
    }, 0);

    const minTotal = schemeList.reduce((acc, scheme) => {
      const minAmount = isSipTransaction ? scheme.minSIPAmt : scheme.minLumSumAmt;
      return acc + minAmount;
    }, 0);
    if (total <= 0) {
      setAmountErrorMsg("Enter investment amount")
      return
    }
    if (minTotal > total) {
      setAmountErrorMsg("Minimum investment amount is ₹" + minTotal)
      return
    }
    if (from === "portfolio") {
      setOpenBankMandate(true)
      setShow(false)
      return
    }
    setOpenSelectFolio(true)
    setShow(false)
  }

  const addAmount = (value: number) => {
    const updatedAmount = amount + value;
    setAmount(updatedAmount);
    distributeAmount(updatedAmount);
  }

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

  const handleMultipleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexToUpdate: number
  ) => {
    const newAmount = Number(e.target.value.trim());

    const updatedList = schemeList.map((item, index) => {
      if (index === indexToUpdate) {
        return {
          ...item,
          amount: newAmount,
        };
      }
      return item;
    });

    setSchemeList(updatedList);
    const total = updatedList?.reduce((acc, cur) => acc + (cur.amount || 0), 0);
    setAmount(total);
  };

  const handleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxAmount: number,
    setter: (value: number) => void
  ): void => {
    let value = Number(e.target.value.trim());
    if (value <= 1000000000) {
      setter(value);
      distributeAmount(value);
    } else if (value >= maxAmount) {
      setter(maxAmount);
      distributeAmount(maxAmount);
    }
  };
  const distributeAmount = (total: number) => {
    const count = schemeList?.length;

    if (count === 0) return;
    console.log("total==", total);

    const perScheme = Math.floor(total / count);
    const remainder = total % count;

    const updatedList = schemeList?.map((item, index) => ({
      ...item,
      amount: perScheme + (index === 0 ? remainder : 0)
    }));

    setSchemeList(updatedList);
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
      setAmount(total);
    }
  };
  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title>Investment Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <div className="borderColor p-3 headerRadius bg-white">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="prod_icon_img">
                  <img src={from === "portfolio" ? imageUrl + schemeList[0]?.amcCode + ".png" : money} height={35} width={35} alt="" className='rounded-2' />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{from === "portfolio" ? schemeList[0]?.scheme : "Emergency Fund"}</h4>
                  <p>Selected fund {schemeList?.length}</p>
                </div>
              </div>

            </div>
            <hr />
            <div className="row text-center mt-2">
              <div className="col-md-6 py-2 py-md-0">
                <div className={`${isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(true) }}> Monthly SIP</div>
              </div>
              <div className="col-md-6 py-2 py-md-0">
                <div className={`${!isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(false) }}> One-Time </div>
              </div>
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
              <span className='errorColor'>{amountErrorMsg}</span>
              <div className=" mt-2">
                <button type="button" className="btn shortcutValue" onClick={() => handleMinAmount(isSipTransaction)}>Min.</button>
                <button type="button" className="btn shortcutValue mx-1" onClick={() => addAmount(addAmountValues.first)}>+<CurrencyRupee className='mb-1' />{addAmountValues.first.toLocaleString("en-In")}</button>
                <button type="button" className="btn shortcutValue mx-1" onClick={() => addAmount(addAmountValues.second)}>+<CurrencyRupee className='mb-1' />{addAmountValues.second.toLocaleString("en-In")}</button>
                <button type="button" className="btn shortcutValue mx-1" onClick={() => addAmount(addAmountValues.third)}>+<CurrencyRupee className='mb-1' />{addAmountValues.third.toLocaleString("en-In")}</button>
              </div>
            </div>
            {from === "emergency" && <>

              <p className='sip_amount_breakup12 fs14px mb-0'>Sip amount breakup</p>
              {schemeList?.map((item, index) => {
                return <div key={index} className="d-flex justify-content-between midpodgy_invest_conf py-1">
                  <div className="">
                    <span>{item?.scheme}</span>
                  </div>
                  <div>
                    <input className='' type="text" placeholder='0' value={item?.amount} onChange={(e) => handleMultipleAmount(e, index)} />
                  </div>
                </div>
              })}
            </>
            }



          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>NAV applicable once amount credited to AMC’s bank account</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center'>By continuing, I agree with the  <Link to={"#"}>Disclaimers</Link> and <Link to={"#"}>Terms & Conditions</Link> </small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleFolioSelection}>Continue</Button>
        </Modal.Footer>
      </Modal>
      <SipDates show={sipDateShow} setShow={setSipDateShow} sipDate={sipDate} sipDateList={sipDateList} handleSipDate={handleSipDate} />
      <SelectFolioPopup show={openSelectFolio} setShow={setOpenSelectFolio} schemeList={schemeList} setSchemeList={setSchemeList} isSipTransaction={isSipTransaction} />
      <BankMandate show={openBankMandate} setShow={setOpenBankMandate} schemeList={schemeList} setSchemeList={setSchemeList} isSipTransaction={isSipTransaction} />
    </>
  );
}

export default InvetmentConfirmation;