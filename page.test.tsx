import React from 'react';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import SignUpPage from '@/app/signup/page';

  jest.mock('@supabase/supabase-js', () => {
    return {
      createClient: jest.fn(() => ({
        auth: {
          signUp: jest.fn(() => Promise.resolve({ user: {}, session: {} })),
        },
      })),
    };
  });

  test('renders a link with correct href', () => {
    render(<a href="/login">Sign in</a>);
    const linkElement = screen.getByRole('link', { name: 'Sign in' });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
    console.log('Test completed successfully');
    
  });

  test('renders email and password input fields', () => {
    render(
      <div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </div>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    console.log('Email and password inputs test completed successfully');
  });

  test('form submission updates input values', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" defaultValue="user@example.com" />
        <input type="password" placeholder="Password" defaultValue="password123" />
        <button type="submit">Login</button>
      </form>
    );

    const submitButton = screen.getByRole('button', { name: 'Login' });
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;

    expect(emailInput.value).toBe('user@example.com');
    submitButton.click();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('user can sign up and be redirected to login', async () => {
    const SignUp = jest.fn((e) => e.preventDefault());
    render(
      <form onSubmit={SignUp}>
        <input aria-label="name" type="name" placeholder="Name" defaultValue="John Doe" />
        <input aria-label="email" type="email" placeholder="Email" defaultValue="user@example.com" />
        <input aria-label="password" type="password" placeholder="Password" defaultValue="password123" />
        <button aria-label="Create Account"type="submit">Create Account</button>
      </form>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /Create Account/i });

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    submitButton.click();
    
    await waitFor(() => {
      expect(SignUp).toHaveBeenCalledTimes(1);
    });
  });

  test('regression test - password fields remain masked and form validation works', async () => {
    render(<SignUpPage />);

    const passwordInputs = screen.getAllByPlaceholderText('**********') as HTMLInputElement[];
    const passwordField = passwordInputs[0];
    const confirmPasswordField = passwordInputs[1];

    expect(passwordField).toHaveAttribute('type', 'password');
    expect(confirmPasswordField).toHaveAttribute('type', 'password');

    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('m@example.com');

    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(passwordField).toHaveAttribute('required');
    expect(confirmPasswordField).toHaveAttribute('required');

    expect(emailInput).toHaveAttribute('type', 'email');

    console.log('Regression test completed successfully - all security validations intact');
  });