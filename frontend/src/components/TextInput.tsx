interface TextFieldProps {
    nome: string
    value: string
    setValue: Function
}

export function TextField(props: TextFieldProps) {
    return (
        <>
            <label>{props.nome}</label>
            <input
                className="border  border-gray-300 rounded-lg px-3  w-96 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                type="text"
                id="tituloReuniao"
                value={props.value}
                onChange={e => { props.setValue(e.target.value) }} />
        </>
    )
}