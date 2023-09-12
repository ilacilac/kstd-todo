import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import { readTodosFromFile, writeTodosToFile } from "../../lib/fileHandler";

import TodoForm from "../../components/Todo/TodoForm";
import TodoList from "../../components/Todo/TodoList";
import {
  deleteTodoFromServer,
  getTodosFromServer,
  updateTodosToServer,
} from "../../service/todos";
import { Todo } from "../../types/todo";

import { Box, Button, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import Head from "next/head";

type TodosProps = {
  todos: Todo[];
  categories: string[];
};

const TodosPage: React.FC<TodosProps> = ({ todos, categories }) => {
  const [todosArray, setTodosArray] = useState<Todo[]>(todos);
  const [categoriesArray, setCategoriesArray] = useState<string[]>(categories);
  const deleteTodo = async (id: string) => {
    // const todos = todosArray.filter((todo) => todo.id !== id);
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    setTodosArray(newTodos);
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>KSTD | {router.query.category}목록</title>
      </Head>
      <BoxWrapStyled>
        <BackBtn
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBackIcon />
        </BackBtn>
        <SectionStyled>
          <TodoList
            setTodosArray={setTodosArray}
            todos={todosArray}
            deleteTodo={deleteTodo}
            categories={categoriesArray}
            setCategoriesArray={setCategoriesArray}
          />
        </SectionStyled>
      </BoxWrapStyled>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let todos: Todo[] = [];
  let filterTodos: Todo[] = [];
  const { category } = context.query;
  let categories;
  let uniqueCategories;

  resetServerContext();
  try {
    // todos = readTodosFromFile();
    todos = await getTodosFromServer();
    filterTodos = todos.filter((todo) => todo.category === category);
    categories = new Set(todos.map((todo) => todo.category));
    uniqueCategories = [...categories];
  } catch (error) {
    console.error(`readTodosFromFile Error : ${error}`);
  }
  return {
    props: {
      todos: filterTodos,
      categories: uniqueCategories,
    },
  };
};

const SectionStyled = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const BoxWrapStyled = styled("div")`
  margin: 0;
  padding: 0;

  width: 100%;
`;

const BackBtn = styled(Button)`
  margin-top: 50px;
`;

export default TodosPage;
