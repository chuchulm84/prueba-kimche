import React, { useEffect } from "react";
import "./index.scss";

import { useQuery, gql } from "@apollo/client";

const COUNTRIES_LIST = gql`
  query CountriesList {
    countries {
      code
      name
      continent {
        code
        name
      }
      languages {
        code
        name
      }
      emoji
    }
  }
`;

export const Apollo = ({ dataGraph, setDataGraphResult, languagesCountry }) => {
  const { loading, error, data } = useQuery(COUNTRIES_LIST);

  useEffect(() => {
    if (data) {
      setDataGraphResult(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    dataGraph &&
    dataGraph.map(({ code, name, emoji, continent, languages }) => (
      <div className="container" key={code}>
        <h2>
          {languagesCountry === "language"
            ? languages.map((e) => e.name).join(", ")
            : continent.name}{" "}
        </h2>
        <div className="container-box">
          <p>
            <label>Bandera:</label> {emoji}
          </p>
          <p>
            <label>Codigo:</label> {code}
          </p>
          <p>
            <label>Pais:</label> {name}
          </p>
          <p>
            <label>Lenguaje:</label> {languages.map((e) => e.name).join(", ")}
          </p>
        </div>
      </div>
    ))
  );
};
