
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddNote from './AddNote';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// ✅ Mock axios
jest.mock('axios');

// ✅ Mock react-quill
jest.mock('react-quill', () => {
  return function MockQuill(props) {
    return (
      <textarea
        data-testid="quill-editor"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="write your note here..."
      />
    );
  };
});

// ✅ Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));

const mockUser = { username: 'testuser' };
const mockToken = 'mock-token';

// ✅ Simulate localStorage before each test
beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('jwtToken', mockToken);
  jest.clearAllMocks();
});

afterEach(() => {
  localStorage.clear();
});

const renderWithRouter = (ui, route = '/') => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AddNote Component', () => {
  it('renders the title input and editor', () => {
    renderWithRouter(<AddNote />);
    expect(screen.getByPlaceholderText(/note title/i)).toBeInTheDocument();
    expect(screen.getByTestId('quill-editor')).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  it('allows typing a title and note, then saving it', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Note saved' } });

    renderWithRouter(<AddNote />);

    fireEvent.change(screen.getByPlaceholderText(/note title/i), {
      target: { value: 'My Test Note' },
    });
    fireEvent.change(screen.getByTestId('quill-editor'), {
      target: { value: '<p>Hello Note</p>' },
    });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/note/create',
        {
          username: 'testuser',
          title: 'My Test Note',
          note: '<p>Hello Note</p>',
        },
        expect.any(Object)
      );
    });
  });

  it('shows error toast if save fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Title already used' } },
    });

    renderWithRouter(<AddNote />);

    fireEvent.change(screen.getByPlaceholderText(/note title/i), {
      target: { value: 'Duplicate Note' },
    });
    fireEvent.change(screen.getByTestId('quill-editor'), {
      target: { value: 'Duplicate content' },
    });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Title already used');
    });
  });

  it('updates note when in edit mode', async () => {
    const mockNote = {
      _id: '123456',
      title: 'Old Note Title',
      content: '<p>Old content</p>',
    };

    axios.put.mockResolvedValueOnce({ data: { message: 'Note updated' } });

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/',
            state: { mode: 'edit', note: mockNote }
          }
        ]}
      >
        <Routes>
          <Route path="/" element={<AddNote />} />
        </Routes>
      </MemoryRouter>
    );

    // Validate existing title is rendered
    expect(screen.getByDisplayValue(mockNote.title)).toBeInTheDocument();

    // Change title and content
    fireEvent.change(screen.getByPlaceholderText(/note title/i), {
      target: { value: 'Updated Title' },
    });
    fireEvent.change(screen.getByTestId('quill-editor'), {
      target: { value: '<p>Updated Content</p>' },
    });

    fireEvent.click(screen.getByRole('button', { name: /update/i }));


    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/api/note/update',
        {
          note_id: '123456',
          subject: 'Updated Title',
          note: '<p>Updated Content</p>',
        },
        expect.any(Object)
      );
    });
  });

  it('shows error toast if update fails', async () => {
    const mockNote = {
      _id: '123456',
      title: 'Old Note Title',
      content: '<p>Old content</p>',
    };

    axios.put.mockRejectedValueOnce({
      response: { data: { message: 'Update failed' } },
    });

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/',
            state: { mode: 'edit', note: mockNote }
          }
        ]}
      >
        <Routes>
          <Route path="/" element={<AddNote />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/note title/i), {
      target: { value: 'Updated Title' },
    });
    fireEvent.change(screen.getByTestId('quill-editor'), {
      target: { value: 'Updated Content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /update/i }));


    await waitFor(() => {
      expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Update failed');
    });
  });
});
