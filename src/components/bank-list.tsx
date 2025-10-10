import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fetchAdminUser } from "../services/user/adminUser";
import { postRequest } from "../services/Api/HandleApi";
import { bankListKeys, bankListRes } from "../pages/data-interfaces/bank-and-mandate";
import { endPoints } from "../services/utils/urls";
import { bankType } from "../services/utils/keys";
import noBankImg from "../assets/img/no-bank.png"
import PortfolioEmpty from "../pages/PortfolioEmpty";


function BankList() {

  const navigate = useNavigate()
  const [bankList, setBankList] = useState<bankListKeys[]>([])

  useEffect(() => {
    fetchBankList()
  }, [])

  const fetchBankList = async () => {
    const adminUser = fetchAdminUser()
    if (adminUser?.ucc) {
      let arr:bankListKeys[]=[];
      try {
        const res = await postRequest<bankListRes>(endPoints.getUserBanks, { ucc: adminUser.ucc })
        if (res) {
          res?.data.forEach(item=>{
            item.primary? arr.unshift(item):arr.push(item)
          })
          setBankList(arr)
        }

      } catch (err) {
        console.log(err);

      }
    }

  }

  const detailPage = (account_number:string)=>{
     navigate("/bank-details-show",{state:account_number})
  }
  return (
    <>

      {bankList?.length > 0 ? bankList.map((item) => {
        return <div
          className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
          onClick={()=>detailPage(item.account_number)}

        >
          <div className="row justify-content-between crPointer">
            <div className="col-lg-8 col-md-8 col-12 py-2">
              <div className="d-flex">
                <img className="align-self-start rounded" height={40} width={40} src={"https://bankamcimagesv2.s3.ap-southeast-1.amazonaws.com/demo-bank.png"} alt="Image not found" />
                <div className="ms-2" style={{ flex: 1 }}>
                  <h6 style={{ margin: 0 }}>{item.bank_name}</h6>
                  <span className="text-secondary">
                    {bankType[item.account_type as keyof typeof bankType]}
                     <span className="mx-2">|</span>
                 {item.verified? <span style={{ color: "#06A358" }}>Verified</span>: <span style={{ color: "#c5402cff" }}>Not Verified</span>}  
                  </span>
                  <br />
                  <span className="text-secondary">Account number: XXXXXX{item.account_number?.slice(-4)}</span>
                </div>
              </div>
            </div>
            {item.primary &&
              <div className="col-lg-4 col-md-4 col-12 py-2 text-md-end text-start">
                <span className="info-badge align-self-start">Primary</span>
              </div>}
          </div>


        </div >
      }) : <PortfolioEmpty images={noBankImg} title={"No Banks Linked Yet"} body={"Add an account to start investing."} btnName={""} btnUrl={""} />}



    </>
  );
}

export default BankList;
