import MyNavbar from "../components/Navbar"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Dashboard = () => {
  return (
    <>
      <MyNavbar />
      <section>
        <div className="container-fluid">
          <div className="row mt-3 justify-content-md-center">
            <div className="col-lg-7 col-sm-12">
            <Card>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
            </div>
            <div className="col-lg-3 col-sm-8">
            <Card>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
            </div>
           
          </div>

        </div>
      </section>
    </>
  )
}
export default Dashboard