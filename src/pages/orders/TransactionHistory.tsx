import NavBar from "../../components/Navbar";
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  postRequest } from "../../services/Api/HandleApi";
import { endPoints, imageUrl } from "../../services/utils/urls";
import Paginations from "../../components/Pagination";
import { transactionHistoryKeys, transactionHistoryRes } from "../data-interfaces/orders";
import { fetchAdminUser } from "../../services/user/adminUser";

const TransactionHistory = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [transactionHistoryList, setTransactionHistoryList] = useState<transactionHistoryKeys[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(8)


  useEffect(() => {
    if(location.state?.accord_product_code){
      fetchNfoLiveScheme()
    }
  }, [page])


  const fetchNfoLiveScheme = async () => {
    try {
      const adminUser = fetchAdminUser()
      const reqBody={
        ucc:adminUser.ucc,
        accord_product_code:location.state?.accord_product_code,
        folio_number:location.state?.folio_number
      }
      const res = await postRequest<transactionHistoryRes>(endPoints.getTransactionHistory,reqBody)
      if (res.success) {
        setLimit(res.data.length)
        setTransactionHistoryList(res.data)
      }
    } catch (err) {
      setTransactionHistoryList([])
    }
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
            <div className="container py-2" >
              <div className="personal_form_container">
                <div className="borderColor p-3 rounded-4 bg-white">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="prod_icon_img">
                        <img src={`${imageUrl + item?.accord_amc_code}.png`} className="logoRadius" height={40} width={40} alt="" />
                      </div>
                      <div className="ms-2 prod_icon_heading mt-2">
                        <h4>{item?.scheme_name}</h4>
                        {/* <div className="ms-2" style={{ flex: 4 }}>
                          <span className="text-secondary">Category-{item.}</span>
                        </div> */}
                      </div>
                    </div>

                  </div>
                  <hr />
                  <div className="row text-start text-md-start text-center">
                    <div className="col-4 col-md-4">
                      <small className="fs14px d-block">Last 1Y</small>
                      <small

                      >
                        last
                      </small>
                    </div>
                    <div className="col-4 col-md-4">
                      <small className="fs14px d-block">Min. SIP</small>
                      <small><CurrencyRupee className="mb-1" />item.minSIPAmt</small>
                    </div>
                    <div className="col-4 col-md-4">
                      <small className="fs14px d-block">Fund Size</small>
                      <small><CurrencyRupee className="mb-1" />item.fundSize</small>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )
        }) : ""}
        <Paginations totalRecords={transactionHistoryList.length} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
      </div>

    </>
  );
};

export default TransactionHistory;
