import { MdDelete } from "react-icons/md";

interface ListaEmailsProps {
  emails: string[];
  setEmails: Function;
}

export default function ListaEmailsProps(props: ListaEmailsProps) {

  const onDelete = (index : number,e : any) => {
    e.preventDefault()
    const updateEmails = props.emails.filter((_, i) => i !== index)
    console.log(updateEmails)
    props.setEmails(updateEmails)
  }

  return (
    <div className="email-list  max-h-28 overflow-y-auto  rounded-lg p-2">
      {props.emails.map((email, index) => (
        <div key={index} className="flex items-center space-x-3 border
       border-gray-300 rounded-lg px-3 py-2 w-auto h-7 focus:outline-none
        focus:border-gray-500 focus:ring-gray-400 mb-2">

          <span className="p-4">{email}</span>

          <div className="flex items-center justify-end w-full">
          <MdDelete onClick={(e) => onDelete(index,e)}/>
            
          </div>

        </div>

      ))}
    </div>
  );
};