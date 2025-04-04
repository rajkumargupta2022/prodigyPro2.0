
interface BarNameValueProp{
   label:string,
   maxLimit:any,
   value:any,
   setValue: (value: number) => void;
}

const RangeBar: React.FC<BarNameValueProp> = ({label,maxLimit=30,value,setValue}) => {

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className="investment-slider mt-3">
        <div className="d-flex justify-content-between">

        <label className="form-label text-muted fs12px">{label}</label>
        <label className="form-label text-end fs16px mb-0">{value} yrs</label>
        </div>
        <div className="position-relative">
          <input
            type="range"
            min="1"
            max={maxLimit}
            step="1"
            value={value}
            onChange={handleChange}
            className="range-slider"
            style={{
              background: `linear-gradient(to right, #5a67d8 ${((value - 1) / (maxLimit-1)) * 100}%, #e0e7ff ${((value - 1) / (maxLimit-1)) * 100}%)`,
            }}
          />
          <div className="range-labels d-flex justify-content-between mt-2">
            <span className="text-muted fs12px">1 Yr</span>
            <span className="text-muted fs12px">{maxLimit} Yrs</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default RangeBar