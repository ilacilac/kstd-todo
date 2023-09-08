import { NextApiRequest, NextApiResponse } from "next";
import { readTodosFromFile, writeTodosToFile } from "../../lib/fileHandler";
import { v4 as uuidv4 } from "uuid";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const todos = readTodosFromFile();

    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const newTodo = {
      // id: uuidv4(),
      ...req.body,
    };

    let todos = readTodosFromFile();
    // todos.push(newTodo);
    todos = [...todos, newTodo];

    writeTodosToFile(todos);
    return res.status(201).json(newTodo);
  }
};
