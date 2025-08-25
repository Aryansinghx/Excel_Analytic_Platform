// backend/controllers/excelController.js

const ExcelRecord = require('../models/ExcelRecord');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

/**
 * Upload & parse Excel file
 * @route POST /api/excel/upload
 */
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    // Read Excel file using SheetJS
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    if (jsonData.length === 0) {
      return res.status(400).json({ message: 'Excel file is empty' });
    }

    // Save into MongoDB
    const newRecord = new ExcelRecord({
      fileName: req.file.originalname,
      uploadedBy: req.user.id, // from auth middleware
      data: jsonData,
    });

    await newRecord.save();

    // Delete file from uploads folder after saving to DB
    fs.unlinkSync(filePath);

    res.status(201).json({ message: 'Excel uploaded & saved successfully', record: newRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get all uploaded files for logged-in user
 * @route GET /api/excel/my-uploads
 */
exports.getMyUploads = async (req, res) => {
  try {
    const records = await ExcelRecord.find({ uploadedBy: req.user.id });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get single Excel record by ID
 * @route GET /api/excel/:id
 */
exports.getExcelById = async (req, res) => {
  try {
    const record = await ExcelRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
