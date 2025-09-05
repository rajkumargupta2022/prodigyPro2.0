import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../services/Api/HandleApi";
import { sipOrderKeys, sipOrderRes } from "../pages/data-interfaces/orders";
import { endPoints, imageUrl } from "../services/utils/urls";
import { fetchAdminUser } from "../services/user/adminUser";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import { keys } from "../services/utils/keys";
import { dateInStringNumber } from "../services/dates/dateFormater";

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
      const reqBody = { ucc: adminUser?.ucc, page, limit };
      try {
        const res = await postRequest<sipOrderRes>(endPoints.getSipOrders, reqBody);
        if (res.data) {
          setSipListData(res.data);
          setTotalRecords(res.totalRecords || 0);
        }
      } catch {
        setSipListData([]);
      }
    }
  };

  const totalPages = Math.ceil(totalRecords / limit);
  const startRecord = (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, totalRecords);

  const detailPage = (item:sipOrderKeys)=>{
        navigate("/sip-order",{state:item})
  }

  return (
    <>
      {/* ✅ Pagination Header Above */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        {/* Showing count */}
        <div className="text-secondary small mb-2 mb-md-0">
          Showing <span className="fw-semibold">{startRecord}</span> -{" "}
          <span className="fw-semibold">{endRecord}</span> of{" "}
          <span className="fw-semibold">{totalRecords}</span> results
        </div>

        {/* Page size selector */}
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <label className="me-2 fw-semibold small">Rows per page:</label>
          <select
            className="form-select form-select-sm w-auto"
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Prev
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <li key={num} className={`page-item ${page === num ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(num)}>
                    {num}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

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
