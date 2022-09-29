import express from 'express';
import web from './routes/web.js'
import connectDB from './db/connection.js';

const app = express();
const port = process.env.PORT || 9090;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// Connect 
connectDB(DATABASE_URL);

// Parse JSON data comming from form
app.use(express.urlencoded({ extended: true }));

// Server static files
app.use(express.static('public'));

// Set Template Engine
app.set('views engine', 'ejs');

// Load Routes
app.use('/', web);


app.listen(port, () => {
    console.log(`Server running  at http://localhost:${port}`);
});