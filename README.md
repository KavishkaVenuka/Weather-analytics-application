# Weather Analytics Application

A full-stack application that analyzes weather data to determine a "Comfort Index" for various cities. It features a React frontend with a premium, glassmorphism-inspired UI and an Express backend that processes real-time data from OpenWeatherMap.

## 1. Setup Instructions

### Prerequisites
    - Node.js (v14+ recommended)
    - OpenWeatherMap API Key

### Backend Setup (`/server`)
    1.  Navigate to the server directory:
        ```bash
        cd server
        ```
    2.  Install dependencies:
        ```bash
        npm install
        ```
    3.  Configure Environment:
        Create a `.env` file in the `server` directory:
        ```env
        PORT=5000
        OPENWEATHER_API_KEY=your_api_key_here
        OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
        ```
    4.  Start the server:
        ```bash
        npm start
        ```
        The server will run on `http://localhost:5000`.

### Frontend Setup (`/client`)
    1.  Navigate to the client directory:
        ```bash
        cd client
        ```
    2.  Install dependencies:
        ```bash
        npm install
        ```
    3.  Start the development server:
        ```bash
        npm run dev
        ```
        The application will be accessible at `http://localhost:5173`.

    ---

## 2. Explanation of Comfort Index Formula
    The **Comfort Index** is a custom metric (0-100) that quantifies how pleasant the weather feels to the average person. It is calculated by defining an **"Ideal State"** and penalizing deviations from it.

**Formula Logic:**
    `Score = 100 - Total Penalty`

    The "Ideal State" is defined as:
    *   **Temperature**: 22°C
    *   **Humidity**: 45%
    *   **Wind Speed**: 3 m/s
    *   **Pressure**: 1013 hPa

## 3. Reasoning Behind Variable Weights
We apply different weights to each factor because not all weather conditions impact human comfort equally.

| Factor | Weight | Reasoning |
| :--- | :--- | :--- |
| **Temperature** | **2.5** | The most critical factor for human comfort. Small deviations from 22°C are immediately noticeable. |
| **Wind** | **1.5** | High wind speeds significantly degrade comfort (wind chill or annoyance), even if the temperature is okay. |
| **Humidity** | **1.0** | Important for "magginess" or dryness, but generally secondary to raw temperature. |
| **Cloudiness** | **0.1** | Primarily psychological. Validated as a minor factor unless it rains (which is captured by other metrics). |
| **Pressure** | **0.05** | Imperceptible to most humans unless at extreme variances (storm fronts). |
| **Visibility** | **0.0005** | Only impacts comfort when strictly limited (e.g., heavy fog), hence the very low weight. |

## 4. Cache Design Explanation
**Current Architecture:**
The system currently implements a **Real-Time Fetching Strategy** without a persistent cache layer.

*   **Design Decision**: We prioritized **Data Freshness** for this version. Weather conditions can change rapidly, and the dashboard is designed to provide the most current snapshot available.
*   **Architecture Pattern**: The backend uses a `Repository` pattern. This decouples the data fetching (`WeatherRepository`) from the business logic (`WeatherService`).
*   **Future Scalability**: If we were to implement caching (e.g., Redis), it would be injected into the `WeatherRepository` class. The service layer would remain unchanged, unaware of whether the data came from the API or the cache.

## 5. Trade-offs Considered

*   **Real-time vs. Rate Limits**:
    *   *Trade-off*: We chose to fetch live data on every dashboard load.
    *   *Consequence*: This ensures accuracy but consumes API quota rapidly. The `getDashboardWeather` method optimizes this by using `Promise.all` to fetch 11 cities in parallel, but it still triggers 11 distinct API calls per user request.

*   **Client-Side vs. Server-Side Sorting**:
    *   *Trade-off*: We calculate the score on the server but sort on the client.
    *   *Reasoning*: This allows the frontend to easily toggle between different views (e.g., alphabetical vs. rank-based) without re-fetching data, shifting the minor computational load to the client (distributed computing).

## 6. Known Limitations

    1.  **API Rate Limiting**: The OpenWeatherMap Free Tier has a limit (60 calls/minute). Heavy traffic to this dashboard will hit that limit quickly since we make ~11 calls per page load.
    2.  **Lack of Historical Data**: The current implementations serves only instantaneous current weather, with no trends or forecasting.
    3.  **Single Locale**: The "Ideal State" (22°C) is hardcoded. It does not account for regional acclimatization (e.g., 22°C might feel cold to someone in Colombo but hot to someone in Oslo).