import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getRequest } from "../services/Api/HandleApi";
import { fetchAdminUser } from "../services/user/adminUser";
import { endPoints } from "../services/utils/urls";
import { folioStatementKey, folioStatementRes } from "../pages/data-interfaces/reports";
import PortfolioEmpty from "../pages/PortfolioEmpty";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import NofolioImg from "../assets/img/no-folio-founds.jpeg";
import { filterData } from "../services/utils/services";

function FolioDetailsList() {
  const navigate = useNavigate()
  const [folioList,setFolioList] = useState<folioStatementKey[]>([])

  useEffect(()=>{
    fetchFolioList()
  },[])
     
  const fetchFolioList =async ()=>{
    try{
      const adminUser = fetchAdminUser()
      const res = await getRequest<folioStatementRes>(endPoints.getFolioStatements+"?ucc="+adminUser?.ucc)
      if(res.success){
        setFolioList(filterData(res?.data,"total_invested"))
      }
      
    }catch(err){
      console.log(err);
      
    }
  }
  

  const showSchemes = (item:folioStatementKey)=>{
         navigate("/folio-details",{state:item})
  }

  return (
    <>
    {folioList.length>0?
     folioList.map((item)=>{
       return  <div className="crPointer" onClick={()=>showSchemes(item)}>
      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
      >
        <p className="sub-heading fs16px m-0">
          {item.primary_user} - {item.folio_number}
        </p>

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary fs12px">INVESTED</span>
            <br />
            <span className="value-font2 fs16px">₹{getValueInSort(item.total_invested)}</span>
          </div>

          <div>
            <span className="text-secondary fs12px">CURRENT VALUE</span>
            <br />
            <span className="value-font2">
              <span className="value-font2 fs16px">₹{getValueInSort(item.current_value)}</span>
            </span>
          </div>

          <div>
            <span className="text-secondary fs12px">FUNDS #</span>
            <br />
            <span className="value-font2 fs14px">{item.schemes_invested?.length}</span>
          </div>
        </div>
      </div>
      </div>
     }):<PortfolioEmpty images={NofolioImg} title={"No Folios Found"} body={"Your investment folios will be listed here once you start investing."} btnName={""} btnUrl={""} />
    }
     

   
       {/* <PortfolioEmpty images={emptyImg} title={title} body={body} btnName={btnName} btnUrl={btnUrl} /> */}
    </>
  );
}

export default FolioDetailsList;
