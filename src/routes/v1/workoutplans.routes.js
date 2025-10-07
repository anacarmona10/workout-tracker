const express = require('express');
const router = express.Router();

// Estado en memoria (simulación)
let workoutplans = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "workoutplan",
    createdAt: "2025-09-12T12:00:00Z"
  }
];


// GET /api/v1/workoutplans
router.get('/', (req, res) => {
    res.status(200).json(workoutplans);
});

// GET /workoutplans/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;   // 1
  const workoutplan = workoutplans.find(w => w.id === id);   // 2

  if (!workoutplan) {   // 3
    return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
  }

  res.status(200).json(workoutplan);   // 4
});

// POST /workoutplans
router.post('/', (req, res) => {
  const { name, email, role } = req.body;   // 1

  if (!name || !email) {   // 2
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  const newWorkoutplan = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    name,
    email,
    role: role || 'workoutplan',  // valor por defecto si no envían rol
    createdAt: new Date().toISOString()
  };

  workoutplans.push(newWorkoutplan);   // 4

  res.status(201).json(newWorkoutplan);   // 5
});

// PUT /workoutplans/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;              // 1
  const { name, email, role } = req.body; // 2

  const index = workoutplans.findIndex(w => w.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
  }

  if (!name || !email) {                  // 5
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  workoutplans[index] = {                        // 6
    ...workoutplans[index], // conserva los datos previos
    name,
    email,
    role
  };

  res.status(200).json(workoutplans[index]);     // 7
});

// DELETE /workoutplans/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;                            // 1
  const index = workoutplans.findIndex(w => w.id === id);  // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
  }

  const deletedWorkoutplan = workoutplans.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedWorkoutplan[0].id }); // 5
});

// GET /workoutplans?role=workoutplan&search=Carlos
router.get('/', (req, res) => {
  const { role, search } = req.query;  // 1
  let result = workoutplans;              // 2

  if (role) {                          // 3
    result = result.filter(w => w.role === role);
  }

  if (search) {                        // 4
    result = result.filter(w =>
      w.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);        // 5
});

module.exports = router;