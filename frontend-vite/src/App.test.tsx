import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/SignatureVault/i)).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText(/SignatureVault/i)).toBeInTheDocument();
  });

});
