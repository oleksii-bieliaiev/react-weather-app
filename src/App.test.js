/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import App from './App';

test('renders WeatherApp component', () => {
  const { getByPlaceholderText } = render(<App />);
  const inputElement = getByPlaceholderText('Please enter a city');
  expect(inputElement).toBeInTheDocument();
});