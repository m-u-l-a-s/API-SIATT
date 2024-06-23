import { ChangeEvent } from 'react'
import { MdDelete } from 'react-icons/md';


interface FileWithId {
  id: string;
  file: File;
}

interface Props {
  file: FileWithId[],
  setFile: Function,
}

const UploadFiles = (props: Props) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: URL.createObjectURL(file),
        file,
      }));
      props.setFile((prevFiles: FileWithId[]) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    props.setFile((prevFiles: FileWithId[]) => prevFiles.filter((fileWithId) => fileWithId.id !== id));
  };



  return (
    <div className="flex flex-wrap max-w-[32rem] space-y-3 -mt-1">
      <div className='flex'>
       
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          id="fileInput"
          className="hidden"
        />

        <label
          htmlFor="fileInput"
          className="bordaInput shadow-md shadow-gray-500 transition-all hover:shadow-lg hover:shadow-gray-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none px-3 py-2 border border-gray-300 rounded-lg cursor-pointer"
        >
          Anexar documentos
        </label>
      </div>

      <div className='mt-2 flex flex-col h-16 overflow-y-auto max-w-[32rem] min-w-[32rem] overflow-x-auto'>
        <ul className=' space-y-2'>
          {props.file.map((fileWithId) => (
            <li key={fileWithId.id} className='flex justify-between items-center 
          border
       border-gray-300 rounded-lg px-3 py-2focus:outline-none
        focus:border-gray-500 focus:ring-gray-400 mb-2'>
              <span>{fileWithId.file.name}</span>
              <button className='pl-1'>
                <MdDelete onClick={() => handleRemoveFile(fileWithId.id)} />
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default UploadFiles
