import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

function ApiProvider({ children }) {
  const [DATA, setData] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState({ filterByName: { name: '' } });

  useEffect(() => {
    const requestAPI = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const fetchAPI = await fetch(endpoint);
      const resultAPI = await fetchAPI.json();
      const result = resultAPI.results;
      const apiFiltered = result.filter((e) => delete e.residents);
      setData(apiFiltered);
    };
    requestAPI();
  }, []);

  // const [dataFinal, setDataFinal] = useState([]);

  // const inputPlanet = ({ target: { value } }) => {
  //   const result = dataFinal.filter((n) => n.name.includes(value));
  //   setDataFinal(result);
  // };

  // useEffect(() => {
  //   setDataFinal(DATA);
  // }, [DATA]);

  const contextValue = {
    DATA,
    planetFiltered,
    setPlanetFiltered,
  };

  return (
    <main>
      <ApiContext.Provider value={ contextValue }>
        {children}
      </ApiContext.Provider>
    </main>
  );
}
// passar a função como parâmetro no value

export default ApiProvider;

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
