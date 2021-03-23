import React, { useState } from "react";
import styled from "styled-components";
import {
  CURRENT_LIGHTING_TIME,
  INSTALLED_POWER,
  COST_PER_WH,
  POPULATION,
  CYCLIST_HOURLY_PRODUCTION,
  HOUSEHOLD_YEARLY_CONSUMPTION
} from "../../constants";

interface IProps {
  newLightingTime: number;
}

const toEuros = (amount: number, precision: number = 0) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(amount);

const toQuantity = (amount: number, precision: number = 0) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision
  }).format(amount);

const Sentence = styled.div`
  line-height: 1.5em;
  strong {
    border-radius: 4px;
    background-color: greenyellow;
    padding: 0 4px;
    font-weight: normal;
    font-size: 110%;
    white-space: nowrap;
  }
`;

const Sources = styled.dl`
  border: 1px solid grey;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  dd + dt {
    margin-top: 1em;
  }
`;

const Button = styled.div`
  color: #fff;
  background-color: #007bff;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  font-family: sans-serif;
  text-align: center;
  margin-top: 2em;
`;

const Big = styled.div`
  font-size: 200%;
  text-align: center;
`;

export const Explanation = ({ newLightingTime }: IProps) => {
  const energySaving =
    (CURRENT_LIGHTING_TIME - newLightingTime) * INSTALLED_POWER;
  const moneySaving = energySaving * COST_PER_WH;
  const moneySavingPerCapita = moneySaving / POPULATION;
  const cyclistsSaving = energySaving / CYCLIST_HOURLY_PRODUCTION;
  const householdsSaving = energySaving / HOUSEHOLD_YEARLY_CONSUMPTION;
  const [showSources, toggleShowSources] = useState(false);

  const handleClickSources = () => {
    toggleShowSources(!showSources);
  };

  return (
    <div>
      <Big>
        {energySaving === 0 ? (
          <span>
            Bougez les curseurs pour voir quelles économies la commune pourrait
            réaliser en éteignant l'éclairage public une partie de la nuit 🌌.
          </span>
        ) : (
          <Sentence>
            Avec ces réglages,
            <br />
            la commune économiserait{" "}
            <strong>{toQuantity(energySaving)} kWh</strong> d'électricité,
            <br />
            c'est la consommation annuelle de{" "}
            <strong>{toQuantity(householdsSaving)} foyers français 👨‍👩‍👧‍👦</strong>
            <br />
            ou l'énergie produite par{" "}
            <strong>{toQuantity(cyclistsSaving)} cyclistes 🚴‍♀️</strong> en une
            heure.
            <br />
            Cette économie représenterait{" "}
            <strong>{toEuros(moneySaving)} 💶</strong>,<br />
            soit{" "}
            <strong>{toEuros(moneySavingPerCapita, 2)} par Capellois</strong> et
            par an.
          </Sentence>
        )}
      </Big>

      <Button onClick={handleClickSources}>
        {showSources ? "Cacher" : "Montrer"} les sources
      </Button>
      {showSources && (
        <Sources>
          <dt>
            Puissance électrique installée ({toQuantity(INSTALLED_POWER)}
            &#8239;kilowatts), durée d'éclairage annuel (
            {toQuantity(CURRENT_LIGHTING_TIME)}
            &#8239;heures) et coût horaire du kWh ({toEuros(COST_PER_WH, 4)})
          </dt>
          <dd>
            Factures d'électricité d'éclairage public de La Chapelle-en-Serval
            de 2019 (consultables en mairie)
          </dd>

          <dt>
            Puissance fournie par un cycliste sans entraînement (
            {toQuantity(CYCLIST_HOURLY_PRODUCTION, 3)}
            &#8239;kilowatts)
          </dt>
          <dd>
            <a
              href="https://www.ecoco2.com/blog/compter-lenergie-et-si-on-remplacait-les-kwh-par-un-equivalent-humain/"
              target="_blank"
            >
              https://www.ecoco2.com/blog/compter-lenergie-et-si-on-remplacait-les-kwh-par-un-equivalent-humain/
            </a>
          </dd>

          <dt>
            Consommation moyenne d'un foyer français (
            {toQuantity(HOUSEHOLD_YEARLY_CONSUMPTION)}
            &nbsp;kilowatts-heures)
          </dt>
          <dd>
            <a
              href="https://particulier.edf.fr/fr/accueil/contrat-et-conso/options/tempo/details.html"
              target="_blank"
            >
              https://particulier.edf.fr/fr/accueil/contrat-et-conso/options/tempo/details.html
            </a>
            .
          </dd>
          <dt>
            Population de La Chapelle-en-Serval en 2017 (
            {toQuantity(POPULATION)}
            &nbsp;habitants)
          </dt>
          <dd>
            <a
              href="https://www.insee.fr/fr/statistiques/1405599?geo=COM-60142"
              target="_blank"
            >
              https://www.insee.fr/fr/statistiques/1405599?geo=COM-60142
            </a>
          </dd>
        </Sources>
      )}
    </div>
  );
};
