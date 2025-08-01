// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const noteRoutes = require('./routes/noteRoutes');
// const authRoutes = require('./routes/authRoutes');
// const pinoHttp=require('pino-http')

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(pinoHttp());
// app.use('/api/auth', authRoutes);
// app.use('/api/note',noteRoutes);


// module.exports = app;
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => app.listen(5000, () => console.log('✅ Server running on port 5000')))
// .catch(err => console.error('❌ MongoDB connection error:', err));


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

if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => console.log('✅ Server running on port 5000'));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
}
