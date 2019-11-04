import {MONGODB_URI} from './utils/secrets';
import routes from './routes';

import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

// Create Express server
const app = express();

// Connect to MongoDB
mongoose.Promise = bluebird;
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        process.exit();
    });

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors({origin: true}));
app.use(express.json());

// App routes
app.use('/users', routes.users);
app.use('/', routes.home);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500);
    res.json({'error': err});
});

export default app;
