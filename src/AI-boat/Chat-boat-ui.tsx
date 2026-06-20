import React from 'react';
import { Modal, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';

interface ChatBoatUiProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ChatBoatUi: React.FC<ChatBoatUiProps> = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg" // Make modal larger for chat UI
      contentClassName="modal-bg"
    >
      <Modal.Header closeButton className="border-bottom pb-2">
        <Modal.Title className="logoBlueColor">AI Assistant</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="d-flex flex-column" style={{ height: '65vh' }}>
          
          {/* Chat Messages Area */}
          <div className="overflow-auto d-flex flex-column p-4 bg-light flex-grow-1" style={{ gap: '15px' }}>
            
            {/* 1. Basic Bot Message */}
            <div className="d-flex justify-content-start">
              <div className="p-2 rounded-3 shadow-sm bg-white text-dark border" style={{ maxWidth: '85%' }}>
                Hello! I am your AI assistant. How can I help you today?
              </div>
            </div>

            {/* 2. User Message */}
            <div className="d-flex justify-content-end">
              <div className="p-2 rounded-3 shadow-sm logobg_color text-white" style={{ maxWidth: '85%' }}>
                Can you recommend a scheme for me?
              </div>
            </div>
            

            {/* 3. Bot Recommendation Scheme UI */}
            <div className="d-flex justify-content-start">
              <div className="p-3 rounded-3 shadow-sm bg-white text-dark border" style={{ maxWidth: '85%' }}>
                <p className="mb-2">Here is a recommended scheme for you based on market trends:</p>
                <Card className="shadow-sm border-0 bg-light mt-2">
                  <Card.Body>
                    <h6 className="logoBlueColor">Prodigy Growth Fund</h6>
                    <div className="d-flex justify-content-between fs-14px">
                      <span>Category: <strong>Equity - Multi Cap</strong></span>
                      <Badge bg="danger">High Risk</Badge>
                    </div>
                    <div className="mt-2 text-success">
                      <strong>15.2% (1Y)</strong> Returns
                    </div>
                    <Button variant="outline-primary" size="sm" className="mt-3 w-100">
                      Select this Scheme
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* 4. User Message */}
            <div className="d-flex justify-content-end">
              <div className="p-3 rounded-3 shadow-sm bg-primary text-white" style={{ maxWidth: '85%' }}>
                What other schemes are available?
              </div>
            </div>

            {/* 5. Bot Scheme List UI */}
            <div className="d-flex justify-content-start">
              <div className="p-3 rounded-3 shadow-sm bg-white text-dark border" style={{ maxWidth: '85%' }}>
                <p className="mb-2">Here are some available schemes you can choose from:</p>
                <ListGroup className="mt-2">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold">Prodigy Bluechip Fund</div>
                      <small className="text-muted">Equity</small>
                    </div>
                    <Button variant="primary" size="sm">Select</Button>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold">Prodigy Secure Debt Fund</div>
                      <small className="text-muted">Debt</small>
                    </div>
                    <Button variant="primary" size="sm">Select</Button>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>

            {/* 6. Bot Confirm Scheme UI */}
            <div className="d-flex justify-content-start">
              <div className="p-3 rounded-3 shadow-sm bg-white text-dark border" style={{ maxWidth: '85%' }}>
                <p className="mb-2">Please confirm your selected scheme to proceed.</p>
                <Card className="border-primary shadow-sm mt-2">
                  <Card.Header className="bg-primary text-white">Confirmation Required</Card.Header>
                  <Card.Body>
                    <p className="mb-1"><strong>Scheme:</strong> Prodigy Bluechip Fund</p>
                    <p className="mb-1"><strong>Investment:</strong> ₹ 5,000 / month</p>
                    <p className="mb-3"><strong>Type:</strong> SIP</p>
                    <div className="d-flex gap-2">
                      <Button variant="success" className="w-50">Confirm</Button>
                      <Button variant="secondary" className="w-50">Cancel</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

          </div>

          {/* Chat Input Area */}
          <div className="bg-white border-top p-3">
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                className="rounded-pill px-4"
              />
              <Button 
                variant="primary" 
                className="rounded-pill ms-2 px-4" 
              >
                Send
              </Button>
            </Form>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChatBoatUi;