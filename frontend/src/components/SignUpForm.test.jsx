import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import axios from 'axios';

jest.mock('axios');

describe('SignUpForm', () => {
  const mockToggleForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('renders input fields and button', () => {
    render(<SignUpForm toggleForm={mockToggleForm} />);

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
  });

  

  test('calls axios and clears form on successful signup', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Signup successful!' } });

    render(<SignUpForm toggleForm={mockToggleForm} />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/auth/signup',
        {
          username: 'user1',
          email: 'user@example.com',
          pwd: '123456',
        }
      );
      expect(window.alert).toHaveBeenCalledWith('Signup successful!');
    });

 
    expect(screen.getByPlaceholderText(/Username/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Email/i).value).toBe('');
  });

  test('shows error alert on signup failure', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'User already exists' } }
    });

    render(<SignUpForm toggleForm={mockToggleForm} />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(' Signup failed: User already exists');
    });
  });

  
});
