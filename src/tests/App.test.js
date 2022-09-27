import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(testData),
  });
});

describe('Testa aplicação inteira', () => {
  test('Testa componente App', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello, Star Wars/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Testa a requisição da API', async () => {
    render(<App />);
    const url = 'https://swapi.dev/api/planets';
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(url));
  });
  test('Testa se a opção do Column não existe mais', () => {
    const { getByTestId } = render(<App />);
    const filterButton = screen.getByTestId('button-filter');
    const columnSelect = screen.getByTestId('column-filter');

    fireEvent.change(getByTestId('column-filter'), { target: { value: "orbital_period" } })
    userEvent.click(filterButton);

    // expect(columnSelect[0].value).toBe("orbital_period")
    expect(columnSelect[0].selected).not.toBeInTheDocument();
  })
})
