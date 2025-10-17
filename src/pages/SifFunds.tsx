import NavBar from "../components/Navbar";
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../services/Api/HandleApi";
import { endPoints, imageUrl } from "../services/utils/urls";
import { sifFundsKeys, sifFundsRes } from "./data-interfaces/sif-funds";
import Paginations from "../components/Pagination";
import { getValueInSort } from "../services/calculation/percentageCalculate";

const SifFunds = () => {
  const navigate = useNavigate()

  const [sifSchemeList, setSifSchemeList] = useState<sifFundsKeys[]>([])
  const [page , setPage] = useState<number>(1)
  const [limit , setLimit] = useState<number>(8)


  useEffect(() => {
    fetchNfoLiveScheme()
  }, [page])
  const fetchNfoLiveScheme = async () => {
    try {
      const res = await getRequest<sifFundsRes>(endPoints.getActiveSif+"?page="+page)
      if (res.success) {
setLimit(res.data.length)
        setSifSchemeList(res.data)
      }
    } catch (err) {
      setSifSchemeList([])
    }
  }

const fundDetails = (item: sifFundsKeys) => {
    
    navigate("/fund-details", { state: { accordSchemeCode: item.accordSchemeCode, fromPortfolio: false } })
  }




  return (
    <>
      <NavBar />


      <div className="container pt-2">
        <div className="personal_form_container">
          <div className="d-flex my-3">
            <h6 className="logoBlueColor crPointer" onClick={() => navigate("/dashboard")}>Home <small className="greyColor"> <ChevronRight className="fs12px bold" /> SIF Funds</small> </h6>
          </div>
          <div className="row">
            <div className=" col">
              <h4>SIF Funds</h4>
              <p className="fs14px">Seize the opportunity to invest in newly launched funds and diversify your portfolio from the start.</p>
            </div>
          </div>

        </div>
      {sifSchemeList?.length > 0 ? sifSchemeList?.map((item) => {
        return (
          <div className="container py-2"onClick={()=>fundDetails(item)} >
            <div className="personal_form_container">
              <div className="borderColor p-3 rounded-4 bg-white">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="prod_icon_img">
                      <img src={`${imageUrl + item?.accordAMCCode}.png`} className="logoRadius" height={40} width={40} alt="" />
                    </div>
                    <div className="ms-2 prod_icon_heading mt-2">
                      <h4>{item?.scheme}</h4>
                       <div className="ms-2" style={{ flex: 4 }}>
                          <span className="text-secondary">Category-{item.equityType}</span>
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
  {item?.oneYearCAGR != null ? `${item.oneYearCAGR}%` : "0.00%"}
</small>
                  </div>
                  <div className="col-4 col-md-4">
                    <small className="fs14px d-block">Min. SIP</small>
                    <small><CurrencyRupee className="mb-1" />{item.minSIPAmt}</small>
                  </div>
                  <div className="col-4 col-md-4">
                    <small className="fs14px d-block">Fund Size</small>
                    <small><CurrencyRupee className="mb-1" />{getValueInSort(item.fundSize)}</small>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )
      }) : ""}
      <Paginations totalRecords={sifSchemeList.length} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
      </div>

    </>
  );
};

export default SifFunds;
