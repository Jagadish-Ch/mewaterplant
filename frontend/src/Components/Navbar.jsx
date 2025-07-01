import React, { useContext, useState, useRef } from "react";
import cansIcon from "../ImagesIcon/cansIcon.png";
import { loginService, logoutService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../Styles/Navbar.css';

const Navbar = () => {
  const { auth, setAuth, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const navRef = useRef();

  const [isProfileClicked, setProfileClicked] = useState(false);

  const handleProfileClick = () => {
    console.log("Clicked: ", isProfileClicked);
    setProfileClicked(!isProfileClicked);
  };

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive-nav');
    setProfileClicked(false)
  }

  const handleLogOut = async (e) => {
    e.preventDefault();
    const response = await logoutService();
    if (response.success) {
      setAuth(false);
      setProfileClicked((prevState) => !prevState);
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const authFormData = {
      email: process.env.REACT_APP_GUEST_EMAIL,
      password: process.env.REACT_APP_GUEST_PASSWORD,
    };

    const response = await loginService(authFormData);
    setLoading(false);
    if (response.success) {
      setAuth(response.userData);
      navigate("/");
    }
    setProfileClicked((prevState) => !prevState);
  };
  return (
    <header className="navbar">
      <div className="logo">
        <img src={cansIcon} className="cans-icon" />
        <span className="logo-title">WPMS</span>
      </div>
      
      <nav ref={navRef} className="nav-links">

          {auth?.authenticate ? (
          <div className="inner-ele avatar" onClick={handleProfileClick}></div>
        ) : (
          <div className="inner-ele sign-in-btn" onClick={handleProfileClick}>
            <span>Login</span>
            {" "}
            < i className='bxr  bxs-arrow-in-right-square-half'></i> 
          </div>
        )}
      <div className={`inner-ele profile-card ${isProfileClicked ? "show" : "hidden"}`}>
          {auth?.authenticate ? (
            <div className="profile-btn">
              <h4 className="user-name">{auth?.user?.userName}</h4>
              <button onClick={handleLogOut} className="logout">
                Logout <i className="bx  bxs-arrow-in-left-square-half"></i>
              </button>
            </div>
          ) : (
            <div className="inner-ele profile-btn">
              <button onClick={(e) => handleGuestLogin(e)} className="login">
                Guest Login
              </button>
              <button onClick={() => navigate("/auth")} className="login">
                User Login
              </button>
            </div>
          )}
        </div>
        
          <span onClick={() => navigate("/")}>HOME</span>
          <span onClick={() => navigate("/active-items")}>ACTIVE ITEMS</span>
          <span onClick={() => navigate("/order")}>NEW ORDER</span>
          <span onClick={() => navigate("/returncan/id")}>RETURN CAN</span>
          <span onClick={() => navigate("/report/id")}>REPORT</span>
          <span onClick={() => navigate("/pending")}>PENDING STATUS</span>


        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          < i className='bxr  bx-x'></i>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        < i className='bxr  bx-menu-wide'></i> 
      </button>
      {auth?.authenticate ? (
          <div className="avatar" onClick={handleProfileClick}></div>
        ) : (
          <div className="sign-in-btn" onClick={handleProfileClick}>
            <span>Login</span>
            {" "}
            < i className='bxr  bxs-arrow-in-right-square-half'></i> 
          </div>
        )}
      <div className={`profile-card ${isProfileClicked ? "show" : "hidden"}`}>
          {auth?.authenticate ? (
            <div className="profile-btn">
              <h4 className="user-name">{auth?.user?.userName}</h4>
              <button onClick={handleLogOut} className="logout">
                Logout <i className="bx  bxs-arrow-in-left-square-half"></i>
              </button>
            </div>
          ) : (
            <div className="profile-btn">
              <button onClick={(e) => handleGuestLogin(e)} className="login">
                Guest Login
              </button>
              <button onClick={() => navigate("/auth")} className="login">
                User Login
              </button>
            </div>
          )}
        </div>
    </header>
  );
};

export default Navbar;
