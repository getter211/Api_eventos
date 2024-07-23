// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { syncDb } = require('./models');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
//ESTA API ES LA BUENBA
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 3000;

syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
