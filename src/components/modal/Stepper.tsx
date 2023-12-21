import React from "react";
import { IoCheckmarkCircleSharp, IoChevronDownCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";
interface StepperProps {
  totalSteps: number;
  currentStep: number;
  completedStep: number[];
  
}

const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
  completedStep,
  
}) => {
  /* Progress indicator to let the user know what step they are currently working on */
  
  return (
    <div className="bg-transparent dark:bg-primary-6 pt-20 pb-10">
      <div className=" flex items-center justify-center space-x-10 transition-all duration-300">
        {[...Array(totalSteps).keys()].map((step) => (
          <div
            key={step}
            className=" flex flex-col items-center">
            {completedStep.includes(step + 1) ? (
              <>
                {step + 1 === currentStep ? (
                  <div className="flex items-center justify-center">
                    <IoChevronDownCircleOutline size="38" className="dark:text-purple-400 text-primary-1"/>
                  </div>
                ) : (
                  <div className="flex items-center justify-center ">
                    <IoCheckmarkCircleSharp size="28" className="dark:text-purple-400 text-primary-1"/>
                  </div>
                )}
                <span className="mt-2 text-xs dark:text-purple-400 text-primary-1">
                  {step + 1 === totalSteps ? "Finish" : `Step ${step + 1}`}
                </span>
              </>
            ) : step + 1 < currentStep ? (
              <>
                {step + 1 === 1 ? (
                  <div className="flex items-center justify-center">
                     <IoChevronDownCircleOutline size="38" className="dark:text-purple-400 text-primary-1"/>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <IoCheckmarkCircleSharp size="28" className="dark:text-purple-400 text-primary-1"/>
                  </div>
                )}
                <span className="mt-2 text-xs dark:text-purple-400 text-primary-1">
                  {step + 1 === totalSteps ? "Finish" : `Step ${step + 1}`}
                </span>
              </>
            ) : step + 1 === currentStep ? (
              <>
                <div className="flex items-center justify-center">
                <IoChevronDownCircleOutline size="38" className="dark:text-purple-400 text-primary-1"/>
                </div>
                <span className="mt-2 text-xs dark:text-purple-400 text-primary-1">
                  {step + 1 === totalSteps ? "Finish" : `Step ${step + 1}`}
                </span>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <IoChevronForwardCircleOutline size="28" className="dark:text-primary-3 text-primary-2"/>
                </div>
                <span className="mt-2 text-xs dark:text-primary-3 text-primary-2 font-open">
                  {step + 1 === totalSteps ? "Finish" : `Step ${step + 1}`}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
