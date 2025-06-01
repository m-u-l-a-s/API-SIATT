import React, { useState } from 'react';
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { FaEdit, FaFileDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import ConfirmationModal from './ConfirmationModal';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MeetingDetailProps } from '../interfaces/MeetingDetails';
import { getAnexos } from '../services/getAnexos';
import { FaExternalLinkAlt } from "react-icons/fa";
import { MeetingDetailsModal } from './MeetingDetailsModal';
import { Categoria } from '../interfaces/CreateReuniaoDto';
import { authService } from '../services/services.auth';
import { getZoomClientId, getZoomRedirectUrl } from '../variables';
import axios, { AxiosRequestConfig } from 'axios';

export interface PropsEditReuniao {
    reuniao: MeetingDetailProps
}

const MeetingDetail: React.FC<MeetingDetailProps> = (props: MeetingDetailProps) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const ZOOM_CLIENT_ID = getZoomClientId()
    const ZOOM_REDIRECT_URI = encodeURIComponent(getZoomRedirectUrl())
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${ZOOM_REDIRECT_URI}`;

    const auth = useAuth();
    const navigate = useNavigate();

    const handleInfoIconClick = () => {
        setShowModal(true);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
    };

    const deleteMeeting = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const token = authService.getZoomToken()
        if (props.categoria == Categoria.HIBRIDA || props.categoria == Categoria.VIRTUAL) {
            if ((token == null || token == "")) {
                autenticarUsuario(e)
                return
            }

            if (authService.isTokenExpired(token)) {
                console.log("Token expirado")
                autenticarUsuario(e)
                return
            }
        }

        const options: AxiosRequestConfig = {
            url: `http://localhost:3000/reuniao/${props.id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authService.getZoomToken()}`,
            },
        }
        const resp = await axios.request(options)
        
        setDeleteModal(false)
        if (resp.status !== 204) {
            alert(resp.data)
        }
        
        window.location.reload();
    };

    const autenticarUsuario = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const authTab = window.open(zoomAuthUrl, '_blank', 'width=500,height=600');

        const handleMessage = (event: MessageEvent) => {
            if (event.data[0] === 'authenticated') {
                const accessToken = event.data[1].access_token
                authTab?.close()
                authService.setZoomToken(accessToken)
                window.removeEventListener('message', handleMessage)
                deleteMeeting(e)
            }
        }
        window?.addEventListener('message', handleMessage)
    }



    const handleEditar = (reuniao: MeetingDetailProps) => {
        navigate(`/Home/EditarReuniao/${props.id}`, { state: reuniao });
        console.log(props.id);
    };

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
                    local={props.salaPresencial}
                    link={props.joinUrl}
                    participantes={props.participantes}
                    confirmText="Ok, fechar"
                    onConfirm={handleConfirmModal}
                />
            )}
        </div>
    );
};

export default MeetingDetail;
