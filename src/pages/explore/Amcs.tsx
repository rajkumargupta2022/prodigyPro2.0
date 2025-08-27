import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { amcListKeys, amcListResponse } from "../data-interfaces/explore";
import { endPoints } from "../../services/utils/urls";
import { getRequest } from "../../services/Api/HandleApi";

interface FiltersProps {
  handleFilter: (value: number, type: string) => void;
  isAvailable: (value: number,type:string) => boolean;
}

function Filters({ handleFilter ,isAvailable}: FiltersProps) {
  const [amcListData, setAmcListData] = useState<amcListKeys[]>([])
  
  useEffect(() => {
    fetchAmcList()
  }, [])

  const fetchAmcList = async () => {
    try {
      const res = await getRequest<amcListResponse>(endPoints.getAmcList)
      if (res.data) {
        setAmcListData(res.data)
      }
    } catch (err) {
      // console.log(err);
    }
  }

  return (
    <>
    {/* <div
              className="card p-2 mt-2 radius16px"
              
            >
              <h5 className="mt-3 font-size-16 mb-3">Risk</h5>
              <Form className="checkbox-grid-setprodgy">
                <Form.Check type="checkbox" label="High" name="risk" defaultChecked />
                <Form.Check type="checkbox" label="Moderate" name="risk" />
                <Form.Check type="checkbox" label="Low" name="risk" />
                <Form.Check type="checkbox" label="Moderate Low" name="risk" />
                <Form.Check type="checkbox" label="Moderate High" name="risk" />
                <Form.Check type="checkbox" label="Very High" name="risk" />
              </Form>
            </div> */}
      <div className="card p-md-4 p-2 mt-2 radius16px">
        <h5 className="font-size-16 mb-3">AMC</h5>
        <Form className="fixed-scrolling-amc">
          {amcListData.length>0 ? amcListData.map((item,i)=>{
            return (
              <div 
                key={i}
                className="d-flex align-items-center mb-2 p-1 rounded"
                onClick={()=>handleFilter(item.amc_code,"amc")}
                style={{ cursor: 'pointer' }}
              >
                <Form.Check
                  type="checkbox"
                  checked={isAvailable(item.amc_code,"amc")}
                  onChange={() => {}} // Empty onChange since click is handled by parent div
                  className="me-2"
                  style={{ pointerEvents: 'none' }} // Prevent direct checkbox clicks
                />
                <label 
                  className="mb-0 flex-grow-1"
                  style={{ cursor: 'pointer' }}
                >
                  {item?.AMC_Name}
                </label>
              </div>
            )
          }):""}
        </Form>
      </div>
    </>
  );
}

export default Filters;