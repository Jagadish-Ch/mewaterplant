import React from "react";
import "../Styles/Dialog.css";

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay " onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <span className="dialog-close" onClick={() => onClose()}>
              <i className="bxr  bx-x"></i>
        </span>
        <div className="dialog-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;