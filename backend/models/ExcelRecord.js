const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  rows: {
    type: [mongoose.Schema.Types.Mixed], // Accepts array of any shape
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExcelData', excelDataSchema);