import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ChevronDown } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { fetchAdminUser } from '../services/user/adminUser';
import { schemeSummaryKeys, schemeSummaryRes } from '../pages/data-interfaces/portfolio';
import { endPoints, imageUrl } from '../services/utils/urls';
import { postRequest } from '../services/Api/HandleApi';
import RedumptionConfirmation from './RedumptionConfirmation';
import PortfolioNotes from './PortfolioNotes';
import DirectSchemeNote from './DirectSchemeNote';
import { filterDirectSchemeForInvest } from '../services/utils/services';

interface RedemptionPerformanceProp {
  show: boolean;
  setShow: (show: boolean) => void;
  productCodes: number[];
  redemptionList: any[];
  number:string
}

const RedemptionPerformance: React.FC<RedemptionPerformanceProp> = ({ show, setShow, productCodes, redemptionList,number }) => {
  const [schemeData, setSchemeData] = useState<Record<number, any>>({});
  const [selectedSchemeList, setSelectedSchemeList] = useState<any[]>([]);
  const [openRedemptionCOnfirmationModel, setOpenRedemptionCOnfirmationModel] = useState<boolean>(false)
  // openKey will be like "0-source" or "0-target". null means all closed.
  const [openKey, setOpenKey] = useState<string | null>(null);
 const [openDirectNoteModel, setOpenDirectNoteModel] = useState<boolean>(false)

  useEffect(() => {
    if (productCodes.length > 0) {
      fetchPerformanceScheme();
    }
  }, [productCodes]);
  

  const fetchPerformanceScheme = async () => {
    try {
      const adminUser = fetchAdminUser();
      if (!adminUser?.ucc) {
        setSelectedSchemeList([]);
        return;
      }

      const reqBody = { product_codes: productCodes };
      const res = await postRequest<schemeSummaryRes>(endPoints.getSchemesPerformance, reqBody);

      if (!res.success) {
        setSelectedSchemeList([]);
        return;
      }

      const merged = mergedScheme(res.data || []);
      setSchemeData(merged);
      filteredRedemptionSchemes()

    } catch (err) {
      console.error(err);
      setSelectedSchemeList([]);
    }
  };

  const filteredRedemptionSchemes = () => {
    const data = redemptionList.map((item) => {
      return {
        ...item,
        redemption_units: item.unit,
        amount: 0,
        all_units: true,
        isRedeemAmount: false,
        id: crypto.randomUUID()
      }
    })

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

  const renderCollapsedHeader = (idx: number, keyPrefix: 'source', itemData: any, folio: string = "") => {
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

  const handleRedeemTransaction = () => {
  
      const hasDirect = selectedSchemeList.some(item =>
      item?.scheme?.toLowerCase()?.includes("direct")
    );
    setSelectedSchemeList(filterDirectSchemeForInvest(selectedSchemeList))
    if (hasDirect|| selectedSchemeList.length===0){ 
      setOpenDirectNoteModel(true)
    }else{
      setShow(false)
      setOpenRedemptionCOnfirmationModel(true)
    }
  }
    const removeDirectScheme = (type:string)=>{
    if(type==="RM"){
      window.location.href = `tel:${(number??"")}`
    }else{
    const filtered = selectedSchemeList.filter((item:any)=>{
      return !item.scheme.toLowerCase().includes("direct")
     })
    setSelectedSchemeList(filtered)
    setOpenRedemptionCOnfirmationModel(true)
    setShow(false)
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
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title>Redemption-Fund Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg '>
          <PortfolioNotes portfolioType='redemption' />
          {redemptionList.length > 0 ? redemptionList.map((item, index) => {

            const sourceData = schemeData[item?.accordSchemeCode] ?? null;

            const sourceKey = `${index}-source`;

            const isSourceOpen = openKey === sourceKey;

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
                        {sourceData?.ideal_investment_period && <>
                          <div className="col-5 d-flex justify-content-end mt-2">
                            <p className='fs12px'>IDEAL INVESTMENT PERIOD</p>
                          </div>
                          <div className="col-7 d-flex justify-content-end">
                            <p className='fs12px text-dark'>{sourceData?.ideal_investment_period} Years</p>
                          </div>
                        </>}
                        {sourceData?.fund_returns && <>
                          <div className="col-5 d-flex justify-content-end mb-0">
                            <p className='fs12px'>FUND 5Y CAGR</p>
                          </div>
                          <div className="col-5 progress sqrBar mb-0">
                            <div className="progress-bar logobg_color " style={{ width: (sourceData?.fund_returns ?? 0) + "%" }}></div>
                          </div>
                          <div className="col-2 d-flex justify-content-end mb-0">
                            <p className='fs12px text-dark'>{sourceData?.fund_returns ?? 0}%</p>
                          </div></>
                        }{sourceData?.benchmark_returns && <>
                          <div className="col-5 d-flex justify-content-end mb-0">
                            <p className='fs12px'>BENCHMARK 5Y CAGR</p>
                          </div>
                          <div className="col-5 progress sqrBar bg-white mb-0">
                            <div className="progress-bar orangeBg " style={{ width: (sourceData?.benchmark_returns ?? 0) + "%" }}></div>
                          </div>
                          <div className="col-2 d-flex justify-content-end mb-0">
                            <p className='fs12px text-dark'>{sourceData?.benchmark_returns ?? 0}%</p>
                          </div>
                        </>}
                        {sourceData?.category_returns && <>
                          <div className="col-5 d-flex justify-content-end bg-white mb-0">
                            <p className='fs12px'>CATEGORY 5Y CAGR</p>
                          </div>
                          <div className="col-5 progress sqrBar bg-white mb-0">
                            <div className="progress-bar orangeBg " style={{ width: (sourceData?.category_returns ?? 0) + "%" }}></div>
                          </div>
                          <div className="col-2 d-flex justify-content-end">
                            <p className='fs12px text-dark'>{sourceData?.category_returns ?? 0}%</p>
                          </div>
                        </>}
                        {sourceData?.negative_observations && <>
                          <div className="col-10">
                            <p className='fs12px'>NEGATIVE OBSERVATIONS</p>
                          </div>
                          <div className="col-2 d-flex justify-content-end">
                            <p className='fs12px text-dark'>{sourceData?.negative_observations ?? "NA"}</p>
                          </div>
                        </>}

                      </div>
                    </Card.Body>
                  )}

                </Card>
              </div>
            );

          }) : <div>No schemes </div>}

        </Modal.Body>
        <Modal.Footer className='modal-bg'>
          <Button className='customButton ' onClick={handleRedeemTransaction}>Redeem</Button>
        </Modal.Footer>
      </Modal>
      <RedumptionConfirmation show={openRedemptionCOnfirmationModel} setShow={setOpenRedemptionCOnfirmationModel} redeemList={selectedSchemeList} setRedeemList={setSelectedSchemeList} />
            <DirectSchemeNote show={openDirectNoteModel} setShow={setOpenDirectNoteModel} msg={"Your portfolio includes a few investments under the Direct Plan, which cannot be transacted through our app. You may proceed with the Regular Plan schemes or connect with our expert for guidance."} removeDirectScheme={removeDirectScheme} schemeLength={selectedSchemeList.length}/>
    </>
  );
}

export default RedemptionPerformance;
