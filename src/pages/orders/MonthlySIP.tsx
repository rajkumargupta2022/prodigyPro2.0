import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { sipOrderKeys, sipOrderRes } from "../data-interfaces/orders";
import { endPoints, imageUrl } from "../../services/utils/urls";
import { fetchAdminUser } from "../../services/user/adminUser";
import { getValueInSort } from "../../services/calculation/percentageCalculate";
import { failedString, pendingString } from "../../services/utils/keys";
import { dateInStringNumber } from "../../services/dates/dateFormater";
import PortfolioEmpty from "../PortfolioEmpty";


function MonthlySIP() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [sipListData, setSipListData] = useState<sipOrderKeys[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // sentinel div at bottom — when visible, load next page
  const loaderRef = useRef<HTMLDivElement | null>(null);
  // use refs so the observer callback always sees latest values
  const loadingRef = useRef<boolean>(false);
  const hasMoreRef = useRef<boolean>(true);

  /* ─── fetch one page and APPEND to list ─── */
  const fetchPage = async (pageNum: number) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    const adminUser = fetchAdminUser();
    if (!adminUser?.ucc) return;

    loadingRef.current = true;
    setLoading(true);
    if (pageNum === 1) setInitialLoading(true);

    const reqBody = { ucc: adminUser.ucc, page: pageNum, limit: 20 };
    try {
      const res = await postRequest<sipOrderRes>(endPoints.getSipOrders, reqBody);
      if (res.success && res.data && res.data.length > 0) {
        setSipListData(prev =>
          pageNum === 1 ? res.data : [...prev, ...res.data]
        );
        // If we got fewer records than a full page, or we've reached totalPages → no more
        if (pageNum >= (res.totalPages ?? 1)) {
          hasMoreRef.current = false;
          setHasMore(false);
        }
      } else {
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } catch {
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  };

  /* ─── fetch whenever page number increments ─── */
  useEffect(() => {
    fetchPage(page);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── IntersectionObserver — mounted once, uses refs ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          setPage(prev => prev + 1); // triggers the useEffect above
        }
      },
      { rootMargin: "200px" } // start loading 200px before user hits bottom
    );

    const target = loaderRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []); // mount once only

  const detailPage = (item: sipOrderKeys) => {
    navigate("/order-details", { state: { ...item } });
  };

  /* ─── Skeleton card matching the real SIP card layout ─── */
  const SipSkeleton = () => (
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
        {[0, 1, 2].map(j => (
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
      {/* ── skeleton on initial page-1 load ── */}
      {initialLoading && (
        Array.from({ length: 5 }).map((_, i) => <SipSkeleton key={`sk-${i}`} />)
      )}

      {/* ── SIP Data List ── */}
      {!initialLoading && (
        sipListData?.length > 0 ? (
          sipListData.map((item, index) => (
            <div
              key={item.transaction_id ? item.transaction_id + index : item.folio_number + item.scheme_name + index}
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
                      <h6 className="mb-0">{item.scheme_name}</h6>
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
                {/* <div>
                  <span className="text-secondary small">Next SIP Date</span>
                  <br />
                  <span className="fw-semibold">{dateInStringNumber(item.next_sip_date)}</span>
                </div> */}
                <div>
                  <span className="text-secondary small">Amount</span>
                  <br />
                  <span className="fw-semibold">₹{getValueInSort(Number(item?.order_amount))}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <PortfolioEmpty
            title={"No Recent SIP Orders"}
            body={"Your order history will appear here once you start investing. Begin your journey today!"}
            btnName={"Explore Funds"}
            btnUrl={"/all-mutual-funds"}
          />
        )
      )}

      {/* ── small spinner at bottom for scroll-triggered pages ── */}
      {loading && !initialLoading && (
        <div className="text-center py-4">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "1.6rem", height: "1.6rem" }}
          >
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}

      {/* ── end-of-list message ── */}
      {!hasMore && !loading && sipListData.length > 0 && (
        <div className="text-center py-3">
          <small className="text-secondary">You've reached the end of the list.</small>
        </div>
      )}

      {/* ── invisible sentinel — IntersectionObserver watches this ── */}
      <div ref={loaderRef} style={{ height: "1px" }} />
    </>
  );
}

export default MonthlySIP;
