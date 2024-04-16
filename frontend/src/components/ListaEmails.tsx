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
    <div className="email-list max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
      {props.emails.map((email, index) => (
        <div key={index} className="flex items-center space-x-3 border bg-white
       border-gray-300 rounded-lg px-3 py-2 w-auto h-7 focus:outline-none
        focus:border-gray-500 focus:ring-gray-400 mb-2">

          <span className="p-4">{email}</span>

          <div className="flex items-center justify-end w-full">
            <button
              onClick={(e) => onDelete(index,e)}
              className="text-gray-500 hover:text-gray-700 rounded-full focus:outline-none"
            >
              X
            </button>
          </div>

        </div>

      ))}
    </div>
  );
};