interface TextAreaProps {
    nome: string
    value: string
    setValue: Function
}

export function TextArea(props: TextAreaProps) {
    return (
        <>
            <div className="flex items-start">
                <label>{props.nome}</label>
            </div>
            <div className="flex items-start">
                <textarea
                    className="border  border-gray-300 rounded-lg px-3 py-2 w-full h-20 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400"
                    onChange={e => props.setValue(e.target.value)}
                    value={props.value}
                />
            </div>
        </>
    )
}