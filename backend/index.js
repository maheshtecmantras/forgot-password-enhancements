const express = require('express');
const cors = require('cors');
const forgotPasswordRouter = require('./routes/forgotPassword');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/forgot-password', forgotPasswordRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error in forgot-password API', err);
  const status = err.status || 500;
  res.status(status).json({ message: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Forgot password API listening on http://localhost:${PORT}`);
});
