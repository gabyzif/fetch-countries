export type CountryType = {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  flag: string;
  region: string;
  capital: string[];
  population: number;
};
export type CountryCardProps = {
  country: CountryType;
  setSelectedCountry: React.Dispatch<React.SetStateAction<CountryType | null>>;
  selectedCountry: CountryType | null;
};

export type ModalProps = {
  country: CountryType;
  onClose: () => void;
};
