import React from "react";
import { ModalProps } from "../../types";

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CountryModal: React.FC<ModalProps> = ({ country, onClose }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, Node>) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="modalOverlay" onClick={handleOutsideClick}>
      <div className="modalContent" ref={modalRef}>
        <button className="closeButton" onClick={onClose}>
          <CloseIcon />
        </button>
        <h2>{country.name.common}</h2>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital.join(", ")}</p>
        <p>Population: {country.population}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default CountryModal;
