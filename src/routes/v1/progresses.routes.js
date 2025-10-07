const express = require('express');
const router = express.Router();

// Estado en memoria (simulación)
let processes = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: "Carlos Navia",
    email: "carlos@example.com",
    role: "process",
    createdAt: "2025-09-12T12:00:00Z"
  }
];


// GET /api/v1/processes
router.get('/', (req, res) => {
    res.status(200).json(processes);
});

// GET /processes/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;   // 1
  const process = processes.find(p => p.id === id);   // 2

  if (!process) {   // 3
    return res.status(404).json({ error: 'Proceso no encontrado' });
  }

  res.status(200).json(process);   // 4
});

// POST /processes
router.post('/', (req, res) => {
  const { name, email, role } = req.body;   // 1

  if (!name || !email) {   // 2
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  const newProcess = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    name,
    email,
    role: role || 'process',  // valor por defecto si no envían rol
    createdAt: new Date().toISOString()
  };

  processes.push(newProcess);   // 4

  res.status(201).json(newProcess);   // 5
});

// PUT /processes/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;              // 1
  const { name, email, role } = req.body; // 2

  const index = processes.findIndex(p => p.id === id); // 3
  if (index === -1) {                     // 4
    return res.status(404).json({ error: 'Proceso no encontrado' });
  }

  if (!name || !email) {                  // 5
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  processes[index] = {                        // 6
    ...processes[index], // conserva los datos previos
    name,
    email,
    role
  };

  res.status(200).json(processes[index]);     // 7
});

// DELETE /processes/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;                            // 1
  const index = processes.findIndex(p => p.id === id);  // 2

  if (index === -1) {                                   // 3
    return res.status(404).json({ error: 'Proceso no encontrado' });
  }

  const deletedProcess = processes.splice(index, 1);           // 4
  res.status(200).json({ deleted: deletedProcess[0].id }); // 5
});

// GET /processes?role=process&search=Carlos
router.get('/', (req, res) => {
  const { role, search } = req.query;  // 1
  let result = processes;              // 2

  if (role) {                          // 3
    result = result.filter(p => p.role === role);
  }

  if (search) {                        // 4
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);        // 5
});

module.exports = router;
