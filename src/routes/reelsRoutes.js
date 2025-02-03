const express = require('express');
const multer = require('multer');
const { uploadReel, scheduleReels } = require('../controllers/reelsController');

const router = express.Router();
const upload = multer({ dest: 'uploaded_reels/' });

router.post('/upload', upload.single('file'), uploadReel);
router.post('/schedule', scheduleReels);

module.exports = router;

