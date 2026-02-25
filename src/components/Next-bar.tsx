import { MouseEventHandler } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const Footer = ({
  onSaveContinue,
}: {
  onSaveContinue: MouseEventHandler;
}) => {
  const navigate = useNavigate();
  return (
    <footer className="fixed-bottom bg-white border-top py-3">
      <Container>
        <Row>
          <Col className="text-start">
            <Button  className="customCancelButton px-3" onClick={()=>navigate(-1)}>
              Back
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="primary" className="customButton px-2" onClick={onSaveContinue}>
              Save & Continue
            </Button>
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
