import SignatureCanvas from "react-signature-canvas";
import NavBar from "../../components/Navbar";
import NextBar from "../../components/Next-bar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const DigitalSignature = () => {
  const navigate = useNavigate()
  const sigCanvas = useRef(null);
  // const [signature, setSignature] = useState(null);
  const signature =null;

  // Save signature as image
  // const handleSave = () => {
  //   if (sigCanvas && sigCanvas.current && sigCanvas.current.isEmpty()) {
  //     alert("Please provide a signature first!");
  //     return;
  //   }
  //   setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  // };

  // Clear the signature pad
  // const handleClear = () => {
  //   sigCanvas.current.clear();
  //   setSignature(null);
  // };

  return (
    <>
      <NavBar />
      <div className="container pt-5" style={{ marginBottom: "10%" }}>
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">Digital Signature</h3>
          <div className="bg-white px-5 py-4 rounded form_shadow">
            <p className="text-dark">
              Please use your finger or digital pen to draw a reasonable
              likeness of your signature
            </p>
            <label className="fw-light text-secondary">
              Draw a Signature in the box
            </label>
            {/* Signature Pad */}
            <div
              style={{
                border: "1px solid #d0dbea",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: window.innerWidth - 40,
                  height: 300,
                  className: "signature-canvas",
                }}
              />
            </div>

            {/* Buttons */}
            {/* <div className="mt-3 text-center">
              <button className="btn btn-danger me-2" onClick={handleClear}>
                Clear
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Signature
              </button>
            </div> */}

            {/* Display Signature */}
            {signature && (
              <div className="mt-3 text-center">
                <p className="fw-bold">Saved Signature:</p>
                <img
                  src={signature}
                  alt="Signature"
                  style={{ width: "300px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <NextBar onSaveContinue={()=>{navigate("/e-sign")}} />
    </>
  );
};

export default DigitalSignature;
