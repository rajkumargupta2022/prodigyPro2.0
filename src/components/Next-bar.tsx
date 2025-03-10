import { MouseEventHandler } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = ({
  onBack,
  onSaveContinue,
}: {
  onBack: MouseEventHandler;
  onSaveContinue: MouseEventHandler;
}) => {
  return (
    <footer className="fixed-bottom bg-white border-top py-3">
      <Container>
        <Row>
          <Col className="text-start">
            <Button  className="customCancelButton px-3" onClick={onBack}>
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
