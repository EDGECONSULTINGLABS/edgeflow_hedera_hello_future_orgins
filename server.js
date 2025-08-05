const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:5678'],
    credentials: true
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the main inventory UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'edgeflow-inventory-pro.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'EdgeFlow Inventory UI',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 EdgeFlow Inventory UI running on port ${PORT}`);
    console.log(`📱 Access at: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 