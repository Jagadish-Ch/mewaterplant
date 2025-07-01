import { useContext, useState } from "react";
import { resetPasswordService, sendResetOTPService } from "../../services";
import { useNavigate } from "react-router-dom";
import OtpPage from "./OtpPage";
import { AuthContext } from "../../context/AuthContext";

const ForgotPage = () => {
  const navigate = useNavigate();

  const {
    otpArray,
    setOtpArray,
    loading,
    setLoading,
    showPassword,
    setShowPassword,
  } = useContext(AuthContext);

  const [userData, setUserData] = useState({ email: "", newPassword: "" });
  const [activeTab, setActiveTab] = useState("email");

  console.log(userData);
  console.log(otpArray);

  const handleSingleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const newData = {
      ...userData,
      [name]: value,
    };

    setUserData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (activeTab === "email") {
      const valid = validateEmail(userData.email);
      if (!valid) {
        alert("Enter Valid Email");
      }
      const response = await sendResetOTPService(userData.email);
      setLoading(false);
      if (response.success) {
        setActiveTab("otp");
      }
    } else if (activeTab === "otp") {
      setActiveTab("changePassword");
      setLoading(false);
    } else if (activeTab === "changePassword") {
      const otp = otpArray.join("");
      const formData = {
        ...userData,
        otp,
      };
      const response = await resetPasswordService(formData);
      setLoading(false);
      if (response.success) {
        alert("Password Change Successfully, Now you can Login");
        navigate("/auth");
      }
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        {activeTab === "email" && (
          <form action="#">
            <h2>Reset Password</h2>
            <h5>Enter your registered Email-Id to send Reset OTP!</h5>

            <div className="single-input">
              <input
                type="email"
                name="email"
                placeholder="Your Email-id"
                className="input-email-id"
                onChange={handleSingleInputChange}
                autoComplete="off"
                required
              />
            </div>

            <button type="submit" onClick={handleSubmit} name="email">
              {loading ? "Loading..." : "Send OTP"}
            </button>

            <div className="active-tab">
              <p>
                Go to <span onClick={() => navigate("/auth")}>Login Page</span>
              </p>
            </div>
          </form>
        )}

        {activeTab === "otp" && (
          <OtpPage
            location={"forgotPage"}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        )}

        {activeTab === "changePassword" && (
          <form>
            <h2>Change Password</h2>
            <h5>Please set new password</h5>
            <br />
            <div className="input-field">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                onChange={handleSingleInputChange}
                value={userData.newPassword}
                required
              />
              <label>Enter new password</label>
            </div>

            <div className="show-pswd">
              <label htmlFor="show-password">
                <input
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  type="checkbox"
                  id="show-password"
                  autoComplete="off"
                />
                <span
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  id="show-password"
                >
                  {"  Show Password"}
                </span>
              </label>
            </div>

            <button onClick={handleSubmit} type="submit">
              {loading ? "Loading" : "Submit"}
            </button>
            <div className="active-tab">
              <p>
                Go to <span onClick={() => setActiveTab("otp")}>OTP Page</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPage;
