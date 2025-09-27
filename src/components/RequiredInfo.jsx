import React from "react";
import "../styles/RequiredInfo.css";
import ClipboardSvg from "../assets/svg/clipboard.svg";

const RequiredInfo = ({ onClick, className = "" }) => {
  return (
    <div className={`required-info ${className}`} onClick={onClick}>
      <img
        src={ClipboardSvg}
        alt="Clipboard"
        className="clipboard-icon"
        width="24"
        height="26"
      />
      <span className="required-text">Required Information</span>
    </div>
  );
};

export default RequiredInfo;
