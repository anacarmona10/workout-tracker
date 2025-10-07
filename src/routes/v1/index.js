const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutsRoutes = require('./workouts.routes');
const progressesRoutes = require('./progresses.routes');
const workoutplansRoutes = require('./workoutplans.routes');

router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workouts', workoutsRoutes);
router.use('/progresses', progressesRoutes);
router.use('/workoutplans', workoutplansRoutes);

module.exports = router;