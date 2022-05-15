import { Router } from "express";
import { User } from "../model/user.model.js";

const usersRouter = Router();

usersRouter.route('/').get((req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(400).json(`Error: ${err}`)
        });
})

usersRouter.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

export default usersRouter;