import React, { useState } from "react";
import { Apollo } from "./component/apollo/Apollo";
import { Input, Button } from "antd";

import "./app.scss";
const { Search } = Input;

const App = () => {
  const [dataGrafo, setDataGrafo] = useState(null);
  const [dataGrafoResult, setDataGrafoResult] = useState(null);
  const [countries, setcountries] = useState("");
  const [languagesCountry, setLanguagesCountry] = useState(false);

  const handleChange = (e) => {
    setcountries(e.target.value);
    filter(e.target.value);
  };

  const filter = (search) => {
    let result = dataGrafoResult.countries.filter((el) => {
      if (
        !languagesCountry
          ? el.continent.name
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            el.name.toString().toLowerCase().includes(search.toLowerCase())
          : el.languages
              .map((len) => len.name)
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
      ) {
        return el;
      }
    });

    setDataGrafo(result);
  };

  return (
    <div className="container-app">
      <h1>COUNTRY SEARCH</h1>
      <Search
        placeholder="Ingrese Pais "
        style={{ width: 1000 }}
        value={countries}
        onChange={handleChange}
      />
      <div className="container-button">
        <h3>Group by:</h3>
        <Button type="primary" onClick={() => setLanguagesCountry(false)}>
          Continent
        </Button>
        <Button onClick={() => setLanguagesCountry(true)}>Language</Button>
      </div>
      <Apollo
        dataGrafo={dataGrafo}
        setDataGrafo={setDataGrafo}
        setDataGrafoResult={setDataGrafoResult}
        languagesCountry={languagesCountry}
      />
    </div>
  );
};

export default App;
