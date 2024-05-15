import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarOutline } from 'react-icons/io5'; 

interface propsData{
  dataCallBack:Function
}

const CalendarPicker  = (props:propsData) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date === null) {
      return 'Data vazia'
    }
    setSelectedDate(date);
    props.dataCallBack(date.toISOString());
  };

  return (
    <div className="flex items-center">
      <IoCalendarOutline className="mr-2 text-gray-400" /> {/* Ícone antes do DatePicker */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className=" rounded-lg p-1 border border-gray-300"
      />
      {/* <IoCalendarOutline className="ml-2 text-gray-400" /> Ícone após o DatePicker */}
      {/* {selectedDate && <p>Data selecionada: {selectedDate.toLocaleDateString()}</p>} */}
    </div>
  );
};

export default CalendarPicker;