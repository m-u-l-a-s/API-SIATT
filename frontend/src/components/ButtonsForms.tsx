const ButtonsForms = () => { 
     return (
         <div className="flex justify-between mt-9 text-black font-medium  px-56">
            
             <button
                 className="rounded-lg bg-white border-gray-500 py-4 px-20 font-sans text-xs font-bold uppercase 
                 text-black shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-72"
                 data-ripple-light="true"
             >
                 Limpar Campos
             </button>
 
             <button
                 className="rounded-lg bg-red-600 py-4 px-20 font-sans text-xs font-bold uppercase 
                 text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg 
                 hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-96"
                 data-ripple-light="true"
             >
                 Agendar
             </button>
         </div>
     );
 };
 
 export default ButtonsForms;
 