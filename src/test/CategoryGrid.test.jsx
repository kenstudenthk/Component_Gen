import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';

const mockCategories = [
  { id: 1, slug: 'buttons', name: 'Buttons', description: 'Click actions', component_count: 5 },
  { id: 2, slug: 'forms', name: 'Forms', description: 'Data entry', component_count: 0 },
  { id: 3, slug: 'app-shells', name: 'App Shells', description: null, component_count: '3' },
];

function renderGrid(categories = mockCategories) {
  return render(
    <MemoryRouter>
      <CategoryGrid categories={categories} />
    </MemoryRouter>
  );
}

describe('CategoryGrid', () => {
  it('renders all category cards', () => {
    renderGrid();
    expect(screen.getByText('Buttons')).toBeInTheDocument();
    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('App Shells')).toBeInTheDocument();
  });

  it('links each card to the correct library route', () => {
    renderGrid();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/library/buttons');
    expect(links[1]).toHaveAttribute('href', '/library/forms');
  });

  it('shows component count badge when count > 0', () => {
    renderGrid();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not show count badge when component_count is 0', () => {
    renderGrid();
    // "5" and "3" should exist, but not "0"
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('handles string component_count via Number() coercion', () => {
    renderGrid();
    // category with component_count="3" (string) should still show badge
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows description when provided', () => {
    renderGrid();
    expect(screen.getByText('Click actions')).toBeInTheDocument();
  });

  it('renders empty grid when no categories', () => {
    const { container } = renderGrid([]);
    expect(container.querySelector('a')).toBeNull();
  });

  it('renders with fallback icon for unknown slugs', () => {
    const unknownCategory = [
      { id: 99, slug: 'unknown-type', name: 'Unknown', description: null, component_count: 0 },
    ];
    expect(() => renderGrid(unknownCategory)).not.toThrow();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
