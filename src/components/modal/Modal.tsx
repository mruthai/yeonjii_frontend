import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
// import Tone from "./../modal/Tone"
import Stepper from "./../modal/Stepper";
import Resume from "../modal/Resume"
import Story from "./Story";
import LoadingCL from "../modal/LoadingCL";
import JobDetails from "../modal/JobDetails";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Modal:React.FC<ModalProps> = ({ isOpen, onClose })=> {
    const [step, setStep] = useState<number>(1);

    /* Grab all the props from DataProvider */
    const {
      resume,
      job_description,
      job_role,
      loading,
      company,
      story,
      file,
      setJobDescription,
      setStory,
      setJobRole,
      setCompany,
      setErrorMessage,
      setLoading,
      handleJobRoleSubmit,
      handleCompanySubmit,
      handleJobDescriptionSubmit,
      handleStorySubmit,
      handleResumeSubmit,
      handlePdfUpload,
      handleAPISubmit,
    } = useContext(DataContext);
  
    const contextValue = useContext(DataContext);
    console.log(contextValue);
  
    useEffect(() => {
      if (isOpen) {
        setStep(1);
      }
    }, [isOpen]);
  
    const handleJobDetails = async () => {
      try {
        if (!job_role || !company || !job_description) {
          console.error("Please fill out all the fields, before proceeding.");
          setErrorMessage("Please fill out all the fields, before proceeding.");
          return;
        }
        await handleJobRoleSubmit();
        await handleCompanySubmit();
        await handleJobDescriptionSubmit();
  
        console.log("Job Role, Company, Job Description submit successfully");
        setErrorMessage("");
      } catch (error) {
        console.log("Error sending Job Role, Company, Job Description");
      }
      setStep(2);
    };

    const handleSubmit = async () => {
      console.log('Inside handleSubmit')
      console.log('Resume text:', resume);
      console.log('File upload:', file);
      try {
        setLoading(true);
        if (!resume && !file) {
            console.error("Please paste your resume or upload before proceeding.");
            setErrorMessage("Please paste your resume or upload before Submitting");
            return;
          }
          console.log('Resume Text:', resume);
          console.log('File upload:', file);
          if (file && file.type.includes('pdf')) {
            // Handle PDF file
            await handlePdfUpload();
            console.log("PDF sent")
          } else {
            // Handle other 
            await handleResumeSubmit();
            console.log("Docx or text sent")
          }
      
          // Additional logic after resume/PDF submission
          await handleAPISubmit();    
          console.log('Job Role, Company, Job Description submit successfully');
          setErrorMessage(null);
        } catch (error) {
          console.error('Error during resume and API submission:', error);
          setErrorMessage('Error during resume and API submission. Please try again.');
        } finally {
          setLoading(false);
        }
      };


    return (
        <>
        {isOpen && (
          <>
            <Stepper
              totalSteps={3}
              currentStep={step}
              completedStep={[1]}
            />
  
            <>
              {step === 1 && (
                <>
                  {/* Route 1 Job Details */}
  
                  <JobDetails
                    onChangeInputOne={(e) => setJobRole(e.target.value)}
                    onChangeInputTwo={(e) => setCompany(e.target.value)}
                    valueOne={job_role}
                    valueTwo={company}
                    valueText={job_description}
                    maxLengthJD={4000}
                    onChangeTextArea={(e) => setJobDescription(e.target.value)}
                    onSave={handleJobDetails}
                  />
                </>
              )}
              {step === 2 && (
                <>
                  {/* Route 4 story */}
                  <Story
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    maxLengthUserTextArea={1000}
                    onSave={async () => {
                      
                      const error = await handleStorySubmit();
              
                      if (error !== null && error !== undefined) {
                  
                        setErrorMessage(error);
                      } else {
                       setErrorMessage(null)
                        setStep(3)
                        return null;
                      }
                    }}
                   
                    moveBack={async () => {
                      setStep(1);
                    }}
                  />
                
                </>
              )}
              {step === 3 && (
                <>
                  {/* Route 4 submit and load */}
                  {loading ? (
                    <LoadingCL />
                
                  ) : (
                    <Resume 
                    submit={async () => {
                      
                      const error = await handleSubmit();
              
                      if (error !== null && error !== undefined) {
                        setErrorMessage(error);
                      } else {
                       setErrorMessage(null)
                       onClose();
                       return null;
                       
                      }
                    }}
                  
                    moveBack={async () => {
                      setStep(2);
                    }}
                    />
                  )}  
                </>
              )}
            </>
          </>
        )}
        {/* Auto Closes with logic with handleAPISumit function */}
      </>
    );
}

export default Modal