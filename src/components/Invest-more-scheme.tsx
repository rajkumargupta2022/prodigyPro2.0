import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { endPoints, imageUrl } from '../services/utils/urls';
import {
  portfolioReviewKeys,
  schemeSummaryKeys,
  schemeSummaryRes
} from '../pages/data-interfaces/portfolio';
import { postRequest } from '../services/Api/HandleApi';
import { fetchAdminUser } from '../services/user/adminUser';
import { ChevronRight } from 'react-bootstrap-icons';
import InvetmentConfirmation from './InvestmentConfirmation';
import PortfolioNotes from './PortfolioNotes';
import DirectSchemeNote from './DirectSchemeNote';
import {  filterDirectSchemeForInvest } from '../services/utils/services';

interface InvestMoreScheme {
  show: boolean;
  setShow: (show: boolean) => void;
  productCodes: number[];
  satisfactorySchemeList?: portfolioReviewKeys[];
  number: string;
}

const InvestMoreScheme: React.FC<InvestMoreScheme> = ({
  show,
  setShow,
  productCodes,
  satisfactorySchemeList,
  number
}) => {
  const [schemeList, setSchemeList] = useState<schemeSummaryKeys[]>([]);
  const [selectedSchemeList, setSelectedSchemeList] = useState<schemeSummaryKeys[]>([]);

  const [openInvestMore, setOpenInvestMore] = useState<boolean>(false);
  const [sipDateList, setSipDateList] = useState<number[]>([]);
  const [openDirectNoteModel, setOpenDirectNoteModel] = useState<boolean>(false);

  // openIndex will store the index of the currently expanded scheme (or null)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 👉 If there are 2 or fewer schemes, keep all performance panels open
  const openAll = schemeList.length <= 2;

  useEffect(() => {
    if (productCodes.length > 0) {
      fetchPerformanceScheme();
    }
  }, [productCodes]);

  const fetchPerformanceScheme = async () => {
    try {
      const adminUser = fetchAdminUser();
      if (!adminUser?.ucc) {
        return;
      }

      const reqBody = { product_codes: productCodes };
      const res = await postRequest<schemeSummaryRes>(
        endPoints.getSchemesPerformance,
        reqBody
      );

      if (!res.success) {
        setSchemeList([]);
        setSelectedSchemeList([]);
        return;
      }

      const total = res.data.reduce(
        (sum, item) => sum + Number(item.min_sip_amount),
        0
      );

      const transformed = res.data.map((item: schemeSummaryKeys) => {
        // ensure numeric values for arithmetic
        const minSIP = Number(item.min_sip_amount ?? 0);
        const match = satisfactorySchemeList?.find(
          (s: any) => s.accordSchemeCode === item.accordProductCode
        );


        return {
          ...item,
          accordSchemeCode: item.accordProductCode,
          accordAMCCode: item.accordAmcCode,
          nseProductCode:match?.nseProductCode??"",
          nseAMCCode:match?.nseAMCCode??"",
          minSIPAmt: minSIP,
          minLumSumAmt: Number(item.min_purchase_amount ?? 0),
          sipAllowed: item.sip_allowed,
          sipDateList: item.sip_dates,
          purchaseAllowed: item.purchase_allowed,
          totalAmount: total,
          folio: match?.folio ?? ''
        };
      });

      setSchemeList(transformed);

      const filtered = transformed.filter((item: any) => {
        return !item.scheme.toLowerCase().includes('direct');
      });
      console.log("filtered",filtered);
      
      setSelectedSchemeList(filtered);
      handleSipIntersection(filtered);
    } catch (err) {
      console.error(err);
      setSchemeList([]);
      setSelectedSchemeList([]);
    }
  };

 const handleSipIntersection = (data: schemeSummaryKeys[] = []) => {
  if (!data || data.length === 0) {
    setSipDateList([]);
    return;
  }

  // map to arrays (ensure arrays) then reduce from first array
  const lists = data.map((scheme) => scheme.sipDateList ?? []);
  if (lists.length === 0) {
    setSipDateList([]);
    return;
  }

  const intersection = lists.reduce((acc, curr) =>
    acc.filter((date) => curr.includes(date))
  );

  setSipDateList(intersection);
};


  const handleSelectedScheme = (item: schemeSummaryKeys) => {
    if (!item?.scheme?.toLowerCase().includes('direct')) {
      setSelectedSchemeList((prev) => {
        const alreadySelected = prev.find(
          (scheme) => scheme.accordProductCode === item.accordProductCode
        );
        if (alreadySelected) {
          return prev.filter(
            (scheme) => scheme.accordProductCode !== item.accordProductCode
          );
        } else {
          return [...prev, item];
        }
      });
    }
  };

  // toggles the panel for a specific index; only one open at a time (when not openAll)
  const toggleAtIndex = (index: number) => {
    if (openAll) return; // 👉 do nothing when all must stay open
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleInvestMore = () => {
    const hasDirect = schemeList.some((item) =>
      item?.scheme?.toLowerCase()?.includes('direct')
    );

    setSelectedSchemeList(filterDirectSchemeForInvest(selectedSchemeList));
    if (hasDirect) {
      setOpenDirectNoteModel(true);
    } else {
      setOpenInvestMore(true);
      setShow(false);
    }
  };

  const removeDirectScheme = (type: string) => {
    if (type === 'RM') {
      window.location.href = `tel:${number ?? ''}`;
      setShow(false);
    } else {
      setOpenInvestMore(true);
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
          <Modal.Title>Invest More</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <PortfolioNotes portfolioType="satisfactory_performance" />

          {schemeList?.map((item, index) => {
            
            const isChecked = selectedSchemeList?.some(
              (scheme) => scheme?.accordProductCode === item.accordProductCode
            );
            const panelId = `performance-panel-${item.accordProductCode ?? index}`;
            const checkboxId = `checkbox-${item.accordProductCode ?? index}`;
            const idDirect = !item?.scheme?.toLowerCase().includes('direct');

            const isPanelOpen = openAll || openIndex === index;

            return (
              <div
                className="bg-white my-2 rounded-4 form_shadow"
                key={item.accordProductCode ?? index}
              >
                {/* Row click toggles ONLY this panel (unless openAll) */}
                <div
                  className="row borderColor py-2 px-4 crPointer"
                  onClick={() => {
                    if (!openAll) toggleAtIndex(index);
                  }}
                >
                  <div className="round col-11">
                    {idDirect && (
                      <>
                        <input
                          type="checkbox"
                          id={checkboxId}
                          checked={!!isChecked}
                          // Stop row toggle when clicking checkbox
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => handleSelectedScheme(item)}
                        />
                        <label htmlFor={checkboxId}></label>
                      </>
                    )}

                    <img
                      src={`${imageUrl + item?.accordAmcCode}.png`}
                      className="rounded"
                      height={30}
                      width={30}
                      alt=""
                    />
                    <div className="">
                      <small className="mx-2">{item.scheme}</small>
                      <p className="fs12px my-0 mx-2">
                        Folio: {item.folio ?? 'NA'}
                      </p>
                    </div>
                  </div>

                  <div
                    className="col-1 adjustText pb-2 crPointer text-end"
                    // prevent the chevron click from bubbling
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!openAll) toggleAtIndex(index);
                    }}
                  >
                    <ChevronRight
                      style={{
                        transform: isPanelOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                      }}
                    />
                  </div>
                </div>

                {/* Panel: open if openAll or this index === openIndex */}
                <div
                  id={panelId}
                  className={`performance-panel collapse-anim ${
                    isPanelOpen ? 'open' : ''
                  }`}
                >
                  <div className="row px-4">
                    {item.ideal_investment_period && (
                      <>
                        <div className="col-5 d-flex justify-content-end">
                          <p className="fs12px my-1">IDEAL INVESTMENT PERIOD</p>
                        </div>
                        <div className="col-7 d-flex justify-content-end">
                          <p className="fs12px my-1 text-dark">
                            {item.ideal_investment_period} Years
                          </p>
                        </div>
                      </>
                    )}
                    {item.fund_returns && (
                      <>
                        <div className="col-5 d-flex justify-content-end mb-0">
                          <p className="fs12px my-1">FUND 5Y CAGR</p>
                        </div>
                        <div className="col-5 progress sqrBar mb-0 bg-white">
                          <div
                            className="progress-bar logobg_color "
                            style={{
                              width: (item.fund_returns ?? 0) + '%'
                            }}
                          ></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end ">
                          <p className="fs12px my-1 text-dark">
                            {item.fund_returns?.toFixed(2) ?? 0}%
                          </p>
                        </div>
                      </>
                    )}
                    {item.benchmark_returns && (
                      <>
                        <div className="col-5 d-flex justify-content-end ">
                          <p className="fs12px my-1">BENCHMARK 5Y CAGR</p>
                        </div>
                        <div className="col-5 progress sqrBar bg-white mb-0">
                          <div
                            className="progress-bar orangeBg "
                            style={{
                              width: (item.benchmark_returns ?? 0) + '%'
                            }}
                          ></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end ">
                          <p className="fs12px my-1 text-dark">
                            {item.benchmark_returns?.toFixed(2) ?? 0}%
                          </p>
                        </div>
                      </>
                    )}
                    {item.category_returns && (
                      <>
                        <div className="col-5 d-flex justify-content-end bg-white ">
                          <p className="fs12px my-1">CATEGORY 5Y CAGR</p>
                        </div>
                        <div className="col-5 progress sqrBar bg-white mb-0">
                          <div
                            className="progress-bar orangeBg "
                            style={{
                              width: (item.category_returns ?? 0) + '%'
                            }}
                          ></div>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <p className="fs12px my-1 text-dark">
                            {item?.category_returns?.toFixed(2) ?? 0}%
                          </p>
                        </div>
                      </>
                    )}
                    {item.negative_observations && (
                      <>
                        <div className="col-5 d-flex justify-content-end">
                          <p className="fs12px my-1">NEGATIVE OBSERVATIONS</p>
                        </div>
                        <div className="col-7 d-flex justify-content-end">
                          <p className="fs12px my-1 text-dark">
                            {item.negative_observations ?? 0}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {!idDirect && (
                  <div className="directNoteBg rounded-4 m-0 px-3 fs12px text-dark">
                    Transaction not permitted for direct schemes.
                  </div>
                )}
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="modal-bg">
          <Button className="customButton " onClick={handleInvestMore}>
            Invest More
          </Button>
        </Modal.Footer>
      </Modal>

      <InvetmentConfirmation
        show={openInvestMore}
        setShow={setOpenInvestMore}
        schemeList={selectedSchemeList}
        setSchemeList={setSelectedSchemeList}
        sipDateList={sipDateList}
        from={'portfolio'}
      />

      

      <DirectSchemeNote
        show={openDirectNoteModel}
        setShow={setOpenDirectNoteModel}
        msg={
          'Your portfolio contains Direct Plan schemes that cannot be transacted through our app. Please connect with our expert for guidance on further investments in these schemes.'
        }
        removeDirectScheme={removeDirectScheme}
        schemeLength={selectedSchemeList.length}

      />
    </>
  );
};

export default InvestMoreScheme;
