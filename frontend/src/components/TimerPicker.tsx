import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

const TimerPicker: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>('12:00');

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time);
  };

  return (
    <div>
      <TimePicker
        onChange={handleTimeChange}
        value={selectedTime}
        clearIcon={null} // Desabilita o ícone de limpar
      />
      {selectedTime && <p>Tempo selecionado: {selectedTime}</p>}
    </div>
  );
};

export default TimerPicker;