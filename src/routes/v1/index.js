const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutsRouters = require('./workouts.routes');

router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workouts', workoutsRouters)

module.exports = router;