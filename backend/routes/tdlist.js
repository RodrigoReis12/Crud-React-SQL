const express = require('express');
const connection = require('../connection');
const router = express.Router();


router.post('/tasks/add', (req,res) => {
  const { title, description } = req.body;

  const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
  connection.query(query, [title, description], (err, result) => {
    if(!err) {
      res.status(201).send({message: "Added successfully"});
    } else {
      res.status(500).send(err)
    }
  })
})

router.get('/tasks/get', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao obter tarefas'});
    } else {
      res.status(200).send(result);
    }
  });
});

router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  let query = 'UPDATE tasks SET title=?, description=?, completed=? WHERE id=?';
  connection.query(query, [title, description, completed,taskId], (err) => {
    if(!err) {
      res.status(201).send({message: "Modified successfully!" });
    } else {
      res.status(500).send({error: "Error when modifying"});
    }
  });
});

router.delete('/tasks/delete/:id', (req, res) => {
  const taskId = req.params.id;

  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [taskId], (err) => {
    if(!err) {
      res.status(201).send({message: "Successfully deleted" });
    } else {
      res.status(500).send({error: "Error when deleting"});
    }
  })
})

module.exports = router;