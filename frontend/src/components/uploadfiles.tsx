import { ChangeEvent, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md';


interface FileWithId {
  id: string;
  file: File;
}

interface Props{
    file:FileWithId[],
    setFile:Function,
}

const UploadFiles = (props:Props) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: URL.createObjectURL(file),
        file,
      }));
      props.setFile((prevFiles:FileWithId[]) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    props.setFile((prevFiles:FileWithId[]) => prevFiles.filter((fileWithId) => fileWithId.id !== id));
  };


  
  return (
    <div className="flex flex-wrap max-w-[32rem]">

      <div className='flex'>
          <label className='pr-1'>Anexar documentos: </label>
          <input type="file" multiple onChange={handleFileChange}/>
      </div>

      <div className='mt-2 flex flex-col h-14 overflow-y-auto max-w-[32rem] min-w-[32rem] overflow-x-auto'>
        <ul>
          {props.file.map((fileWithId) => (
            <li key={fileWithId.id}>
              {fileWithId.file.name}
              <button className='pl-1'><MdDelete onClick={()=>handleRemoveFile(fileWithId.id)}/></button>
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
