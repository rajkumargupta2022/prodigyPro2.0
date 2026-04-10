import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { postRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { fetchAdminUser } from "../services/user/adminUser";
import { dividendsSchemeKey, dividendsStatementRes } from "../pages/data-interfaces/reports";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import elssEmpty from "../assets/img/elssEmpty.png"
import PortfolioEmpty from "../pages/PortfolioEmpty";
import Paginations from "./Pagination";
import { dateInStringNumber } from "../services/dates/dateFormater";
import { useAdminUser } from "../context/AdminContext";

function Dividends() {
   const {isSwitched} = useAdminUser()
  const [selectedDate, setSelectedDate] = useState<string>()
  const [yearList, setYearList] = useState<string[]>([])
  const [schemeList, setSchemeList] = useState<dividendsSchemeKey[]>([])
  const [totalInvestment, setTotalInvestment] = useState<number>(0)
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const yearHandler = (e: any) => {
    setSelectedDate(e.target.value)
    fetchDividends(e.target.value)

  }

  useEffect(() => {
    fetchYearList()
  }, [isSwitched])
  const fetchYearList = (startYear: number = 2000): void => {
    const today = new Date();
    let currentYear = today.getFullYear();

    // If before April, we are still in the previous financial year
    if (today.getMonth() <= 3) {
      currentYear -= 1;
    }
    const years: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(`${year}-${year + 1}`);
    }

    const reversed = years.reverse();
    setYearList(reversed);
    fetchDividends(reversed[0]);
  };

  const fetchDividends = async (year: string) => {
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser?.ucc,
        from: Number(year.split("-")[0]),
        to: Number(year.split("-")[1])
      }
      const res = await postRequest<dividendsStatementRes>(endPoints.getDividendStatement, reqBody)
      if (res.success) {
        setSchemeList(res.data.holdings)
        setTotalInvestment(res.data.total_dividend)
      }
    } catch (err) {
      console.log(err);

    }
  }
  return (
    <>
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <div>
          <div className="mb-2">
            <Form.Select aria-label="Default select example" className="selectBoxBg" value={selectedDate} onChange={yearHandler} >
              {yearList.map((item) => {
                return <option value={item}>FY-{item}</option>
              })}

            </Form.Select>
          </div>
        </div>
        <div>
          <h6>Total: ₹{getValueInSort(totalInvestment)}</h6>
        </div>
      </div>
      {schemeList?.length > 0 ? schemeList.map((item) => {
        return <div
          className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        >

          <div className="row justify-content-between">
            <div className="col-lg-8 col-md-6 col-12 py-2">
              <div className="d-flex">
                 <img src={`${imageUrl + item?.accord_amc_code}.png`} className="rounded" height={40} width={40} alt="Image not found" />
                <div className="ms-2" style={{ flex: 4 }}>
                  <h6 style={{ margin: 0 }}>
                    {item.scheme_name}
                  </h6>
                  <span className="text-secondary">
                    Folio : <span className="value-font">{item.folio_number}</span>
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-6 col-12 py-2 text-md-end text-start">
            <span className="failed-badge">Buy Failed</span>
          </div> */}
          </div>


          <hr className="fw-light text-secondary" />

          <div className="row">
            <div className="col-6">
              <span className="text-secondary">Order Date</span>
              <br />
              <span className="value-font2">{dateInStringNumber(item.transaction_date)}</span>
            </div>

            <div className="col-6">
              <span className="text-secondary">Amount</span>
              <br />
              <span className="value-font2">
                 <span className="text-dark">₹{getValueInSort(item.dividend_amount)}</span>
              </span>
            </div>

          </div>
        </div>
      }) : <PortfolioEmpty images={elssEmpty} title={"No Investments Found"} body={"You don't have any dividend income for the selected financial year. Start your investment journey today."} btnName={""} btnUrl={""} />}
      {schemeList.length > 0 ?
        <Paginations totalRecords={schemeList.length} page={page} setPage={setPage} limit={limit} setLimit={setLimit} /> : ""}
    </>
  );
}

export default Dividends;
