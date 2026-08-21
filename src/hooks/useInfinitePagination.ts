import { useState, useRef, useEffect, useCallback } from "react";

export interface FetchDataResult<T> {
  data: T[];
  hasMore?: boolean;
  totalPages?: number;
}

export interface UseInfinitePaginationOptions<T> {
  /**
   * Async callback to fetch data for a given page number (1-indexed).
   * Should return `{ data: T[], hasMore?: boolean, totalPages?: number }`.
   */
  fetchData: (page: number) => Promise<FetchDataResult<T> | void>;
  /** Initial page number (defaults to 1) */
  initialPage?: number;
  /** Root margin for IntersectionObserver (defaults to "200px") */
  rootMargin?: string;
  /** Whether the pagination observer is enabled (defaults to true) */
  enabled?: boolean;
}

export interface UseInfinitePaginationReturn<T> {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  loading: boolean;
  initialLoading: boolean;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  resetPagination: () => void;
  reloadPage: () => void;
}

export function useInfinitePagination<T>({
  fetchData,
  initialPage = 1,
  rootMargin = "200px",
  enabled = true,
}: UseInfinitePaginationOptions<T>): UseInfinitePaginationReturn<T> {
  const [page, setPage] = useState<number>(initialPage);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<boolean>(false);
  const hasMoreRef = useRef<boolean>(true);
  const fetchDataRef = useRef(fetchData);

  // Keep fetchDataRef updated with latest callback reference
  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  const loadPage = useCallback(async (pageNum: number) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    if (pageNum === 1) {
      setInitialLoading(true);
    }

    try {
      const res = await fetchDataRef.current(pageNum);
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setData((prev) => (pageNum === 1 ? res.data : [...prev, ...res.data]));

        const moreAvailable =
          res.hasMore !== undefined
            ? res.hasMore
            : res.totalPages !== undefined
            ? pageNum < res.totalPages
            : true;

        hasMoreRef.current = moreAvailable;
        setHasMore(moreAvailable);
      } else {
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching paginated data:", err);
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  // Fetch whenever page number changes
  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  // Observer callback to increment page when sentinel intersects
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin }
    );

    const target = loaderRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [enabled, rootMargin]);

  const resetPagination = useCallback(() => {
    hasMoreRef.current = true;
    setHasMore(true);
    loadingRef.current = false;
    setLoading(false);
    setData([]);
    if (page === initialPage) {
      loadPage(initialPage);
    } else {
      setPage(initialPage);
    }
  }, [initialPage, loadPage, page]);

  const reloadPage = useCallback(() => {
    loadPage(page);
  }, [loadPage, page]);

  return {
    page,
    setPage,
    data,
    setData,
    loading,
    initialLoading,
    hasMore,
    setHasMore,
    loaderRef,
    resetPagination,
    reloadPage,
  };
}

export default useInfinitePagination;
