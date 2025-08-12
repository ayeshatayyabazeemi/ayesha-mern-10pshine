
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
const pinoHttp = require('pino-http');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

module.exports = app; // export for tests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
if (require.main === module) {
  
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));
}