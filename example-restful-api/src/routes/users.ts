import express from 'express';
import User from '../models/User';

// Router
const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        avatar_url: req.body.avatar_url,
    });

    user.save().then(result => {
        return res.status(200).json(user);
    }).catch(next);
});

export default userRouter;