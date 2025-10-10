import { Form } from 'react-bootstrap';
import { assetTypeListKeys, categoryListKeys,  } from '../data-interfaces/explore';


interface CategoryProps {
  handleFilter: (value: number, type: string) => void;
  isAvailable: (value: number,type:string) => boolean;
  categoryList:categoryListKeys[];
  assetTypeListData:assetTypeListKeys[]
}

function Category({ handleFilter,isAvailable,categoryList,assetTypeListData }: CategoryProps) {

 
  return (
    <div className="card p-md-4 p-2 mt-2 radius16px">
      <h5 className="mt-3 font-size-16 mb-3">Category</h5>

      <div className="explore-categoryprodgy">
        <p>Type</p>
        <div className="d-flex justify-content-between gap-1">
          {assetTypeListData.length > 0 && assetTypeListData.map((item,index)=>{
            return  <button type="button"  onClick={()=>handleFilter(item.asset_code , "asset")} key={index} className={`btn riskProfileBtn  w-50 ${isAvailable(item.asset_code,"asset")&&"btn_colorfull"}`}>{item.asset_type}</button>
          })}
        </div>
        <p className="pt-2 fs12px">Category</p>
      </div>
      
      <Form className="fixed-scrolling-amc">
        {categoryList.length>0 && categoryList.map((item,index)=>{
          return (
            <div 
              key={index}
              className="d-flex align-items-center mb-2 p-1 rounded"
              onClick={()=>handleFilter(item.classcode , "category")}
              style={{ cursor: 'pointer' }}
            >
              <Form.Check 
                type="checkbox" 
                checked={isAvailable(item.classcode,"category")} 
                onChange={() => {}} // Empty onChange since click is handled by parent div
                className="me-2"
                style={{ pointerEvents: 'none' }} // Prevent direct checkbox clicks
              />
              <label 
                className="mb-0 flex-grow-1"
                style={{ cursor: 'pointer' }}
              >
                 {item.category} {item.sub_category ? `(${item.sub_category})` : ""}
              </label>
            </div>
          )
        })}
      </Form>
    </div>
  );
}

export default Category;