import NavBar from "../components/Navbar";
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getRequestSimple } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { sifFundsKeys, sifFundsRes } from "./data-interfaces/sif-funds";
import { getValueInSort } from "../services/calculation/percentageCalculate";
import MsgModel from "../components/MsgModel";

const SifFunds = () => {
  const navigate = useNavigate()

  const [sifSchemeList, setSifSchemeList] = useState<sifFundsKeys[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)  // page-1 skeleton
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [openMsgModel, setOpenMsgModel] = useState<boolean>(false)

  // sentinel div at bottom — when visible, load next page
  const loaderRef = useRef<HTMLDivElement | null>(null)
  // use refs so the observer callback always sees latest values
  const loadingRef = useRef<boolean>(false)
  const hasMoreRef = useRef<boolean>(true)

  /* ─── fetch one page and APPEND to list ─── */
  const fetchPage = async (pageNum: number) => {
    if (loadingRef.current || !hasMoreRef.current) return

    loadingRef.current = true
    setLoading(true)
    if (pageNum === 1) setInitialLoading(true)

    try {
      const res = await getRequestSimple<sifFundsRes>(
        endPoints.getActiveSif + "?page=" + pageNum
      )
      if (res.success && res.data && res.data.length > 0) {
        // Always append; replace only on first page
        setSifSchemeList(prev =>
          pageNum === 1 ? res.data : [...prev, ...res.data]
        )
        // Only stop when the API returns an empty page (no more data)
      } else {
        // Empty or failed response → no more pages
        hasMoreRef.current = false
        setHasMore(false)
      }
    } catch {
      hasMoreRef.current = false
      setHasMore(false)
    } finally {
      loadingRef.current = false
      setLoading(false)
      setInitialLoading(false)
    }
  }

  /* ─── fetch whenever page number increments ─── */
  useEffect(() => {
    fetchPage(page)
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── IntersectionObserver — mounted once, uses refs ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          setPage(prev => prev + 1)  // triggers the useEffect above
        }
      },
      { rootMargin: "200px" }  // start loading 200px before user hits bottom
    )

    const target = loaderRef.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
      observer.disconnect()
    }
  }, []) // mount once only

  const fundDetails = (item: sifFundsKeys) => {
    navigate("/fund-details", {
      state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false },
    })
  }

  /* ─── Skeleton card matching the real fund card layout ─── */
  const SifFundSkeleton = () => (
    <div className="container py-2">
      <div className="personal_form_container">
        <div className="skeleton-card">
          {/* Top row: avatar + title */}
          <div className="d-flex align-items-center mb-2">
            <div className="skeleton-box skeleton-avatar flex-shrink-0" />
            <div className="ms-2 flex-grow-1">
              <div className="skeleton-box skeleton-title d-block" />
              <div className="skeleton-box skeleton-subtitle d-block" />
            </div>
          </div>
          <hr className="my-2" />
          {/* Stats row */}
          <div className="row text-center">
            {[0, 1, 2].map(j => (
              <div className="col-4" key={j}>
                <div className="skeleton-box skeleton-stat-label d-block mb-1" />
                <div className="skeleton-box skeleton-stat d-block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <NavBar />

      <div className="container pt-2">
        {/* ── breadcrumb + heading ── */}
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6
              className="logoBlueColor crPointer"
              onClick={() => navigate("/dashboard")}
            >
              Home{" "}
              <small className="greyColor">
                {" "}
                <ChevronRight className="fs12px bold" /> SIF Funds
              </small>{" "}
            </h6>
          </div>
          <div className="row">
            <div className="col">
              <h4>SIF Funds</h4>
            </div>
          </div>
        </div>

        {/* ── skeleton on initial page-1 load ── */}
        {initialLoading && (
          Array.from({ length: 6 }).map((_, i) => <SifFundSkeleton key={`sk-${i}`} />)
        )}

        {/* ── fund cards ── */}
        {!initialLoading && sifSchemeList.map((item, i) => (
          <div
            className="container py-2 crPointer"
            key={i}
            onClick={() => fundDetails(item)}
          >
            <div className="personal_form_container">
              <div className="borderColor p-3 rounded-4 bg-white">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="prod_icon_img">
                      <img
                        src={`${imageUrl + item?.accordAMCCode}.png`}
                        className="logoRadius"
                        height={40}
                        width={40}
                        alt=""
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = import.meta.env.VITE_NO_IMG || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                        }}
                      />
                    </div>
                    <div className="ms-2 prod_icon_heading mt-0">
                      <h4>{item?.scheme}</h4>
                      <div className="ms-2" style={{ flex: 4 }}>
                        <span className="text-secondary">
                          Category-{item.equityType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row text-start text-md-start text-center">
                  <div className="col-4 col-md-4">
                    <small className="fs14px d-block">Last 1Y</small>
                    <small
                      className={
                        item?.oneYearCAGR === null || item.oneYearCAGR >= 0
                          ? "congratesColor"
                          : "errorColor"
                      }
                    >
                      {item?.oneYearCAGR != null
                        ? `${item.oneYearCAGR}%`
                        : "0.00%"}
                    </small>
                  </div>
                  <div className="col-4 col-md-4">
                    <small className="fs14px d-block">Min. SIP</small>
                    <small>
                      <CurrencyRupee className="mb-1" />
                      {item.minSIPAmt}
                    </small>
                  </div>
                  <div className="col-4 col-md-4">
                    <small className="fs14px d-block">Fund Size</small>
                    <small>
                      <CurrencyRupee className="mb-1" />
                      {getValueInSort(item.fundSize)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
        {!hasMore && !loading && sifSchemeList.length > 0 && (
          <div className="text-center py-3">
            <small className="text-secondary">
              You've reached the end of the list.
            </small>
          </div>
        )}

        {/* ── invisible sentinel — IntersectionObserver watches this ── */}
        <div ref={loaderRef} style={{ height: "1px" }} />

        <MsgModel
          show={openMsgModel}
          setShow={setOpenMsgModel}
          heading={"Specialized Investment Funds(SIF)"}
          msg={[
            "These funds use long-short investment strategies, including derivatives and hedging.",
            "Minimum initial investment required: ₹10,00,000.",
            "After the first investment, you can add any amount in the same folio through SIP or lumpsum.",
            "This category suits investors who understand high-risk strategies and can handle market volatility and unpredictable returns.",
          ]}
          btn="OK"
        />
      </div>
    </>
  );
};

export default SifFunds;
