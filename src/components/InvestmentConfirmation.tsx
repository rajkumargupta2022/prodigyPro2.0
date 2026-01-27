import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Calendar4, CurrencyRupee } from 'react-bootstrap-icons';
import money from "../assets/img/icons/rupee 1.svg"
import { foliosResponse, schemeDeatilDataKeys } from '../pages/data-interfaces/transact';
import SelectFolioPopup from './select-folio-popup';
import { postRequest } from '../services/Api/HandleApi';
import { fetchAdminUser } from '../services/user/adminUser';
import { endPoints, imageUrl } from '../services/utils/urls';
import BankMandate from './BankMandate';

import { daysAdded } from '../services/dates/dateFormater';
import { keys } from '../services/utils/keys';
import { checkTransactionAllowed } from '../services/utils/services';
import { finalTransaction } from '../services/utils/transactionApi';
import OrderPlaces from './order-places';
import DatePicker from 'react-datepicker';
// import { errorToast } from '../services/utils/toast';
import { Form } from 'react-bootstrap';
import Disclaimer from './Disclaimer'

interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  schemeList: schemeDeatilDataKeys[];
  setSchemeList: (date: any) => void;
  sipDateList: number[],
  from: string
}


const InvetmentConfirmation: React.FC<investmetProps> = ({ show, setShow, schemeList, setSchemeList, sipDateList, from }) => {
  const [openSelectFolio, setOpenSelectFolio] = useState(false)
  const [openBankMandate, setOpenBankMandate] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successData, setSuccessData] = useState<any[]>([])
  const [isSipTransaction, setIsSipTransaction] = useState<boolean>(true)
  const [isLumpsumTransaction, setIsLumpsumTransaction] = useState<boolean>(true)
  const disclaimerRef = useRef<HTMLAnchorElement>(null);

  const [amount, setAmount] = useState<number>(0)
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("")
  const [dateErrorMsg, setDateErrorMsg] = useState<string>("")
  const [minimumDate, setMinimumDate] = useState<Date>(daysAdded(30, sipDateList))
  const [foliosFetched, setFoliosFetched] = useState(false);


  // ✅ Fixed shortcut button values (they won't follow `amount` changes)
  const [shortcutValues, setShortcutValues] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (!show) return;
    fetchFolios()
    
  }, [show]);

  const dateHandle = (e: Date | null) => {
    setSchemeList((prev: any) =>
      prev.map((obj: any) => ({
        ...obj,
        start_date: e,
      }))
    )

    if (e) {
      setDateErrorMsg("")
    }
  }

  const isAllowedDay = (date: Date): boolean => {
    const allowedDays: number[] = schemeList[0]?.sipDateList.length > 0 ? schemeList[0]?.sipDateList : [];
    const dayOfMonth = date.getDate();
    return allowedDays?.includes(dayOfMonth);
  };

  useEffect(() => {
    if (!show) return;
    if (foliosFetched) {
      if (schemeList[0]?.totalAmount) {
        const total = Number(schemeList[0]?.totalAmount);
        distributeAmount(total);
        setAmount(total);
        setIsLumpsumTransaction(false);
        const base = isNaN(total) || total <= 0 ? 0 : total;
        if (base > 0) {
          setShortcutValues([base * 2, base * 3, base * 5]);
        }
      } else {
        handleMinAmount(true);
      }
      setFoliosFetched(false);
    }
  }, [foliosFetched]);



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
          if (from === "portfolio") {
            schemeList?.forEach((scheme: any) => {
              const recommendedFolio = res.data?.find((folio: any) => folio?.is_recommended);
              scheme.selectedFolio = recommendedFolio || {};
            });
          }

          return {
            ...item,
            folioList: res.data || [],
            start_date: item.start_date ?? daysAdded(7, sipDateList), // 👈 keep default if missing
          };
        } catch (error) {
          return {
            ...item,
            folioList: [],
          };
        }
      })
    ).then(updatedSchemeList => {
      setSchemeList(updatedSchemeList);
      setFoliosFetched(true);
    }).catch(err => {
      console.log("This is error", err)
    })

  };
  const filteredSchemeList = schemeList.filter((scheme) => {
    if (isSipTransaction) {
      return scheme.sipAllowed && scheme.minSIPAmt;
    }

    if (isLumpsumTransaction) {
      return scheme.purchaseAllowed && scheme.minLumSumAmt;
    }

    return false;
  });

  const handleFolioSelection = () => {

    const total = schemeList.reduce((acc, scheme) => {
      const minAmount = scheme.amount ?? 0; // use 0 if undefined
      return acc + minAmount;
    }, 0);

    const minTotal = schemeList.reduce((acc, scheme) => {
      const minAmount = isSipTransaction ? Number(scheme.minSIPAmt) : Number(scheme.minLumSumAmt);
      return acc + minAmount;
    }, 0);

    if (!schemeList[0].start_date && isSipTransaction) {
      setDateErrorMsg("Please select sip day")
      return
    }

    if (total <= 0) {
      setAmountErrorMsg("Enter investment amount")
      return
    }
    for (let i = 0; i < filteredSchemeList.length; i++) {
      const scheme = filteredSchemeList[i];

      const minAmount = isSipTransaction
        ? Number(scheme.minSIPAmt)
        : Number(scheme.minLumSumAmt);

      const enteredAmount = Number(scheme.amount ?? 0);

      // Skip if minAmount is invalid
      if (!minAmount || isNaN(minAmount)) continue;

      if (enteredAmount < minAmount) {
        setAmountErrorMsg(
          `Minimum amount required for ${scheme.scheme}`
        );
        return;
      }
    }

    setSchemeList(filteredSchemeList);
    if (minTotal > total) {
      setAmountErrorMsg("Minimum investment amount is ₹" + minTotal)
      return
    }

    if (from === "portfolio" && isSipTransaction) {
      setOpenBankMandate(true)
      setShow(false)
      return
    } else if (from === "portfolio") {
      finalTransaction(schemeList, isSipTransaction ? keys.sip : keys.purchase, setSuccessData, true).then((res) => {
        setOpenSuccess(true)
        setShow(false)
        console.log(res);
        return
      })

    } else {
      setOpenSelectFolio(true)
      setShow(false)
    }

  }

  const addAmount = (value: number) => {
    const updatedAmount = amount + value;
    setAmount(updatedAmount);
    distributeAmount(updatedAmount);
  }

  const handleTransactionType = (type: boolean) => {
    setIsSipTransaction(type)
    handleMinAmount(type)
  }

  const handleMultipleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexToUpdate: number
  ) => {
    const newAmount = Number(e.target.value.trim());

    const updatedList = schemeList.map((item, index) => {
      if ((item.sipAllowed && isSipTransaction) || (item.purchaseAllowed && isLumpsumTransaction)) {
        if (index === indexToUpdate) {
          return {
            ...item,
            amount: newAmount,
          };
        }
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

    const perScheme = Math.floor(total / count);
    const remainder = total % count;

    const updatedList = schemeList?.map((item, index) => ({
      ...item,
      amount: perScheme + (index === 0 ? remainder : 0)
    }));
    setSchemeList(updatedList);
  };

  const handleMinAmount = async (type: boolean = isSipTransaction) => {
    if (!schemeList || schemeList.length === 0) return;

    const regex = /\bSIF\b|\bQSIF\b|long[\s\-]*short/i;

    const updatedSchemesPromises = schemeList.map(async (scheme: any) => {
      const minSip = Number(scheme.minSIPAmt ?? 0);
      const minLump = Number(scheme.minLumSumAmt ?? 0);

      const minAmount = type ? minSip : minLump;

      if (regex.test(String(scheme.scheme ?? ""))) {
        const hasFolioOrSIF = await fetchFolioFOrSIF(scheme.accordSchemeCode);

        return {
          ...scheme,
          minSIPAmt: hasFolioOrSIF ? minSip : 0,
          minLumSumAmt: hasFolioOrSIF ? minLump : 1000000,
          amount: hasFolioOrSIF ? (type ? minSip : minLump) : 1000000,
          start_date: daysAdded(30, sipDateList),
        } as any;
      } else {
        return {
          ...scheme,
          amount: minAmount,
          start_date: daysAdded(30, sipDateList),
        } as any;
      }
    });

    const updatedSchemes = await Promise.all(updatedSchemesPromises);

    const total = updatedSchemes.reduce((sum, s) => {
      const amt = Number((s as any).amount ?? 0);
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);

    // ✅ base = this min total (default amount shown in input)
    setSchemeList(updatedSchemes);
    setAmount(total);

    if (total > 0) {
      setShortcutValues([total * 2, total * 3, total * 5]);
    }
  };

  const fetchFolioFOrSIF = async (product_code: number): Promise<boolean> => {
    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) {
      setIsSipTransaction(false);
      return false;
    }

    const reqBody = {
      ucc: adminUser.ucc,
      product_code,
    };

    try {
      const res = await postRequest<foliosResponse>(endPoints.getSchemeFolios, reqBody);

      if (!res) {
        setIsSipTransaction(false);
        return false;
      }

      if (res.success && Array.isArray(res.data)) {
        const total = res.data.reduce((sum, item) => sum + Number(item.invested_amt ?? 0), 0);
        if (total >= 1000000) {
          return true;
        } else {
          setIsSipTransaction(false);
          return false;
        }
      } else {
        setIsSipTransaction(false);
        return false;
      }
    } catch (error) {
      setIsSipTransaction(false);
      return false;
    }
  };

  const handleSipDeduction = () => {
    setMinimumDate(!schemeList[0].firstSIPToday ? daysAdded(7, sipDateList) : daysAdded(7, sipDateList))
    setSchemeList((prev: any) =>
      prev.map((obj: any, index: number) =>
        index === 0
          ? { ...obj, firstSIPToday: !obj.firstSIPToday, } // Toggle the value
          : obj
      )
    );
  };
  const handleTerms = () => {
    window.open("/terms-and-conditions", "_blank");
  }



  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop={true}
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
                  <img src={(from === "portfolio" && schemeList.length === 1) ? imageUrl + schemeList[0]?.accordAMCCode + ".png" : money} height={35} width={35} alt="" className='rounded-2' />
                </div>
                <div className="ms-2 prod_icon_heading">
                  <h4>{(from === "portfolio" && schemeList.length === 1) ? schemeList[0]?.scheme : from.charAt(0).toUpperCase() + from?.slice(1) + " Funds"}</h4>
                  <p>Selected fund {schemeList?.length}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="row text-center mt-2">
              {checkTransactionAllowed(schemeList, keys.sip) &&
                <div className="col py-2 py-md-0">
                  <div className={`${isSipTransaction ? "text-white logobg_color" : "logoBlueColor"} w-100 border  text-center monthly_btn crPointer`} onClick={() => { handleTransactionType(true) }}> Monthly SIP</div>
                </div>}

              {(checkTransactionAllowed(schemeList, keys.purchase) && isLumpsumTransaction) &&
                <div className="col py-2 py-md-0">
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
                  }}>
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
              <input
                type="text"
                className="form-control"
                value={amount}
                onChange={(e) => handleAmount(e, 1000000, setAmount)}
                id="amountFor"
                placeholder="Enter Amount"
              />
              <span className='errorColor'>{amountErrorMsg}</span>
              <div className="mt-2">
                <button
                  type="button"
                  className="btn shortcutValue"
                  onClick={() => handleMinAmount(isSipTransaction)}
                >
                  Min.
                </button>
                <button
                  type="button"
                  className="btn shortcutValue mx-1"
                  onClick={() => addAmount(shortcutValues[0] || 0)}
                >
                  +<CurrencyRupee className='mb-1' />
                  {(shortcutValues[0] || 0).toLocaleString("en-IN")}
                </button>
                <button
                  type="button"
                  className="btn shortcutValue mx-1"
                  onClick={() => addAmount(shortcutValues[1] || 0)}
                >
                  +<CurrencyRupee className='mb-1' />
                  {(shortcutValues[1] || 0).toLocaleString("en-IN")}
                </button>
                <button
                  type="button"
                  className="btn shortcutValue mx-1"
                  onClick={() => addAmount(shortcutValues[2] || 0)}
                >
                  +<CurrencyRupee className='mb-1' />
                  {(shortcutValues[2] || 0).toLocaleString("en-IN")}
                </button>
              </div>
            </div>


            <p className='sip_amount_breakup12 fs14px mb-0'>Amount breakup</p>
            {schemeList?.map((item, index) => {
              const isDisabled =
                (isSipTransaction && !isLumpsumTransaction && !item.sipAllowed) ||
                (isLumpsumTransaction && !isSipTransaction && !item.purchaseAllowed);

              return (
                <div key={index} className="d-flex justify-content-between midpodgy_invest_conf py-1">
                  <div>
                    <span className={isDisabled ? "text-muted opacity-50 d-block mb-1" : "d-block mb-1"}>
                      {item?.scheme}
                    </span>

                    {(!item.sipAllowed && isSipTransaction && !isLumpsumTransaction) && (
                      <span className="small-dander-msg d-block mb-1">
                        Sip investment not allowed
                      </span>
                    )}

                    {(!item.purchaseAllowed && isLumpsumTransaction && !isSipTransaction) && (
                      <span className="small-dander-msg d-block mb-1">
                        Lumpsum investment not allowed
                      </span>
                    )}



                  </div>
                  <div>
                    <input
                      className="form-control py-1"
                      type="text"
                      placeholder="0"
                      value={item?.amount}
                      disabled={isDisabled}
                      onChange={(e) => handleMultipleAmount(e, index)}
                    />


                    <span className="errorColor">
                      {isSipTransaction
                        ? ((item?.amount ?? 0) < item.minSIPAmt
                          ? "Min amount " + item.minSIPAmt
                          : "")
                        : ((item?.amount ?? 0) < item.minLumSumAmt
                          ? "Min amount " + item.minLumSumAmt
                          : "")
                      }
                    </span>
                  </div>
                </div>
              )
            })}


            {isSipTransaction &&
              <div className="d-flex justify-content-center align-items-center mt-2 mb-0">
                <Form.Check
                  type="checkbox"
                  id="circleCheckbox"
                  className="circle-checkbox textColor"
                  onChange={handleSipDeduction}
                  checked={schemeList[0]?.firstSIPToday ?? true}
                  label="First instalment will be deducted T+2 days."
                  name="Sip deduction"
                />
              </div>}
          </div>
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>
            Units allotment is subject to realization of funds in AMC's A/c.
          </Card.Header>
        </Modal.Body>

        <small className="fs12px modal-bg text-center">
          By continuing, I agree with the <Disclaimer linkRef={disclaimerRef} /> and{' '}
          <div className='logoBlueColor crPointer' onClick={handleTerms}>Terms & Conditions</div>
        </small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleFolioSelection}>Continue</Button>
        </Modal.Footer>
      </Modal>

      <SelectFolioPopup
        show={openSelectFolio}
        setShow={setOpenSelectFolio}
        schemeList={schemeList}
        setSchemeList={setSchemeList}
        isSipTransaction={isSipTransaction}
      />
      <BankMandate
        show={openBankMandate}
        setShow={setOpenBankMandate}
        schemeList={schemeList}
        setSchemeList={setSchemeList}
        isSipTransaction={isSipTransaction}
        additionalPurchase={true}
      />
      <OrderPlaces
        show={openSuccess}
        setShow={setOpenSuccess}
        successData={successData}
      />
    </>
  );
}

export default InvetmentConfirmation;
