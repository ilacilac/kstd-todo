import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteTodoFromFile,
  readTodosFromFile,
  writeTodosToFile,
} from "../../../lib/fileHandler";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const id = String(req.query.id);

    deleteTodoFromFile(id);

    return res.status(204).end();
  }
};
