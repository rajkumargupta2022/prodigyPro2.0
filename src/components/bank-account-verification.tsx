import { ArrowLeft, Upload } from "react-bootstrap-icons";
import CreateMandate from "./create-mandate";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { fetchAdminUser } from "../services/user/adminUser";
import { errorToast } from "../services/utils/toast";


function AddAccountVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const [show, setShow] = useState(false);
  const cancelChequeRef = useRef<HTMLInputElement>(null);
  const [fileBase64Checque, setFileBase64Checque] = useState<string | null>(null);
  const [cancelCheque, setCancelCheque] = useState<string>("");
  


  useEffect(()=>{
      if(!location?.state?.accountNumber){
        navigate("/add-bank-details")
      }
  },[])

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // converts to base64 string
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        errorToast("Only image files are allowed!");
        return;
      }

     
      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        errorToast("File size must be under 5 MB!");
        return;
      }
      setCancelCheque(file.name);

      try {
        const base64 = await toBase64(file);
        setFileBase64Checque(base64);
      } catch (err) {
        console.error("Error converting file:", err);
      }
    }
  };

  const proofSubmit = async () => {
    try {
      const adminUser = fetchAdminUser()

      const formData = new FormData();
      formData.append("image", fileBase64Checque ?? "");
      formData.append("fileName", cancelCheque ?? "");
      formData.append("ucc", adminUser?.ucc ?? "");
      formData.append("account_number", location.state.accountNumber ?? "");
      formData.append("ifsc_code",location.state.ifscCode  ?? "");
      formData.append("account_type",location.state.accountType  ?? "");

      const res = await postRequest<any>(endPoints.uploadProof, formData)
      console.log(res);

    } catch (err) {
      errorToast(err)
    }
  }



  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <CreateMandate setShow={setShow} show={show} accountNumber={location?.state?.accountNumber} ifscCode={location?.state?.ifscCode} accountType={location.state.accountType}/>
      <h3>
        <ArrowLeft className="crPointer" size={25} onClick={() => navigate(-1)} />
        Add Bank Account
      </h3>
      <hr className="fw-light text-secondary" />
      <h2 className="sub-heading">Verification Incomplete</h2>
      <span className="note">
        We need additional information to confirm that this bank account belongs
        to you
      </span>

      <div className="row mb-3 mt-4">
        <div className="col-md-6">
          <span className="xs-heading">BANK ACCOUNT PROOF</span>
          <br />
          <input
            type="file"
            ref={cancelChequeRef}
            onChange={handleFileChange}
            className="d-none"
            accept="image/*" // optional: restrict to images
          />
          <button type="button"
            className="upload-button"
            onClick={() => { cancelChequeRef.current?.click() }}>
            <Upload className="me-2" /> Upload Cancelled Cheque
          </button>
          {fileBase64Checque && (
            <div className="mt-3">
              <p><strong>File:</strong> {cancelCheque}</p>
              {fileBase64Checque.startsWith("data:image") ? (
                <img src={fileBase64Checque} alt="preview" width="100" className="rounded" />
              ) : (
                <p>📄 PDF file selected</p>
              )}
            </div>
          )}



        </div>
      </div>

      <div>
        <p className="mini-heading">Important Guidlines :</p>
        <ul>
          <li className="note">
            The uploaded document must match the name registered on your mutual
            fund account.
          </li>
          <li className="note">
            Ensure the document is clear, legible, and in PDF, JPEG, or PNG
            format.
          </li>
          <li className="note">Maximum file size: 5 MB.</li>
        </ul>
      </div>

      <button className="mandate-button mt-3" onClick={proofSubmit}>Submit</button>
    </main>
  );
}

export default AddAccountVerification;
