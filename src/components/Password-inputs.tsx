import { useState } from "react";
import OtpInput from "react-otp-input";

function PasswordInputs() {
  return (
    <div className="p-4 mb-2 w-50">
      <div className="form-group">
        <label className="form-label">PASSWORD</label>
        <input
          type="text"
          placeholder="Enter Password"
          className="form-control"
          id="password"
        />
      </div>

      <div className="form-group mb-4">
        <label className="form-label">PASSWORD</label>
        <input
          type="text"
          placeholder="Enter Password"
          className="form-control"
          id="password"
        />
      </div>

      <span className="note">
        <span className="fw-bold">Note</span>: Password must be at least eight
        characters long and include a combination of letters, numbers, at least
        one uppercase letter, and one special character.
      </span>
      <br />
      <button className="mandate-button mt-4">Change Password </button>
    </div>
  );
}

export default PasswordInputs;
