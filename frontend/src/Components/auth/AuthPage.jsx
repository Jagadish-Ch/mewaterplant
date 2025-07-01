import { useContext, useState } from "react";
import "../../Styles/AuthPage.css";
import OtpPage from "./OtpPage";
import { AuthContext } from "../../context/AuthContext";
import { loginService, registerService, sendVerifyOTPService, verifyOTPService } from "../../services";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { authFormData, setAuthFormData, otpArray, inCompletedOtpVerification, setInCompletedOtpVerification, loading, setLoading, showPassword, setShowPassword, setAuth } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('login');

  console.log("FormData", authFormData);

  const changeActivePage = (page) => {
    setAuthFormData({
    name: "",
    email: "",
    password: "",
  }); 
    setActivePage(page);
  };


  const handleInput = (e) => {
    const { name, value } = e.target;

    const cpyData = {
      ...authFormData,
      [name]: value,
    };

    setAuthFormData(cpyData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (activePage === 'login') {
      const response = await loginService(authFormData);
      setLoading(false);
      if (response.success) {
        setAuth(response.userData)
        navigate('/');
      }
    }
    else if (activePage === 'register') {
      const response = await registerService(authFormData);
      setLoading(false);
      if (response.success) {
        setActivePage('otp');
      }
    }
    else if(activePage === 'otp') {

      const response = await verifyOTPService(otpArray.join(''));
      setLoading(false);

      if(response.success) navigate('/');
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        {activePage !== 'otp' && (
          <form action="#" onSubmit={handleSubmit}>
            <h2>{activePage === "login" ? "Login" : "Register"}</h2>

            {activePage !== 'login' && (
              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={authFormData.name}
                  autoComplete="off"
                  required
                />
                <label>Enter your Full Name</label>
              </div>
            )}

            <div className="input-field">
              <input type="text" name="email" value={authFormData.email} onChange={handleInput} autoComplete="off" required />
              <label>Enter your email</label>
            </div>

            <div className="input-field">
              <input
                type={showPassword ? "text" : "password"}
                value={authFormData.password}
                name="password"
                onChange={handleInput}
                autoComplete="off"
                required
              />
              <label>Enter your password</label>
            </div>

            <div className="show-pswd">
              <label htmlFor="show-password">
                <input
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  type="checkbox"
                  id="show-password"
                />
                <span
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  id="show-password"
                >
                  {"  Show Password"}
                </span>
              </label>
            </div>
            {activePage === 'login' && (
              <div className="forget">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" />
                  <p>Remember me</p>
                </label>
                <a href="/forgot">Forgot password?</a>
              </div>
            )}
            <button type="submit">
              {loading===false ? activePage === 'login'?
              "Login In" : "Submit" : "Loading..."}
            </button>
            <div className="active-tab">
              {activePage === 'login' ? (
                <p>
                  Don't have an account?{" "}
                  <span onClick={() => changeActivePage('register')}>Register</span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span onClick={() => changeActivePage('login')}>Login</span>
                </p>
              )}
            </div>
          </form>
        )}

        {activePage === 'otp'  && (
          <OtpPage
            handleSubmit={handleSubmit}
            location={"authPage"}
            setActivePage={setActivePage}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
