const express = require('express');
const router = express.Router();

// Estado en memoria (simulación)
let workouts = [
  {
    id: "b42f53fa-7b30-4b91-8d36",
    idUsuario: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    nombre: "Entrenamiento de tren superior",
    descripcion: "Mantén una buena postura, abdomen activo, y controla tanto la subida como la bajada de peso, enfocándote en los músculos como el pecho, la espalda, los hombros, bíceps y tríceps.",
    repeticionesEjercicio: [
        {
            idEjercicio: "b42f53fa-8d36-dc1c6ef27611",
            nombreEjercicio: "Flexiones de brezos",
            repeticiones: "5"
        },
        {
            idEjercicio: "b42f53fa-63g6s-dc1c6ef27611",
            nombreEjercicio: "Remos con mancuernas",
            repeticiones: "5"
        },
        {
            idEjercicio: "b45gejbdjy-8d36-dc1c6ef27611",
            nombreEjercicio: "Press de hombros",
            repeticiones: "5"
        }
    ],
    categoria: "Fuerza",
    sede: "Aventura",
    fecha: "12/10/25",
    tiempo: "15 min",
    createdAt: "2025-09-12T12:00:00Z"
  }
];


// GET /api/v1/workouts
router.get('/', (req, res) => {
    res.status(200).json(workouts);
});

// GET /workouts/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;   // 1
  const workout = workouts.find(u => u.id === id);   // 2

  if (!workout) {   // 3
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  res.status(200).json(workout);   // 4
});

// POST /workouts
router.post('/', (req, res) => {
  const { idUsuario,  nombre, descripcion, repeticionesEjercicio, categoria, sede, fecha, tiempo} = req.body;   // 1

  if (!idUsuario || !nombre || !descripcion || !repeticionesEjercicio || !categoria || !sede || !fecha || !tiempo) {   // 2
    return res.status(400).json({ error: 'Ingrese todos los datos necesarios' });
  }

  const newWorkout = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    idUsuario,  
    nombre, 
    descripcion, 
    repeticionesEjercicio, 
    categoria, 
    sede, 
    fecha, 
    tiempo,
    createdAt: new Date().toISOString()
  };

  workouts.push(newWorkout);   // 4

  res.status(201).json(newWorkout);   // 5
});

// PUT /workouts/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;              // 1
  const {idUsuario,  nombre, descripcion, repeticionesEjercicio, categoria, sede, fecha, tiempo} = req.body; // 2

  const index = workouts.findIndex(u => u.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  if (!idUsuario || !nombre || !descripcion || !repeticionesEjercicio || !categoria || !sede || !fecha || !tiempo) {                  // 5
    return res.status(400).json({ error: 'Coloca toda la información' });
  }

  workouts[index] = {                        // 6
    ...workouts[index], // conserva los datos previos
    idUsuario,  
    nombre, 
    descripcion, 
    repeticionesEjercicio, 
    categoria, 
    sede, 
    fecha, 
    tiempo,
  };

  res.status(200).json(workouts[index]);     // 7
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;                            // 1
  const index = workouts.findIndex(u => u.id === id);      // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  const deletedWorkout = workouts.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedWorkout[0].id }); // 5
});

// GET /users?role=user&search=Carlos
router.get('/', (req, res) => {
  const { role, search } = req.query;  // 1
  let result = users;                  // 2

  if (role) {                          // 3
    result = result.filter(u => u.role === role);
  }

  if (search) {                        // 4
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);        // 5
});

module.exports = router;