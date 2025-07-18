import { Form } from 'react-bootstrap';


function Returns() {

  return (
    
        <div
              className="card p-md-4 p-2 radius16px"
             
            >
              <h5 className="font-size-16 mb-3">Sort By</h5>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="Returns - High to Low"
                  name="sortBy"
                  defaultChecked
                />
                <Form.Check
                  type="checkbox"
                  label="Fund Size - High to Low"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Min. Investment - Low to High"
                  name="sortBy"
                />
                <Form.Check
                  type="checkbox"
                  label="Fund Name - A to Z"
                  name="sortBy"
                />
              </Form>
            </div>
  );
}

export default Returns;