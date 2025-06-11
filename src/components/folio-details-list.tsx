function FolioDetails({ activeInactive }: { activeInactive: any }) {
  return (
    <>
      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("order-timeline")}
      >
        <h6 style={{ margin: 0 }} className="sub-heading fs16px">
          Kamini Gupta - 24324321
        </h6>

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary fs14px">INVESTED</span>
            <br />
            <span className="value-font2 fs16px">₹5.31K</span>
          </div>

          <div>
            <span className="text-secondary fs14px">CURRENT VALUE</span>
            <br />
            <span className="value-font2">
              <span className="value-font2 fs16px">₹5.31K</span>
            </span>
          </div>

          <div>
            <span className="text-secondary fs14px">FUNDS #</span>
            <br />
            <span className="value-font2 fs16px">2</span>
          </div>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("order-timeline")}
      >
        <h6 style={{ margin: 0 }} className="sub-heading fs16px">
          Kamini Gupta - 24324321
        </h6>

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">INVESTED</span>
            <br />
            <span className="value-font2">₹5.31K</span>
          </div>

          <div>
            <span className="text-secondary">CURRENT VALUE</span>
            <br />
            <span className="value-font2">
              <span className="value-font2">₹5.31K</span>
            </span>
          </div>

          <div>
            <span className="text-secondary">FUNDS #</span>
            <br />
            <span className="value-font2">2</span>
          </div>
        </div>
      </div>

      <div
        className="p-4 shadow-sm bg-white border-0 rounded-4 mb-2"
        onClick={() => activeInactive("order-timeline")}
      >
        <h6 style={{ margin: 0 }} className="sub-heading fs16px">
          Kamini Gupta - 24324321
        </h6>

        <div className="d-flex justify-content-between">
          <div>
            <span className="text-secondary">INVESTED</span>
            <br />
            <span className="value-font2">₹5.31K</span>
          </div>

          <div>
            <span className="text-secondary">CURRENT VALUE</span>
            <br />
            <span className="value-font2">
              <span className="value-font2">₹5.31K</span>
            </span>
          </div>

          <div>
            <span className="text-secondary">FUNDS #</span>
            <br />
            <span className="value-font2">2</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FolioDetails;
