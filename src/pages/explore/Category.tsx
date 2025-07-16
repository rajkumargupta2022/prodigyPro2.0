import { useState } from 'react';
import { Form } from 'react-bootstrap';

function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    
      <div
              className="card p-md-4 p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="mt-3 font-size-16 mb-3">Category</h5>

              <div className="explore-categoryprodgy">
                <p>Type</p>
                <div className="d-flex justify-content-between gap-1">
                  <button type="button" className="btn riskProfileBtn btn_colorfull w-50">Equity</button>
                  <button type="button" className="btn riskProfileBtn w-50">Debt</button>
                  <button type="button" className="btn riskProfileBtn w-50">Hybrid</button>
                  <button type="button" className="btn riskProfileBtn w-75">Other Funds</button>
                </div>
                <p className="pt-3">Category</p>
              </div>
              <Form className="fixed-scrolling-amc">
                <Form.Check type="checkbox" label="Aggressive Hybrid" name="category" defaultChecked />
                <Form.Check type="checkbox" label="Dividend Yield Funds" name="category" />
                <Form.Check type="checkbox" label="Flexi Cap Funds" name="category" />
                <Form.Check type="checkbox" label="Index Funds" name="category" />
                <Form.Check type="checkbox" label="Large & Mid Cap Funds" name="category" />
                <Form.Check type="checkbox" label="Large Cap Funds" name="category" />
              </Form>
            </div>
  );
}

export default Category;