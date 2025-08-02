import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import Dashboard from './Dashboard';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');

// Mock NoteCard to avoid deep rendering
jest.mock('./NoteCard', () => (props) => (
  <div data-testid="note-card">{props.note.title}</div>
));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockUser = {
  username: 'johndoe',
  id: '123456',
};

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('jwtToken', 'mock-token');
  jest.clearAllMocks();
});

afterEach(() => {
  localStorage.clear();
});

describe('Dashboard Component', () => {
  test('renders header, search bar, and add note button', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/JohnDoe's/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search notes/i)).toBeInTheDocument();
    expect(screen.getByText('+ Note')).toBeInTheDocument();
  });

  test('fetches and displays notes', async () => {
    const mockNotes = {
      data: {
        notes: [
          { _id: '1', title: 'Note 1' },
          { _id: '2', title: 'Note 2' },
        ],
      },
    };

    axios.get.mockResolvedValueOnce(mockNotes);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
  });

 
  
test('debounced search triggers API call after delay', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/search notes/i);
  fireEvent.change(input, { target: { value: 'Test Note' } });

  // Before debounce time (400ms), API should not be called
  expect(axios.get).not.toHaveBeenCalledWith(expect.stringContaining('search'));

  await waitFor(() =>
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/note/search?query=Test Note'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer')
        })
      })
    ), { timeout: 600 } // debounce + buffer
  );
  });
  

  test('navigates to add-note when + Note is clicked', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const button = screen.getByText('+ Note');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/add-note');
  });

  test('searches notes when input is typed', async () => {
    const mockSearchResults = {
      data: [{ _id: '3', title: 'Search Match' }],
    };

    axios.get.mockResolvedValue(mockSearchResults);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search notes/i);

    act(() => {
      fireEvent.change(input, { target: { value: 'search' } });
    });

    await waitFor(() => {
      expect(screen.getByText('Search Match')).toBeInTheDocument();
    });
  });
});
