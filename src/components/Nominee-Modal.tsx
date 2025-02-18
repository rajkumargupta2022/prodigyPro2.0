import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

const NomineeModal = ({ toggle }: { toggle: boolean }) => {
  const [show, setShow] = useState(toggle);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ border: "none" }}
      >
        <Modal.Body
          className="p-4 rounded-3"
          style={{ backgroundColor: "#f6f8fa" }}
        >
          {/* Close Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">Add New Nominee</h5>
            <X size={24} className="cursor-pointer" onClick={handleClose} />
          </div>

          {/* Form */}
          <Form className="rounded-">
            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Name</Form.Label>
              <Form.Control type="text" defaultValue="Surabhi Gupta" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Date of Birth</Form.Label>
              <Form.Control type="date" defaultValue="1991-02-10" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">Relationship</Form.Label>
              <Form.Select defaultValue="Spouse">
                <option>Spouse</option>
                <option>Parent</option>
                <option>Sibling</option>
                <option>Child</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-secondary">
                Allocation Percentage
              </Form.Label>
              <Form.Control type="text" defaultValue="25%" />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" onClick={handleClose}>
              Add Nominee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NomineeModal;
