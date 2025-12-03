import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ArrowDown, ChevronDown } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { fetchAdminUser } from '../services/user/adminUser';
import { schemeSummaryKeys, schemeSummaryRes } from '../pages/data-interfaces/portfolio';
import { endPoints, imageUrl } from '../services/utils/urls';
import { postRequest } from '../services/Api/HandleApi';
import SwitchConfirmation from './SwitchConfirmation';
import DirectSchemeNote from '../components/DirectSchemeNote';
import PortfolioNotes from './PortfolioNotes';
import { filterDirectScheme } from '../services/utils/services';

interface SwitchFundProp {
  show: boolean;
  setShow: (show: boolean) => void;
  productCodes: number[];
  switchSchemeList: any[];
  number: string | '';
}

const SwitchFund: React.FC<SwitchFundProp> = ({
  show,
  setShow,
  productCodes,
  switchSchemeList,
  number
}) => {
  const [schemeData, setSchemeData] = useState<Record<number, any>>({});
  const [selectedSchemeList, setSelectedSchemeList] = useState<any[]>([]);
  const [openSwitchConfirmationModel, setOpenSwitchConfirmationModel] = useState<boolean>(false);
  const [openDirectNoteModel, setOpenDirectNoteModel] = useState<boolean>(false);
  // openKey will be like "0-source" or "0-target". null means all closed.
  const [openKey, setOpenKey] = useState<string | null>(null);

  // when we have less than 2 schemes, keep all sections open by default
  const openAllSchemes = switchSchemeList.length < 2;

  useEffect(() => {
    if (productCodes.length > 0) {
      fetchPerformanceScheme();
      directSchemes()
    }
  }, [productCodes]);
  const directSchemes = () => {

   
  }

  const fetchPerformanceScheme = async () => {
    try {
      const adminUser = fetchAdminUser();
      if (!adminUser?.ucc) {
        setSelectedSchemeList([]);
        return;
      }

      const reqBody = { product_codes: productCodes };
      const res = await postRequest<schemeSummaryRes>(
        endPoints.getSchemesPerformance,
        reqBody
      );

      if (!res.success) {
        setSelectedSchemeList([]);
        return;
      }

      const merged = mergedScheme(res.data || []);
      setSchemeData(merged);
      filteredSwitchSchemes();
    } catch (err) {
      console.error(err);
      setSelectedSchemeList([]);
    }
  };

  const filteredSwitchSchemes = () => {
    const data = switchSchemeList.map((item) => {
      return {
        fromAccordProductCode: item.accordSchemeCode ?? 0,
        toAccordProductCode: item?.target?.accordProductCode ?? 0,
        amount: 0,
        folioNumber: item?.folio ?? '',
        all_units: true,
        toScheme: item?.target?.scheme ?? '',
        fromScheme: item?.scheme ?? '',
        fromValue: item?.currentvalue ?? 0,
        installment_units: item?.unit ?? 0,
        isSwitchAmount: false,
        fromUnit: item?.unit ?? 0,
        fromAccordAMCCode: item?.accordAMCCode ?? 0,
        toAccordAMCCode: item?.target?.accordAmcCode ?? 0,
        id: crypto.randomUUID()
      };
    });

    setSelectedSchemeList(data);
  };

  function mergedScheme(schemes: schemeSummaryKeys[]) {
    const byCode = new Map(schemes.map((s) => [s.accordProductCode, s]));
    let result: Record<number, any> = {};
    for (const id of productCodes) {
      result[id] = byCode.get(id) ?? null;
    }
    return result;
  }

  const toggleAtKey = (key: string) => {
    // when we are forcing all open (less than 2 schemes),
    // we keep them always open, so no toggle
    if (openAllSchemes) return;
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const renderCollapsedHeader = (
    idx: number,
    keyPrefix: 'source' | 'target',
    itemData: any,
    folio: string = '',
    forceOpen: boolean = false
  ) => {
    const key = `${idx}-${keyPrefix}`;
    const isOpen = forceOpen || openKey === key;

    return (
      <div
        role="button"
        onClick={() => toggleAtKey(key)}
        className="d-flex align-items-center justify-content-between w-100 p-2"
        style={{ cursor: 'pointer' }}
      >
        <div className="d-flex align-items-center">
          <img
            src={imageUrl + (itemData?.accordAmcCode ?? '') + '.png'}
            height={35}
            width={35}
            alt=""
            className="rounded"
          />
          <div className="ps-2">
            <p className="fs16px mb-0">{itemData?.scheme ?? '—'}</p>
            {folio ? (
              <p className="fs12px mb-0 text-muted">Folio:{folio}</p>
            ) : (
              itemData?.scheme_sub_category &&
              (<p className="fs12px mb-0 text-muted">
                Category: {itemData?.scheme_sub_category}
              </p>)
            )}
          </div>
        </div>
        <div className="d-flex align-items-center">
          {/* rotate the arrow when open */}
          <div
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          >
            <ChevronDown />
          </div>
        </div>
      </div>
    );
  };

  const handleSwitchTransaction = () => {
    const hasDirect = selectedSchemeList.some((item) =>
      item?.fromScheme?.toLowerCase()?.includes('direct')
    );
  
    setSelectedSchemeList(filterDirectScheme(selectedSchemeList));
    if (hasDirect || selectedSchemeList.length === 0) {
      setOpenDirectNoteModel(true);
    } else {
      setShow(false);
      setOpenSwitchConfirmationModel(true);
    }
  };

  const removeDirectScheme = (type: string) => {
    if (type === 'RM') {
      window.location.href = `tel:${number ?? ''}`;
    } else {
      const filtered = selectedSchemeList.filter((item: any) => {
        return !item.fromScheme.toLowerCase().includes('direct');
      });
      setSelectedSchemeList(filtered);
      setOpenSwitchConfirmationModel(true);
      setShow(false);
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
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Switch-Fund Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg ">
          <PortfolioNotes portfolioType={'switch'} />
          {switchSchemeList.length > 0 ? (
            switchSchemeList.map((item, index) => {
              const sourceData = schemeData[item?.accordSchemeCode] ?? null;
              const targetData = schemeData[item?.target?.accordProductCode] ?? null;

              const sourceKey = `${index}-source`;
              const targetKey = `${index}-target`;

              const isSourceOpen = openAllSchemes || openKey === sourceKey;
              const isTargetOpen = openAllSchemes || openKey === targetKey;

              return (
                <div key={index} className=" rounded-4 my-2">
                  <Card className="rounded-4 shadow-lg ">
                    {/* Collapsed header for source */}
                    {renderCollapsedHeader(
                      index,
                      'source',
                      sourceData,
                      item?.folio,
                      openAllSchemes
                    )}

                    {/* Expanded details for source */}
                    {isSourceOpen && (
                      <Card.Body>
                        <div className="row">
                          {sourceData?.ideal_investment_period && (
                            <>
                              <div className="col-5 d-flex justify-content-end mt-2">
                                <p className="fs12px">IDEAL INVESTMENT PERIOD</p>
                              </div>
                              <div className="col-7 d-flex justify-content-end">
                                <p className="fs12px text-dark align-self-center" >
                                  {sourceData?.ideal_investment_period} Years
                                </p>
                              </div>
                            </>
                          )}
                          {sourceData?.fund_returns && (
                            <>
                              <div className="col-5 d-flex justify-content-end mb-0">
                                <p className="fs12px">FUND 5Y CAGR</p>
                              </div>
                              <div className="col-5 progress sqrBar mb-0">
                                <div
                                  className="progress-bar logobg_color "
                                  style={{
                                    width: (sourceData?.fund_returns ?? 0) + '%'
                                  }}
                                ></div>
                              </div>
                              <div className="col-2 d-flex justify-content-end mb-0">
                                <p className="fs12px text-dark">
                                  {sourceData?.fund_returns?.toFixed(2) ?? 0}%
                                </p>
                              </div>
                            </>
                          )}
                          {sourceData?.benchmark_returns && (
                            <>
                              <div className="col-5 d-flex justify-content-end mb-0">
                                <p className="fs12px">BENCHMARK 5Y CAGR</p>
                              </div>
                              <div className="col-5 progress sqrBar bg-white mb-0">
                                <div
                                  className="progress-bar orangeBg "
                                  style={{
                                    width: (sourceData?.benchmark_returns ?? 0) + '%'
                                  }}
                                ></div>
                              </div>
                              <div className="col-2 d-flex justify-content-end mb-0">
                                <p className="fs12px text-dark">
                                  {sourceData?.benchmark_returns?.toFixed(2) ?? 0}%
                                </p>
                              </div>
                            </>
                          )}
                          {sourceData?.category_returns && (
                            <>
                              <div className="col-5 d-flex justify-content-end bg-white mb-0">
                                <p className="fs12px">CATEGORY 5Y CAGR</p>
                              </div>
                              <div className="col-5 progress sqrBar bg-white mb-0">
                                <div
                                  className="progress-bar orangeBg "
                                  style={{
                                    width: (sourceData?.category_returns ?? 0) + '%'
                                  }}
                                ></div>
                              </div>
                              <div className="col-2 d-flex justify-content-end">
                                <p className="fs12px text-dark">
                                  {sourceData?.category_returns?.toFixed(2) ?? 0}%
                                </p>
                              </div>
                            </>
                          )}
                          {sourceData?.negative_observations && (
                            <>
                              <div className="col-10">
                                <p className="fs12px">NEGATIVE OBSERVATIONS</p>
                              </div>
                              <div className="col-2 d-flex justify-content-end">
                                <p className="fs12px text-dark">
                                  {sourceData?.negative_observations ?? 'NA'}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </Card.Body>
                    )}

                    <div className="d-flex align-items-center">
                      <hr className="flex-grow-1 ms-4" />
                      <div className="rounded-4 lightTrxBtn">
                        <ArrowDown /> SWITCH TO
                      </div>
                      <hr className="flex-grow-1 me-4" />
                    </div>

                    {/* Collapsed header for target */}
                    {renderCollapsedHeader(
                      index,
                      'target',
                      targetData,
                      '',
                      openAllSchemes
                    )}

                    {/* Expanded details for target */}
                    {isTargetOpen && (
                      <Card.Body>
                        <div className="row">
                          {targetData?.ideal_investment_period && (
                            <>
                              <div className="col-5 d-flex justify-content-end mt-2">
                                <p className="fs12px">IDEAL INVESTMENT PERIOD</p>
                              </div>
                              <div className="col-7 d-flex justify-content-end">
                                <p className="fs12px text-dark align-self-center">
                                  {targetData?.ideal_investment_period} Years
                                </p>
                              </div>
                            </>
                          )}
                          {targetData?.fund_returns && (
                            <>
                              <div className="col-5 d-flex justify-content-end mb-0">
                                <p className="fs12px">FUND 5Y CAGR</p>
                              </div>
                              <div className="col-5 progress sqrBar mb-0">
                                <div
                                  className="progress-bar logobg_color "
                                  style={{
                                    width: (targetData?.fund_returns ?? 0) + '%'
                                  }}
                                ></div>
                              </div>
                              <div className="col-2 d-flex justify-content-end mb-0">
                                <p className="fs12px text-dark">
                                  {targetData?.fund_returns?.toFixed(2) ?? 0}%
                                </p>
                              </div>
                            </>
                          )}
                          {targetData?.benchmark_returns && (
                            <>
                              <div className="col-5 d-flex justify-content-end mb-0">
                                <p className="fs12px">BENCHMARK 5Y CAGR</p>
                              </div>
                              <div className="col-5 progress sqrBar bg-white mb-0">
                                <div
                                  className="progress-bar orangeBg "
                                  style={{
                                    width: (targetData?.benchmark_returns ?? 0) + '%'
                                  }}
                                ></div>
                              </div>
                              <div className="col-2 d-flex justify-content-end mb-0">
                                <p className="fs12px text-dark">
                                  {targetData?.benchmark_returns?.toFixed(2) ?? 0}%
                                </p>
                              </div>
                            </>
                          )}
                          {targetData?.category_returns && (
                            <>
                              <div className="col-5 d-flex justify-content-end bg-white mb-0">
                                <p className="fs12px">CATEGORY 5Y CAGR</p>
                              </div>
                              <div className="col-5 progress sqrBar bg-white mb-0">
                                <div
                                  className="progress-bar orangeBg "
                                  style={{
                                    width: (targetData?.category_returns ?? 0) + '%'
                                  }}
                                ></div>
                              </div>
                              <div className="col-2 d-flex justify-content-end">
                                <p className="fs12px text-dark">
                                  {targetData?.category_returns?.toFixed(2) ?? 0}%
                                </p>
                              </div>
                            </>
                          )}
                          {targetData?.negative_observations && (
                            <>
                              <div className="col-10">
                                <p className="fs12px">NEGATIVE OBSERVATIONS</p>
                              </div>
                              <div className="col-2 d-flex justify-content-end">
                                <p className="fs12px text-dark">
                                  {targetData?.negative_observations ?? 'NA'}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </Card.Body>
                    )}
                  </Card>
                </div>
              );
            })
          ) : (
            <div>No schemes to switch</div>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-bg">
          <Button className="customButton " onClick={handleSwitchTransaction}>
            Switch
          </Button>
        </Modal.Footer>
      </Modal>
      <DirectSchemeNote
        show={openDirectNoteModel}
        setShow={setOpenDirectNoteModel}
        msg={
          'Your portfolio includes a few investments under the Direct Plan, which cannot be transacted through our app. You may proceed with the Regular Plan schemes or connect with our expert for guidance.'
        }
        removeDirectScheme={removeDirectScheme}
        schemeLength={selectedSchemeList.length}
      />
      <SwitchConfirmation
        show={openSwitchConfirmationModel}
        setShow={setOpenSwitchConfirmationModel}
        cartItem={selectedSchemeList}
        setCartItem={setSelectedSchemeList}
      />
    </>
  );
};

export default SwitchFund;
