import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import type { DataContextValue } from "../../context/DataProvider";
import CopyButton from "../modal/CopyButton";
import Modal from "../modal/Modal";
import RightSidebar from "./../builderStage/RightSidebar"
import { IoPencil, IoCheckmarkCircle, IoSave } from "react-icons/io5";
import { GrammarContext } from '../../context/GrammarProvider';
// import mammoth from "mammoth";
// import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';





const CoverLetterStage: React.FC = ({}) => {
  const { coverLetter, setCoverLetter } = useContext<DataContextValue>(DataContext) as DataContextValue;
    const { isEditing, setIsEditing } = useContext(GrammarContext);
    const [editing, setEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    
    useEffect(() => {
      setCoverLetter(coverLetter || "");
    }, [coverLetter]);

  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCoverLetter(e.target.value);
    };
  // handles user editing the cover letter in a textarea 
    const handleEditClick = () => {
      setEditing(!editing);
      setIsEditing(!isEditing);
      
    };
  // handles confirming edits 
    const handleSaveClick = () => {
      setEditing(false);
    };

    // handles user downloading their cover letter as a pdf file
    const handleDownloadPDF = () => {
      const pdf = new jsPDF();
      pdf.setFontSize(12);
      let startY = 20;
      const maxWidth = 180; 
      const splitText = pdf.splitTextToSize(coverLetter, maxWidth);
      pdf.text(splitText, 10, startY);
      startY += pdf.getTextDimensions(splitText).h + 10;
      // pdf.text('Additional Content:', 10, startY);
      startY += 10;
      pdf.save('coverLetter.pdf');
    };

  
    return (
      <>
        <div className="w-full dark:bg-primary-6 dark:from-primary-6 dark:to-primary-6 bg-gradient-to-b  from-primary-4 to-purple-100">
          {coverLetter ? (
            <div className=" p-12 flex flex-col justify-center items-center">
              <h2 className="py-8 font-headers text-xl font-bold dark:text-primary-4">
                Your Personalized Cover Letter
              </h2>
              <div className="relative pl-10 pr-10 pt-20 pb-10 rounded-xl border-2 hover:shadow dark:bg-primary-6 bg-primary-5 inline-block whitespace-pre-wrap w-4/5">
                {editing ? (
                  <div>
                    <textarea
                      value={coverLetter}
                      onChange={handleTextChange}
                      className="border p-2 resize-none w-full h-screen rounded font-open text-primary-6 bg-primary-5 border-none dark:text-primary-5 dark:bg-primary-6"
                    />
                    <button
                      onClick={handleSaveClick}
                      className="absolute top-0 right-72 flex flex-row mt-5 justify-end hover:shadow text-primary-1 dark:text-primary-5 items-center gap-2 py-3 px-3 rounded-lg font-open hover:border"
                    >
                      {" "}
                      <IoCheckmarkCircle className="text-primary-1 dark:text-primary-5" />
                      Confirm Edits
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-open text-primary-6 dark:text-primary-4">{coverLetter}</p>
                    <button
                      onClick={handleEditClick}
                      className="absolute top-0 right-72 mr-5 flex flex-row mt-5 justify-center items-center gap-3 py-3 px-3 rounded-lg font-open hover:shadow hover:border text-primary-1 dark:text-purple-300"
                    >
                      {" "}
                      <IoPencil className="text-primary-1 dark:text-purple-300" />
                      Edit
                    </button>
                  </div>
                )}
                <div className="absolute top-0 right-10">

                  <CopyButton textToCopy={coverLetter} />
                </div>
                  <button 
                   className="absolute top-0 right-28 flex flex-row mt-5 mr-4 justify-end text-primary-1 dark:text-primary-5 items-center gap-2 py-3 px-3 rounded-lg font-open hover:shadow hover:border dark:border-primary-4 "
                  onClick={handleDownloadPDF}> 
                  <IoSave />
                  Download PDF
                   </button>

              </div>
            </div>
          ) : (
            <>
              <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
            </>
          )}
        </div>
  
        {/* Conditionally render RightSidebar when editing is true */}
        {editing && <RightSidebar />}
      </>
    );
  };


export default CoverLetterStage;
