import React, { useRef, useContext } from "react";
import images from "../../constants/images";
import { DataContext } from "../../context/DataProvider";
import {
  IoArrowBackOutline,
  IoWarningOutline
} from "react-icons/io5";

interface ResumeProps {
  submit: () => void;
  moveBack: () => Promise<void>;
}

const Resume: React.FC<ResumeProps> = ({ submit, moveBack }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    userChoice,
    setResume,
    resume,
    setUserChoice,
    file,
    setFile,
    errorMessage,
    setErrorMessage,
  } = useContext(DataContext);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage("No text was entered");
    setResume(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("Uploading file...");

    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (
        selectedFile.type.includes("pdf") ||
        selectedFile.type.includes("word") ||
        selectedFile.name.endsWith(".doc") ||
        selectedFile.name.endsWith(".docx") ||
        selectedFile.name.endsWith(".pdf")
      ) {
        setFile(selectedFile);
      } else {
        setErrorMessage("Unsupported file type. Please choose a valid file.");
        
        event.target.value = "";
      }
    }
  };

  const handleButtonClick = (choice: "text"  | "file") => {
    setUserChoice(choice);
    setErrorMessage("")
  };

  const handleDroppedFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      setErrorMessage("You didn't add a file")
    }
    console.log("files transfered", files);
  };

  return (
    <div className="dark:bg-primary-6 rounded-xl bg-primary-5 mx-auto md:w-[765px] w-6/12 h-6/12 shadow-xl">
      <div className="flex flex-col justify-start  px-7 py-7 ">
        <h2 className="dark:text-primary-4 font-headers text-xl font-semibold">
          Resume
        </h2>
        <p className="dark:text-primary-4 text-primary-6">
          Paste in or upload your resume!
        </p>
      </div>
      <div className="relative flex items-center justify-center">
        <button
          className={`${
            userChoice === "file"
              ? "bg-primary-1 text-primary-4 border border-primary-1"
              : "bg-primary-4 text-primary-1 border border-primary-1"
          }  font-open font-thin py-2 px-8 w-52 rounded-l-lg`}
          onClick={() => handleButtonClick("file")}>
          Upload Resume
        </button>
        <span className="bg-primary-5 border border-primary-1 rounded-full h-6 w-6  absolute ">
          <p className="font-open text-sm text-bold text-primary-1 flex justify-center">
            or
          </p>
        </span>
        <button
          className={`${
            userChoice === "text"
              ? "bg-primary-1 text-primary-4 border border-primary-1"
              : "bg-primary-4 text-primary-1 border border-primary-1"
          } font-open font-thin py-2 px-8 w-52 rounded-r-lg`}
          onClick={() => handleButtonClick("text")}>
          Paste Resume
        </button>
      </div>
      {userChoice === "file" && (
        <div
          className="flex flex-col justify-center items-center dark:bg-primary-6 bg-primary-4 mt-10"
          onDrop={handleDroppedFile}
          onDragOver={(e) => e.preventDefault()}>
          <label
            className="custom-file-upload w-11/12 h-60 flex flex-col hover:bg-purple-100 dark:hover:bg-purple-500 justify-end items-center border-dashed rounded-xl border border-primary-1"
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}>
            <input
              type="file"
              accept=".doc, .docx, .xml, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-row">
            <img
            className=""
            src={images.resume_icon}
            alt="Hero Image"
          />
            </div>
            <div className=" flex flex-col items-center mb-10">
              <span className="dark:text-primary-5 font-open text-lg font-semibold">
                Drag & Drop your Resume
              </span>
              <p className="font-open dark:text-primary-5 text-primary-6">
                or{" "}
                <span className="font-open text-primary-1 underline dark:text-primary-3">
                  click here to browse files
                </span>{" "}
                on your computer
              </p>
              <p className="font-open text-sm text-primary-1 dark:text-primary-3">
                only .doc, .docx, .pdf 
              </p>
            </div>
          </label>
        </div>
      )}
      {userChoice === "text" && (
        <div className="mt-10">
          <div className="flex justify-center">
            <textarea
              ref={textareaRef}
              value={resume}
              onChange={handleTextChange}
              maxLength={6000}
              placeholder="Add your resume here..."
              className="w-11/12 h-52 px-3 py-2 bg-primary-4 dark:text-primary-5 dark:bg-primary-6 placeholder:gray-500 border rounded-lg focus:outline-none resize-none"
            />
          </div>
        </div>
      )}
      <div className="flex px-6 flex-row justify-center">
        {file && (
          <p className="dark:text-primary-5 text-primary-5 bg-primary-1 p-2 rounded-bl-xl rounded-br-xl text-sm font-open">
            Selected File: {file.name}
          </p>
        )}
      </div>
      <div className="flex px-6 flex-row justify-between">
        <button
          className="flex flex-row items-center gap-3 text-primary-2 dark:text-primary-4 font-open font-thin my-10 py-2 px-8 rounded-lg"
          onClick={async () => {
            await moveBack();
          }}>
          <IoArrowBackOutline />
          Back
        </button>
        <button
          className="flex flex-row items-center gap-2 dark:border-primary-3 dark:border bg-primary-1 text-primary-4 font-open font-thin my-10 py-2 px-8 rounded-lg"
          onClick={submit}
          disabled={!resume && !file}

          >
          Submit
        </button>
           {/*  */}
      </div>
      {errorMessage && !resume && !file &&(
        <div className="flex flex-row justify-center items-center gap-1">
        <IoWarningOutline
        size={20} 
        className="text-red-500"/>
        <p className=" dark:text-red-200 text-red-500 font-open text-sm font-semibold">
        {errorMessage}
          </p>
      </div>
        )}
    </div>
  );
};

export default Resume;
