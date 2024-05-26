import { ChangeEvent, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'


interface FileWithId {
  id: string;
  file: File;
}
const UploadFiles:React.FC = () => {

  const [files, setFiles] = useState<FileWithId[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: URL.createObjectURL(file),
        file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((fileWithId) => fileWithId.id !== id));
  };


  
  return (
    <div className="flex flex-wrap ">
      <div className=''>
          <label>Anexar documentos:</label>
          <input type="file" multiple onChange={handleFileChange} />
      </div>

      <div className=''>
        <ul>
          {files.map((fileWithId) => (
            <li key={fileWithId.id}>
              {fileWithId.file.name}
              <button onClick={() => handleRemoveFile(fileWithId.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>  

        {/* <button className="flex items-center justify-center border 
        border-gray-300 rounded-lg px-3 py-2 w-full h-10 focus:outline-none
        focus:border-gray-500 focus:ring-gray-400"
        type="button">

        <GrAttachment className="mr-2" />
        Anexar documento

        </button> */}
    </div>
  )
}

export default UploadFiles
