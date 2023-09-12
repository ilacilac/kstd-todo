import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import { readTodosFromFile, writeTodosToFile } from "../lib/fileHandler";

import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import {
  deleteTodoFromServer,
  getTodosFromServer,
  updateTodosToServer,
} from "../service/todos";
import { Todo } from "../types/todo";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { Box, List, ListItem, styled } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

type IndexProps = {
  todos: Todo[];
};

const IndexPage: React.FC<IndexProps> = ({ todos }) => {
  const [todosArray, setTodosArray] = useState<Todo[]>(todos);
  const categories = new Set(todos.map((todo) => todo.category));
  const uniqueCategories = [...categories];
  const [categoriesArray, setCategoriesArray] =
    useState<string[]>(uniqueCategories);
  const deleteTodo = async (id: string) => {
    // const todos = todosArray.filter((todo) => todo.id !== id);
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];

    setTodosArray(newTodos);
    setCategoriesArray(newUniqueCategories);
  };

  return (
    <BoxWrapStyled>
      <ListStyled>
        {categoriesArray.map((category) => (
          <ListItemStyled key={category}>
            <LinkStyled href={`/todos/${category}`}>{category}</LinkStyled>
          </ListItemStyled>
        ))}
      </ListStyled>
      <TodoForm
        setTodosArray={setTodosArray}
        todos={todosArray}
        categories={categoriesArray}
        setCategoriesArray={setCategoriesArray}
      ></TodoForm>
      <TodoList
        todos={todosArray}
        setTodosArray={setTodosArray}
        deleteTodo={deleteTodo}
        categories={categoriesArray}
        setCategoriesArray={setCategoriesArray}
      />
      <div id="modal-root"></div>
    </BoxWrapStyled>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let todos: Todo[] = [];
  resetServerContext();
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

const BoxWrapStyled = styled("div")`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
const ListStyled = styled(List)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  overflow-x: scroll;
`;

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "25px",
  margin: "10px 5px",
  backgroundColor: theme.palette.primary.light,
  fontSize: "16px",
  width: "auto",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transition: "background 0.3s",
  },
}));

const LinkStyled = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  padding: 3px 10px;
  text-align: center;
`;
export default IndexPage;

// 1. category를 불러온다. -> todos.category -> 중복제거
// 2. category 선택해주세요.
// 3.
