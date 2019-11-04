import express from 'express';

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */
app.get('/', (req, res) => {
    res.send('Hello World!')
});

export default app;
