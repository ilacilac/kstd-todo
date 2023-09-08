import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { readTodosFromFile, writeTodosToFile } from "../lib/fileHandler";

import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import { deleteTodoFromServer, getTodosFromServer } from "../service/todos";
import { Todo } from "../types/todo";

type IndexProps = {
  todos: Todo[];
};

const IndexPage: React.FC<IndexProps> = ({ todos }) => {
  const [todosArray, setTodosArray] = useState<Todo[]>(todos);
  const deleteTodo = async (id: string) => {
    // const todos = todosArray.filter((todo) => todo.id !== id);
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    setTodosArray(newTodos);
  };
  return (
    <section>
      <TodoForm setTodosArray={setTodosArray} todos={todosArray}></TodoForm>
      <TodoList todos={todosArray} deleteTodo={deleteTodo} />
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let todos: Todo[] = [];

  try {
    // todos = readTodosFromFile();
    todos = await getTodosFromServer();
    console.log(todos);
  } catch (error) {
    throw new Error(`readTodosFromFile Error : ${error}`);
  }
  return {
    props: {
      todos,
    },
  };
};

export default IndexPage;
