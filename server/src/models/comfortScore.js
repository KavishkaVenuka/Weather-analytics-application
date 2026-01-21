/**
 * Calculates a Weather Comfort Score (0-100).
 * * @param {Object} data - The weather data.
 * @param {number} data.temp - Temperature in Celsius (°C).
 * @param {number} data.humidity - Relative Humidity in Percent (%).
 * @param {number} data.windSpeed - Wind Speed in m/s.
 * @param {number} data.cloudiness - Cloudiness in Percent (%).
 * @param {number} data.pressure - Atmospheric Pressure in hPa.
 * @param {number} data.visibility - Visibility in meters.
 * @returns {Object} - Returns score (0-100) and a text label.
 */
function calculateComfortScore({
    temp,
    humidity,
    windSpeed,
    cloudiness,
    pressure,
    visibility
}) {
    // 1. Define "Ideal" Conditions (The benchmark for 100% comfort)
    const IDEAL = {
        temp: 22,          // 22°C is generally considered perfect
        humidity: 45,      // 45% is comfortable
        pressure: 1013,    // Standard sea level pressure
        wind: 3,           // Light breeze (m/s)
    };

    // 2. Define Weights (How much each factor matters)
    // Total weights should roughly align with importance.
    const WEIGHTS = {
        temp: 2.5,         // Temperature is the biggest factor
        humidity: 1.0,     // Humidity is secondary
        wind: 1.5,         // Wind can ruin a good day
        cloudiness: 0.1,   // Minor psychological factor
        visibility: 0.0005, // Very minor, scale is large (meters)
        pressure: 0.05     // Minor physical impact unless extreme
    };

    let penalty = 0;

    // --- Temperature Penalty ---
    // Deviating from 22°C hurts the score significantly.
    penalty += Math.abs(temp - IDEAL.temp) * WEIGHTS.temp;

    // --- Humidity Penalty ---
    // High humidity is worse when it's hot, but simple deviation works for a baseline.
    penalty += Math.abs(humidity - IDEAL.humidity) * WEIGHTS.humidity;

    // --- Wind Speed Penalty ---
    // Light breeze is good, high wind is bad.
    // If wind is > 5 m/s, we apply penalty.
    if (windSpeed > 5) {
        penalty += (windSpeed - 5) * WEIGHTS.wind;
    }

    // --- Cloudiness Adjustment ---
    // This is subjective. Some like 0 clouds, some like 20%. 
    // Let's penalize if it's "too gloomy" (100%) or "too glaring" (0%).
    // We assume 20% clouds is nice.
    penalty += Math.abs(cloudiness - 20) * WEIGHTS.cloudiness;

    // --- Visibility Penalty ---
    // We only care if visibility is POOR (e.g., < 10,000m).
    // If visibility is 10km+, no penalty.
    if (visibility < 10000) {
        penalty += (10000 - visibility) * WEIGHTS.visibility;
    }

    // --- Pressure Penalty ---
    // Deviation from 1013 hPa.
    penalty += Math.abs(pressure - IDEAL.pressure) * WEIGHTS.pressure;

    // 3. Calculate Final Score
    // Start at 100, subtract penalties, clamp between 0 and 100.
    let score = 100 - penalty;
    score = Math.max(0, Math.min(100, score)); // Ensure 0-100 range

    // 4. Generate a Human Label
    let label = "";
    if (score >= 85) label = "Excellent";
    else if (score >= 70) label = "Good";
    else if (score >= 50) label = "Moderate";
    else if (score >= 30) label = "Poor";
    else label = "Extreme/Uncomfortable";

    return {
        score: Math.round(score),
        label: label,
        details: { penalty: Math.round(penalty) } // For debugging
    };
}



module.exports = calculateComfortScore;