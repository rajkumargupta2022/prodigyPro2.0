import { useState } from 'react';
import { Form } from 'react-bootstrap';

function Filters() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
      <>
       <div
              className="card p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
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
            </div>

            <div
              className="card p-md-4 p-2 mt-2"
              style={{ border: "none", borderRadius: "16px" }}
            >
              <h5 className="font-size-16 mb-3">AMC</h5>
              <Form className="fixed-scrolling-amc">
                <Form.Check
                  type="checkbox"
                  label="360 ONE"
                  name="sortBy"
                  defaultChecked
                />
                <Form.Check
                  type="checkbox"
                  label="Aditya Birla SL MF"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Axis Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="DSP Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Edelweiss Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Groww Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="HDFC Mutual Fund"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="ICICI Prudential Mutual Fund"
                  name="sortBy"
                />
              </Form>
            </div>
      </>
         
  );
}

export default Filters;