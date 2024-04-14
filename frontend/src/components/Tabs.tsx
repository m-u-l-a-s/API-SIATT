import React from "react";
import FormularioHibrido from "../pages/FormularioHibrido";
import FormularioPresencial from "../pages/FormularioPresencial";
import FormularioOnline from "../pages/FormularioOnline";
import Navbar from "./Navbar";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap text-black">
        <div className="w-full">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                  (openTab === 1 ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                }
                onClick={() => setOpenTab(1)}
                href="#presencial"
                role="tab"
              >
                Presencial
              </a>
            </li>

            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                  (openTab === 2 ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                }
                onClick={() => setOpenTab(2)}
                href="#online" 
                role="tab"
              >
                Online
              </a>
            </li>

            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                  (openTab === 3 ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                }
                onClick={() => setOpenTab(3)}
                href="#hibrido" 
                role="tab"
              >
                Híbrido
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="presencial">
                  <FormularioPresencial />
                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="online">
                  <FormularioOnline />
                </div>

                <div className={openTab === 3 ? "block" : "hidden"} id="hibrido">
                  <FormularioHibrido />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
