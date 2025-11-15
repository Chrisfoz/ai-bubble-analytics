import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../components/HomePage';

describe('HomePage Component', () => {
  test('renders homepage title', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const titleElement = screen.getByText(/AI Bubble/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays current divergence metric', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const divergenceElement = screen.getByText(/10.4%/i);
    expect(divergenceElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const metricsLink = screen.getByText(/View Full Metrics Dashboard/i);
    expect(metricsLink).toBeInTheDocument();
  });
});
