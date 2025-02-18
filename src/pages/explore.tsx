import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const funds = [
  {
    name: "Nippon India Large Cap Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: "https://via.placeholder.com/40",
  },
  {
    name: "ICICI Prudential Bluechip Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: "https://via.placeholder.com/40",
  },
  {
    name: "SBI Large Cap Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: "https://via.placeholder.com/40",
  },
  {
    name: "HDFC Large Cap Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: "https://via.placeholder.com/40",
  },
  {
    name: "DSP Top 100 Equity Fund",
    return: "25.8%",
    minSip: "₹100",
    logo: "https://via.placeholder.com/40",
  },
];

const Explore = () => {
  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search for mutual funds to invest..."
      />

      <div className="card p-3 mb-3">
        <div className="d-flex justify-content-between">
          <span>Start with ₹100</span>
          <span>Best Return Funds</span>
          <span>Top Rated Funds</span>
          <span>Tax Saver</span>
          <span>Equity Funds</span>
          <span>Debt Funds</span>
          <span>Explore All</span>
        </div>
      </div>

      <div className="card p-3">
        <h5>Popular funds</h5>
        <div className="mb-2">
          <button className="btn btn-primary btn-sm me-2">Large Cap</button>
          <button className="btn btn-light btn-sm me-2">Multi Cap</button>
          <button className="btn btn-light btn-sm me-2">Mid Cap</button>
          <button className="btn btn-light btn-sm">Flexi Cap</button>
        </div>
        <ul className="list-group">
          {funds.map((fund, index) => (
            <li
              key={index}
              className="list-group-item d-flex align-items-center"
            >
              <img
                src={fund.logo}
                alt="Fund Logo"
                className="me-3"
                width="40"
              />
              <div>
                <strong>{fund.name}</strong>
                <p className="mb-0 text-success">{fund.return} 3Y Returns</p>
                <p className="mb-0 text-muted">Min. SIP {fund.minSip}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Explore;
