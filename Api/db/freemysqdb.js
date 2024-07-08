const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.on('connection', (connection) => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('MySQL error:', err.code);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Handle connection lost error
    } else if (err.code === 'ECONNRESET') {
        // Handle connection reset error
    } else {
        // Handle other errors
    }
});

module.exports = pool;