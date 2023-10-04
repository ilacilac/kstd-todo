import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import TodoForm from "../components/Todo/TodoForm";
import {
  createTodoToServer,
  deleteTodoFromServer,
  getTodosFromServer,
  updateTodosToServer,
} from "../service/todos";
import { NoIdTodo, Todo } from "../types/todo";
import { resetServerContext } from "react-beautiful-dnd";
import { List, ListItem, styled } from "@mui/material";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import TodoDragableList from "components/Todo/TodoDragableList";
import { createJSONFile } from "lib/fileHandler";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { TodosProvider, useTodos } from "context/TodoContext";

type IndexProps = {
  todos: Todo[];
};

const IndexPage: React.FC<IndexProps> = () => {
  // TODO : state -> ContextAPI ...

  const { isLoading, data } = useQuery(["todos"], () => getTodosFromServer(), {
    initialData: [], // 초기 데이터 설정
    refetchOnMount: true,
    onSuccess: (data) => {
      // data를 setTodos 함수를 사용하여 상태에 저장
      setTodos(data);
    },
  });
  const [todosArray, setTodosArray] = useState<Todo[]>(data);
  const { todos, setTodos } = useTodos();
  const categories = new Set(todos?.map((todo: Todo) => todo.category));
  const uniqueCategories: string[] = [...categories] as string[];

  useEffect(() => {
    console.log("1", todos);
  }, [todos]);

  // console.log("todosArray", todosArray);
  // TODO : Custom hook
  const deleteTodo = async (id: string) => {
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];

    setTodos(newTodos);
    // setCategoriesArray(newUniqueCategories);
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

    setTodos([...todosArray, newTodo]);
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

    setTodos(newTodos);
    updateTodosToServer(newTodos);

    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];
  };
  return (
    <>
      {isLoading && <BoxWrapStyled>Loading...</BoxWrapStyled>}
      {!isLoading && todos && (
        <BoxWrapStyled>
          <ListStyled>
            {uniqueCategories.map((category) => (
              <ListItemStyled key={category}>
                <LinkStyled href={`/todos/${category}`}>{category}</LinkStyled>
              </ListItemStyled>
            ))}
          </ListStyled>
          <TodoForm categories={uniqueCategories} addTodo={addTodo}></TodoForm>
          <TodoDragableList
            categories={uniqueCategories}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </BoxWrapStyled>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  // let todos: Todo[] = [];
  resetServerContext();
  try {
    // todos = await getTodosFromServer();
    // await queryClient.prefetchQuery(['todos'], getTodosFromServer)
  } catch (error) {
    createJSONFile();
    console.error(`readTodosFromFile Error : ${error}`);
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
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
