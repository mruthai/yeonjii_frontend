import React from 'react';
import LeftSidebar from "../components/builderStage/LeftSidebar";
import CoverLetterStage from '../components/builderStage/CoverLetterStage';



const Builder: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-row">
        <LeftSidebar />
        <CoverLetterStage />
      </div>
    </div>
  );
};

export default Builder;
