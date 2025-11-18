import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ArrowDown, ChevronDown } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { fetchAdminUser } from '../services/user/adminUser';
import { portfolioReviewKeys, schemeSummaryKeys, schemeSummaryRes } from '../pages/data-interfaces/portfolio';
import { endPoints, imageUrl } from '../services/utils/urls';
import { postRequest } from '../services/Api/HandleApi';
import { cartItemKey, schemeDeatilDataKeys } from '../pages/data-interfaces/transact';
import { Form } from 'react-bootstrap';
import SwitchConfirmation from './SwitchConfirmation';

interface SwitchFundProp {
  show: boolean;
  setShow: (show: boolean) => void;
  productCodes: number[];
  switchSchemeList: any[];
}

const SwitchFund: React.FC<SwitchFundProp> = ({ show, setShow, productCodes, switchSchemeList }) => {
  const [schemeList, setSchemeList] = useState<any[]>([]);
  const [schemeData, setSchemeData] = useState<Record<number, any>>({});
  const [selectedSchemeList, setSelectedSchemeList] = useState<any[]>([]);
  const [openSwitchConfirmationModel,setOpenSwitchConfirmationModel] = useState<boolean>(false)
  // openKey will be like "0-source" or "0-target". null means all closed.
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    fetchPerformanceScheme();
  }, [productCodes]);

  const fetchPerformanceScheme = async () => {
    try {
      const adminUser = fetchAdminUser();
      if (!adminUser?.ucc) {
        setSchemeList([]);
        setSelectedSchemeList([]);
        return;
      }

      const reqBody = { product_codes: productCodes };
      const res = await postRequest<schemeSummaryRes>(endPoints.getSchemesPerformance, reqBody);

      if (!res.success) {
        setSchemeList([]);
        setSelectedSchemeList([]);
        return;
      }

      setSchemeList(res.data || []);
      const merged = mergedScheme(res.data || []);
      setSchemeData(merged);
      filteredSwitchSchemes()

    } catch (err) {
      console.error(err);
      setSchemeList([]);
      setSelectedSchemeList([]);
    }
  };

  const filteredSwitchSchemes = () => {
    const data = switchSchemeList.map((item) => {
      return {
        fromAccordProductCode: item.accordSchemeCode??0,
        toAccordProductCode: item?.target?.accordProductCode??0,
        amount: 0,
        folioNumber: item?.folio??"",
        all_units: true,
        toScheme: item?.target?.scheme??"",
        fromScheme: item?.scheme??"",
        fromValue: item?.currentvalue??0,
        installment_units:item?.unit??0,
        isSwitchAmount:false,
        fromUnit: item?.unit??0,
        fromAccordAMCCode: item?.accordAMCCode??0,
        toAccordAMCCode: item?.target?.accordAmcCode??0,
         id: crypto.randomUUID()
      }
    })
    console.log("data",data);
    
    setSelectedSchemeList(data)
  }
  function mergedScheme(schemes: schemeSummaryKeys[]) {
    const byCode = new Map(schemes.map(s => [s.accordProductCode, s]));
    let result: Record<number, any> = {};
    for (const id of productCodes) {
      result[id] = byCode.get(id) ?? null;
    }
    return result;
  }

  const toggleAtKey = (key: string) => {
    setOpenKey(prev => (prev === key ? null : key));
  };

  const renderCollapsedHeader = (idx: number, keyPrefix: 'source' | 'target', itemData: any, folio: string = "") => {
    const key = `${idx}-${keyPrefix}`;
    const isOpen = openKey === key;


    return (
      <div
        role="button"
        onClick={() => toggleAtKey(key)}
        className="d-flex align-items-center justify-content-between w-100 p-2"
        style={{ cursor: 'pointer' }}
      >
        <div className="d-flex align-items-center">
          <img src={imageUrl + (itemData?.accordAmcCode ?? '') + '.png'} height={35} width={35} alt="" className='rounded' />
          <div className="ps-2">
            <p className="fs16px mb-0">{itemData?.scheme ?? '—'}</p>
            {folio ? <p className="fs12px mb-0 text-muted">Folio:{folio}</p> : <p className="fs12px mb-0 text-muted">Category:{itemData?.scheme_sub_category}</p>}
            {/* <p className="fs12px mb-0 text-muted">{itemData?.ideal_investment_period ? `${itemData.ideal_investment_period} Years` : ''}</p> */}
          </div>
        </div>
        <div className="d-flex align-items-center">
          {/* rotate the arrow when open */}
          <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <ChevronDown />
          </div>
        </div>
      </div>
    );
  };

  const handleSwitchTransaction = ()=>{
    setShow(false)
    setOpenSwitchConfirmationModel(true)
  }
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title>Switch-Fund Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg '>
          {switchSchemeList.length > 0 ? switchSchemeList.map((item, index) => {

            const sourceData = schemeData[item?.accordSchemeCode] ?? null;
            const targetData = schemeData[item?.target?.accordProductCode] ?? null;

            const sourceKey = `${index}-source`;
            const targetKey = `${index}-target`;

            const isSourceOpen = openKey === sourceKey;
            const isTargetOpen = openKey === targetKey;

            return (
              <div key={index} className=' rounded-4 my-2'>
                <Card className='rounded-4 shadow-lg '>
                  {/* Collapsed header for source */}
                  {renderCollapsedHeader(index, 'source', sourceData, item?.folio)}

                  {/* Expanded details for source */}
                  {isSourceOpen && (
                    <Card.Body>
                      <div className="row">
                        {/* <div className="col-12 d-flex align-items-start">
                          <img src={imageUrl + (sourceData?.accordAmcCode ?? '') + ".png"} height={35} width={35} alt="" className='rounded' />
                          <div className=" ps-2">
                            <p className="fs16px">{sourceData?.scheme}</p>
                          </div>
                        </div> */}

                        <div className="col-5 d-flex justify-content-end mt-2">
                          <p className='fs12px'>IDEAL INVEST. HORIZEN</p>
                        </div>
                        <div className="col-7 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{sourceData?.ideal_investment_period} Years</p>
                        </div>

                        <div className="col-5 d-flex justify-content-end mb-0">
                          <p className='fs12px'>FUND RETURN</p>
                        </div>
                        <div className="col-5 progress sqrBar mb-0">
                          <div className="progress-bar logobg_color " style={{ width: (sourceData?.fund_returns ?? 0) + "%" }}></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end mb-0">
                          <p className='fs12px text-dark'>{sourceData?.fund_returns ?? 0}%</p>
                        </div>

                        <div className="col-5 d-flex justify-content-end mb-0">
                          <p className='fs12px'>BENCHMARK RETURN</p>
                        </div>
                        <div className="col-5 progress sqrBar bg-white mb-0">
                          <div className="progress-bar orangeBg " style={{ width: (sourceData?.benchmark_returns ?? 0) + "%" }}></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end mb-0">
                          <p className='fs12px text-dark'>{sourceData?.benchmark_returns ?? 0}%</p>
                        </div>

                        <div className="col-5 d-flex justify-content-end bg-white mb-0">
                          <p className='fs12px'>CATEGORY RETURN</p>
                        </div>
                        <div className="col-5 progress sqrBar bg-white mb-0">
                          <div className="progress-bar orangeBg " style={{ width: (sourceData?.category_returns ?? 0) + "%" }}></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{sourceData?.category_returns ?? 0}%</p>
                        </div>

                        <div className="col-10">
                          <p className='fs12px'>NEGATIVE OBSERVATIONS</p>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{sourceData?.negative_observations ?? "NA"}</p>
                        </div>
                        <div className="col-6">
                          <p className='fs12px'>NOTE</p>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{sourceData?.negative_observations ?? "NA"}</p>
                        </div>
                      </div>
                    </Card.Body>
                  )}

                  <div className="d-flex align-items-center">
                    <hr className="flex-grow-1 ms-4" />
                    <div className='rounded-4 lightTrxBtn'><ArrowDown /> SWITCH</div>
                    <hr className="flex-grow-1 me-4" />
                  </div>

                  {/* Collapsed header for target */}
                  {renderCollapsedHeader(index, 'target', targetData)}

                  {/* Expanded details for target */}
                  {isTargetOpen && (
                    <Card.Body>
                      <div className="row">
                        {/* <div className="col-12 d-flex align-items-start">
                          <img src={imageUrl + (targetData?.accordAmcCode ?? '') + ".png"} height={35} width={35} alt="" className='rounded' />
                          <div className=" ps-2">
                            <p className="fs16px">{targetData?.scheme}</p>
                          </div>
                        </div> */}

                        <div className="col-5 d-flex justify-content-end mt-2">
                          <p className='fs12px'>IDEAL INVEST. HORIZEN</p>
                        </div>
                        <div className="col-7 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{targetData?.ideal_investment_period} Years</p>
                        </div>

                        <div className="col-5 d-flex justify-content-end mb-0">
                          <p className='fs12px'>FUND RETURN</p>
                        </div>
                        <div className="col-5 progress sqrBar mb-0">
                          <div className="progress-bar logobg_color " style={{ width: (targetData?.fund_returns ?? 0) + "%" }}></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end mb-0">
                          <p className='fs12px text-dark'>{targetData?.fund_returns ?? 0}%</p>
                        </div>

                        <div className="col-5 d-flex justify-content-end mb-0">
                          <p className='fs12px'>BENCHMARK RETURN</p>
                        </div>
                        <div className="col-5 progress sqrBar bg-white mb-0">
                          <div className="progress-bar orangeBg " style={{ width: (targetData?.benchmark_returns ?? 0) + "%" }}></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end mb-0">
                          <p className='fs12px text-dark'>{targetData?.benchmark_returns ?? 0}%</p>
                        </div>

                        <div className="col-5 d-flex justify-content-end bg-white mb-0">
                          <p className='fs12px'>CATEGORY RETURN</p>
                        </div>
                        <div className="col-5 progress sqrBar bg-white mb-0">
                          <div className="progress-bar orangeBg " style={{ width: (targetData?.category_returns ?? 0) + "%" }}></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{targetData?.category_returns ?? 0}%</p>
                        </div>

                        <div className="col-10">
                          <p className='fs12px'>NEGATIVE OBSERVATIONS</p>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{targetData?.negative_observations ?? "NA"}</p>
                        </div>
                        <div className="col-6">
                          <p className='fs12px'>NOTE</p>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                          <p className='fs12px text-dark'>{targetData?.negative_observations ?? "NA"}</p>
                        </div>
                      </div>
                    </Card.Body>
                  )}

                </Card>
              </div>
            );

          }) : <div>No schemes to switch</div>}

        </Modal.Body>
        <Modal.Footer className='modal-bg'>
          <Button className='customButton 'onClick={handleSwitchTransaction}>Switch</Button>
        </Modal.Footer>
      </Modal>
        <SwitchConfirmation show={openSwitchConfirmationModel} setShow={setOpenSwitchConfirmationModel} cartItem={selectedSchemeList} setCartItem={setSelectedSchemeList} />
    </>
  );
}

export default SwitchFund;
