import { render, screen, fireEvent } from '@testing-library/react';
import RoomsPage from './pages/RoomsPage';

test('renders rooms catalog with available options', () => {
  render(<RoomsPage />);

  expect(screen.getByRole('heading', { name: /rooms made for living/i })).toBeInTheDocument();
  expect(screen.getByText('Shared room')).toBeInTheDocument();
  expect(screen.getByText('Private room')).toBeInTheDocument();
  expect(screen.getByText('Deluxe room')).toBeInTheDocument();
});

test('triggers onInquire when asking about availability', () => {
  const onInquire = jest.fn();
  render(<RoomsPage onInquire={onInquire} />);

  const link = screen.getByRole('link', { name: /ask about availability/i });
  fireEvent.click(link);

  expect(onInquire).toHaveBeenCalledTimes(1);
});

