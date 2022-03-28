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
  const { data } = useQuery(COUNTRIES_LIST);

  useEffect(() => {
    if (data) {
      setDataGraphResult(data);
    }
  }, [data]);

  return (
    <div className="container">
      {dataGraph &&
        dataGraph.map(({ code, name, emoji, continent, languages }) => (
          <div key={code}>
            <div>
              <h2>
                {languagesCountry === "language"
                  ? languages.map((e) => e.name).join(", ")
                  : continent.name}{" "}
              </h2>
            </div>

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
                <label>Lenguaje:</label>{" "}
                {languages.map((e) => e.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
