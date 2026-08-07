import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import { postRequest } from "../../services/Api/HandleApi";
import { checkUploadRes } from "../data-interfaces/ucc";
import { endPoints } from "../../services/utils/urls";
import { errorToast, successToast } from "../../services/utils/toast";

interface CheckUploadProps {
  show: boolean;
  setShow: (show: boolean) => void;
  handleSubmit?: () => void;

}

const CheckUpload: React.FC<CheckUploadProps> = ({ show, setShow, handleSubmit }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [pdfBase64, setPdfBase64] = useState<string>("");

  const handleClose = () => setShow(false);

  // ✅ Single Image Upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0]; // only first file
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // ✅ Remove Image
  const removeImage = () => {
    setImage(null);
    setPreviewUrl("");
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const upload = async () => {
  if (!image) return;

  // Validate file size
  if (image.size > MAX_FILE_SIZE) {
    errorToast("Image size should not be greater than 5 MB");
    return;
  }

  const pdf = new jsPDF();

  const imgData = await convertImageToJpegDataUrl(image);

  pdf.addImage(imgData as string, "JPEG", 10, 10, 180, 160);

  const pdfBlob = pdf.output("blob");

  const base64 = await blobToBase64(pdfBlob);
  setPdfBase64(base64 as string);

  try {
    const res = await postRequest<checkUploadRes>(
      endPoints.saveBankProof,
      {
        image: base64,
        file_name: `${image.name}.pdf`,
      }
    );

    if (res.success) {
      successToast("File uploaded successfully");
      handleClose();
      handleSubmit && handleSubmit();
    }
  } catch (error) {
    console.error(error);
    errorToast("Upload failed");
  }
};

  // ✅ Helpers
  const convertImageToJpegDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas not supported"));
          // Fill with white background in case of transparent image (e.g. PNG)
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
        img.onerror = reject;
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  return (
    <Modal
      show={show}   // ✅ FIXED (you had show={true})
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload Bank Cheque</Modal.Title>
      </Modal.Header>


      <Modal.Body>
        <p className="fs14px">There appears to be a mismatch between the Primary Holder/Guardian name and the bank account holder name.
To help us verify your bank details and proceed, please upload a clear image of a cheque.</p>
        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="form-control mb-3"
        />

        {/* Preview */}
        {previewUrl && (
          <div style={{ position: "relative", width: "150px" }}>
            <img
              src={previewUrl}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />

            <button
              onClick={removeImage}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Base64 */}
        {pdfBase64 && (
          <textarea
            className="form-control mt-3"
            rows={3}
            value={pdfBase64}
            readOnly
          />
        )}
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={upload} disabled={!image}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckUpload;