import express from 'express';
import { MONGODB_URI } from './util/secrets';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

// Create Express server
const app = express();

// Connect to MongoDB
mongoose.Promise = bluebird;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => console.log("Connected to MongoDB")
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */
app.get('/', (req, res) => {
    res.send('Hello World!')
});

export default app;
