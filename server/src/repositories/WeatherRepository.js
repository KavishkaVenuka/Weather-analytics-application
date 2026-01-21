const axios = require('axios');

class WeatherRepository {
    constructor() {
        this.baseUrl = process.env.OPENWEATHER_BASE_URL;
        this.apiKey = process.env.OPENWEATHER_API_KEY;
    }

    async getData(cityId) {
        try {
            const response = await axios.get(`${this.baseUrl}/weather`, {
                params: {
                    id: cityId,
                    appid: this.apiKey,
                    units: 'metric' // Standard for scientific apps, can be made configurable
                }
            });
            return response.data;
        } catch (error) {
            // Enhanced error log for debugging
            if (error.response) {
                throw new Error(`OpenWeatherMap API Error: ${error.response.status} - ${error.response.data.message}`);
            } else if (error.request) {
                throw new Error('OpenWeatherMap API Error: No response received');
            } else {
                throw new Error(`OpenWeatherMap API Error: ${error.message}`);
            }
        }
    }

    async getMultipleCitiesData(cityIds) {
        try {
            // cityIds can be a string (comma separated) or array
            const ids = Array.isArray(cityIds) ? cityIds : cityIds.split(',');

            // Use Promise.all to fetch all cities in parallel using the existing getData method
            const promises = ids.map(id => this.getData(String(id).trim()));
            const results = await Promise.all(promises);

            // Return in a format similar to the Group API so the Service doesn't need huge changes
            // Group API returns: { cnt: N, list: [...] }
            return {
                cnt: results.length,
                list: results
            };
        } catch (error) {
            // If one request fails, Promise.all fails. 
            // In a production app, use Promise.allSettled to handle partial failures.
            throw new Error(`Batch Fetch Error: ${error.message}`);
        }
    }
}

module.exports = new WeatherRepository();
