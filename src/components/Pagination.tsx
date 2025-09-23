
interface paginationProps{
  totalRecords:any,
  page:number,
  setPage:(value:number)=>void,
  // fetchOrderData:()=>void,
  limit:number,
  setLimit:(value:number)=>void,
}

const  Paginations: React.FC<paginationProps>=({totalRecords,page,setPage,limit,setLimit}) =>{

  const totalPages = Math.ceil(totalRecords / limit);
  const startRecord = (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, totalRecords);

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

    
    </>
  );
}

export default Paginations;
