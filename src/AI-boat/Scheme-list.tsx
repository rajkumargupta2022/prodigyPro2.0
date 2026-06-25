import { ChevronRight } from "react-bootstrap-icons";
import { imageUrl } from "../services/utils/urls";

const SchemeList = ({ schemes = [] }) => {
  return (
    <div className="row col-9 bg-white px-4 my-2 rounded form_shadow" key={1}>
      <div className="row borderColor py-2 crPointer">
        <div className="round col-11">

          <img
            src={`${imageUrl + 400015}.png`}
            className="rounded"
            height={30}
            width={30}
            alt=""
          />
          <small className="mx-2">Nippom india small cap fund</small>
        </div>
        <div className="col-1 adjustText pb-2 crPointer text-end" >
          <ChevronRight />
        </div>
        
      </div>
      
    </div>
  );
};

export default SchemeList;