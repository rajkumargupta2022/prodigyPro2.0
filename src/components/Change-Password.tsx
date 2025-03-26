import { ArrowLeft } from "react-bootstrap-icons";
import { useState } from "react";
import OTPVerification from "./otp-verification";
import PasswordInputs from "./Password-inputs";

function ChangePassword({
  backButton,
  activeInactive,
}: {
  backButton: any;
  activeInactive: any;
}) {
  const [active, setActive] = useState("otp-verification");

  const renderCompo = () => {
    switch (active) {
      case "otp-verification":
        return <OTPVerification setActive={setActive} />;
      case "p-input":
        return <PasswordInputs />;
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>
        <ArrowLeft className="crPointer" size={25} onClick={backButton} />{" "}
        Change Password
      </h2>
      <hr className="fw-light text-secondary" />

      {renderCompo()}
    </main>
  );
}

export default ChangePassword;
