import NavBar from "../../components/Navbar";
import { ChevronRight } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import Paginations from "../../components/Pagination";
import { transactionHistoryKeys, transactionHistoryRes } from "../data-interfaces/orders";
import { fetchAdminUser } from "../../services/user/adminUser";
import { dateInStringNumber } from "../../services/dates/dateFormater";


const TransactionHistory = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [transactionHistoryList, setTransactionHistoryList] = useState<transactionHistoryKeys[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)


  useEffect(() => {
    if (location.state?.accord_product_code) {
      fetchNfoLiveScheme()
    }
  }, [page])


  const fetchNfoLiveScheme = async () => {
    try {
      const adminUser = fetchAdminUser()
      const reqBody = {
        ucc: adminUser.ucc,
        accord_product_code: location.state?.accord_product_code,
        folio_number: location.state?.folio_number
      }
      const res = await postRequest<transactionHistoryRes>(endPoints.getTransactionHistory, reqBody)
      if (res.success) {
        setLimit(res.data.length)
        setTransactionHistoryList(res.data)
      }
    } catch (err) {
      setTransactionHistoryList([])
    }
  }

const detailPage = (item:transactionHistoryKeys)=>{
        navigate("/sip-order",{state:item})
  }




  return (
    <>
      <NavBar />


      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" onClick={() => navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs12px bold" /> Transaction History</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>Transaction History</h4>
              <p className="fs14px">Seize the opportunity to invest in newly launched funds and diversify your portfolio from the start.</p>
            </div>
          </div>

        </div>
        {transactionHistoryList?.length > 0 ? transactionHistoryList?.map((item) => {
          return (
            <div
              key={item.folio_number + item.scheme_name}
              className="p-4 m-4 shadow-sm bg-white border-0 rounded-4 mb-3 crPointer"
            onClick={()=>detailPage(item)}
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
                <span className="success-badge">{item.transaction_type==="SIP"? "Monthly SIP":item.transaction_type==="Purchase" ? "One-time Purchase":item.transaction_type}</span>

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
                  <span className="text-secondary small">Next SIP Date</span>
                  <br />
                  <span className="fw-semibold">{dateInStringNumber(item.next_sip_date)}</span>
                </div>
                <div>
                  <span className="text-secondary small">Amount</span>
                  <br />
                  <span className="fw-semibold">₹{item.installment_amount}</span>
                </div>
              </div>
            </div>
          )
        }) : "No data availble"}
        {transactionHistoryList.length> 9?
        <Paginations totalRecords={transactionHistoryList.length} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />:""}
      </div>

    </>
  );
};

export default TransactionHistory;
