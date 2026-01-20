import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import './App.css';
import WeatherDashboard from './components/WeatherDashboard.jsx';

function App() {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    // Redirect to Auth0 Universal Login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    // Show loading state
    if (isLoading || !isAuthenticated) {
        return (
            <div className="loading-container">
                <div className="loading-spinner-large"></div>
                <p className="loading-text">Loading Comfort Index...</p>
            </div>
        );
    }

    // Show authenticated content
    return (
        <WeatherDashboard />
    );
}

export default App;
