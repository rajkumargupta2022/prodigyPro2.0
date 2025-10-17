import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getRequest } from '../../services/Api/HandleApi';
import { endPoints } from '../../services/utils/urls';
import { shortKeys, shortRes } from '../data-interfaces/explore';

interface ShortProps{
  shortByHandler:(value:any)=>void;
  shortValue:string
}

const Returns: React.FC<ShortProps> =({shortByHandler,shortValue}) =>{
  const [shortList, setShortList] = useState<shortKeys[]>([])
  useEffect(() => {
    fetchSortFilters()
  }, [])
  const fetchSortFilters = async () => {
    try {
      const res = await getRequest<shortRes>(endPoints.getSortFilters)
      if (res.success) {
        setShortList(res.data)
      }
    } catch (err) {
      setShortList([])
    }
  }

  return (

    <div
      className="card p-md-4 p-2 radius16px"

    >
      <h5 className="font-size-16 mb-3">Sort By</h5>

     <Form>
  {shortList?.map((item, index) => (
    <Form.Check
      key={index} 
      id={`sort-by-${item.sort_code}`}// ✅ unique key required
      type="checkbox"
      label={item.sort_mode}
      checked={Number(shortValue)===item.sort_code}
      name="sort-by" // optional, fine for grouping
      value={item.sort_code}
      onChange={shortByHandler} // optional handler
    />
  ))}
</Form>

        

  
    </div>
  );
}

export default Returns;