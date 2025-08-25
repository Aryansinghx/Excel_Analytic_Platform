// backend/controllers/chartController.js

const ExcelRecord = require('../models/ExcelRecord');

/**
 * Generate chart data from ExcelRecord
 * @route POST /api/charts/generate
 * @body { recordId, xAxis, yAxis, chartType }
 */
exports.generateChart = async (req, res) => {
  try {
    const { recordId, xAxis, yAxis, chartType } = req.body;

    // Find Excel record by ID
    const record = await ExcelRecord.findById(recordId);
    if (!record) {
      return res.status(404).json({ message: 'Excel record not found' });
    }

    // Ensure data exists
    if (!record.data || record.data.length === 0) {
      return res.status(400).json({ message: 'No data available in this record' });
    }

    // Extract chart data
    const labels = record.data.map(row => row[xAxis]);  // X-axis values
    const values = record.data.map(row => row[yAxis]);  // Y-axis values

    const chartData = {
      type: chartType || 'bar',   // default bar chart
      data: {
        labels,
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
    };

    res.status(200).json({ chartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Get chart history for a user
 * @route GET /api/charts/history/:userId
 */
exports.getChartHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await ExcelRecord.find({ uploadedBy: userId });

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
