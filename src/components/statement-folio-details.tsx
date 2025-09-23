import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import emptyImg from "../assets/img/no-folio-founds.jpeg";
import { useEffect } from "react";
import { folioStatementKey } from "../pages/data-interfaces/reports";
import { getPercentageValue, getValueInSort } from "../services/calculation/percentageCalculate";
import PortfolioEmpty from "../pages/PortfolioEmpty";
import { imageUrl } from "../services/utils/urls";
import { filterData, firstLettersOnly } from "../services/utils/services";

function StateFolioDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const schemeList:folioStatementKey = location?.state
    const schemes = filterData(location?.state?.schemes_invested,"invested_value")

    useEffect(()=>{
         if(!location?.state?.bank_account_number){
            navigate("/statements")
         }
         
    },[])
    return (
        <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
            <h4 >
                <ArrowLeft className="crPointer " size={23} onClick={()=>navigate(-1)}/>
                Folio details
            </h4>
            <hr className="fw-light text-secondary " />

            <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
                <span className="fw-bold">Folio -  {schemeList.folio_number}</span>

                <div className="d-flex justify-content-between my-3 text-uppercase">
                    <span className="text-secondary">Bank</span>
                    <span className="value-font2">{firstLettersOnly(schemeList.bank_name)} *****{schemeList.bank_account_number.slice(-4)}</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">IFSC</span>
                    <span className="value-font2">{schemeList.bank_ifsc}</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">2nd Holder</span>
                    <span className="value-font2">{schemeList?.second_holder}</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">3rd Holder</span>
                    <span className="value-font2">{schemeList.third_holder}</span>
                </div>

                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">Nominee 1</span>
                    <span className="value-font2">{schemeList?.nominee_1||"-"}</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">Nominee 2</span>
                    <span className="value-font2">{schemeList?.nominee_2||"-"}</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">Nominee 3</span>
                    <span className="value-font2">{schemeList?.nominee_3||"-"}</span>
                </div>
            </div>
            {
              schemes.length>0?schemes?.map((item)=>{
                 return<div    className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2" >

                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-md-12 col-12">
                            <div className="d-flex">
                                <img src={imageUrl+item.accord_amc_code+".png"} alt="Image not found" height={45} width={45} className="rounded"/>
                                <div className="ms-2 aling-self-center" style={{ flex: 4 }}>
                                    <h6 className="mt-2 mb-0">
                                       {item.scheme_name}
                                    </h6>

                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <hr className="fw-light text-secondary" />

                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="text-secondary">Invested</span>
                            <br />
                            <span className="value-font2">₹{getValueInSort(item.invested_value)}</span>
                        </div>

                        <div>
                            <span className="text-secondary">Current Value</span>
                            <br />
                            <span className="value-font2">
                               ₹{getValueInSort(item.current_value)}
                            </span>
                        </div>

                        <div>
                            <span className="text-secondary">Gain/Loss</span>
                            <br />
                            <span className="value-font2">₹{getValueInSort(item.gain_loss)} <span className="text-success">{getPercentageValue(Number(item?.invested_value), item?.gain_loss)}%</span></span>
                        </div>
                    </div>

                </div>
              }):<PortfolioEmpty images={emptyImg} title={"No Folios Found"} body={"Your investment folios will be listed here once you start investing."} btnName={""} btnUrl={""} />
            }
                
          

        </main>
    );
}

export default StateFolioDetails;
