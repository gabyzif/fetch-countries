import { useEffect, useState } from "react";
import { VariableSizeGrid as Grid, GridChildComponentProps } from "react-window";
import CountryCard from "./CountryCard";
import { CountryType } from "../../types";
import "./CountryCardContainer.css";
import CountryModal from "./CountryModal";

const CountryCardContainer = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null);

  const [columnCount, setColumnCount] = useState(window.innerWidth <= 768 ? 1 : 5);

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(window.innerWidth <= 768 ? 1 : 5);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const columnWidth = window.innerWidth > 1200 ? (window.innerWidth - 300) / columnCount : window.innerWidth;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      setNotFound(false);

      try {
        const endpoint = searchString
          ? `https://restcountries.com/v3.1/name/${searchString}`
          : "https://restcountries.com/v3.1/all?fields=name,flag,region";
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.status === 404) {
          setNotFound(true);
          setCountries([]);
        } else {
          setCountries(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchString]);

  const rowCount = Math.ceil(countries.length / columnCount);
  const rowHeight = 200;

  const Cell: React.FC<GridChildComponentProps> = ({ columnIndex, rowIndex, style }) => {
    const country = countries[rowIndex * columnCount + columnIndex];
    if (!country) return null;

    return (
      <div style={style} className="countryGridItem">
        <CountryCard
          country={country}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
    );
  };

  return (
    <div className="countryGridContainer">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      {notFound && <p>No countries found for the given search.</p>}
      <input
        type="text"
        placeholder="Search by country name..."
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
      />
      <Grid
        className="countryGrid"
        columnCount={columnCount}
        columnWidth={() => columnWidth}
        height={1500}
        rowCount={rowCount}
        rowHeight={() => rowHeight}
        style={{ margin: "auto" }}
        width={window.innerWidth > 1200 ? window.innerWidth - 300 : window.innerWidth}
      >
        {Cell}
      </Grid>
      {selectedCountry && <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />}
    </div>
  );
};

export default CountryCardContainer;
