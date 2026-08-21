import React from "react";

export interface InfiniteScrollFooterProps {
  /** Loading state for page 2+ fetches */
  loading: boolean;
  /** Initial page 1 loading state */
  initialLoading?: boolean;
  /** Whether more data exists to load */
  hasMore: boolean;
  /** Total items loaded so far */
  itemCount: number;
  /** Ref attached to the sentinel div observed by IntersectionObserver */
  loaderRef: React.RefObject<HTMLDivElement | null>;
  /** Optional custom end of list message */
  endMessage?: string;
}

const InfiniteScrollFooter: React.FC<InfiniteScrollFooterProps> = ({
  loading,
  initialLoading = false,
  hasMore,
  itemCount,
  loaderRef,
  endMessage = "You've reached the end of the list.",
}) => {
  return (
    <>
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
      {!hasMore && !loading && itemCount > 0 && (
        <div className="text-center py-3">
          <small className="text-secondary">{endMessage}</small>
        </div>
      )}

      {/* ── invisible sentinel — IntersectionObserver watches this ── */}
      <div ref={loaderRef as React.RefObject<HTMLDivElement>} style={{ height: "1px" }} />
    </>
  );
};

export default InfiniteScrollFooter;
