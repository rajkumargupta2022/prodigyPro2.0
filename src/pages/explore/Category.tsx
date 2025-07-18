import { Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { assetTypeListKeys, assetTypeListResponse, categoryListKeys, categoryListResponse } from '../data-interfaces/explore';
import { endPoints } from '../../services/utils/urls';
import { getRequest } from '../../services/Api/HandleApi';

interface CategoryProps {
  handleFilter: (value: number, type: string) => void;
  isAvailable: (value: number,type:string) => boolean;
}


function Category({ handleFilter,isAvailable }: CategoryProps) {
const [categoryList, setCategoryList] = useState<categoryListKeys[]>([])
const [assetTypeListData, setAssetTypeListData] = useState<assetTypeListKeys[]>([])
  useEffect(() => {
    fetchCategoryList()
    fetchAssetTypeList()
  }, [])

  const fetchCategoryList = async () => {
    try {
      const res = await getRequest<categoryListResponse>(endPoints.getCategoryTypesList)
      if (res.data) {
        setCategoryList(res.data)
      }
    } catch (err) {
      console.log(err);
    }

  }
    const fetchAssetTypeList = async () => {
    try {
      const res = await getRequest<assetTypeListResponse>(endPoints.getAssetTypesList)
      if (res.data) {
        setAssetTypeListData(res.data)
      }
    } catch (err) {
      console.log(err);
    }

  }
 
  return (
    
      <div
              className="card p-md-4 p-2 mt-2 radius16px"
              
            >
              <h5 className="mt-3 font-size-16 mb-3" >Category</h5>

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
                  return  <Form.Check type="checkbox" checked={isAvailable(item.classcode,"category")} key={index} value={item.classcode} onClick={()=>handleFilter(item.classcode , "category")} label={item.category}name="category"  />
               
                })}
              </Form>
            </div>
  );
}

export default Category;