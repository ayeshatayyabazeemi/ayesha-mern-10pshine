# NotesApp

A full-stack notes application built on the MERN stack (MongoDB, Express, React, Node).  
Users can sign up, log in, and manage rich-text notes: create, read, update, delete, and search. The frontend displays previews and modals for editing and viewing full content.

---

## 📸 Screenshots

Below are sample screenshots illustrating the UI (note list, modal view, etc.):

| Dashboard / Note List | Note Edit / Modal View |
|------------------------|---------------------------|
| ![Dashboard screenshot](<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/c2441148-5155-43fc-b808-ea0fddc73c2d" />) | ![Modal / editing screenshot](<img width="1916" height="912" alt="image" src="https://github.com/user-attachments/assets/9c8983c6-2346-421d-a1ce-4931b78e7a89" />) |

---

## 🚩 Key Features

- **User Authentication** with JWT (signup & login)  
- **Protected API endpoints** for notes operations  
- **CRUD for notes**: create, read (list), update, delete  
- **Search** notes by title or content  
- **Rich-text support** via Quill (HTML + sanitization)  
- **Preview truncation**: note cards display only first 3 lines with ellipse  
- **Modal / edit view**: view or edit full content  
- **UI reactivity**: deleting or updating notes triggers auto-refresh  
- **Testing**: Mocha + Chai + mongodb-memory-server for isolated backend tests  

---

## ✍️ How It Works (Flow Summary)

1. **Signup / Signin** — user registers or logs in, receives JWT  
2. **Dashboard** — fetches notes for the user  
3. **Create Note** — POST endpoint stores note with position, subject, cleaned HTML  
4. **Update Note** — PUT endpoint updates fields  
5. **Search** — GET endpoint searches in subject or note content  
6. **Delete** — DELETE endpoint removes note  
7. **UI Update** — after delete or update, `refreshKey` triggers refetch





