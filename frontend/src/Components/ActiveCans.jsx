import React, { useContext, useEffect, useRef, useState } from "react";
import "../Styles/ActiveCans.css";
import Navbar from "./Navbar";
import { ActiveCansContext } from "../context/ActiveCansContext";
import Dialog from "./Dialog";

const ActiveCans = () => {

  const { setTotalItems, setTargetItemNo, indicatorsConfig, indicatorsRef, containerRef, itemsDataWithIndicators, handleColorAllocator } = useContext(ActiveCansContext);
  
  const [isDialogBoxOpen, setDialogBoxOpen] = useState(false);
  // const [action, setAction] = useState();
  const [targetIndex, setTargetIndex] = useState();
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  console.log("f-con-data ", itemsDataWithIndicators)

  const handleDialogBox = async (index, canNo) => {
    setDialogBoxOpen(prev => !prev)
    setTargetIndex(index)
    setTargetItemNo(canNo);
  };

  const handleAction = (action) => {
    if(action !== "history") {
    handleColorAllocator(targetIndex, action);
    setDialogBoxOpen(prev => !prev)
    }else {
      // Get data from backed about History of this can.
      window.open('/history/item/1')
    }
  }

  const sortElements = (index) => {
    console.log(indicatorsConfig[index].name)
    setIndicatorIndex(index);
  }

  const filtered = indicatorIndex !== 0
  ? itemsDataWithIndicators
      .filter(item => item.status === indicatorsConfig[indicatorIndex].name)
  : itemsDataWithIndicators;

  return (
    <>
      <Navbar />
      <div className="layout">

        <Dialog isOpen={isDialogBoxOpen} onClose={() => setDialogBoxOpen(false)}>
        <ul className="dialog-box-content">
            <li onClick={() => handleAction("home")} className="verified">
              <i className="bxr bx-home-alt"></i>
              <p>Home</p>
            </li>
            <li onClick={() => handleAction("verified")} className="verified">
              <i className="bxr bx-badge-check"></i>
              <p>Verified</p>
            </li>
            <li onClick={() => handleAction("pending")} className="pending">
              <i className="bxr bx-alert-triangle bx-tada " />
              <p>Pending</p>
            </li>
            <li onClick={() => handleAction("missing")} className="missing">
              <i className="bxr  bx-x-shield"></i>
              <p>Missing</p>
            </li>
            <li onClick={() => handleAction("history")} className="history">
              <i className="bxr bx-history bx-tada " />
              <p>History</p>
            </li>
            
          </ul>
      </Dialog>

        <div ref={indicatorsRef} className="indicators">
          <div className="title">
            <p>INDICATORS</p>
          </div>
          <div className="items">
            {indicatorsConfig.map((ele, index) => (
              <div key={index} onClick={() => sortElements(index)} className={`item ${ele.name} ${indicatorIndex==index?'selected-item': ''}`}>
                {ele.htmlElements}
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="title">
            <p>{`${indicatorsConfig[indicatorIndex].name.toUpperCase() || 'ALL'} CANS`}</p>
          </div>
          <div ref={containerRef} className="items">
            {filtered.map((eachCan, index) => (
              <div
                key={index}
                className={`item ${eachCan?.status || "home"}`}
                onClick={() => handleDialogBox(index, eachCan.canNo)}
              >
                <span className={eachCan?.status === "verified"? "show-badge":""}>
                  <p><i className="bxr bx-badge-check"></i></p>
                </span>
                <span className={eachCan?.status === "missing"? "show":""}>
                  <p>X</p>
                </span>
                <span className={["home", ""].includes(eachCan?.status)? "show-badge":""}>
                  <p><i className="bxr bx-home-alt"/></p>
                </span>
                <span className={eachCan?.status === "today"? "show-badge":""}>
                  <p>< i className=''></i> </p>
                </span>
                <p>{eachCan?.canNo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveCans;
