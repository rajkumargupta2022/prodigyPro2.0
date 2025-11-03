import { useNavigate } from "react-router-dom";
import { postRequest } from "../../services/Api/HandleApi";
import { swpOrderKeys, swpOrderRes } from "../data-interfaces/orders";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { fetchAdminUser } from "../../services/user/adminUser";
import { useEffect, useState } from "react";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import { failedString, pendingString } from "../../services/utils/keys";
import Paginations from "../../components/Pagination";
import PortfolioEmpty from "../PortfolioEmpty";

function SWPOrders() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [swpOrderList, setSwpOrderList] = useState<swpOrderKeys[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    fetchOrderData();
  }, [page, limit]);

  const fetchOrderData = async () => {
    const adminUser = fetchAdminUser();
    if (adminUser?.ucc) {
      const reqBody = { ucc: adminUser?.ucc, page, limit };
      try {
        const res = await postRequest<swpOrderRes>(endPoints.getSwpOrders, reqBody);
        if (res.data) {
          setSwpOrderList(res.data);
          setTotalRecords(res.totalRecords || 0); // if API returns total count
        }
      } catch {
        setSwpOrderList([]);
      }
    }
  };

  const detailPage = (item: swpOrderKeys) => {
    navigate("/swp-order", { state: item })
  }

  return (
    <>

      {swpOrderList?.length > 0 ? (
        swpOrderList?.map((item) => (
          <div
            key={item.folio_number + item.scheme_name}
            className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2 crPointer"
            onClick={() => detailPage(item)}
          >
            <div className="row justify-content-between">
              <div className="col-lg-8 col-md-8 col-12 py-2">
                <div className="d-flex">
                  <img
                    src={imageUrl + item?.accord_amc_code + ".png"}
                    alt="img"
                    className="me-2"
                    style={{ width: 40, height: 40 }}
                  />
                  <div className="ms-2" style={{ flex: 4 }}>
                    <h6 style={{ margin: 0 }}>{item.scheme_name}</h6>
                    <span className="text-secondary">
                      Folio : <span className="value-font">{item.folio_number}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
                {failedString.includes(item.status) ? <span className="failed-badge">{item.status?.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}</span> : pendingString.includes(item.status) ? <span className="pending-badge">{item.status}</span> : <span className="success-badge">{item.status?.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}</span>}
              </div>
            </div>
            <hr className="fw-light text-secondary mt-1 mb-1" />
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-secondary">Order Date</span>
                <br />
                <span className="value-font2">{dateInStringNumber(item.order_date)}</span>
              </div>
              <div>
                <span className="text-secondary">Next SWP Date</span>
                <br />
                <span className="value-font2">{dateInStringNumber(item.next_swp_date)}</span>
              </div>
              <div>
                <span className="text-secondary">Amount</span>
                <br />
                <span className="value-font2">
                  ₹{getValueInSort(Number(item.installment_amount))}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <PortfolioEmpty title={"No Orders Yet"} body={"Your order history will appear here once you start investing. Begin your journey today!"} btnName={"Explore Funds"} btnUrl={"all-mutual-funds"} />
      )}
      {totalRecords > 9 ?
        <Paginations totalRecords={totalRecords} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        : ""}
    </>
  );
}

export default SWPOrders;
