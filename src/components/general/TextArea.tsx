// import React,{useState, useEffect} from 'react'


// interface TextAreaProps{
// value: string;
// placeholder: string;
// onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
// maxLength: number;
// }
// const TextArea:React.FC<TextAreaProps> = ({
//     value,
//     placeholder,
//     onChange,
//     maxLength,
// }) => {

//     const [characterCount, setCharacterCount] = useState<number>(value.length);

//     useEffect(() => {
//       setCharacterCount(value.length);
//     }, [value]);

//   return (
//     <>
//     <textarea
//          className="font-open text-sm w-auto h-52 border bg-primary-4 text-primary-6 dark:text-primary-5 dark:bg-primary-6 rounded-lg p-4 border-primary-3 placeholder-gray-500 focus:border-primary-1 focus:outline-none resize-none"
//          value={value}
//          placeholder={placeholder}
//          onChange={onChange}
//          maxLength={maxLength}
//        />
//        <div className="flex justify-end pr-7 text-primary-4">
//         <p className="text-primary-3 dark:text-primary-3 text-sm">
//         {characterCount}/{1000}
//           </p>
//       </div>
//     </>
//   )
// }

// export default TextArea