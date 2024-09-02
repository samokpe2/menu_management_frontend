import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {children}
        <button
          onClick={onClose}
          className="mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
