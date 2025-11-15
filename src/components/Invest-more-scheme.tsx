import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { endPoints, imageUrl } from '../services/utils/urls';
import { portfolioSummaryKeys, schemeSummaryKeys, schemeSummaryRes } from '../pages/data-interfaces/portfolio';
import { postRequest } from '../services/Api/HandleApi';
import { fetchAdminUser } from '../services/user/adminUser';
import { ChevronRight } from 'react-bootstrap-icons';
import SchemePerformanceGraph from './Scheme-performance-graph';
import InvetmentConfirmation from './InvestmentConfirmation';
// import SwitchConfirmation from './SwitchConfirmation';

interface InvestMoreScheme {
  show: boolean;
  setShow: (show: boolean) => void;
  productCodes: number[]
}

const InvestMoreScheme: React.FC<InvestMoreScheme> = ({ show, setShow, productCodes }) => {
  const [schemeList, setSchemeList] = useState<schemeSummaryKeys[]>([]);
  const [selectedSchemeList, setSelectedSchemeList] = useState<schemeSummaryKeys[]>([]);
  const [openSchemePerformanceGraph, setOpenSchemePerformanceGraph] = useState<boolean>(false);
  const [openInvestMore, setOpenInvestMore] = useState<boolean>(false);
  const [sipDateList, setSipDateList] = useState<number[]>([]);

  // openIndex will store the index of the currently expanded scheme (or null)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPerformanceScheme();
  }, [productCodes]);

  const fetchPerformanceScheme = async () => {
    try {
      const adminUser = fetchAdminUser();
      if (adminUser?.ucc) {
        const reqBody = { product_codes: productCodes };
        const res = await postRequest<schemeSummaryRes>(endPoints.getSchemesPerformance, reqBody);
        if (res.success) {

          const transformed = res.data.map((item: schemeSummaryKeys) => ({
            ...item,
            accordSchemeCode: item.accordProductCode,
            accordAMCCode: item.accordAmcCode,
            minSIPAmt: item.min_sip_amount,
            minLumSumAmt: item.min_purchase_amount,
            sipAllowed: item.sip_allowed,
            sipDateList: item.sip_dates,
            purchaseAllowed: item.purchase_allowed,
            totalAmount: item.min_sip_amount + (item.totalAmount ?? 0)
         
          }));
          console.log("transfao", transformed);

          setSchemeList(transformed);
          setSelectedSchemeList(transformed);
          handleSipIntersection()
        } else {
          setSchemeList([]);
          setSelectedSchemeList([]);
        }
      }
    } catch (err) {
      setSchemeList([]);
      setSelectedSchemeList([]);
    }
  };
  // const dataTrandForm = (data: any) => {

  // }
  const handleSipIntersection = () => {
    const sipIntersectionData = selectedSchemeList?.map(scheme => scheme.sipDateList)
      .reduce((acc, curr) => acc.filter(date => curr.includes(date)))
    setSipDateList(sipIntersectionData)

  }

  const handleSelectedScheme = (item: schemeSummaryKeys) => {
    setSelectedSchemeList(prev => {
      const alreadySelected = prev.find(scheme => scheme.accordProductCode === item.accordProductCode);
      if (alreadySelected) {
        return prev.filter(scheme => scheme.accordProductCode !== item.accordProductCode);
      } else {
        return [...prev, item];
      }
    });
  };

  // toggles the panel for a specific index; only one open at a time
  const toggleAtIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
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
          <Modal.Title>Invest More</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          {schemeList.map((item, index) => {
            const isChecked = selectedSchemeList?.some(scheme => scheme?.accordProductCode === item.accordProductCode);
            const panelId = `performance-panel-${item.accordProductCode ?? index}`;
            const checkboxId = `checkbox-${item.accordProductCode ?? index}`;

            return (
              <div className="bg-white px-4 my-2 rounded form_shadow" key={item.accordProductCode ?? index}>
                {/* Row click toggles ONLY this panel */}
                <div
                  className="row borderColor py-2 crPointer"
                  onClick={() => toggleAtIndex(index)}
                >
                  <div className="round col-11" >
                    <input
                      type="checkbox"
                      id={checkboxId}
                      checked={!!isChecked}
                      // Stop row toggle when clicking checkbox
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleSelectedScheme(item)}
                    />
                    <label htmlFor={checkboxId}></label>

                    <img
                      src={`${imageUrl + item?.accordAmcCode}.png`}
                      className="rounded"
                      height={30}
                      width={30}
                      alt=""
                    />
                    <small className="mx-2">{item.scheme}</small>
                  </div>

                  <div
                    className="col-1 adjustText pb-2 crPointer text-end"
                    // prevent the chevron click from bubbling (optional)
                    onClick={(e) => { e.stopPropagation(); toggleAtIndex(index); }}
                  >
                    <ChevronRight />
                  </div>
                </div>

                {/* Panel: only open if this index === openIndex */}
                <div
                  id={panelId}
                  className={`performance-panel collapse-anim ${openIndex === index ? "open" : ""}`}
                >
                  <div className="row">
                    <div className="col-5 d-flex justify-content-end">
                      <p className='fs12px my-1'>IDEAL INVEST. HORIZEN</p>
                    </div>
                    <div className="col-7 d-flex justify-content-end">
                      <p className='fs12px my-1 text-dark'>{item.ideal_investment_period} Years</p>
                    </div>

                    <div className="col-5 d-flex justify-content-end mb-0">
                      <p className='fs12px my-1'>FUND RETURN</p>
                    </div>
                    <div className="col-5 progress sqrBar mb-0 bg-white">
                      <div className="progress-bar logobg_color " style={{ width: (item.fund_returns ?? 0) + "%" }}></div>
                    </div>
                    <div className="col-2 d-flex justify-content-end ">
                      <p className='fs12px my-1 text-dark'>{item.fund_returns ?? 0}%</p>
                    </div>

                    <div className="col-5 d-flex justify-content-end ">
                      <p className='fs12px my-1'>BENCHMARK RETURN</p>
                    </div>
                    <div className="col-5 progress sqrBar bg-white mb-0">
                      <div className="progress-bar orangeBg " style={{ width: ((item.benchmark_returns ?? 0) + "%") }}></div>
                    </div>
                    <div className="col-2 d-flex justify-content-end ">
                      <p className='fs12px my-1 text-dark'>{item.benchmark_returns ?? 0}%</p>
                    </div>

                    <div className="col-5 d-flex justify-content-end bg-white ">
                      <p className='fs12px my-1'>CATEGORY RETURN</p>
                    </div>
                    <div className="col-5 progress sqrBar bg-white mb-0">
                      <div className="progress-bar orangeBg " style={{ width: (item.category_returns ?? 0) + "%" }}></div>
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                      <p className='fs12px my-1 text-dark'>{item.category_returns ?? 0}%</p>
                    </div>

                    <div className="col-5 d-flex justify-content-end">
                      <p className='fs12px my-1'>NEGATIVE OBSERVATIONS</p>
                    </div>
                    <div className="col-7 d-flex justify-content-end">
                      <p className='fs12px my-1 text-dark'>{item.negative_observations ?? 0}</p>
                    </div>

                    <div className="col-5 d-flex justify-content-end">
                      <p className='fs12px my-1'>NOTE</p>
                    </div>
                    <div className="col-7 d-flex justify-content-end">
                      <p className='fs12px my-1 text-dark'>{item.short_note}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer className='modal-bg'>
          <Button className='customButton ' onClick={() => setOpenInvestMore(true)}>Invest More</Button>
        </Modal.Footer>
      </Modal>
      <InvetmentConfirmation
        show={openInvestMore}
        setShow={setOpenInvestMore}
        schemeList={selectedSchemeList}
        setSchemeList={setSelectedSchemeList}
        sipDateList={sipDateList}
        from={"Portfolio Review"}

      />
      <SchemePerformanceGraph show={openSchemePerformanceGraph} setShow={setOpenSchemePerformanceGraph} />
    </>
  );
}

export default InvestMoreScheme;
