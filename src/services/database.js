// This ensures that things do not fail silently but will throw errors instead.
"use strict";

// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('./data/db/log.db')
    // '../../data/db/log.db')

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);

// Define row using `get()` from better-sqlite3
let row = stmt.get();

// Check if there is a table. If row is undefined then no table exists.
if (row === undefined) {

    // Echo information about what you are doing to the console.
    console.log('initializing database...');
    
    // Set a const that will contain the SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE accesslog (
            remoteaddr TEXT,
            remoteuser TEXT,
            time INTEGER PRIMARY KEY,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status INTEGER,
            referer TEXT,
            useragent TEXT     
        );`

    // Execute the above SQL commands
    db.exec(sqlInit);

    // Echo confirmation that database was successfully initialized
    console.log('database has been initialized');

} else {
    // Since the database already exists, echo that to the console.
    console.log('Database exists.')
}

// Export all of the above
module.exports = db
