import NavBar from "../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import icici from "../assets/img/bank-logo/icici.png"
import sbi from "../assets/img/bank-logo/sbi.png"
import { ChevronRight, CurrencyRupee } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import SchemeDetails from "../components/SchemeDetails";
import { Card } from "react-bootstrap";

const NFOApply = () => {
  const [openSchemeDetail, setOpenSchemeDetail] = useState<boolean>(false)
  const handleSchemeDetail = () => {
    setOpenSchemeDetail(true)
  }
  return (
    <>
      <NavBar />
       <div className="container px-4 mt-3" >
        <div className="row">
          <div className="col-8 bg-white">
            fgdfgdfgdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd
          </div>
            <div className="col-8 bg-white mt-2">
            fgdfgdfgdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd
          </div>
        </div>
       </div>

      
      <SchemeDetails show={openSchemeDetail} setShow={setOpenSchemeDetail} />
    </>
  );
};

export default NFOApply;
