import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../services/Api/HandleApi";
import { sipOrderKeys, sipOrderRes } from "../pages/data-interfaces/orders";
import { endPoints, imageUrl } from "../services/utils/urls";
import { fetchAdminUser } from "../services/user/adminUser";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import { keys } from "../services/utils/keys";
import { dateInStringNumber } from "../services/dates/dateFormater";
import Paginations from "./Pagination";


function SIP() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [sipListData, setSipListData] = useState<sipOrderKeys[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    fetchOrderData();
  }, [page, limit]);

  const fetchOrderData = async () => {
    const adminUser = fetchAdminUser();
    if (adminUser?.ucc) {
      const reqBody = { ucc: "", page, limit };
      try {
        const res = await postRequest<sipOrderRes>(endPoints.getSipOrders, reqBody);
        if (res.success) {
          setSipListData(res.data);
          setTotalRecords(res.totalRecords || 0);
        }
      } catch {
        setSipListData([]);
      }
    }
  };



  const detailPage = (item:sipOrderKeys)=>{
        navigate("/sip-order",{state:item})
  }

  return (
    <>
      {/* ✅ Pagination Header Above */}
  
    <Paginations totalRecords={totalRecords}  page={page} setPage={setPage}  limit={limit} setLimit={setLimit}/>
      {/* ✅ SIP Data List */}
      {sipListData?.length > 0 ? (
        sipListData?.map((item) => (
          <div
            key={item.folio_number + item.scheme_name}
            className="p-4 shadow-sm bg-white border-0 rounded-4 mb-3"
            onClick={()=>detailPage(item)}
          >
            <div className="row justify-content-between">
              <div className="col-lg-8 col-md-8 col-12 py-2">
                <div className="d-flex">
                  <img
                    src={imageUrl + item?.accord_amc_code + ".png"}
                    alt="img"
                    className="rounded me-2"
                    style={{ width: 40, height: 40 }}
                  />
                  <div className="ms-2" style={{ flex: 4 }}>
                    <h6 className="mb-1">{item.scheme_name}</h6>
                    <span className="text-secondary small">
                      Folio: <span className="fw-semibold">{item.folio_number || "N/A"}</span>
                    </span>
                  </div>
                </div>
              </div>
           <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
               {item.status===keys.failed?<span className="failed-badge">Failed</span>:item.status===keys.pending?<span className="pending-badge">Pending</span>:<span className="success-badge">Active</span>}
               
             </div>

            </div>
            <hr className="text-secondary mt-2 mb-2" />
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-secondary small">Next SIP Date</span>
                <br />
                <span className="fw-semibold">{dateInStringNumber(item.next_sip_date)}</span>
              </div>
              <div>
                <span className="text-secondary small">Amount</span>
                <br />
                <span className="fw-semibold">₹{getValueInSort(Number(item.installment_amount))}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-secondary">No records found</p>
      )}
    </>
  );
}

export default SIP;
