import React, { useState, useRef, useEffect } from "react";
import { MdAccessTime } from "react-icons/md";

interface propsData{
    horaInicial: string,
    minutoInicial: string,
    horaCallBack:Function,
    minCallBack:Function
  }

const TimeChoser= (props:propsData) => {
    const [hour, setHour] = useState(props.horaInicial);
    const [minute, setMinute] = useState(props.minutoInicial);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const timePickerRef = useRef<HTMLDivElement>(null);

    const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHour(e.target.value);
        props.horaCallBack(Number(e.target.value));
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMinute(e.target.value);
        props.minCallBack(Number(e.target.value));
    };

    const handleInputClick = () => {
        setShowTimePicker(!showTimePicker);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            timePickerRef.current &&
            !timePickerRef.current.contains(event.target as Node)
        ) {
            setShowTimePicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setHour(props.horaInicial);
        setMinute(props.minutoInicial);
    }, [props.horaInicial, props.minutoInicial]);

    return (
        <div className="relative inline-block text-left" ref={timePickerRef}>
            <div className="inline-block">
            <MdAccessTime className="mr-2 text-gray-400" />
            </div>
            <div className="inline-block">
            <input
                type="text"
                readOnly
                className="w-24 rounded-lg border border-gray-300 text-gray-900 px-3 py-2
                placeholder-gray-400 shadow-sm focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 sm:text-sm"
                value={`${hour}:${minute}`}
                onClick={handleInputClick}
            />
            </div>
            {showTimePicker && (
                <div className=" bg-neutral origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none select-scroll">
                    <div className="p-0.5">
                        <label className="block text-sm font-medium">
                            Horas
                        </label>
                        <select
                            value={hour}
                            onChange={handleHourChange}
                            className="mt-1  block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {Array.from({ length: 24 }, (_, i) => {
                                const paddedHour = i.toString().padStart(2, "0");
                                return (
                                    <option key={paddedHour} value={paddedHour}>
                                        {paddedHour}
                                    </option>
                                );
                            })}
                        </select>

                    </div>
                    <div className="p-0.5">
                        <label className="block text-sm font-medium">
                            Minutos
                        </label>
                        <select
                            value={minute}
                            onChange={handleMinuteChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {Array.from({ length: 60 }, (_, i) => {
                                const paddedMinute = i.toString().padStart(2, "0");
                                return (
                                    <option key={paddedMinute} value={paddedMinute}>
                                        {paddedMinute}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimeChoser;