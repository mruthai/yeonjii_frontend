import React, { useState } from 'react';
import { IoCopy } from "react-icons/io5";

interface CopyButtonProps {
    textToCopy: string;

}

const CopyButton:React.FC<CopyButtonProps> = ({textToCopy }) => {
    const [copied, setCopied] = useState<boolean>(false);
  

    const handleCopyClick = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
          }, 1500);
        };
      

  return (
    
   <button
      className={`flex flex-row justify-center mt-5 hover:border hover:shadow items-center gap-2 py-3 px-3 rounded-lg font-open ${
        copied ? ' dark:text-primary-4 text-primary-1' : ' dark:text-primary-4  text-primary-1'
      }`}
      onClick={handleCopyClick}
    > <IoCopy className="text-primary-1 dark:text-primary-4"/>
      {copied ? 'Copied!' : 'Copy'}
    </button>
    
  )
}

export default CopyButton