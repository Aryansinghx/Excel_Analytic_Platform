// backend/models/Analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['upload', 'delete', 'update', 'download', 'login', 'logout', 'share']
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  fileName: String,
  fileType: {
    type: String,
    enum: ['xlsx', 'csv', 'xls', 'ods', null],
    default: null
  },
  fileSize: Number, // in bytes
  ipAddress: String,
  deviceType: String,
  browser: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  },
  errorMessage: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted timestamp
analyticsSchema.virtual('formattedTime').get(function() {
  return this.timestamp.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Indexes for faster queries
analyticsSchema.index({ userId: 1 });
analyticsSchema.index({ action: 1 });
analyticsSchema.index({ timestamp: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;