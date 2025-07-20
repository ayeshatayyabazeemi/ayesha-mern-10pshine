import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import './AddNote.css';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const EditableTitle = ({ title, setTitle }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  return (
    <div className="editable-title">
      {isEditing ? (
        <input
          className="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
           onBlur={() => setIsEditing(false)}
          placeholder="note title..."
          autoFocus
        />
      ) : (
        <h1 className="title-heading" onClick={() => setIsEditing(true)}>
          {title || 'Untitled'}
        </h1>
      )}
    </div>
  );
};

const AddNote = () => {
  const { user } = useAuth();
  const location = useLocation();

  const editMode = location.state?.mode === 'edit';
  const noteData = location.state?.note || {};
  console.log(noteData.title)
  const [title, setTitle] = useState(noteData.title || '');
  const [content, setContent] = useState(noteData.content || '');
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link'],
      ['clean']
    ]
  };

  const handleSave = async () => {
    const token = localStorage.getItem('jwtToken');
    const cleanHTML = DOMPurify.sanitize(content);
    console.log(cleanHTML);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/note/create',
        {
          username: user?.username,
          title: title,
          note: cleanHTML
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Note saved:', res.data);
      setContent('');
      setTitle('');
      toast.success("Note Saved successful!");
    } catch (error) {
 
 const errMsg = error.response?.data?.message || "Error saving note.";
  
  toast.error(errMsg); // ✅ show custom backend error
  console.error("Error saving note:", errMsg);
}
  };

  const handleupdate=async()=>{
    const token = localStorage.getItem('jwtToken');
    const cleanHTML = DOMPurify.sanitize(content);
    console.log(cleanHTML);
    console.log(noteData._id)
    try {
      const res = await axios.put('http://localhost:5000/api/note/update', {
      note_id: noteData._id,
      subject: title,
      note: cleanHTML
    },
            {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Note saved:', res.data);
  
      toast.success("Note updated successful!");
    } catch (error) {
 
 const errMsg = error.response?.data?.message || "Error in updating note.";
  
  toast.error(errMsg); // ✅ show custom backend error
  console.error("Error saving note:", errMsg);
}
  }

  return (
    <div className="add-note-page">
      <button onClick={editMode?handleupdate:handleSave} className="save-button">{editMode?'update':'Save'}</button>
      <div className="background" />

      <div className="note-card">
        <EditableTitle title={title} setTitle={setTitle} />

        <div className="editor-toolbar-container">
          <div id="toolbar" />
        </div>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Write your note..."
        />
      </div>
    </div>
  );
};

export default AddNote;
