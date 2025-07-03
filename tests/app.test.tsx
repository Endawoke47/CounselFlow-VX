import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App', () => {
  it('renders the main app container', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
