import { render, screen } from '@testing-library/react';
import KruizeRoot from './KruizeApp/KruizeRoot';

test('renders learn react link', () => {
  render(<KruizeRoot />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
