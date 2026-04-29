import { useState, useCallback } from "react";
import NavBar from "../../components/Navbar";
import moneybag from "../../assets/img/loan-against-mf/money-bag.svg";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import "../../assets/css/loanAgainstMf.css";
import { endPoints } from "../../services/utils/urls";
import { useAdminUser } from "../../context/AdminContext";
import { postRequest } from "../../services/Api/HandleApi";
import { errorToast } from "../../services/utils/toast";
import { GeoCoordinates, EligibilityResponse } from "../data-interfaces/loan-against-mf";
import { INACTIVE } from "../data/static-data";

// const GEO_OPTIONS: PositionOptions = {
//     enableHighAccuracy: true,
//     timeout: 10000,       // fail after 10s
//     maximumAge: 60000,    // reuse cached position up to 1 min old
// };
const DEFAULT_LOCATION = {
    latitude: 12.9716,
    longitude: 77.5946
};

// const GEO_ERROR_MESSAGES: Record<number, string> = {
//     [GeolocationPositionError.PERMISSION_DENIED]:
//         "Location access denied. Please allow location access and try again.",
//     [GeolocationPositionError.POSITION_UNAVAILABLE]:
//         "Location unavailable. Please check your device settings.",
//     [GeolocationPositionError.TIMEOUT]:
//         "Location request timed out. Please try again.",
// };

export const getGeoLocation = (): Promise<GeoCoordinates> => {
    // return new Promise((resolve, reject) => {
    // if (!navigator.geolocation) {
    //     reject(new Error("Geolocation is not supported by your browser."));
    //     return;
    // }
    // if (!navigator.geolocation) {
    //     resolve(DEFAULT_LOCATION);
    //     return;
    // }
    return Promise.resolve(DEFAULT_LOCATION);
    // navigator.geolocation.getCurrentPosition(
    //     ({ coords }) => resolve({
    //         latitude: coords.latitude,
    //         longitude: coords.longitude,
    //     }),
    //     (error) => reject(
    //         new Error(GEO_ERROR_MESSAGES[error.code] ?? "Failed to get location.")
    //     ),
    //     GEO_OPTIONS
    // );
// });
};

export default function CheckEligibility() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { adminUser } = useAdminUser();
    const ucc = adminUser?.ucc;
    const uccStatus = localStorage.getItem("uccStatus");

    const checkEligibility = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { latitude, longitude } = await getGeoLocation();

            if (!ucc) {
                throw new Error("UCC is not available.");
            }

            const response = await postRequest(endPoints.loanAgainstMfEligibility, {
                ucc,
                latitude,
                longitude,
            }) as EligibilityResponse;

            if (!response.success || !response.data?.url) {
                throw new Error(response.data.msg ?? "Failed to fetch eligibility link.");
            }

            window.open(response.data.url, "_blank", "noopener,noreferrer");

        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [ucc]);

    return (
        <div className="ce-page-wrapper">
            <NavBar />

            <div className="container my-4 ce-container">

                {/* Breadcrumb */}
                <h6 className="logoBlueColor crPointer" >
                    <Link to={"/dashboard"}>Home</Link>
                    <small className="greyColor"> <ChevronRight className="fs14px" />
                        Loan Against MF </small> </h6>

                {/* Page Title */}
                <h2 className="fw-bold ce-page-title">Loan Against MF</h2>

                {/* Info Banner */}
                <div className="ce-info-banner">
                    <p className="ce-info-title">Get Cash Without Selling</p>
                    <p className="ce-info-subtitle">
                        Use your mutual funds to get instant funds – no need to redeem.
                    </p>
                </div>

                {/* Center Content */}
                <div className="ce-content-area">
                    <img
                        src={moneybag}
                        alt="Money Bag"
                        className="ce-money-bag"
                    />

                    <h3 className="ce-proceed-title">Proceed</h3>

                    <p className="ce-proceed-subtitle">
                        Give your consent to check eligibility, available <br />
                        loan amount, and get quick access to funds.
                    </p>

                    {error && (
                        <p className="text-danger small mb-2">{error}</p>
                    )}

                    <button
                        className="btn ce-consent-btn"
                        onClick={() => {
                            if (uccStatus === INACTIVE) {
                                errorToast("Your UCC is inactive. Please contact support to activate it before checking eligibility for Loan Against MF.");
                            }
                            else {
                                checkEligibility();
                            }
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Checking..." : "Check Eligibility"}
                    </button>

                    <p className="ce-redirect-note">
                        Redirecting to{" "}
                        <span className="ce-redirect-link">kotilabs-dsa.dpiwealth.com</span>{" "}
                        for checking eligibility?
                    </p>
                </div>

            </div>
        </div >
    );
}