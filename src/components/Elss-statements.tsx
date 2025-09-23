import { useEffect, useState } from "react";
import HDFC from "../assets/img/bank-logo/icici.png";
import Form from 'react-bootstrap/Form';
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { fetchAdminUser } from "../services/user/adminUser";
import { elssSchemeKey, elssStatementRes } from "../pages/data-interfaces/reports";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import elssEmpty from "../assets/img/elssEmpty.png"
import PortfolioEmpty from "../pages/PortfolioEmpty";
import Paginations from "./Pagination";

function ElssStatements() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 7))
  const [yearList,setYearList] = useState<string[]>([])
  const [schemeList,setSchemeList] = useState<elssSchemeKey[]>([])
  const [totalInvestment,setTotalInvestment] = useState<number>(0)
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const yearHandler = (e: any) => {
    console.log(e.target.value);
    setSelectedDate(e.target.value)
    fetchElssStatements(e.target.value)
      
  }

  useEffect(() => {
    fetchYearList()
  }, [])
 const fetchYearList = (startYear: number = 2000): void => {
  const today = new Date();
  let currentYear = today.getFullYear();

  // If before April, we are still in the previous financial year
  if (today.getMonth() < 3) {
    currentYear -= 1;
  }

  const years: string[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(`${year}-${year + 1}`);
  }

  const reversed = years.reverse();
  setYearList(reversed);
  fetchElssStatements(reversed[0]);
};

  const fetchElssStatements =async (year:string)=>{
    try{
      const adminUser = fetchAdminUser()
      const reqBody ={
        ucc:adminUser?.ucc,
        from:Number(year.split("-")[0]),
        to:Number(year.split("-")[1])
      }
       const res = await postRequest<elssStatementRes>(endPoints.getElssStatements,reqBody)
       if(res.success){
        setSchemeList(res.data.holdings)
        setTotalInvestment(res.data.total_investment)
       }
    }catch(err){
       console.log(err);
       
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <div>
          <div className="mb-2">
            <Form.Select aria-label="Default select example" className="selectBoxBg" value={selectedDate} onChange={yearHandler} >
              {yearList.map((item)=>{
                return <option value={item}>FY-{item}</option>
              })}
             
            </Form.Select>
          </div>
        </div>
        <div>
          <h6>Total: ₹{getValueInSort(totalInvestment)}</h6>
        </div>
      </div>
      {schemeList?.length>0?schemeList.map((item)=>{
        return  <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
      >

        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-6 col-12 py-2">
            <div className="d-flex">
              <img src={HDFC} alt="Image not found" />
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

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">Order Date</span>
            <br />
            <span className="value-font2">{item.transaction_date}</span>
          </div>

          <div>
            <span className="text-secondary">Units</span>
            <br />
            <span className="value-font2">
              11.62 <span className="fw-light">(NAV:₹{item.units_alloted})</span>
            </span>
          </div>

          <div>
            <span className="text-secondary">Amount</span>
            <br />
            <span className="value-font2">₹{getValueInSort(item.transaction_amount)}</span>
          </div>
        </div>
      </div>
      }):<PortfolioEmpty images={elssEmpty} title={"No Investments Found"} body={"Your ELSS investment details will appear here once you start investing."} btnName={""} btnUrl={""} />}
     {schemeList.length>0?
        <Paginations totalRecords={schemeList.length}  page={page} setPage={setPage}  limit={limit} setLimit={setLimit}/>:""}
    </>
  );
}

export default ElssStatements;
