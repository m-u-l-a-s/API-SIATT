interface ButtonCriarReuniaoProps {
  CriarReuniao: Function
}
export default function ButtonCriarReuniao(props: ButtonCriarReuniaoProps) {
  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-primary py-4 px-20 font-sans text-xs font-bold uppercase 
                                shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                                focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
        onClick={() => props.CriarReuniao()}
      >
        Agendar
      </button>
    </>
  );
}