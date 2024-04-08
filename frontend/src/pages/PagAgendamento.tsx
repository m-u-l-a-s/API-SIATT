import Navbar from "../components/Navbar"

const PagAgendamento = () => {

    return (

        <div >
            <Navbar/>

            <div className="conteudo flex">


            <div className="coluna-1 w-2/3 bg-blue-300 h-screen">
            
                <h1> 
                    <a>Mensal</a> 
                    | 
                    <a>Criado por mim</a>
                    
                </h1>

            
            </div>

            <div className="coluna-2 w-1/3 bg-red-300 h-screen">

            </div>
            
            </div>
        </div>

    );

};


export default PagAgendamento; 