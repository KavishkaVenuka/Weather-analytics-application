const weatherRepository = require('../repositories/WeatherRepository');
const calculateComfortScore = require('../models/comfortScore');

class WeatherService {
    constructor() {
        // Default City ID (Horawala Junction/Horana area)
        this.defaultCityId = 6285792;

        // Default Dashboard Cities (Provided by user)
        this.dashboardCityIds = [1248991, 1241964, 1850147, 2644210, 2988507, 2147714, 4930956, 1796236, 3143244, 292223, 1275339];
    }

    async getWeatherData(cityId) {
        // Use provided cityId or fall back to default
        const id = cityId || this.defaultCityId;

        const rawData = await weatherRepository.getData(id);

        // Calculate Comfort Score
        const comfort = calculateComfortScore({
            temp: rawData.main.temp,
            humidity: rawData.main.humidity,
            windSpeed: rawData.wind.speed,
            cloudiness: rawData.clouds.all,
            pressure: rawData.main.pressure,
            visibility: rawData.visibility
        });

        // Here we can perform future analytics or data formatting
        // For now, we return the raw data structure + our processed context
        return {
            location: {
                cityId: rawData.id,
                city: rawData.name,
                country: rawData.sys.country,
                coord: rawData.coord
            },
            weather: rawData,
            comfort: comfort
        };
    }

    async getDashboardWeather(cityIds) {
        // Use provided IDs or fall back to the default dashboard list
        const ids = cityIds || this.dashboardCityIds;

        const rawData = await weatherRepository.getMultipleCitiesData(ids);

        // Map over the list and format each city similarly to getWeatherData
        // Note: The /group endpoint returns an object like { cnt: 3, list: [...] }
        return {
            count: rawData.cnt,
            list: rawData.list.map(cityData => {
                const comfort = calculateComfortScore({
                    temp: cityData.main.temp,
                    humidity: cityData.main.humidity,
                    windSpeed: cityData.wind.speed,
                    cloudiness: cityData.clouds.all,
                    pressure: cityData.main.pressure,
                    visibility: cityData.visibility
                });

                return {
                    id: cityData.id,
                    name: cityData.name,
                    country: cityData.sys.country,
                    coord: cityData.coord,
                    temp: cityData.main.temp,
                    weather: cityData.weather[0], // Primary weather condition
                    comfort: comfort
                };
            })
        };
    }
}

module.exports = new WeatherService();
