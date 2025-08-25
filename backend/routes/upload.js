const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const ExcelData = require('../models/ExcelData');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // ✅ Convert buffer to JSON
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(worksheet); // <-- KEY POINT

    console.log("✅ Parsed JSON:", parsedData);

    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      return res.status(400).json({ error: 'Excel content is empty or invalid' });
    }

    // ✅ Save to MongoDB
    const result = await ExcelData.create({
      rows: parsedData,
      uploadedAt: new Date()
    });

    res.status(200).json({ message: 'Uploaded and saved!', id: result._id });
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
