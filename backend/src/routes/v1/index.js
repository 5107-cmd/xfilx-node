const videoRoute = require("./video.route");
const express = require('express');

const router = express.Router();

router.use('/videos', videoRoute);

module.exports = router;