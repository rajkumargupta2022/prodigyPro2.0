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
            <Button variant="outline-primary" onClick={onBack}>
              Back
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={onSaveContinue}>
              Save and Continue
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
