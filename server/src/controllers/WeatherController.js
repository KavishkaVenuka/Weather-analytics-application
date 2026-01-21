const weatherService = require('../services/WeatherService');

class WeatherController {
    async fetchWeather(req, res) {
        try {
            // Extract query parameters
            const { id, ids } = req.query;

            let data;

            if (ids) {
                // Batch fetch mode with custom IDs
                data = await weatherService.getDashboardWeather(ids);
            } else if (id) {
                // Single city mode
                data = await weatherService.getWeatherData(id);
            } else {
                // Default Dashboard mode (No params)
                data = await weatherService.getDashboardWeather();
            }

            res.json({
                success: true,
                data: data
            });
        } catch (error) {
            console.error('Weather Controller Error:', error.message);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = new WeatherController();
