
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { endPoints, imageUrl } from '../services/utils/urls';
import { portfolioReviewKeys, schemeSummaryKeys, schemeSummaryRes } from '../pages/data-interfaces/portfolio';
import { postRequest } from '../services/Api/HandleApi';
import { fetchAdminUser } from '../services/user/adminUser';
import { ChevronRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import PortfolioNotes from './PortfolioNotes';




interface UnderWatchPerformance {
  show: boolean;
  setShow: (show: boolean) => void;
  productCodes: number[];
  underWatchDetail: portfolioReviewKeys|null;
  
}

const UnderWatchPerformance: React.FC<UnderWatchPerformance> = ({ show, setShow, productCodes,underWatchDetail }) => {
  const [schemeList, setSchemeList] = useState<schemeSummaryKeys[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (productCodes.length > 0) {
      fetchPerformanceScheme();
    }
  }, [productCodes]);

  const fetchPerformanceScheme = async () => {
    try {
      const adminUser = fetchAdminUser();
      if (!adminUser?.ucc) {
        setSchemeList([]);
        return;
      }

      const reqBody = { product_codes: productCodes };
      const res = await postRequest<schemeSummaryRes>(endPoints.getSchemesPerformance, reqBody);

      if (!res.success) {
        setSchemeList([]);
        return;
      }
      setSchemeList(res.data);

    } catch (err) {
      console.error(err);
      setSchemeList([]);
    }
  };

  const fundDetails = (accordSchemeCode: number) => {
   
    let data = {
      scheme: underWatchDetail?.scheme,
      accordSchemeCode: underWatchDetail?.accordSchemeCode,
      accordAMCCode: underWatchDetail?.accordAMCCode,
      folio: underWatchDetail?.folio,
      amcCode: underWatchDetail?.nseAMCCode,
      productcode: underWatchDetail?.nseProductCode,
      purchase: underWatchDetail?.purchase,
      unit: underWatchDetail?.unit,
      currentvalue: underWatchDetail?.currentvalue,
    }
   
    navigate("/fund-details", { state: { ...data,accordSchemeCode, fromPortfolio: true } })
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
          <Modal.Title>Under Watch-Fund Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>

          <div className="col-12 d-flex justify-content-end">
            <PortfolioNotes portfolioType={"undwerwatch"} />

          </div>
          {schemeList.map((item, index) => {

            return (
              <div className="bg-white px-4 my-2 rounded form_shadow" key={item.accordProductCode ?? index}>
                <div
                  className="row borderColor py-2 crPointer"
                  onClick={() => fundDetails(item?.accordProductCode ?? 0)}
                >
                  <div className="round col-11" >


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

                  >
                    <ChevronRight />
                  </div>
                </div>

                <div
                  className={`performance-panel collapse-anim open`}
                >
                  <div className="row">
                    {item.ideal_investment_period&&<>
                    <div className="col-5 d-flex justify-content-end">
                      <p className='fs12px my-1'>COMPARISON PERIOD</p>
                    </div>
                    <div className="col-7 d-flex justify-content-end">
                      <p className='fs12px my-1 text-dark'>{item.ideal_investment_period} Years</p>
                    </div></>}
                    {item?.fund_returns && <>
                      <div className="col-5 d-flex justify-content-end mb-0">
                        <p className='fs12px my-1'>FUND 5Y CAGR</p>
                      </div>

                      <div className="col-5 progress sqrBar mb-0 bg-white">
                        <div className="progress-bar logobg_color " style={{ width: (item?.fund_returns ?? 0) + "%" }}></div>
                      </div>
                      <div className="col-2 d-flex justify-content-end ">
                        <p className='fs12px my-1 text-dark'>{item.fund_returns ?? 0}%</p>
                      </div>
                    </>}
                    {item?.benchmark_returns && <>
                      <div className="col-5 d-flex justify-content-end ">
                        <p className='fs12px my-1'>BENCHMARK 5Y CAGR</p>
                      </div>
                      <div className="col-5 progress sqrBar bg-white mb-0">
                        <div className="progress-bar orangeBg " style={{ width: ((item?.benchmark_returns ?? 0) + "%") }}></div>
                      </div>
                      <div className="col-2 d-flex justify-content-end ">
                        <p className='fs12px my-1 text-dark'>{item.benchmark_returns ?? 0}%</p>
                      </div>
                    </>}
                    {item?.category_returns && <>
                      <div className="col-5 d-flex justify-content-end bg-white ">
                        <p className='fs12px my-1'>CATEGORY 5Y CAGR</p>
                      </div>
                      <div className="col-5 progress sqrBar bg-white mb-0">
                        <div className="progress-bar orangeBg " style={{ width: (item.category_returns ?? 0) + "%" }}></div>
                      </div>
                      <div className="col-2 d-flex justify-content-end">
                        <p className='fs12px my-1 text-dark'>{item.category_returns ?? 0}%</p>
                      </div>
                    </>}
                    {item?.negative_observations && <>
                      <div className="col-5 d-flex justify-content-end">
                        <p className='fs12px my-1'>NEGATIVE OBSERVATIONS</p>
                      </div>
                      <div className="col-7 d-flex justify-content-end">
                        <p className='fs12px my-1 text-dark'>{item?.negative_observations ?? 0}</p>
                      </div>
                    </>}

                  </div>
                </div>
              </div>
            );
          })}
        </Modal.Body>

      </Modal>
    </>
  );
}

export default UnderWatchPerformance;
