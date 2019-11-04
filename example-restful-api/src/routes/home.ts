import express from 'express';

// Router
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.send('Home')
});

export default homeRouter;