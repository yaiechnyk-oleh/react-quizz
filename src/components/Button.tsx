import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";  // Allow 'type' prop for the button element
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', type = "button" }) => {
    return (
        <button type={type} onClick={onClick} className={`px-4 py-2 rounded shadow ${className}`}>
            {children}
        </button>
    );
};
