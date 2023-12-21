import React, { useState, createContext, ReactNode, useEffect } from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import mammoth from 'mammoth';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  'Content-Type'?: string;
}
// Define the types for the Modal context value
export type DataContextValue = {
  resume: string | ReadonlyArray<string> | number | undefined;
  setResume: React.Dispatch<React.SetStateAction<string>>;
  job_description: string;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  job_role: string;
  setJobRole: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  coverLetter: string;
  setCoverLetter: React.Dispatch<React.SetStateAction<string>>;
  story: string;
  setStory: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  userChoice: 'text' | 'file' | null;
  setUserChoice: React.Dispatch<React.SetStateAction<'text' | 'file' | null>>;
  handleJobRoleSubmit: () => Promise<void>;
  handleCompanySubmit: () => Promise<void>;
  handleJobDescriptionSubmit: () => Promise<string | null>;
  handleStorySubmit: () => Promise<string | null>;
  handleResumeSubmit: () => Promise<void>;
  handlePdfUpload: () => Promise<void>;
  handleAPISubmit: () => Promise<void>;
  wakeUpBackend: () => Promise<void>;
};

/* expands the use of states and functions into any component */
export const DataContext = createContext<DataContextValue>({
  resume: '',
  job_description: '',
  job_role: '',
  loading: false,
  company: '',
  coverLetter: '',
  story: '',
  errorMessage: '',
  setResume: () => {},
  setJobDescription: () => {},
  setJobRole: () => {},
  setLoading: () => {},
  setCompany: () => {},
  setStory: () => {},
  setCoverLetter: () => {},
  setErrorMessage: () => {},
  handleJobRoleSubmit: async () => {},
  handleCompanySubmit: async () => {},
  handleJobDescriptionSubmit: async () => null,
  handleStorySubmit: async () => null,
  handleResumeSubmit: async () => {},
  handlePdfUpload: async () => {},
  handleAPISubmit: async () => {},
  wakeUpBackend: async () => {},
  file: undefined as File | undefined,
  setFile: () => {},
  userChoice: null,
  setUserChoice: () => {},
});

type DataProviderProps = {
  children: ReactNode;
};

