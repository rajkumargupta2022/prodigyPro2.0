import { ArrowLeft } from "react-bootstrap-icons";
import SBI from "../assets/img/icons/sbi.png";
import { Link } from "react-router-dom";

function StateFolioDetails() {
    return (
        <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
            <h2>
                <ArrowLeft className="crPointer" size={25} />
                Folio details
            </h2>
            <hr className="fw-light text-secondary " />

            <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2">
                <span className="fw-bold">Folio -  24324321</span>

                <div className="d-flex justify-content-between my-3 text-uppercase">
                    <span className="text-secondary">Bank</span>
                    <span className="value-font2">HDFC Bank ****1267</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">IFSC</span>
                    <span className="value-font2">HDFC000123</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">2nd Holder</span>
                    <span className="value-font2">-</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">3rd Holder</span>
                    <span className="value-font2">-</span>
                </div>

                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">Nominee 1</span>
                    <span className="value-font2">Lorem Ipsum</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">Nominee 2</span>
                    <span className="value-font2">-</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                    <span className="text-secondary">Nominee 3</span>
                    <span className="value-font2">-</span>
                </div>
            </div>
            <Link to="/no-folio-founs">
                <div
                    className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
                // onClick={() => activeInactive("order-timeline")}
                >

                    <div className="row justify-content-between">
                        <div className="col-lg-8 col-md-12 col-12 py-2">
                            <div className="d-flex">
                                <img src={SBI} alt="Image not found" />
                                <div className="ms-2 aling-self-center" style={{ flex: 4 }}>
                                    <h6 style={{ margin: 0 }}>
                                        Canara Recobo Multi Cap Fund - Regular (G)
                                    </h6>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-12 py-2 text-md-end text-start">

                        </div>
                    </div>

                    <hr className="fw-light text-secondary" />

                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="text-secondary">Invested</span>
                            <br />
                            <span className="value-font2">₹5.31K</span>
                        </div>

                        <div>
                            <span className="text-secondary">Current Value</span>
                            <br />
                            <span className="value-font2">
                                11.62 <span className="fw-light">₹6.82K</span>
                            </span>
                        </div>

                        <div>
                            <span className="text-secondary">Gain/Loss</span>
                            <br />
                            <span className="value-font2">₹1.82K <span className="text-success">23.86%</span></span>
                        </div>
                    </div>

                </div>
            </Link>
            <div
                className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
            // onClick={() => activeInactive("order-timeline")}
            >

                <div className="row justify-content-between">
                    <div className="col-lg-8 col-md-12 col-12 py-2">
                        <div className="d-flex">
                            <img src={SBI} alt="Image not found" />
                            <div className="ms-2 aling-self-center" style={{ flex: 4 }}>
                                <h6 style={{ margin: 0 }}>
                                    Canara Recobo Multi Cap Fund - Regular (G)
                                </h6>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 py-2 text-md-end text-start">

                    </div>
                </div>

                <hr className="fw-light text-secondary" />

                <div className="d-flex justify-content-between">
                    <div>
                        <span className="text-secondary">Invested</span>
                        <br />
                        <span className="value-font2">₹5.31K</span>
                    </div>

                    <div>
                        <span className="text-secondary">Current Value</span>
                        <br />
                        <span className="value-font2">
                            11.62 <span className="fw-light">₹6.82K</span>
                        </span>
                    </div>

                    <div>
                        <span className="text-secondary">Gain/Loss</span>
                        <br />
                        <span className="value-font2">₹1.82K <span className="text-success">23.86%</span></span>
                    </div>
                </div>

            </div>

            <div
                className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
            // onClick={() => activeInactive("order-timeline")}
            >

                <div className="row justify-content-between">
                    <div className="col-lg-8 col-md-12 col-12 py-2">
                        <div className="d-flex">
                            <img src={SBI} alt="Image not found" />
                            <div className="ms-2 aling-self-center" style={{ flex: 4 }}>
                                <h6 style={{ margin: 0 }}>
                                    Canara Recobo Multi Cap Fund - Regular (G)
                                </h6>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 py-2 text-md-end text-start">

                    </div>
                </div>

                <hr className="fw-light text-secondary" />

                <div className="d-flex justify-content-between">
                    <div>
                        <span className="text-secondary">Invested</span>
                        <br />
                        <span className="value-font2">₹5.31K</span>
                    </div>

                    <div>
                        <span className="text-secondary">Current Value</span>
                        <br />
                        <span className="value-font2">
                            11.62 <span className="fw-light">₹6.82K</span>
                        </span>
                    </div>

                    <div>
                        <span className="text-secondary">Gain/Loss</span>
                        <br />
                        <span className="value-font2">₹1.82K <span className="text-success">23.86%</span></span>
                    </div>
                </div>

            </div>

        </main>
    );
}

export default StateFolioDetails;
