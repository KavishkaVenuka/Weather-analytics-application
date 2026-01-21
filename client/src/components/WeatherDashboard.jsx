import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Header from './Header.jsx';
import PodiumView from './PodiumView.jsx';
import CityCard from './CityCard.jsx';

const WeatherDashboard = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [viewMode, setViewMode] = useState('podium');
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const token = await getAccessTokenSilently();

                // Fetch data from our backend
                const response = await fetch('http://localhost:5000/api/weather', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch weather data (Status: ${response.status})`);
                }

                const result = await response.json();

                if (result.success && result.data && result.data.list) {
                    // Map backend data to frontend model
                    const mappedCities = result.data.list.map(item => ({
                        id: item.id,
                        name: item.name,
                        country: item.country, // Ensure this field exists in backend or handle missing
                        temp: Math.round(item.temp),
                        description: item.weather.description.charAt(0).toUpperCase() + item.weather.description.slice(1),
                        score: item.comfort ? item.comfort.score : 0,
                        rank: 0, // Placeholder, calculated below
                        label: item.comfort ? item.comfort.label : 'Unknown'
                    }));

                    // Sort by Comfort Score (Descending) -> The most comfortable city is Rank 1
                    mappedCities.sort((a, b) => b.score - a.score);

                    // Assign Ranks
                    const rankedCities = mappedCities.map((city, index) => ({
                        ...city,
                        rank: index + 1
                    }));

                    setCities(rankedCities);
                }
            } catch (err) {
                console.error("Error loading weather data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-red-500 font-medium">Error: {error}</div>
            </div>
        );
    }

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
