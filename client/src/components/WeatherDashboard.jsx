import { useState, useEffect } from 'react';
import Header from './Header.jsx';
import PodiumView from './PodiumView.jsx';
import CityCard from './CityCard.jsx';

const WeatherDashboard = () => {
    const [viewMode, setViewMode] = useState('podium');
    const [cities, setCities] = useState([]);

    // Sample Data (Simulating backend response)
    useEffect(() => {
        // TODO: Replace sample data with API call to backend
        // Backend returns cities with pre-calculated scores and ranks
        // const response = await fetch('/api/cities/rankings');
        // const cities = await response.json();

        const mockData = [
            { id: 1, name: "San Diego", country: "USA", temp: 22, description: "Clear sky", score: 92, rank: 1 },
            { id: 2, name: "Barcelona", country: "Spain", temp: 24, description: "Partly cloudy", score: 88, rank: 2 },
            { id: 3, name: "Lisbon", country: "Portugal", temp: 21, description: "Sunny", score: 85, rank: 3 },
            { id: 4, name: "Sydney", country: "Australia", temp: 23, description: "Clear sky", score: 82, rank: 4 },
            { id: 5, name: "Vancouver", country: "Canada", temp: 18, description: "Light rain", score: 78, rank: 5 },
            { id: 6, name: "Tokyo", country: "Japan", temp: 20, description: "Cloudy", score: 75, rank: 6 },
            { id: 7, name: "Auckland", country: "New Zealand", temp: 19, description: "Partly cloudy", score: 72, rank: 7 },
            { id: 8, name: "Seattle", country: "USA", temp: 16, description: "Rainy", score: 68, rank: 8 },
            { id: 9, name: "London", country: "UK", temp: 15, description: "Overcast", score: 65, rank: 9 },
            { id: 10, name: "Oslo", country: "Norway", temp: 12, description: "Cloudy", score: 60, rank: 10 }
        ];

        setCities(mockData);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-brand-500/30">
            <div className="fixed inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 pointer-events-none" />
            <div className="relative z-10 pb-20">
                <Header viewMode={viewMode} setViewMode={setViewMode} />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {viewMode === 'podium' ? (
                        <PodiumView
                            topCities={cities.filter(c => c.rank <= 3)}
                            otherCities={cities.filter(c => c.rank > 3)}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cities.map(city => (
                                <CityCard key={city.id} city={city} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default WeatherDashboard;