/* Data module */
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [resume, setResume] = useState<string>('');
  const [file, setFile] = useState<File | undefined>();
  const [userChoice, setUserChoice] = useState<'text' | 'file' | null>('file');
  const [job_description, setJobDescription] = useState<string>('');
  const [job_role, setJobRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState('');
  
  useEffect(() => {
    getSessionId();
  }, []);

  useEffect(() => {
    console.log("Session ID being sent: ", sessionId);
  }, [sessionId]);
  
  const axiosInstance = axios.create({
    baseURL: "https://craftly-backend.onrender.com",
    // baseURL: "http://127.0.0.1:5000",
  });
  
  // Call getSessionId on component mount
  // Gives user a session id when visiting the site
  const getSessionId = async () => {
    try {
      const response = await axiosInstance.get('/get_session_id');
      setSessionId(response.data.session_id);
      wakeUpBackend()
    } catch (error) {
      console.error('Error getting session ID:', error);
    }
  };

  // waking up render backend server 
  const wakeUpBackend = async () => {
      try {
        setLoading(true);
        await axiosInstance.get('/wake_up');
        console.log('Backend woken up');
      } catch (error) {
        console.error('Error waking up backend:', error);
      } finally {
       setLoading(false);
      }
    };
  

  // function to handle docx file uploading and changing docx files to string to send to the backend
  const readFileContent = async (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const fileContent = event.target?.result;
        if (fileContent) {
          resolve(fileContent as string | ArrayBuffer);
        } else {
          reject(null);
        }
      };
  
      reader.onerror = () => reject(null);
  
      reader.readAsArrayBuffer(file);
    });
  };
  
  // function to handle posting data to backend routes
  const apiRequest = async (
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
    successMessage?: string
  ): Promise<any> => {
    try {
      setLoading(true);
      console.log('Request Payload:', data);
  
      if (data) {
        data.session_id = sessionId;
      }
  
      const response = await axiosInstance.post(url, data, config);
  
      console.log('API Response:', response.data);
      console.log(response.data.message);
  
      if (successMessage) {
        console.log(successMessage);
      }
  
      return response.data;
    } catch (error) {
      console.error(`Error during API request: ${(error as any)?.response?.data?.message || (error as any)?.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  
  // Handle sending text to job role route to backend
  const handleJobRoleSubmit = async () => {
    apiRequest(
      '/set_job_role',
      { job_role },
      undefined,
      'Job role submitted successfully.'
    );
  };
  
  // Handle sending text to company route to backend
  const handleCompanySubmit = async () => {
    apiRequest(
      '/set_company',
      { company },
      undefined,
      'Company submitted successfully.'
    );
  };
  
  // Handle sending text to job description route to backend
  const handleJobDescriptionSubmit = async () => {
    const maxCharacters = 4000;
    const characterCount = job_description.length;
  
    setLoading(true);
    console.log('Accepting users job description:', job_description);
  
    try {
      if (characterCount > maxCharacters) {
        console.error('Job description exceeds the character limit of 4000.');
        return 'Job description exceeds the character limit of 4000.';
      }
  
      await apiRequest(
        '/set_job_description',
        { job_description },
        undefined,
        'Job description submitted successfully.'
      );
  
      return null;
    } catch (error) {
      console.error('Error submitting job description:', error);
      return 'Error submitting job description. Please try to use less than 1000 characters';
    } finally {
      setLoading(false);
    }
  };
  
  // Handle sending text to story route to backend
  const handleStorySubmit = async () => {
    const maxCharacters = 1000;
    const characterCount = story.length;
  
    setLoading(true);
    console.log('Accepting users story:', story);
  
    try {
      if (!story) {
        console.error('Please fill out all the fields before proceeding.');
        return 'Please fill out all the fields before proceeding.';
      }
      if (characterCount > maxCharacters) {
        console.error('Story exceeds the character limit of 1000.');
        return 'Story exceeds the character limit of 1000 characters.';
      }
  
      await apiRequest(
        '/set_story',
        { story },
        undefined,
        'Story submitted successfully.'
      );
  
      return null;
    } catch (error) {
      console.error('Error submitting story:', error);
      return 'Error submitting story. Please try to use less than 500 characters';
    } finally {
      setLoading(false);
    }
  };

  // Handle sending PDF  route to backend
  const handlePdfUpload = async () => {
    try {
      setLoading(true);
    
      if (file) {
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('session_id', sessionId);

        console.log("About to upload PDF file:", file);
    
        await apiRequest(
          '/upload_resume',
          formData,
          { 'Content-Type': 'multipart/form-data' },
          'Resume submitted successfully.'
        );
        console.log("PDF file uploaded successfully");
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle submitting text or doc file to a backend also checks if the file upload is PDF
  const handleResumeSubmit = async () => {
    setLoading(true);
  
    try {
      console.log("Accepting user's resume:", resume);
  
      if (userChoice === 'text' && resume) {
        console.log("Uploading text resume:", resume);
        await apiRequest(
          '/set_resume',
          { userChoice, resume },
          undefined,
          'Resume submitted successfully.'
        );
        console.log("Text resume uploaded successfully");

      } else if (userChoice === 'file' && file) {
        const fileContent: string | ArrayBuffer | null = await readFileContent(file);
  
        if (fileContent === null) {
          console.error('Error reading file content.');
          return;
        }
  
        let contentType: string;
        let resumeText: string;
  
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          
          const result = await mammoth.extractRawText({ arrayBuffer: fileContent as ArrayBuffer });
          resumeText = result.value;
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          
          // Handle PDF files
        } else if (file.type.includes('pdf') || (file.name.includes('.pdf'))) {
          console.log("About to handle PDF upload");
          await handlePdfUpload();
          console.log("PDF handling completed");
          return; // Exit early as PDF handling is asynchronous
        } else {
          console.error('Unsupported file type:', file.type, file.name);
          setErrorMessage('Unsupported file type. Please choose a valid file.');
          return;
        }
  
        console.log('Request Payload:', { userChoice, resume: resumeText });
  
        await apiRequest(
          '/set_resume',
          { userChoice, resume: resumeText },
          { 'Content-Type': contentType },
          'Resume submitted successfully.'
        );
  
        setResume(resumeText);
        console.log("Resume uploaded successfully");
      }
    } catch (error) {
      console.error('Error during resume submission:', error);
    } finally {
      setLoading(false);
    }
  };
  
// Handle sending data to backend API
const handleAPISubmit = async () => {
  setLoading(true);
  console.log('Attempting to submit to:', axiosInstance.defaults.baseURL + '/generate_letter');
  console.log(
    'Retrieving cover letter:',
    resume,
    job_description,
    job_role,
    story,
    company
  );

  try {
   
    const currentJobRole = job_role;
    const currentCompany = company;
    const currentJobDescription = job_description;
    const currentStory = story;
    const currentResume = resume;

    const response = await apiRequest(
      '/generate_letter',
      {
        job_role: currentJobRole,
        company: currentCompany,
        job_description: currentJobDescription,
        story: currentStory,
        resume: currentResume,
      },
      undefined,
      'API data submitted successfully.'
    );

    const receivedCoverLetter = (response && response.cover_letter) || '';
    setCoverLetter(receivedCoverLetter);
  } catch (error) {
    console.error('Error posting data to API Server', error);
    setErrorMessage('Error posting data to API Server');
  } finally {
    setLoading(false);
  }
};

  const value: DataContextValue = {
    resume,
    job_description,
    job_role,
    loading,
    company,
    coverLetter,
    errorMessage,
    story,
    setResume,
    setJobDescription,
    setJobRole,
    setLoading,
    setCompany,
    setStory,
    setCoverLetter,
    setErrorMessage,
    handleJobRoleSubmit,
    handleCompanySubmit,
    handleJobDescriptionSubmit,
    handleStorySubmit,
    handleResumeSubmit,
    handlePdfUpload,
    handleAPISubmit,
    wakeUpBackend,
    file,
    setFile,
    userChoice,
    setUserChoice,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};