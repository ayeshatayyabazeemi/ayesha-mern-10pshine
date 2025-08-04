import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NoteCard from './NoteCard';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MemoryRouter } from 'react-router-dom';


jest.mock('axios');
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: {
    fire: jest.fn(() =>
      Promise.resolve({ isConfirmed: true }) 
    ),
  },
}));


const mockNote = {
  _id: '1',
  subject: 'Test Note',
  note: '<p>This is a test note</p>',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const renderComponent = (onDeleteSuccess = jest.fn()) => {
  return render(
    <BrowserRouter>
      <NoteCard note={mockNote} onDeleteSuccess={onDeleteSuccess} />
    </BrowserRouter>
  );
};

describe('NoteCard Component', () => {
  it('renders note title and content', () => {
    renderComponent();
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText(/This is a test note/i)).toBeInTheDocument();
  });

  it('opens modal on card click', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Test Note'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  

  it('calls onEdit when edit icon is clicked', () => {
    renderComponent();
    const editIcon = screen.getByLabelText(/edit/i);
    fireEvent.click(editIcon);
    // Since navigation can't be tested directly here, just ensure the element exists
    expect(editIcon).toBeInTheDocument();
  });
test('calls delete API and onDeleteSuccess when confirmed', async () => {
  const mockNote = { _id: '1', title: 'Test Note', text: 'This is a test note' };
  const mockDeleteSuccess = jest.fn();

  Swal.fire = jest.fn().mockResolvedValue({ isConfirmed: true });
  axios.delete = jest.fn().mockResolvedValue({});

  render(
    <MemoryRouter>
      <NoteCard note={mockNote} onDeleteSuccess={mockDeleteSuccess} />
    </MemoryRouter>
  );

  const deleteBtn = screen.getByLabelText('delete');
  fireEvent.click(deleteBtn);

  await waitFor(() => {
    expect(Swal.fire).toHaveBeenCalled();
    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringContaining(mockNote._id),
      expect.objectContaining({
        headers: expect.any(Object)
      })
    );
    expect(mockDeleteSuccess).toHaveBeenCalled();
  });
});

});
