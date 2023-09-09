import React, { useState } from "react";
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

type IndexProps = {
  todos: Todo[];
};

const IndexPage: React.FC<IndexProps> = ({ todos }) => {
  const [todosArray, setTodosArray] = useState<Todo[]>(todos);
  const [completed, setCompleted] = useState<Todo[]>([]);
  const deleteTodo = async (id: string) => {
    // const todos = todosArray.filter((todo) => todo.id !== id);
    await deleteTodoFromServer(id);
    const newTodos = await getTodosFromServer();
    setTodosArray(newTodos);
  };

  // 드래그가 끝났을 때의 동작을 지정해주는 함수
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // 드롭이 droppable 밖에서 일어났을 경우 바로 return
    if (!destination) return;
    // 드래그가 발생한 위치와 드롭이 발생한 위치가 같을 경우 바로 return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add: Todo;
    let newTodos = todos;
    let newCompleted = completed;

    // 드래그가 발생한 아이템을 add에 담고 원래 자리에서 제거
    if (source.droppableId === "inbox-column") {
      add = newTodos[source.index];
      newTodos.splice(source.index, 1);
    } else {
      add = newCompleted[source.index];
      newCompleted.splice(source.index, 1);
    }

    // 드롭이 발생한 곳에 add를 넣어줌
    if (destination.droppableId === "inbox-column") {
      newTodos.splice(destination.index, 0, { ...add, isDone: false });
    } else {
      completed.splice(destination.index, 0, { ...add, isDone: true });
    }

    // todos와 completed 업데이트
    setTodosArray(newTodos);
    setCompleted(newCompleted);

    updateTodosToServer(newTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <TodoForm setTodosArray={setTodosArray} todos={todosArray}></TodoForm>
        <TodoList
          setTodosArray={setTodosArray}
          todos={todosArray}
          completed={completed}
          deleteTodo={deleteTodo}
        />
      </section>
    </DragDropContext>
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

export default IndexPage;
