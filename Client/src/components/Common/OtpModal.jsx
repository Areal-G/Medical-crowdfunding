import { useState } from "react";

const OtpModal = ({ email, onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = () => {
    onSubmit(otp);
  };

  return (
    // <div isOpen={true} toggle={onClose}>
    //   <div className="modal-header">
    //     <h5 className="modal-title">Enter OTP</h5>
    //     <button type="button" className="close" onClick={onClose}>
    //       <span>&times;</span>
    //     </button>
    //   </div>
    //   <div className="modal-body">
    //     <p>An OTP has been sent to your email: {email}</p>
    //     <input
    //       type="text"
    //       name="otp"
    //       id="otp"
    //       placeholder="Enter OTP"
    //       value={otp}
    //       onChange={handleOtpChange}
    //     />
    //   </div>
    //   <div className="modal-footer">
    //     <Button color="secondary" onClick={onClose}>
    //       Close
    //     </Button>
    //     <Button color="primary" onClick={handleOtpSubmit}>
    //       Verify OTP
    //     </Button>
    //   </div>
    // </div>
    <div>hi</div>
  );
};

export default OtpModal;
