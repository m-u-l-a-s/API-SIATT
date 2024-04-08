
const ButtonAdd = () => {

    return (

        <div>
            <button
                className="m-2 middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 
                        font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all 
                        hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                        active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
            >
                + Nova Reunião
            </button>
        </div>

    );
};

export default ButtonAdd;

