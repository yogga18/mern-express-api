const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
// Import Controller
const productRoutes = require('./src/routes/products');

// Allow Cors-Origin
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Use Controller
app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
