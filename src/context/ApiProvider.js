import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ApiContext from './ApiContext';

function ApiProvider({ children }) {
  const [DATA, setData] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState({ filterByName: { name: '' } });
  const [selected, setSelected] = useState({
    column: 'population', comparison: 'maior que', value: '0',
  });
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const tratarOpcoes = (o) => !selectedFilters
    .find((filtro) => o === filtro.column
      || o === filtro.comparison || o === filtro.value);

  const tratarDados = (linha) => {
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(linha[filter.column] === filter.value.toUpperCase());
        break;
      default:
        return true;
      }
    });

    return bools.every((bol) => bol);
  };

  const contextValue = {
    DATA,
    planetFiltered,
    setPlanetFiltered,
    selected,
    setSelected,
    tratarOpcoes,
    setSelectedFilters,
    selectedFilters,
    tratarDados,
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
