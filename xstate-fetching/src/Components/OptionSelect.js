import { useEffect, useState } from "react";
const OptionSelect = () => {
  const [countryName, setCountryName] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [stateName, setStateName] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityName, setCityName] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const couAPI = "https://crio-location-selector.onrender.com/countries";
  const stAPI = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
  const ciAPI = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;
  useEffect(() => {
    const countryAPI = async () => {
      try {
        const response = await fetch(couAPI);
        const result = await response.json();
        setCountryName(result);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    countryAPI();
  }, []);

  useEffect(() => {
    const stateAPI = async () => {
      try {
        const response = await fetch(stAPI);
        const result = await response.json();
        setStateName(result);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    stateAPI();
  }, [selectedCountry]);

  useEffect(() => {
    const cityAPI = async () => {
      try {
        const response = await fetch(ciAPI);
        const result = await response.json();
        setCityName(result);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    cityAPI();
  }, [selectedState]);

  return (
    <div>
      <select
        value={selectedCountry}
        onChange={(event) => setSelectedCountry(event.target.value)}
      >
        <option value="">Select Country</option>
        {countryName
          ? countryName.map((name, index) => {
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              );
            })
          : null}
      </select>

      <select
        value={selectedState}
        onChange={(event) => setSelectedState(event.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {stateName
          ? stateName.map((name, index) => {
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              );
            })
          : null}
      </select>

      <select
        value={selectedCity}
        onChange={(event) => setSelectedCity(event.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cityName
          ? cityName.map((name, index) => {
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              );
            })
          : null}
      </select>
      {selectedCity ? (
        <p>
          <strong>You selected</strong>{" "}
          <h2 style={{ display: "inline" }}>{selectedCity}</h2>,{" "}
          <h3 style={{ display: "inline", color: "grey" }}>{selectedState}</h3>,{" "}
          <h3 style={{ display: "inline", color: "grey" }}>
            {selectedCountry}
          </h3>
        </p>
      ) : null}
    </div>
  );
};

export default OptionSelect;
