import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { RedemptionKeys, RedemptionRes, } from "../data-interfaces/orders";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { fetchAdminUser } from "../../services/user/adminUser";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import { failedString, pendingString } from "../../services/utils/keys";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import Paginations from "../../components/Pagination";
import PortfolioEmpty from "../PortfolioEmpty";


function OneTimeOrders() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [redemptionList, setRedemptionList] = useState<RedemptionKeys[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    fetchOrderData();
  }, [page, limit]);

  const fetchOrderData = async () => {
    const adminUser = fetchAdminUser();
    if (adminUser?.ucc) {
      const reqBody = { ucc: adminUser?.ucc, page, limit };
      try {
        const res = await postRequest<RedemptionRes>(endPoints.getAllRedemptionOrders, reqBody);
        if (res.success) {
          setRedemptionList(res.data);
          setTotalRecords(res.totalRecords || 0);
        }
      } catch {
        setRedemptionList([]);
      }
    }
  };



  const detailPage = (item: RedemptionKeys) => {
      navigate("/order-details", { state: { ...item } });
  }

  return (
    <>
      {/* ✅ Pagination Header Above */}

      {/* ✅ SIP Data List */}
      {redemptionList?.length > 0 ? (
        redemptionList?.map((item) => (
          <div
            key={item.folio_number + item.scheme_name}
            className="p-4 shadow-sm bg-white border-0 rounded-4 mb-3 crPointer"
            onClick={() => detailPage(item)}
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
                    <h6 className="mb-0">{item.scheme_name?.toLowerCase()
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}</h6>
                    <span className="text-secondary small">
                      Folio: <span className="fw-semibold">{item.folio_number || "N/A"}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
                {failedString.includes(item.status) ? <span className="failed-badge">{item.status?.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}</span> : pendingString.includes(item.status) ? <span className="pending-badge">{item.status}</span> : <span className="success-badge">{item.status?.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}</span>}
              </div>

            </div>
            <hr className="text-secondary mt-2 mb-2" />
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-secondary small">Order Date</span>
                <br />
                <span className="fw-semibold">{dateInStringNumber(item.order_date)}</span>
              </div>
              {/* <div>
                <span className="text-secondary small">Next SIP Date</span>
                <br />
                <span className="fw-semibold">{dateInStringNumber(item.next_sip_date)}</span>
              </div> */}
              <div>
                <span className="text-secondary small">
                  {Number(item?.order_amount) > 0
                    ? "Amount"
                    : item.all_units || Number(item?.units) > 0
                      ? "Units"
                      : "-"}
                </span>
                <br />

                <span className="fw-semibold">
                  {Number(item?.order_amount) > 0
                    ? `₹${getValueInSort(Number(item?.order_amount))}`
                    : item.all_units
                      ? "All Units"
                      : Number(item.units) > 0
                        ? getValueInSort(Number(item.units))
                        : "-"}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <PortfolioEmpty title={"No Orders Yet"} body={"Your order history will appear here once you start investing. Begin your journey today!"} btnName={"Explore Funds"} btnUrl={"/all-mutual-funds"} />
      )}
      {totalRecords > 9 ?
        <Paginations totalRecords={totalRecords} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        : ""}

    </>
  );
}

export default OneTimeOrders;
