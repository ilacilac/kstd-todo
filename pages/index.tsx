import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import { readTodosFromFile, writeTodosToFile } from "../lib/fileHandler";

import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import {
  createTodoToServer,
  deleteTodoFromServer,
  getTodosFromServer,
  updateTodosToServer,
} from "../service/todos";
import { NoIdTodo, Status, Todo } from "../types/todo";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { Box, List, ListItem, styled } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import TodoDragableList from "components/Todo/TodoDragableList";
import dayjs from "dayjs";
type IndexProps = {
  todos: Todo[];
};

const IndexPage: React.FC<IndexProps> = ({ todos }) => {
  const [todosArray, setTodosArray] = useState<Todo[]>(todos);
  const categories = new Set(todos.map((todo) => todo.category));
  const uniqueCategories = [...categories];
  const [categoriesArray, setCategoriesArray] =
    useState<string[]>(uniqueCategories);

  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, "day").toDate();
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [priority, setPriority] = useState("상");
  const [status, setStatus] = useState<Status>("대기중");
  // TODO : 로직 최상단으로
  const deleteTodo = async (id: string) => {
    // const todos = todosArray.filter((todo) => todo.id !== id);
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];

    setTodosArray(newTodos);
    setCategoriesArray(newUniqueCategories);
  };

  const addTodo = async (e: React.MouseEvent, todo: NoIdTodo) => {
    e.preventDefault();
    if (!todo.task || !todo.category) {
      alert("할 일과 카테고리 모두 입력해주세요.");
      return false;
    }
    const newTodo = {
      ...todo,
      id: uuidv4(),
    };

    await createTodoToServer(newTodo);

    setTodosArray([...todos, newTodo]);
    setCategoriesArray(uniqueCategories);
    setTask("");
    setCategory("");
  };

  const updateTodo = async (e: React.MouseEvent, todo: Todo) => {
    e.preventDefault();

    const newTodos = todosArray.map((_todo) =>
      _todo.id === todo.id
        ? {
            id: todo.id,
            task: todo.task,
            category: todo.category,
            startDate: todo.startDate,
            endDate: todo.endDate,
            priority: todo.priority,
            status: todo.status,
          }
        : _todo
    );
    console.log("b", newTodos);

    setTodosArray(newTodos);
    updateTodosToServer(newTodos);

    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];
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
        addTodo={addTodo}
      ></TodoForm>
      <TodoDragableList
        todos={todosArray}
        categories={categoriesArray}
        setCategoriesArray={setCategoriesArray}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        setTodosArray={setTodosArray}
      />
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
  margin-top: 20px;
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
