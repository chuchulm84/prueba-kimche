import React, { useState, useEffect } from "react";
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

export const Apollo = ({
  dataGrafo,
  setDataGrafo,
  setDataGrafoResult,
  filterLanguages,
  languagesCountry,
}) => {
  const { loading, error, data } = useQuery(COUNTRIES_LIST);

  useEffect(() => {
    if (data) {
      setDataGrafoResult(data);
    }
  }, [data]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    dataGrafo &&
    dataGrafo !== null &&
    dataGrafo.map(({ code, name, emoji, continent, languages }) => (
      <div className="container" key={code}>
        <h2>
          {languagesCountry
            ? languages.map((e) => e.name).join(", ")
            : continent.name}{" "}
        </h2>
        <div className="container-box">
          <p>
            <span>Bandera:</span> {emoji}
          </p>
          <p>
            <span>Codigo:</span> {code}
          </p>
          <p>
            <span>Pais:</span> {name}
          </p>
          <p>
            <span>Lenguaje:</span> {languages.map((e) => e.name).join(", ")}
          </p>
        </div>
      </div>
    ))
  );
};
