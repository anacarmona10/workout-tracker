const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('./config/env'); // Import the port from the env file
const usersRouter = require("./routes/v1/users.routes");
const exercisesRouter = require("./routes/v1/exercises.routes");
const workoutsRouter = require("./routes/v1/workouts.routes");
const progressesRouter = require("./routes/v1/progresses.routes");
const workoutplansRouter = require("./routes/v1/workoutplans.routes");

// Importar rutas
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Configurar rutas con prefijo /api
app.use('/api', routes);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/exercises", exercisesRouter);
app.use("api/v1/workouts", workoutsRouter);
app.use("api/v1/processes", progressesRouter);
app.use("api/v1/workoutplans", workoutplansRouter);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});