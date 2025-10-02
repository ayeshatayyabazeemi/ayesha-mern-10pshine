# NotesApp

A full-stack notes application built on the MERN stack (MongoDB, Express, React, Node).  
Users can sign up, log in, and manage rich-text notes: create, read, update, delete, and search. The frontend displays previews and modals for editing and viewing full content.

---

## 📸 Screenshots

### Dashboard / Note List  
 <img width="1918" height="905" alt="image" src="https://github.com/user-attachments/assets/e8950b70-9061-49b0-842a-275d41c783ee" />
 
### Note Edit / Modal View  
 <img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/5297bc9a-8803-4f8a-ac21-17755ba2157b" />


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














