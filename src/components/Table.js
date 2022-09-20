import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function Table() {
  const { data } = useContext(ApiContext);
  return (
    <div>
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
        {data.map((plan) => (
          <tbody key={ plan.name }>
            <tr>
              <td>{ plan.name }</td>
              <td>{ plan.rotation_period }</td>
              <td>{ plan.orbital_period }</td>
              <td>{ plan.diameter }</td>
              <td>{ plan.climate}</td>
              <td>{ plan.gravity }</td>
              <td>{ plan.terrain }</td>
              <td>{ plan.surface_water }</td>
              <td>{plan.population}</td>
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
