import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";
import ButtonAdd from "../components/ButtonAdd";
import MeetingDetail from "../components/MeetingDetail";
import SearchInput from "../components/SearchInput";
import { Link } from "react-router-dom";

type Meeting = {
    id: string,
    titulo: string,
    dataHora: string,
    duracao: number,
    categoria: string,
    pauta: string,
    participantes: string[],
    solicitanteId: string,
    salaPresencialId: string,
    salaVirtualId: string | null,
};

const PagAgendamento = () => {
    const [reunioesAgendadas, setReunioesAgendadas] = useState<Meeting[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const presencialResponse = await fetch("http://localhost:3000/reuniao/presencial");
                const hibridaResponse = await fetch("http://localhost:3000/reuniao/hibrida");
                const virtualResponse = await fetch("http://localhost:3000/reuniao/virtual");

                if (!presencialResponse.ok || !hibridaResponse.ok || !virtualResponse.ok) {
                    throw new Error("Não foi possível buscar os dados.");
                }

                const presencialData = await presencialResponse.json();
                const hibridaData = await hibridaResponse.json();
                const virtualData = await virtualResponse.json();

                const mergedData = [...presencialData, ...hibridaData, ...virtualData];
                setReunioesAgendadas(mergedData);
            } catch (error) {
                console.error("Erro: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <h1 className="text-fonteAmarela mt-6">Seu calendário de reuniões</h1>
            <div className="conteudo flex flex-col md:flex-row">
                <div className="coluna-1 md:w-2/3 md:order-1 h-screen p-4 sm:w-screen">
                    <h2 className="text-fonteVermelha text-3xl flex flex-initial">
                        <a className="text-fonteVermelha p-4 hover:cursor-pointer">Mensal</a>
                        <span className="flex items-center">|</span>
                        <a className="text-fonteVermelha p-4 hover:cursor-pointer">Criado por mim</a>
                    </h2>
                    {reunioesAgendadas.map((reuniao) => (
                        <MeetingDetail
                            title={reuniao.titulo}
                            date={reuniao.dataHora}
                            time={reuniao.dataHora}
                            place={reuniao.categoria}
                        />
                    ))}
                </div>
                <div className="coluna-2 md:w-1/3 md:order-2 h-screen p-4 sm:w-screen">
                    <SearchInput />
                    <Calendar />
                    <Link to="/Home/Agendamento">
                        <ButtonAdd />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PagAgendamento;
