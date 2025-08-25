// backend/controllers/adminController.js

const User = require('../models/user');
const ExcelRecord = require('../models/ExcelRecord');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // don’t send password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update user role (e.g., make someone admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// View all uploaded Excel records
exports.getAllExcelRecords = async (req, res) => {
  try {
    const records = await ExcelRecord.find().populate('uploadedBy', 'username email');
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
