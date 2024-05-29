// src/components/UserDetails.tsx

import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import InformationModal from './InformationModal';
import ConfirmationModal from './ConfirmationModal';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserDetailsProps {
    id: string;
    login: string;
    email: string;
    departamento: string;
    permissao: number;
    status: number;
    admin: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = (props: UserDetailsProps) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const handleInfoIconClick = () => {
        setShowModal(true);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
    };

    const deleteUser = async () => {
        await api.delete(`usuario/${props.id}`);
        window.location.reload();
    };

    const handleEdit = (user: UserDetailsProps) => {
        navigate(`/Home/EditarUsuario/${props.id}`, { state: { key: user } });
        console.log(props.id);
    };

    return (
        <div className="user-item bg-base-300 m-2 rounded-md">
            <div className="user-item-title font-bold flex p-2">{props.login}</div>
            <ul className="user-item-details flex">
                <li className='p-2 flex'>
                    <span className="font-bold mr-2">Email:</span> {props.email}
                </li>
                <li className='p-2 flex'>
                    <span className="font-bold mr-2">Departamento:</span> {props.departamento}
                </li>
                <li className='p-2 flex'>
                    <span className="font-bold mr-2">Nível de Permissão:</span> {props.permissao}
                </li>
                <li className='p-2 flex'>
                    <span className="font-bold mr-2">Status:</span> {props.status === 1 ? 'Ativo' : 'Inativo'}
                </li>
                <li className='p-2 flex'>
                    <span className="font-bold mr-2">Admin:</span> {props.admin ? 'Sim' : 'Não'}
                </li>

                <li className='p-2 flex ml-auto' title='Mais informações' style={{ cursor: 'pointer' }}
                    onClick={handleInfoIconClick}
                >
                    <BsInfoCircleFill className='text-2xl mr-2 align-middle' />
                </li>

                {auth?.user.admin && (
                    <>
                        <li className='p-2 flex' title='Editar usuário' style={{ cursor: 'pointer' }} onClick={() => handleEdit(props)}>
                            <FaEdit className='text-2xl mr-2 align-middle' />
                        </li>
                        <li className='p-2 flex' title='Excluir usuário' style={{ cursor: 'pointer' }} onClick={() => setDeleteModal(true)}>
                            <MdDelete className='text-3xl mr-2 align-middle' />
                        </li>
                    </>
                )}
            </ul>

            {deleteModal && (
                <ConfirmationModal
                    confirmText='Excluir'
                    cancelText='Cancelar'
                    message='Tem certeza que deseja excluir este usuário?'
                    onCancel={() => setDeleteModal(false)}
                    onConfirm={deleteUser}
                />
            )}

            {showModal && (
                <InformationModal
                    message={`Login: ${props.login}\nEmail: ${props.email}\nDepartamento: ${props.departamento}\nPermissão: ${props.permissao}\nStatus: ${props.status === 1 ? 'Ativo' : 'Inativo'}\nAdmin: ${props.admin ? 'Sim' : 'Não'}`}
                    confirmText="Ok, fechar"
                    onConfirm={handleConfirmModal}
                />
            )}
        </div>
    );
};

export default UserDetails;
