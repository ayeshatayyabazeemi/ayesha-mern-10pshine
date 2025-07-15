// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import AddNote from './AddNote';
// import { AuthContext } from './AuthContext';
// import axios from 'axios';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';


// jest.mock('axios');

// jest.mock('react-quill', () => {
//   return function MockQuill(props) {
//     return (
//       <textarea
//         data-testid="quill-editor"
//         value={props.value}
//         onChange={(e) => props.onChange(e.target.value)}
//         placeholder="write your note here..."
//       />
//     );
//   };
// });


// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   }
// }));

// const mockUser = { username: 'testuser' };

// describe('AddNote Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders the title input and editor', () => {
//     render(
//       <AuthContext.Provider value={{ user: mockUser }}>
//         <AddNote />
//       </AuthContext.Provider>
//     );

//     expect(screen.getByPlaceholderText(/note title/i)).toBeInTheDocument();
//     expect(screen.getByTestId('quill-editor')).toBeInTheDocument();
//     expect(screen.getByText(/save/i)).toBeInTheDocument();
//   });

//   it('allows typing a title and note, then saving it', async () => {
//     axios.post.mockResolvedValueOnce({ data: { message: 'Note saved' } });

//     render(
//       <AuthContext.Provider value={{ user: mockUser }}>
//         <AddNote />
//       </AuthContext.Provider>
//     );

//     const titleInput = screen.getByPlaceholderText(/note title/i);
//     const editor = screen.getByTestId('quill-editor');

//     fireEvent.change(titleInput, { target: { value: 'My Test Note' } });
//     fireEvent.change(editor, { target: { value: '<p>Hello Note</p>' } });

//     const saveButton = screen.getByText(/save/i);
//     fireEvent.click(saveButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith(
//         'http://localhost:5000/api/note/create',
//         {
//           username: 'testuser',
//           title: 'My Test Note',
//           note: '<p>Hello Note</p>',
//         },
//         expect.any(Object)
//       );
//     });
//   });

//   it('shows error toast if save fails', async () => {
//     axios.post.mockRejectedValueOnce({
//       response: { data: { message: 'Title already used' } }
//     });

//     render(
//       <AuthContext.Provider value={{ user: mockUser }}>
//         <AddNote />
//       </AuthContext.Provider>
//     );

//     const titleInput = screen.getByPlaceholderText(/note title/i);
//     const editor = screen.getByTestId('quill-editor');

//     fireEvent.change(titleInput, { target: { value: 'Duplicate Note' } });
//     fireEvent.change(editor, { target: { value: 'Duplicate content' } });

//     const saveButton = screen.getByText(/save/i);
//     fireEvent.click(saveButton);

//     await waitFor(() => {
//       expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Title already used');
//     });
//   });
// });
