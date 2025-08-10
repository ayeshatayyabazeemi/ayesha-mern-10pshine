import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { MemoryRouter } from 'react-router-dom';

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock useAuth
const mockSetUser = jest.fn();
jest.mock('./AuthContext', () => ({
  useAuth: () => ({
    setUser: mockSetUser,
  }),
}));

// Mock axios
jest.mock('axios');

describe('SignInForm Component', () => {
  const toggleForm = jest.fn();

  const setup = () => {
    render(
      <MemoryRouter>
        <SignInForm toggleForm={toggleForm} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input fields and button', () => {
    setup();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('submits login and handles success', async () => {
    const mockUser = { id: '1', username: 'testuser' };
    const mockToken = 'mockToken123';
    axios.post.mockResolvedValue({
      data: {
        user: mockUser,
        token: mockToken,
      },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpass' },
    });

    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/auth/signin', {
        username: 'testuser',
        password: 'testpass',
      });
      expect(mockSetUser).toHaveBeenCalledWith(mockUser);
      expect(localStorage.getItem('jwtToken')).toBe(mockToken);
      expect(toast.success).toHaveBeenCalledWith('Signup successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard',{"replace": true} );
    });
  });

  test('handles login failure', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { message: 'Invalid credentials' },
      },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Sign in failed: Invalid credentials');
    });
  });

 
});
