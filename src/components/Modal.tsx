import React from "react";
import { Link } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 ease-in-out scale-105">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Authentication Required
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Please login or sign up to leave a comment.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
