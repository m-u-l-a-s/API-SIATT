import { GrAdd } from "react-icons/gr"

interface InputListFieldProps {
    name : string
    inputValue : string
    setInputValue : Function
    pushList : Function
}

export function InputListField(props : InputListFieldProps) {
    return (
        <>
            <div className="flex items-start space-x-2" >
                <label htmlFor="">{props.name}</label>
                <input
                    placeholder="exemplo@exemplo.com"
                    className="border  border-gray-300 rounded-lg px-3 w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                    type="text"
                    value={props.inputValue}
                    onChange={(e) => props.setInputValue(e.target.value)}
                />

                <button
                    onClick={(e) => props.pushList(e)}
                    className="flex items-center justify-center align-middle border border-gray-300 font-bold 
                                     w-8 h-8 rounded-full cursor-pointer hover:bg-gray-100"
                >
                    <GrAdd />
                </button>

            </div>
        </>
    )
}