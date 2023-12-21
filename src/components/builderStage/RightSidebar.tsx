import React, { useContext, useEffect } from "react";
import { GrammarContext } from "../../context/GrammarProvider";

const RightSidebar: React.FC = () => {
  const { corrections, isEditing, fetchCorrections } = useContext(GrammarContext);

  useEffect(() => {
    if (isEditing) {
      fetchCorrections();
    }
  }, [isEditing, fetchCorrections]);

  return (
    <div className="w-1/5 p-4 dark:bg-primary-6 dark:text-primary-4 dark:border-primary-2 border-l-2 bg-primary-5 border-primary-3">
      <ul>
        {corrections.map((correction, index) => (
          <li key={index}>
            <p className="text-primary-6">Error: {correction.error}</p>
            <p>Suggestion: {correction.suggestion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
