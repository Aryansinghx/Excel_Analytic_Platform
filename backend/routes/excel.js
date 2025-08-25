const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const excelController = require('../controllers/excelController');
const auth = require('../middleware/auth');  // <-- FIXED

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post('/upload', auth, upload.single('file'), excelController.uploadExcel);
router.get('/my-uploads', auth, excelController.getMyUploads);
router.get('/:id', auth, excelController.getExcelById);

module.exports = router;
