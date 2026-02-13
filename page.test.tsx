import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; //provides the toHaveAttribute matcher

  test('renders a link with correct href', () => {
    render(<a href="/login">Sign in</a>);

    //Find the link element by its role and name
    const linkElement = screen.getByRole('link', { name: 'Sign in' });

    expect(linkElement).toBeInTheDocument(); //Check if the link is in the document
    expect(linkElement).toHaveAttribute('href', '/login'); //Check if the href attribute is correct
    console.log('Test completed successfully');
    
  });
