import express from 'express';
import User from '../models/User';
import {check, sanitize, validationResult} from "express-validator";

// Router
const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    await check("first_name", "First name cannot be blank").trim().not().isEmpty().run(req);
    await check("last_name", "Last name cannot be blank").trim().not().isEmpty().run(req);
    await check("email", "Email is not valid").trim().isEmail().run(req);
    await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors.array())
    }

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        avatar_url: req.body.avatar_url,
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) { return next("Account with that email address already exists."); }

        user.save().then(result => {
            return res.status(200).json({user: user});
        }).catch(next);
    });
});

export default userRouter;