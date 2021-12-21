const express = require('express');
const app = express();
const cors = require('cors');

// Allow Cors-Origin
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(() => {
  console.log('Express runing on port 4000');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
