import axios from "axios";
import { Todo } from "types/todo";

export const getTodosFromServer = async () => {
  const res = await axios.get("http://localhost:3000/api/todos");

  return res.data;
};

export const deleteTodoFromServer = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/todo/${id}`);
};

export const createTodoToServer = async (newTodo: Todo) => {
  await axios.post("http://localhost:3000/api/todos", newTodo);
};
