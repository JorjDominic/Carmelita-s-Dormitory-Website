import { render, screen } from '@testing-library/react';
import App from './app/App';

test('renders the dormitory home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /life feels a little better here/i })).toBeInTheDocument();
});
