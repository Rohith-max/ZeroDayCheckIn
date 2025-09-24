import React, { useState } from "react";
import "../styles/TrainingVideos.css";

const TrainingVideos = () => {
  const [isComplianceChecked, setIsComplianceChecked] = useState(false);

  const handleComplianceCheck = () => {
    setIsComplianceChecked(!isComplianceChecked);
  };

  return (
    <div className="training-videos-container"></div>
  );
};

export default TrainingVideos;
