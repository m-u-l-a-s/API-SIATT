import React, { useState, useEffect, useRef } from 'react';

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

    const calendarRef = useRef<HTMLDivElement>(null);
    const currentMonthRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        generateCalendar(currentYear, currentMonth);
    }, [currentYear, currentMonth]);

    const generateCalendar = (year: number, month: number) => {
        if (calendarRef.current && currentMonthRef.current) {
            const calendarElement = calendarRef.current;
            const currentMonthElement = currentMonthRef.current;
    
            const firstDayOfMonth = new Date(year, month, 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();
    
            calendarElement.innerHTML = '';
    
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            currentMonthElement.innerText = `${monthNames[month]} ${year}`;
    
            const firstDayOfWeek = firstDayOfMonth.getDay();
    
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            daysOfWeek.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'text-center font-semibold';
                dayElement.innerText = day;
                calendarElement.appendChild(dayElement);
            });
    
            for (let i = 0; i < firstDayOfWeek; i++) {
                const emptyDayElement = document.createElement('div');
                calendarElement.appendChild(emptyDayElement);
            }
    
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'text-center py-2 border cursor-pointer flex justify-center';
                dayElement.innerText = day.toString();
    
                const currentDate = new Date();
                if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
                    dayElement.classList.add('bg-blue-500', 'text-white');
                }
    
                dayElement.addEventListener('click', () => {
                    handleDayClick(day);
                });
    
                calendarElement.appendChild(dayElement);
            }
        }
    };
    

    const handlePrevMonth = () => {
        setCurrentMonth(prevMonth => {
            let newMonth = prevMonth - 1;
            let newYear = currentYear;
            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }
            setCurrentYear(newYear);
            return newMonth;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => {
            let newMonth = prevMonth + 1;
            let newYear = currentYear;
            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }
            setCurrentYear(newYear);
            return newMonth;
        });
    };

    const showModal = (selectedDate: string) => {
        const modal = document.getElementById('myModal');
        const modalDateElement = document.getElementById('modalDate');
        if (modalDateElement) modalDateElement.innerText = selectedDate;
        if (modal) modal.classList.remove('hidden');
    };

    const hideModal = () => {
        const modal = document.getElementById('myModal');
        if (modal) modal.classList.add('hidden');
    };

    const handleDayClick = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        const formattedDate = selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        showModal(formattedDate);
    };

    return (
        <div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
                            <button onClick={handlePrevMonth} className="text-white" id="prevMonth">
                                Previous
                            </button>
                            <h2 ref={currentMonthRef} className="text-white" id="currentMonth"></h2>
                            <button onClick={handleNextMonth} className="text-white" id="nextMonth">
                                Next
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 p-4" ref={calendarRef} id="calendar"></div>
                        <div id="myModal" className="modal hidden fixed inset-0 items-center justify-center z-50">
                            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
                            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <p className="text-2xl font-bold">Selected Date</p>
                                        <button onClick={hideModal} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">
                                            ✕
                                        </button>
                                    </div>
                                    <div id="modalDate" className="text-xl font-semibold"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    );
};

export default Calendar;
