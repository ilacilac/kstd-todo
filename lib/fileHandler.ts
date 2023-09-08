import fs from "fs";
import { Todo } from "../types/todo";

export const readTodosFromFile = (): Todo[] => {
  const rawData = fs.readFileSync("data/todos.json", "utf8");
  return JSON.parse(rawData);
};

export const writeTodosToFile = (todos: Todo[]) => {
  const data = JSON.stringify(todos, null, 2);
  fs.writeFileSync("data/todos.json", data, "utf8");
};

export const deleteTodoFromFile = (id: string) => {
  const rawData = JSON.parse(fs.readFileSync("data/todos.json", "utf8"));
  const todos = rawData.filter((todo: Todo) => todo.id !== id);
  fs.writeFileSync("data/todos.json", JSON.stringify(todos), "utf8");
  return todos;
};
