const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Auth middleware
const { profilePicUpload } = require('../middleware/upload'); // ✅ Use correct upload function
const authController = require('../controllers/authController'); // Controller

// Upload profile picture (expects field name 'image')
router.post('/profile/upload-pic', auth, profilePicUpload, authController.uploadProfilePic);

module.exports = router;