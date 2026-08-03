
/* ─── Transaction History skeleton card ─── */
export const TransactionSkeletonCard = () => (
  <div className="p-4 m-4 shadow-sm bg-white border-0 rounded-4 mb-3">
    <div className="row justify-content-between align-items-center">
      {/* Left – avatar + title + subtitle */}
      <div className="col-lg-8 col-md-8 col-12 py-2">
        <div className="d-flex align-items-center">
          {/* Avatar */}
          <div
            className="skeleton-box skeleton-avatar flex-shrink-0"
            style={{ borderRadius: "8px" }}
          />
          <div className="ms-3 w-100">
            {/* Scheme name */}
            <div className="skeleton-box skeleton-title mb-2" />
            {/* Folio number */}
            <div className="skeleton-box skeleton-subtitle" />
          </div>
        </div>
      </div>

      {/* Right – badge placeholder */}
      <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
        <div className="skeleton-box skeleton-badge d-inline-block" />
      </div>
    </div>

    {/* Divider */}
    <div className="skeleton-divider" />

    {/* Bottom info row */}
    <div className="d-flex justify-content-between">
      {/* Last Order */}
      <div>
        <div className="skeleton-box skeleton-info-label" />
        <div className="skeleton-box skeleton-info-value" />
      </div>
      {/* Next SIP */}
      <div>
        <div className="skeleton-box skeleton-info-label" />
        <div className="skeleton-box skeleton-info-value" />
      </div>
      {/* Amount */}
      <div>
        <div className="skeleton-box skeleton-info-label" />
        <div className="skeleton-box skeleton-info-value" />
      </div>
    </div>
  </div>
);
