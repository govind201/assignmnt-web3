const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");


router.get("/todos/", getAllTodos);

router.get("/todos/:id/", getTodo);

router.post("/todos/", createTodo);

router.put("/todos/:id/", updateTodo);

router.delete("/todos/:id/", deleteTodo);

module.exports = router;