const ButtonAdd = () => {
    return (
        <div className="flex items-center max-w-md mx-auto bg-white rounded-lg mt-2 mb-2 ml-2 border">
            <button
                className="flex px-4 items-center justify-center w-full h-12 rounded-lg bg-red-500 text-lg text-white shadow-md shadow-red-500/20 transition-all 
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
