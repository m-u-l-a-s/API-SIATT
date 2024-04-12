import React, { useState } from 'react';

interface ListaEmailsProps {
  emails: string[];
  onDelete: (index: number) => void;
}

const ListaEmails: React.FC<ListaEmailsProps> = ({ emails, onDelete }) => {
  return (
    <div className="email-list max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
    {emails.map((email, index) => (

      <div key={index} className="flex items-center space-x-3 border bg-white
       border-gray-300 rounded-lg px-3 py-2 w-auto h-7 focus:outline-none
        focus:border-gray-500 focus:ring-gray-400 mb-2">
       
        <span className="p-4">{email}</span>

        <div className="flex items-center justify-end w-full">
          <button
            onClick={() => onDelete(index)}
            className="text-gray-500 hover:text-gray-700 rounded-full focus:outline-none"
          >
            X
          </button>
        </div>

      </div>

    ))}
  </div>
  );
};

export default ListaEmails;