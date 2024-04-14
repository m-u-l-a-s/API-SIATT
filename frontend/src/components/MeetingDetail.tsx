import React from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


interface MeetingDetailProps {
    key: string,
    title: string;
    date: string;
    time: string;
    place: string;
}

const MeetingDetail: React.FC<MeetingDetailProps> = ({ key, title, date, time, place }) => {
    return (
        <div className="meeting-item bg-gray-200 m-2 rounded-md">
            <div className="meeting-item-title font-bold flex p-2">{title}</div>
            <ul className="meeting-item-details flex text-gray-600">
                
                <li className='p-2 flex'>
                    <CiCalendarDate className='text-2xl mr-2'/> {date}
                </li>
                
                <li className='p-2 flex'> {time} </li>
                
                <li className='p-2 flex'> <CiLocationOn className='text-2xl mr-2'/>{place}</li>
                <li className='p-2 flex'><FaFileDownload className='text-2xl mr-2 align-middle'/></li>
                <li className='p-2 flex ml-auto'><FaEdit className='text-2xl mr-2 align-middle'/></li>
                <li className='p-2 flex'><MdDelete className='text-2xl mr-2 align-middle'/></li>
            </ul>
        </div>
    );
};

export default MeetingDetail;
