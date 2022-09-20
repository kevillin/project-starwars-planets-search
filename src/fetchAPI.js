const requestAPI = async () => {
  const endpoint = 'https://swapi.dev/api/planets';
  const fetchAPI = await fetch(endpoint);
  const resultAPI = await fetchAPI.json();
  const result = resultAPI.results;
  const apiFiltered = result.filter((e) => delete e.residents);
  return apiFiltered;
};

export default requestAPI;
