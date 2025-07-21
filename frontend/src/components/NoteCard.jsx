import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import './NoteCard.css';
import {toast} from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BASE_URL } from '../config.js';

const NoteCard = ({ note, onDeleteSuccess}) => {
  const [showModal, setShowModal] = useState(false);
  const isupdated = note.createdAt !== note.updatedAt;
  const navigate=useNavigate();
  const openModal = () => setShowModal(true);
  const closeModal = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setShowModal(false);
    }
  };

  const onEdit=()=>{
    navigate('/add-note', {
    state: {
      mode: 'edit',
      note: {
        title: note.subject,
        content: note.note, // or note.content based on your backend
        _id: note._id
      }
  }})
  }
  const onDelete=()=>{
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      try{
        const token=localStorage.getItem('jwtToken');
      const res= axios.delete(`${BASE_URL}/api/note/remove?note_id=${note._id}`,
       { headers:{
        Authorization: `Bearer ${token}`

        }}
          
      )
     
      toast.success('Note deleted');
       onDeleteSuccess();
    }catch(error){
      console.error('Failed to delete note:', error);
    }
    };

  });
  }




  return (
    <>
      <div className="notes-card" onClick={openModal}>
        <h3 className="note-title">{note.subject}</h3>
        <div className="divider"></div>

        <div
          className="note-text"
          dangerouslySetInnerHTML={{ __html: note.note }}
        />

        <div className="note-footer">
          <div className="note-dates">
            <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
            {isupdated && (
              <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
            )}
          </div>
          <div className="icons" onClick={(e) => e.stopPropagation()}>
            <FiEdit2 onClick={ onEdit} className="icon edit" />
            <FiTrash2 onClick={ onDelete} className="icon delete" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 50 }}
            >
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <AiOutlineClose size={24} />
              </button>
              <h3>{note.subject}</h3>
              <div className="divider"></div>
              <div
                className="note-full"
                dangerouslySetInnerHTML={{ __html: note.note }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoteCard;
