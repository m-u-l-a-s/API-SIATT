import React, { useState } from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import InformationModal from './InformationModal';
import ConfirmationModal from './ConfirmationModal';
// import { api_url } from '../variables';
import api from '../services/api';

interface MeetingDetailProps {
    id: string;
    title: string;
    desc: string;
    date: string;
    time: string;
    place: string;
    login: string;
    password: string;
    sala: string;
}

const MeetingDetail: React.FC<MeetingDetailProps> = ({ id, desc, title, date, time, place, sala, login, password }) => {
    const [showModal, setShowModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false)


    const handleInfoIconClick = () => {
        setShowModal(true);
    };

    // const handleCancelModal = () => {
    //     setShowModal(false);
    // };

    const handleConfirmModal = () => {
        // Add your logic for handling confirmation here
        setShowModal(false);
    };

    const deleteMeeting = async () => {
        await api.delete(`reuniao/${id}`)
        window.location.reload()
    }

    return (
        <div className="meeting-item bg-base-300 m-2 rounded-md">
            <div className="meeting-item-title font-bold flex p-2">{title}</div>
            <ul className="meeting-item-details flex">
                <li className='p-2 flex'>
                    <CiCalendarDate className='text-2xl mr-2' title='Data da reunião' style={{ cursor: 'pointer' }} /> {date}
                </li>
                <li className='p-2 flex'> {time} </li>
                <li className='p-2 flex'> <CiLocationOn className='text-2xl mr-2' title='Local da reunião' style={{ cursor: 'pointer' }} />{place}</li>
                <li className='p-2 flex' title='Fazer download da ata' style={{ cursor: 'pointer' }}><FaFileDownload className='text-2xl mr-2 align-middle' /></li>

                <li className='p-2 flex ml-auto' title='Mais informações' style={{ cursor: 'pointer' }}
                    onClick={handleInfoIconClick}
                ><BsInfoCircleFill className='text-2xl mr-2 align-middle' /></li>
                {/* <li className='p-2 flex' title='Editar reunião' style={{ cursor: 'pointer' }}><FaEdit className='text-2xl mr-2 align-middle'/></li> */}
                <li className='p-2 flex' title='Excluir reunião' style={{ cursor: 'pointer' }}><MdDelete onClick={() => {
                    setDeleteModal(true)
                }} className='text-3xl mr-2 align-middle' /></li>
            </ul>
            {deleteModal && (
                <ConfirmationModal confirmText='Excluir' cancelText='Cancelar' message='Tem certeza que deseja excluir esta reunião?' onCancel={() => setDeleteModal(false)} onConfirm={deleteMeeting} />
            )}

            {showModal && (
                <InformationModal
                    message=

                    {`${title}\n Pauta: ${desc} \n Sala: ${sala} \n Login: ${login} \n Senha: ${password}`}

                    confirmText="Ok, fechar"
                    onConfirm={handleConfirmModal}
                />
            )}
        </div>
    );
};

export default MeetingDetail;
