import NavBar from "../../components/Navbar";
import cointree from "../../assets/img/loan-against-mf/coin-tree.svg";
import background from "../../assets/img/loan-against-mf/backdesign.svg";
import "../../assets/css/loanAgainstMf.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { errorToast } from "../../services/utils/toast";
import { INACTIVE } from "../data/static-data";
export default function LoanAgainstMF() {
    const navigate = useNavigate();
    const uccStatus = localStorage.getItem("uccStatus");
    useEffect(() => {
    const loanVisited = localStorage.getItem("loanAgainstMFVisited");

    if (loanVisited === "true" && uccStatus !== INACTIVE) {
        navigate("/loan-against-mf/check-eligibility");
    }
}, [navigate, uccStatus]);
    return (
        <div>
            <NavBar />

            <div className="container my-3">
                <div className="loan-wrapper">  {/* ← add this wrapper */}
                    <h2 className="fw-semibold mb-4 text-start">
                        Loan Against MF
                    </h2>
                    <div className="card border-0 rounded-5 overflow-hidden position-relative loan-card">
                        {/* Background */}
                        <img
                            src={background}
                            alt=""
                            className="position-absolute w-100 h-100 bg-img"
                        />

                        {/* Content */}
                        <div className="card-body text-center text-white d-flex flex-column justify-content-start pt-4 align-items-center position-relative content-area">

                            <img
                                src={cointree}
                                alt="Coin Tree"
                                className="mb-3 coin-tree"
                            />

                            <h3 className="fw-bold mb-3">
                                Your Investments Stay.<br />
                                Cash Comes In.
                            </h3>

                            <p className="mb-5 content-text">
                                Need funds without selling your mutual funds? <br />
                                Take a loan against your investments and stay invested. <br />
                                Avoid market loss and let your wealth keep growing.
                            </p>
                            
                            <button className="btn btn-light fw-semibold px-4 eligibility-btn"
                                onClick={() => {
                                    if(uccStatus === INACTIVE){
                                        errorToast("Your UCC is inactive. Please contact support to activate it before checking eligibility for Loan Against MF.");
                                    }
                                    else{
                                        localStorage.setItem("loanAgainstMFVisited", "true");
                                        navigate("/loan-against-mf/check-eligibility");
                                    }
                                }}>
                                Check Eligibility
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}