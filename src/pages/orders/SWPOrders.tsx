import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { swpOrderKeys, swpOrderRes } from "../data-interfaces/orders";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { fetchAdminUser } from "../../services/user/adminUser";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import { failedString, pendingString } from "../../services/utils/keys";
import PortfolioEmpty from "../PortfolioEmpty";
import useInfinitePagination from "../../hooks/useInfinitePagination";
import InfiniteScrollFooter from "../../components/InfiniteScrollFooter";

function SWPOrders() {
  const navigate = useNavigate();

  const fetchSwpOrders = useCallback(async (pageNum: number) => {
    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return { data: [], hasMore: false };

    const reqBody = { ucc: adminUser.ucc, page: pageNum, limit: 20 };
    const res = await postRequest<swpOrderRes>(endPoints.getSwpOrders, reqBody);

    if (res.data && res.data.length > 0) {
      const totalPages = res.totalPages ?? Math.ceil((res.totalRecords || 0) / 20) ?? 1;
      const isMoreAvailable = pageNum < totalPages;
      return {
        data: res.data,
        hasMore: isMoreAvailable,
        totalPages,
      };
    }
    return { data: [], hasMore: false };
  }, []);

  const {
    data: swpOrderList,
    loading,
    initialLoading,
    hasMore,
    loaderRef,
  } = useInfinitePagination<swpOrderKeys>({
    fetchData: fetchSwpOrders,
  });

  const detailPage = (item: swpOrderKeys) => {
    navigate("/order-details", { state: { ...item } });
  };

  const SkeletonCard = () => (
    <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-3">
      <div className="d-flex align-items-center mb-2">
        <div className="skeleton-box skeleton-avatar flex-shrink-0" />
        <div className="ms-2 flex-grow-1">
          <div className="skeleton-box skeleton-title d-block" />
          <div className="skeleton-box skeleton-subtitle d-block" />
        </div>
      </div>
      <hr className="text-secondary mt-2 mb-2" />
      <div className="d-flex justify-content-between">
        {[0, 1].map((j) => (
          <div key={j}>
            <div className="skeleton-box skeleton-stat-label d-block mb-1" />
            <div className="skeleton-box skeleton-stat d-block" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {initialLoading && (
        Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)
      )}

      {!initialLoading && (
        swpOrderList?.length > 0 ? (
          swpOrderList.map((item, index) => (
            <div
              key={item.transaction_id ? item.transaction_id + index : item.folio_number + item.scheme_name + index}
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
                        Folio : <span className="value-font">{item.folio_number || "N/A"}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
                  {failedString.includes(item.status) ? (
                    <span className="failed-badge">
                      {item.status?.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}
                    </span>
                  ) : pendingString.includes(item.status) ? (
                    <span className="pending-badge">{item.status}</span>
                  ) : (
                    <span className="success-badge">
                      {item.status?.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()}
                    </span>
                  )}
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
                  <span className="text-secondary">Amount</span>
                  <br />
                  <span className="value-font2">
                    ₹{getValueInSort(Number(item?.order_amount))}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <PortfolioEmpty
            title={"No Recent SWP Orders"}
            body={"Your order history will appear here once you start investing. Begin your journey today!"}
            btnName={"Explore Funds"}
            btnUrl={"/all-mutual-funds"}
          />
        )
      )}

      <InfiniteScrollFooter
        loading={loading}
        initialLoading={initialLoading}
        hasMore={hasMore}
        itemCount={swpOrderList.length}
        loaderRef={loaderRef}
      />
    </>
  );
}

export default SWPOrders;

