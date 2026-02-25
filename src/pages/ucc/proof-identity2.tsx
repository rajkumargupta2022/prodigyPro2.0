import { useDropzone } from "react-dropzone";
import NavBar from "../../components/Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import NextBar from "../../components/Next-bar";
import { CloudUploadFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ProofIdentity2 = () => {
  const navigate = useNavigate()
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      // Handle the files here (e.g., upload to a server)
    },
  });

  return (
    <>
      <NavBar />

      <div className="breadcum_area" style={{ backgroundColor: "#F2F4FB" }}>
        <div className="personal_form_container p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container pt-5" style={{ marginBottom: "10%" }}>
        <div className="personal_form_container pt-4">
          <h3 className="mb-4 text-dark fw-bolder">Proof Of Identity</h3>
          <form className="bg-white px-5 py-4 rounded form_shadow">
            {/* First Name & Last Name */}

            <div className="row mb-3">
              <div className="col-md-12">
                <p className="text-center text-dark">
                  Please make a video by reading out the code displayed below
                  and then upload.
                </p>
                <p className="text-center">Your Code</p>
                <h5 className="text-center fw-bolder text-dark">100331</h5>
              </div>
            </div>

            {/* Drag and Drop Area */}
            <div className="row mb-3">
              <span className="fw-light text-secondary mb-2">
                Upload PAN Card
              </span>
              <div className="col-md-12">
                <div {...getRootProps({ className: "dropzone uploader" })}>
                  <input {...getInputProps()} />

                  <p>
                    <CloudUploadFill size={40} />
                    <br />
                    Upload a photo
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <NextBar  onSaveContinue={() => {navigate("/digital-signature")}} />
    </>
  );
};

export default ProofIdentity2;
