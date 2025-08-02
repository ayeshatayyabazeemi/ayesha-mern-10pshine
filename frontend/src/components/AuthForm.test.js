import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';

// Mocks for child components
jest.mock('./SignInForm', () => ({ toggleForm }) => (
  <div data-testid="sign-in-form">
    SignInForm
    <button onClick={toggleForm}>Switch to SignUp</button>
  </div>
));

jest.mock('./SignUpForm', () => ({ toggleForm }) => (
  <div data-testid="sign-up-form">
    SignUpForm
    <button onClick={toggleForm}>Switch to SignIn</button>
  </div>
));

describe('AuthForm Component', () => {
  test('renders SignInForm initially', () => {
    render(<AuthForm />);
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-up-form')).not.toBeInTheDocument();
  });

  test('toggles to SignUpForm on button click', () => {
    render(<AuthForm />);
    const switchBtn = screen.getByText('Switch to SignUp');
    fireEvent.click(switchBtn);

    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-in-form')).not.toBeInTheDocument();
  });

  test('toggles back to SignInForm from SignUpForm', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText('Switch to SignUp'));

    const backBtn = screen.getByText('Switch to SignIn');
    fireEvent.click(backBtn);

    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-up-form')).not.toBeInTheDocument();
  });
});
