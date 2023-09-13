import React from "react";
import { CountryCardProps } from "../../types";

const CountryCard: React.FC<CountryCardProps> = ({ country, setSelectedCountry, selectedCountry }) => {
  const handleCardClick = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country.name.common}?fullText=true`
      );
      const data = await response.json();
      setSelectedCountry(data[0]);
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  };

  return (
    <div onClick={handleCardClick}>
      <p>{country.flag}</p>
      <h2>{country.name.common}</h2>
    </div>
  );
};

export default CountryCard;
