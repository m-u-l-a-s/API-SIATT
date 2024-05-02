import { Link } from "react-router-dom";

interface Props{
    icon: any
    titleCard: string
    buttonText: string
    buttonLink: string
}


export const CardHome = (props:Props) => {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-center">
          {props.icon}
        </div>
        <span> {props.titleCard} </span>
        <Link to={props.buttonLink}>
        <button
          className="rounded-lg bg-fonteAmarela py-4 px-20 font-sans text-xs font-bold uppercase 
                            text-white shadow-md shadow-gray-500 transition-all hover:shadow-lg 
                            hover:shadow-gray-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                            active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {" "} {props.buttonText} {" "}
        </button>
        </Link>
      </div>
    </>
  );
};


