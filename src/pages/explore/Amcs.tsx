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

            <div
              className="card p-md-4 p-2 mt-2 radius16px"
              
            >
              <h5 className="font-size-16 mb-3">AMC</h5>
              <Form className="fixed-scrolling-amc">
                {amcListData.length>0 ? amcListData.map((item,i)=>{
                   return  <Form.Check
                  type="checkbox"
                  key={i}
                  label={item?.AMC_Name}
                  onClick={()=>handleFilter(item.amc_code,"amc")}
                  name="sortBy"
                  checked={isAvailable(item.amc_code,"amc")}
                  
                />
                }):""}
               
               
              </Form>
            </div>
      </>
         
  );
}

export default Filters;