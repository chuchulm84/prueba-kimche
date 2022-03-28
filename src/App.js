import React, { useState, useEffect } from "react";
import { Apollo } from "./component/apollo/Apollo";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./app.scss";

const App = () => {
  const [dataGraph, setDataGraph] = useState(null);
  const [dataGraphResult, setDataGraphResult] = useState(null);
  const [search, setsearch] = useState("");
  const [languagesCountry, setLanguagesCountry] = useState("");

  useEffect(() => {
    if (search === "") {
      setDataGraph(null);
    }
  }, [search]);

  const handleChange = (e) => {
    const { value } = e.target;
    setsearch(value);

    if (value) {
      filter(value);
    }
  };

  const filter = (value) => {
    let result = dataGraphResult.countries.filter((el) => {
      if (el.name.toLowerCase().includes(value.toLowerCase())) {
        return el;
      } else if (languagesCountry === "continent") {
        if (el.continent.name.toLowerCase().includes(value.toLowerCase())) {
          return el;
        }
      } else {
        if (
          el.languages
            .map((len) => len.name)
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return el;
        }
      }
    });

    setDataGraph(result);
  };

  return (
    <div className="container-app">
      <div className="container-options">
        <h1>COUNTRY SEARCH</h1>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Ingrese Pais "
          value={search}
          onChange={handleChange}
          className="input-settings"
        />
        <div className="container-button">
          <h3>Group by:</h3>
          <Button
            type="primary"
            onClick={() => setLanguagesCountry("continent")}
          >
            Continent
          </Button>
          <Button onClick={() => setLanguagesCountry("language")}>
            Language
          </Button>
        </div>
      </div>
      <div className="container-search">
        <Apollo
          dataGraph={dataGraph}
          setDataGraph={setDataGraph}
          setDataGraphResult={setDataGraphResult}
          languagesCountry={languagesCountry}
        />
      </div>
    </div>
  );
};

export default App;
