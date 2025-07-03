import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from '../src/components/layout/Sidebar';
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar', () => {
  it('renders the sidebar navigation', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
