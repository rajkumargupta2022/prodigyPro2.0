import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { switchOrderKeys, switchOrderRes } from "../data-interfaces/orders";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { fetchAdminUser } from "../../services/user/adminUser";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import { failedString, pendingString } from "../../services/utils/keys";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import PortfolioEmpty from "../PortfolioEmpty";
import useInfinitePagination from "../../hooks/useInfinitePagination";
import InfiniteScrollFooter from "../../components/InfiniteScrollFooter";

function SwitchOrders() {
  const navigate = useNavigate();

  const fetchSwitchOrders = useCallback(async (pageNum: number) => {
    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return { data: [], hasMore: false };

    const reqBody = { ucc: adminUser.ucc, page: pageNum, limit: 20 };
    const res = await postRequest<switchOrderRes>(endPoints.getSwitchOrders, reqBody);

    if (res.success && res.data && res.data.length > 0) {
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
    data: switchList,
    loading,
    initialLoading,
    hasMore,
    loaderRef,
  } = useInfinitePagination<switchOrderKeys>({
    fetchData: fetchSwitchOrders,
  });

  const orderTimeLine = (item: switchOrderKeys) => {
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
        switchList?.length > 0 ? (
          switchList.map((item, index) => (
            <div
              key={item.transaction_id ? item.transaction_id + index : item.folio_number + item.source_scheme?.scheme_name + index}
              className="p-4 shadow-sm bg-white border-0 rounded-4 mb-3 crPointer"
              onClick={() => orderTimeLine(item)}
            >
              <div className="row justify-content-between">
                <div className="col-lg-8 col-md-8 col-12 py-2">
                  <div className="d-flex">
                    <img
                      src={imageUrl + item?.source_scheme?.accord_amc_code + ".png"}
                      alt="img"
                      className="rounded me-2"
                      style={{ width: 40, height: 40 }}
                    />
                    <div className="ms-2" style={{ flex: 4 }}>
                      <h6 className="mb-0">
                        {item.source_scheme?.scheme_name
                          ?.toLowerCase()
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </h6>
                      <span className="text-secondary small">
                        Folio: <span className="fw-semibold">{item.folio_number || "N/A"}</span>
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
              <hr className="text-secondary mt-2 mb-2" />
              <div className="d-flex justify-content-between">
                <div>
                  <span className="text-secondary small">Order Date</span>
                  <br />
                  <span className="fw-semibold">{dateInStringNumber(item.order_date)}</span>
                </div>
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
          <div className="m-0">
            <PortfolioEmpty
              title={"No Recent Switch Orders"}
              body={"Your order history will appear here once you start investing. Begin your journey today!"}
              btnName={"Explore Funds"}
              btnUrl={"/all-mutual-funds"}
            />
          </div>
        )
      )}

      <InfiniteScrollFooter
        loading={loading}
        initialLoading={initialLoading}
        hasMore={hasMore}
        itemCount={switchList.length}
        loaderRef={loaderRef}
      />
    </>
  );
}

export default SwitchOrders;

