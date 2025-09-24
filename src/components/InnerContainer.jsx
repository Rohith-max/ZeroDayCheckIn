import React from "react";
import "../styles/InnerContainer.css";
import ProjectDetailsTable from "./ProjectDetailsTable";

const InnerContainer = ({ children, className = "" }) => {
  return (
    <div className={`inner-container ${className}`}>
      <ProjectDetailsTable />
      {children}
    </div>
  );
};

export default InnerContainer;
