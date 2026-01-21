const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(express.json());

const weatherRoutes = require('./routes/weatherRoutes');

const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'weather',
    issuerBaseURL: 'https://dev-5z13ny3t3ert21qz.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Routes
app.use('/api/weather', checkJwt, weatherRoutes);


// Start server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
