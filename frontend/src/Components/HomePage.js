import { useNavigate } from "react-router-dom";
import "../Styles/HomePage.css";
import Navbar from "./Navbar";
import { homePageConfig } from "../config";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function HomePage({ auth }) {

  const navigate = useNavigate();
  const {lang} = useContext(AuthContext);

  const handleCardClick = (link) => {
    navigate(link);
  };
  return (
    <div className="app">
      <Navbar/>
      <main className="main-section">
        <h2 className="main-title">Welcome to Water Plant Management System</h2>
        <p className="main-subtitle">
          Manage your water orders, returns, and deliveries efficiently
        </p>

        <div className="card-grid">
          {homePageConfig(lang).map((eachCard, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(eachCard?.navLink)}
              className="card"
            >
              <div className="icon">{eachCard?.icon}</div>
              <h3>{eachCard?.title}</h3>
              <p>{eachCard?.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
