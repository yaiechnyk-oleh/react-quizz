import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-w-md w-full">
                {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-lg font-semibold text-gray-800"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};
