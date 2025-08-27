import { imageUrl } from "../services/utils/urls";
import { Card, Form } from "react-bootstrap";
import { filteredSchemesKeys } from "../pages/data-interfaces/explore";


interface SwitchSelectionProps {
  filteredSchemes: filteredSchemesKeys[]
  handleSchemeSelection: (data: filteredSchemesKeys) => void;
  checkIsSelected: (data: filteredSchemesKeys) => boolean

}


const SwitchSelectionScheme: React.FC<SwitchSelectionProps> = ({ filteredSchemes, handleSchemeSelection, checkIsSelected }) => {


  return (
    <>

      <div className="col ">
        {/* <Row className="justify-content-between pb-4 pt-md-0 align-items-center">

          <Col md={11}>
            <div className="position-relative pt-md-0 pt-3">
              <Search
                className="mutual-funds-searchbuttonprodgy12 text-secondary "
                size={20}
              />

              <input className="rounded-4 exlore-search-box w-100" type="text" placeholder="Search for mutual funds to invest..."></input>
            </div>
          </Col>

        </Row> */}
        <div className="" style={{height: "50vh", overflowY: "scroll"}}>
          {filteredSchemes.length > 0 ? filteredSchemes.map((item, index) => (
            <Card
              className="mb-3 radius16px"
              key={index}

            >
              <Card.Body onClick={() => handleSchemeSelection(item)}>

                <div className="row justify-content-between">
                  <div className="col-8 py-2" >

                    <div className="d-flex align-items-center gap-1 crPointer">
                      <Form.Check type="checkbox" checked={checkIsSelected(item)} key={index} value={item.PRODUCT_CODE} />
                      <img src={`${imageUrl + item?.accordAMCCode}.png`} className="logoRadius" height={45} width={45} alt="Image not found" />
                      <div className="ms-2" style={{ flex: 4 }}>
                        <h6 style={{ margin: 0 }}>
                          {item.PRODUCT_LONG_NAME}
                        </h6>
                        <span className="text-secondary">
                          Equity - Large Cap
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-2 py-2 text-md-end text-start" >
                    <div className="text-secondary" >
                      <ChevronRight className="funds-rightsign-prodgy12" size={20} />
                    </div>
                  </div> */}
                </div>
                <hr className="fw-light text-secondary my-1" />
                <div className="row">
                  <div className="col-4">
                    <span className="text-secondary">Last 3Y</span>
                    <br />
                    <span className="value-font2 text-success">{item.threeYearCAGR}%</span>
                  </div>

                  <div className="col-4">
                    <span className="text-secondary">Min. SIP</span>
                    <br />
                    <span className="value-font2">
                      ₹1000
                    </span>
                  </div>

                  <div className="col-4">
                    <span className="text-secondary">Fund Size</span>
                    <br />
                    <span className="value-font2">₹26,776.87 Cr</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )) : <p className="text-center mt-4">No schemes found</p>}
        </div>
      </div>
    </>
  );
}

export default SwitchSelectionScheme;