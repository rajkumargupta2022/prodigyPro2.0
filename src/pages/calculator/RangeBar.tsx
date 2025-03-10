import { useState } from "react";

const RangeBar = () => {
  const [value, setValue] = useState(10); // Default Value
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className="investment-slider mt-2">
        <label className="form-label text-muted fs12px">INVESTMENT PERIOD</label>
        <label className="form-label text-end fs12px">{value} yrs</label>
        <div className="position-relative">
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={value}
            onChange={handleChange}
            className="range-slider"
            style={{
              background: `linear-gradient(to right, #5a67d8 ${((value - 1) / 24) * 100}%, #e0e7ff ${((value - 1) / 24) * 100}%)`,
            }}
          />
          <div className="range-labels d-flex justify-content-between mt-2">
            <span className="text-muted">1 Yr</span>
            <span className="text-muted">25 Yrs</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default RangeBar