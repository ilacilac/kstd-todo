import { NextApiRequest, NextApiResponse } from "next";
import { readTodosFromFile, writeTodosToFile } from "../../lib/fileHandler";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const todos = readTodosFromFile();

    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const newTodo = {
      ...req.body,
    };

    let todos = readTodosFromFile();
    todos = [...todos, newTodo];

    writeTodosToFile(todos);
    return res.status(201).json(newTodo);
  }

  if (req.method === "PUT") {
    writeTodosToFile(req.body);
    return res.status(201).json(req.body);
  }
};
