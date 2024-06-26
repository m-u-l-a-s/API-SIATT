import React, { useEffect, useState } from 'react';
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { FaEdit, FaFileDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import ConfirmationModal from './ConfirmationModal';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MeetingDetailProps } from '../interfaces/MeetingDetails';
import { getAnexos } from '../services/getAnexos';
import { FaExternalLinkAlt } from "react-icons/fa";
import { MeetingDetailsModal } from './MeetingDetailsModal';
import { Categoria } from '../interfaces/CreateReuniaoDto';


const MeetingDetail: React.FC<MeetingDetailProps> = (props: MeetingDetailProps) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [local, setLocal] = useState('')

    const auth = useAuth();
    const navigate = useNavigate();

    const handleInfoIconClick = () => {
        setShowModal(true);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
    };

    const deleteMeeting = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        await api.delete(`reuniao/${props.id}`);
        window.location.reload();
    };

    const handleEditar = (reuniao: MeetingDetailProps) => {
        navigate(`/Home/EditarReuniao/${props.id}`, { state: { key: reuniao } });
        console.log(props.id);
    };

    useEffect(() => {
        if (props.salaPresencial) {
            api.get(`sala-presencial/${props.salaPresencial}`).then(resp => {
                setLocal(resp.data.identificacao)
            })
        }

        if (props.categoria == Categoria.HIBRIDA && props.joinUrl) {
            api.get(`sala-presencial/${props.salaPresencial}`).then(resp => {
                setLocal(`${resp.data.identificacao} | ${props.joinUrl}`)
            })
        }

        if (props.categoria == Categoria.VIRTUAL && props.joinUrl) {
            setLocal(props.joinUrl)
        }
    })

    return (
        <div className="meeting-item bg-base-300 m-2 rounded-md">
            <div className="meeting-item-title font-bold flex p-2">{props.titulo}</div>
            <ul className="meeting-item-details flex">
                <li className='p-2 flex'>
                    <CiCalendarDate className='text-2xl mr-2' title='Data da reunião' style={{ cursor: 'pointer' }} /> {props.date}
                </li>
                <li className='p-2 flex'> {props.time} </li>
                <li className='p-2 flex'> <CiLocationOn className='text-2xl mr-2' title='Local da reunião' style={{ cursor: 'pointer' }} />{props.categoria}</li>
                {props.id && (
                    <li className='p-2 flex' title='Fazer download dos arquvos da reuniao' style={{ cursor: 'pointer' }}><FaFileDownload onClick={(e) => getAnexos(props.id, e)} className='text-2xl mr-2 align-middle' /></li>
                )}
                {props.AtaUrl && (
                    <li className='p-2 flex' title='Fazer download da ata' style={{ cursor: 'pointer' }}><a href={props.AtaUrl}><FaFileDownload className='text-2xl mr-2 align-middle' /></a></li>
                )}
                {props.joinUrl && (
                    <li className='p-2 flex' ><a href={props.joinUrl} target='_blank' ><FaExternalLinkAlt className='text-2xl mr-2' title='Link da reuniao' style={{ cursor: 'pointer' }} /></a></li>
                )}
                <li className='p-2 flex ml-auto' title='Mais informações' style={{ cursor: 'pointer' }} onClick={handleInfoIconClick}><BsInfoCircleFill className='text-2xl mr-2 align-middle' /></li>

                {(props.idSolicitante === props.idUsuario || auth?.user?.admin) && (
                    <li className='p-2 flex' title='Editar reunião' style={{ cursor: 'pointer' }} onClick={() => handleEditar(props)}><FaEdit className='text-2xl mr-2 align-middle' /></li>
                )}

                {(props.idSolicitante === props.idUsuario || auth?.user?.admin) && (
                    <li className='p-2 flex' title='Excluir reunião' style={{ cursor: 'pointer' }}><MdDelete onClick={() => setDeleteModal(true)} className='text-3xl mr-2 align-middle' /></li>
                )}

            </ul>
            {deleteModal && (
                <ConfirmationModal confirmText='Excluir' cancelText='Cancelar' message='Tem certeza que deseja excluir esta reunião?' onCancel={() => setDeleteModal(false)} onConfirm={deleteMeeting} />
            )}
            {showModal && (

                <MeetingDetailsModal
                    categoria={props.categoria}
                    titulo={props.titulo}
                    pauta={props.pauta}
                    local={local}
                    participantes={props.participantes}
                    confirmText="Ok, fechar"
                    onConfirm={handleConfirmModal}
                />
            )}
        </div>
    );
};

export default MeetingDetail;
