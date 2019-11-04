import express from 'express';

// Router
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('User list')
});

export default userRouter;