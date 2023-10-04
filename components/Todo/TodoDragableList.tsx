import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Box, List } from "@mui/material";
import { Todo } from "../../types/todo";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "@mui/system";

import { getTodosFromServer, updateTodosToServer } from "service/todos";
import { useRouter } from "next/router";
import TodoDragableListItem from "./TodoDragableListItem";
import { useMutation, useQuery } from "react-query";
import { useTodos } from "context/TodoContext";

type TodoListProps = {
  categories: string[];

  deleteTodo: (id: string) => void;
  updateTodo: (e: React.MouseEvent, todo: Todo) => void;
};

const TodoDragableList: React.FC<TodoListProps> = ({ categories }) => {
  const { category } = useRouter().query;
  const { todos, setTodos } = useTodos();
  let newTodos = todos;

  const { mutate: updateMutateTodo } = useMutation(["updateTodos"], () =>
    updateTodosToServer(newTodos)
  );
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add: Todo;

    add = newTodos[source.index];

    if (source.droppableId === "inbox-column") {
      add = newTodos[source.index];
      newTodos.splice(source.index, 1);
    }

    if (destination.droppableId === "inbox-column") {
      newTodos.splice(destination.index, 0, { ...add });
    }

    updateMutateTodo();
  };

  return (
    <TodoListWrapStyled>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="inbox-column">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ margin: 0, padding: 0 }}
            >
              <List sx={{ margin: 0, padding: 0 }}>
                {todos.map((todo, index) => (
                  <TodoDragableListItem
                    key={todo.id}
                    index={index}
                    todo={todo}
                    categories={categories}
                  />
                ))}
                {!todos.length && (
                  <NoTaskBox>등록된 항목이 없습니다.</NoTaskBox>
                )}
                {provided.placeholder}
              </List>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </TodoListWrapStyled>
  );
};

const TodoListWrapStyled = styled(Box)`
  width: 80%;

  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const NoTaskBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
`;

export default TodoDragableList;
