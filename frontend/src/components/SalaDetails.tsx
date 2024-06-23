// src/components/SalaDetails.tsx

import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import InformationModal from './InformationModal';
import ConfirmationModal from './ConfirmationModal';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

interface SalaDetailsProps {
    id: string;
    identificacao: string;
    endereco?: string;
    permissao: number;
    ocupacaoMax?: number;
    local?: string;
    login?: string;
    senha?: string;
}

const SalaDetails: React.FC<SalaDetailsProps> = (props: SalaDetailsProps) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const auth = useAuth();

    const handleInfoIconClick = () => {
        setShowModal(true);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
    };

    const deleteSala = async () => {
        await api.delete(`sala/${props.id}`);
        window.location.reload();
    };

    // const handleEdit = (sala: SalaDetailsProps) => {
    //     navigate(`/Home/EditarSala/${props.id}`, { state: { key: sala } });
    //     console.log(props.id);
    // };

    return (
        <div className="sala-item bg-base-300 m-2 rounded-md">
            <div className="sala-item-title font-bold flex p-2">{props.identificacao}</div>
            <ul className="sala-item-details flex">
                {props.endereco && (
                    <li className='p-2 flex'>
                        <span className="font-bold mr-2">Endereço:</span> {props.endereco}
                    </li>
                )}
                {props.local && (
                    <li className='p-2 flex'>
                        <span className="font-bold mr-2">Local:</span> {props.local}
                    </li>
                )}
                {props.ocupacaoMax && (
                    <li className='p-2 flex'>
                        <span className="font-bold mr-2">Ocupação Máxima:</span> {props.ocupacaoMax}
                    </li>
                )}
                {props.login && (
                    <li className='p-2 flex'>
                        <span className="font-bold mr-2">Login:</span> {props.login}
                    </li>
                )}
                {props.senha && (
                    <li className='p-2 flex'>
                        <span className="font-bold mr-2">Senha:</span> {props.senha}
                    </li>
                )}
                <li className='p-2 flex'>
                    <span className="font-bold mr-2">Permissão:</span> {props.permissao}
                </li>
                <li className='p-2 flex ml-auto' title='Mais informações' style={{ cursor: 'pointer' }}
                    onClick={handleInfoIconClick}
                >
                    <BsInfoCircleFill className='text-2xl mr-2 align-middle' />
                </li>

                {auth?.user.admin && (
                    <>
                        {/* <li className='p-2 flex' title='Editar sala' style={{ cursor: 'pointer' }} onClick={() => handleEdit(props)}>
                            <FaEdit className='text-2xl mr-2 align-middle' />
                        </li> */}
                        <li className='p-2 flex' title='Excluir sala' style={{ cursor: 'pointer' }} onClick={() => setDeleteModal(true)}>
                            <MdDelete className='text-3xl mr-2 align-middle' />
                        </li>
                    </>
                )}
            </ul>

            {deleteModal && (
                <ConfirmationModal
                    confirmText='Excluir'
                    cancelText='Cancelar'
                    message='Tem certeza que deseja excluir esta sala?'
                    onCancel={() => setDeleteModal(false)}
                    onConfirm={deleteSala}
                />
            )}

            {showModal && (
                <InformationModal
                    message={`Identificação: ${props.identificacao}${props.endereco ? `\nEndereço: ${props.endereco}` : ''}${props.local ? `\nLocal: ${props.local}` : ''}${props.ocupacaoMax ? `\nOcupação Máxima: ${props.ocupacaoMax}` : ''}${props.login ? `\nLogin: ${props.login}` : ''}${props.senha ? `\nSenha: ${props.senha}` : ''}\nPermissão: ${props.permissao}`}
                    confirmText="Ok, fechar"
                    onConfirm={handleConfirmModal}
                />
            )}
        </div>
    );
};

export default SalaDetails;
