import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendResetOTPService, sendVerifyOTPService, terminateOtpVerificationService } from "../../services";



const OtpPage = ({ location, handleSubmit, setActivePage }) => {

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { 
        authFormData,
        otpArray,
        setOtpArray,
        loading,
    } = useContext(AuthContext);
    
     const [timeLeft, setTimeLeft] = useState(900); // 15 minutes * 60 seconds
  const [isRunning, setIsRunning] = useState(true);

  console.log("Location", location);

    // useEffect(() => { 
    //   const handleBeforeUnload = async (e) => {

    //     e.preventDefault();
    //     e.returnValue = "OTP Verification Terminated";
    //     await terminateOtpVerificationService(authFormData.email);
    //     console.log(location, "Rendered")
    //   }

    //   window.addEventListener('beforeunload', handleBeforeUnload);

    //   return () => window.removeEventListener('beforeunload', handleBeforeUnload);
      
    //  }, [location==='authPage']);

     // Time Counter
  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const resendOtp = async (e) => {
    e.preventDefault();
     setIsRunning(false);
     if(location === "authPage") {
      const response = await sendVerifyOTPService(authFormData.email);
      if(response.success) setTimeLeft(900);
     }
     else if(location === "forgotPage") {
      const response = await sendResetOTPService(authFormData.email);
      if(response.success) setTimeLeft(900);
     }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };



    const handleFocus = (index) => {
        inputRefs.current[index]?.select();
      };
    
      const handleChange = (value, index) => {
        if (/^\d$/.test(value)) {
          const updatedOtp = [...otpArray];
          updatedOtp[index] = value;
          setOtpArray(updatedOtp);
    
          // Move to next input if available
          if (index < 5) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      };
    
      const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
          const updatedOtp = [...otpArray];
          updatedOtp[index] = "";
          setOtpArray(updatedOtp);
          if (index > 0) inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
          inputRefs.current[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      };
    
      const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text").split(" ").join("");
        const pasteArray = paste.split("");
        console.log(pasteArray, "Paste")
        pasteArray.forEach((char, index) => {
          
          otpArray[index] = char;
          
        });
      };
  return (
    <form action="#" className="otp-forms">
      {location !== "authPage" && <h2>Reset Password</h2>}
      <h4>OTP Expires within: {formatTime(timeLeft)}</h4>
      <h5>Enter OTP Sent to your Email</h5>

      <div className="otp-wrapper" onPaste={handlePaste}>
        {otpArray.map((char, index) => (
          <input
            key={index}
            type="text"
            autoComplete="off"
            maxLength={1}
            value={char}
            onFocus={() => handleFocus(index)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="otp-input"
          />
        ))}
      </div>

      <button type="button" onClick={resendOtp} name="otp">
        {loading ? "Loading..." : "Resend OTP"}
      </button>

      <button disabled={otpArray.join('').length < 6} type="submit" onClick={handleSubmit} name="otp" style={{opacity: otpArray.join('').length < 6? 0.2: 1}}>
        {loading ? "Loading..." : "Verify OTP"}
      </button>

      
        {location==='authPage' ? 
        <div className="active-tab">
            <p>
                Go to <span onClick={() => setActivePage('register')}>Register Page</span>
            </p>
        </div>
        : <div className="active-tab">
            <p>
                Go to <span onClick={() => navigate("/auth")}>Login Page</span>
            </p>
        </div>}
      
    </form>
  );
};

export default OtpPage;
