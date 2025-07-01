import React from "react";
import { itemHistory } from "./ItemHistorySampleDate";
import "../Styles/ItemTimeLine.css";
import Navbar from "./Navbar";

const ItemTimeLine = () => {
  return (
    <>
    <Navbar/>
    <div className="timeline-wrapper">
      <div className="content">
        <h2>ITEM-1</h2>
      <div className="timeline">
        {itemHistory.map((customer, index) => (
          <div key={index} className="customer-container">
            <div className="block">
            <span onClick={""} className="indicator-icon">
              {customer?.isReturned ? (
                <i className="bxr  bx-user-check"></i>
              ) : (
                <i className="bxr bx-user-x " />
              )}
            </span>
            <div className="text-box">
              <h4 className="date-time">{customer.datetime}</h4>
              <h4 className="name">{customer.name}</h4>
            </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    </>
  );
};

export default ItemTimeLine;
