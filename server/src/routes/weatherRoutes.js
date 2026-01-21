const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/WeatherController');

// GET /api/weather
// Supports optional query params: ?lat=...&lon=...
router.get('/', (req, res) => weatherController.fetchWeather(req, res));

module.exports = router;
