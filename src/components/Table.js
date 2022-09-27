import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function Table() {
  const {
    DATA,
    setPlanetFiltered,
    planetFiltered,
    selected,
    setSelected,
    tratarOpcoes,
    setSelectedFilters,
    selectedFilters,
    tratarDados,
  } = useContext(ApiContext);

  const columns = ['orbital_period',
    'population', 'diameter', 'rotation_period', 'surface_water'];

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="planetFiltered"
        value={ planetFiltered.filterByName.name }
        onChange={ ({ target }) => setPlanetFiltered(
          { filterByName: { name: target.value } },
        ) }
      />
      <select
        data-testid="column-filter"
        value={ selected.column }
        onChange={ (event) => setSelected({
          ...selected,
          column: event.target.value,
        }) }
      >
        {columns.filter(tratarOpcoes).map((column) => (
          <option
            value={ column }
            key={ column }
          >
            { column }
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ selected.comparison }
        onChange={ (event) => setSelected({
          ...selected,
          comparison: event.target.value,
        }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ selected.value }
        onChange={ (event) => setSelected({
          ...selected,
          value: event.target.value,
        }) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setSelectedFilters([...selectedFilters, selected]);
          setPlanetFiltered({ filterByName: { name: '' } });
          setSelected(
            { filterByNumericValues: { column: '', comparison: '', value: '0' } },
          );
        } }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setSelectedFilters([]) }
      >
        Remover Filtragens
      </button>
      {selectedFilters.map((filter, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid="filter"
            onClick={ () => {
              const cloneArray = [...selectedFilters];
              cloneArray.splice(index, 1);
              setSelectedFilters(cloneArray);
            } }
          >
            X
            <span>
              {filter.column}
              {filter.comparison}
              {filter.value}
            </span>
          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {DATA.filter((n) => n.name.toLowerCase()
          .includes(planetFiltered.filterByName.name.toLowerCase()))
          .filter(tratarDados)
          .filter(tratarOpcoes)
          .map((plan) => (
            <tbody key={ plan.name }>
              <tr>
                <td>{ plan.name }</td>
                <td>{ plan.rotation_period }</td>
                <td>{ plan.orbital_period }</td>
                <td>{ plan.diameter }</td>
                <td>{ plan.climate }</td>
                <td>{ plan.gravity }</td>
                <td>{ plan.terrain }</td>
                <td>{ plan.surface_water }</td>
                <td>{ plan.population }</td>
                <td>{ plan.films }</td>
                <td>{ plan.created }</td>
                <td>{ plan.edited }</td>
                <td>{ plan.url }</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default Table;
