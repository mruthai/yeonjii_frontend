import React, {useContext, useEffect, useState} from 'react';
import Loading from '../general/Loading';
import { DataContext } from "../../context/DataProvider";
import { IoSparklesSharp, IoWarningOutline } from 'react-icons/io5';
import TipsPopUp from "../general/TipsPopUp";
import InfoHover from "../general/InfoHover";

interface JobDetailsProps {
    valueOne: string;
    valueTwo: string;
    valueText: string;
    onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeInputOne: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeInputTwo: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSave: () => void;
    maxLengthJD: number;
    
}

const JobDetails:React.FC<JobDetailsProps> = ({
    valueOne,
    valueTwo,
    valueText,
    onChangeInputOne,
    onChangeInputTwo,
    onChangeTextArea,
    onSave,
    maxLengthJD,
}) => {
  const { errorMessage} = useContext(DataContext);
  const contextValue = useContext(DataContext);
  console.log(contextValue);
  const [characterCount, setCharacterCount] = useState<number>(valueText.length);
  const [isTipsOpen, setIsTipsOpen] = useState<boolean>(false);
  
  useEffect(() => {
    setCharacterCount(valueText.length);
  }, [valueText]);

  const openTips = () => {
    setIsTipsOpen(true);
  };
  const closeTips = () => {
    setIsTipsOpen(false);
  };  

  return (
  
    <div className="rounded-xl p-2 dark:bg-primary-6 dark:text-primary-4 bg-primary-5 mx-auto md:w-[600px] w-[500px] h-6/12 shadow-xl">
       <div className="relative">
        <div className="absolute lg:bottom-[-420px] md:bottom-[-520px] lg:right-[-220px] md:right-[-140px] ">
          <TipsPopUp
            tipsOpen={isTipsOpen}
            tipsClose={closeTips}>
            <div className="flex flex-row gap-2">
              <IoSparklesSharp
                size={20}
                className="text-yellow-400"
              />
              <p className="text-primary-5 font-open text-base">Expert Tip</p>
            </div>
            <p className="pl-2 mt-2 text-primary-5 font-open text-xs">
             When you paste the job descriptions please keep this in mind:
            </p>
            <ul className="text-primary-5 text-xs space-y-3 mt-3 pl-2 list-disc list-inside">
              <li className="flex items-start">• <span className="mr-2"> Paste only the job description and requirements. </span></li>
              <li className="flex items-start">• <span className="mr-2"> You don't need to include benefits or any HR related information.</span></li>
              <li className="flex items-start">• <span className="mr-2"> You don't need to include the company synopsis.</span></li>
            </ul>
          </TipsPopUp>
        </div>
      </div>
      <div className="flex flex-col justify-start  px-7 py-7 ">
        <div className="flex flex-row items-center space-x-2">
       <h2 className="font-headers text-xl font-semibold">Job Details</h2>
       <InfoHover>
        <p className="font-open text-sm">Ensure the job role/title and company match the job application</p>
        <p className="font-open text-sm">Click in the text area below to see expert tips</p>
        </InfoHover>
        </div>   
       <p className="pt-6">Please tell us what job you are applying for today!</p>
      </div>
      <div className="flex flex-col px-7 space-y-6">
        <input type="text" placeholder="Job Role" className="font-open text-sm text-primary-6 w-auto bg-primary-4 placeholder-gray-500 h-10 border rounded-lg p-4 border-primary-3 focus:border-primary-1 focus:outline-none dark:text-primary-5 dark:bg-primary-6" value={valueOne} onChange={onChangeInputOne} />
        <input type="text" placeholder="Company Name" className="font-open text-sm text-primary-6 w-auto bg-primary-4 placeholder-gray-500 h-10 border rounded-lg p-4 border-primary-3 focus:border-primary-1 focus:outline-none dark:text-primary-5 dark:bg-primary-6" value={valueTwo} onChange={onChangeInputTwo} />
       <textarea
         className="font-open text-sm w-auto h-52 border bg-primary-4 text-primary-6 dark:text-primary-5 dark:bg-primary-6 rounded-lg p-4 border-primary-3 placeholder-gray-500 focus:border-primary-1 focus:outline-none resize-none"
         value={valueText}
         placeholder="Paste the job description here..."
         onChange={onChangeTextArea}
         onFocus={openTips}
        onBlur={closeTips}
         maxLength={maxLengthJD}
       />
      </div>
      <div className="flex justify-end pr-7 text-primary-4">
        <p className="text-primary-3 dark:text-primary-3 text-sm">
        {characterCount}/{maxLengthJD}
          </p>
      </div>
        {errorMessage && (
                   <div className="flex flex-row justify-center items-center gap-1">
                     <IoWarningOutline
                     size={20} 
                     className="text-red-500"/>
                     <p className=" dark:text-red-200 text-red-500 font-open text-sm font-semibold">
                     {errorMessage}
                       </p>
                   </div>
                 )}
      <div className="flex justify-end pr-7">
       <button 
       className="bg-primary-1 dark:border-primary-3 dark:border flex flex-row items-center gap-2 text-primary-4 font-open font-thin my-10 py-2 px-7 rounded-lg"
       onClick={onSave}
       ><Loading/>
      Continue
       </button>
      </div>
    </div>
    
  )
}

export default JobDetails

