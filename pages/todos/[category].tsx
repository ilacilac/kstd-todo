import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import Head from "next/head";
import dayjs from "dayjs";
import TodoList from "../../components/Todo/TodoList";
import {
  createTodoToServer,
  deleteTodoFromServer,
  getTodosFromServer,
  updateTodosToServer,
} from "../../service/todos";
import { Status, Todo } from "../../types/todo";

type TodosProps = {
  todos: Todo[];
  filterTodos: Todo[];
  categories: string[];
};

const TodosPage: React.FC<TodosProps> = ({
  todos,

  categories,
}) => {
  const [todosArray, setTodosArray] = useState<Todo[]>(todos);

  const [categoriesArray, setCategoriesArray] = useState<string[]>(categories);

  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, "day").toDate();
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [priority, setPriority] = useState("상");
  const [status, setStatus] = useState<Status>("대기중");

  const deleteTodo = async (id: string) => {
    // const todos = todosArray.filter((todo) => todo.id !== id);
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    setTodosArray(newTodos);
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

    setTodosArray(newTodos);
    updateTodosToServer(newTodos);

    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];
    setCategoriesArray(newUniqueCategories);
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>KSTD | {router.query.category}할 일 목록</title>
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
            updateTodo={updateTodo}
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
    todos = await getTodosFromServer();
    filterTodos = todos.filter((todo) => todo.category === category);
    categories = new Set(todos.map((todo) => todo.category));
    uniqueCategories = [...categories];
  } catch (error) {
    console.error(`readTodosFromFile Error : ${error}`);
  }
  return {
    props: {
      todos: todos,
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
