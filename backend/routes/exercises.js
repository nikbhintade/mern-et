import { Router } from "express";
import { Exercise } from "../model/exercise.model.js";

const exercisesRouter = Router();

exercisesRouter.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

exercisesRouter.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    })

    newExercise.save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json(`Error: ${err}`))

})

exercisesRouter.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            res.json(exercise)
        }).catch(err => {
            res.status(400).json(`Error: ${err}`)
        })
})

exercisesRouter.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('Exercise Deleted!')
        })
        .catch(err =>{
            res.status(400).json(`Error: ${err}`)
        })
})

exercisesRouter.route('/update/:id').post((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.json('Exercise updated!')
    }).catch(err => [
        res.status(400).json(`Error: ${err}`)
    ])
    
    /*
    Following snippet was in tutorial which can be changed to findByIdAndUpdate method

    you can just send what field you have to update and
    the method won't change other. 

    In following snippet it will change other field if youdon't send it
    or throw an error.

    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => {
                    res.json('Exercise updated!')
                }).catch(err => [
                    res.status(400).json(`Error: ${err}`)
                ])
        }).catch(err => {
            res.status(400).json(`Error: ${err}`)
        })
    */
})

export default exercisesRouter;