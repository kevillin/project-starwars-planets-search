import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

function ApiProvider({ children }) {
  const [data, setData] = useState([]);

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

  return (
    <main>
      <ApiContext.Provider value={ { data } }>
        {children}
      </ApiContext.Provider>
    </main>
  );
}

export default ApiProvider;

ApiProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
