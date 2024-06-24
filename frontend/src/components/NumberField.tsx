interface NumberFieldProps {
    nome: string
    value: number
    setValue: Function
}

export function NumberField(props: NumberFieldProps) {
    return (
        <>
            <label>{props.nome}</label>
            <input
                className="border  border-gray-300 rounded-lg px-3  w-96 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                type="number"
                id="tituloReuniao"
                value={props.value}
                onChange={e => { props.setValue(e.target.value) }} />
        </>
    )
}