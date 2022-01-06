const express = require('express');
const PORT = process.env.PORT || 4000;
const cors = require('cors'); // Deps Allow Cors-Origin
const mongoose = require('mongoose'); // Deps database
const multer = require('multer'); // Deps Upload Images
const path = require('path'); // Deps Allow Access Static File
const app = express();

// Import Controller
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

// Allow Cors-Origin
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Logic Upload image MULTER
// Handle upload images
const fileStorage = multer.diskStorage({
  // Func untuk menyimpan file image ke dalam folder images yang ada di root folder project
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Func untuk memberikan penamaan file image agar tidak terjadi bentrok nama file yang sama
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + '-' + file.originalname);
  },
});

// Handle upload condition images
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// middleware
// CRUD PostMan
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// Multer Upload Images
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
// Allow Access Static File images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use Controller
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

// Alert Global Error
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message: message,
    data: data,
  });
});

// Connect Database
mongoose
  .connect(
    'mongodb+srv://yogga:HgT0JdrirbSIM9pU@cluster0.1pitk.mongodb.net/BlogAppAtlas?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.log(err));
