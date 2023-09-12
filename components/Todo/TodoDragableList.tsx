import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Box, List } from "@mui/material";
import { Todo } from "../../types/todo";
import TodoListItem from "./TodoListItem";
import { Dispatch, SetStateAction } from "react";
import { styled } from "@mui/system";
// import { useRouter } from "next/router";
import { updateTodosToServer } from "service/todos";
import { useRouter } from "next/router";
import TodoDragableListItem from "./TodoDragableListItem";

type TodoListProps = {
  todos: Todo[];
  categories: string[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  deleteTodo: (id: string) => void;
  updateTodo: (e: React.MouseEvent, todo: Todo) => void;
};

const TodoDragableList: React.FC<TodoListProps> = ({
  todos,

  categories,
  setTodosArray,
  setCategoriesArray,
  deleteTodo,
  updateTodo,
}) => {
  const { category } = useRouter().query;
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

    add = newTodos[source.index];

    // 드래그가 발생한 아이템을 add에 담고 원래 자리에서 제거
    if (source.droppableId === "inbox-column") {
      add = newTodos[source.index];
      newTodos.splice(source.index, 1);
    }

    // 드롭이 발생한 곳에 add를 넣어줌
    if (destination.droppableId === "inbox-column") {
      newTodos.splice(destination.index, 0, { ...add });
    }

    // todos와 completed 업데이트
    setTodosArray(newTodos);

    updateTodosToServer(newTodos);
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
                    todos={todos}
                    deleteTodo={deleteTodo}
                    categories={categories}
                    setCategoriesArray={setCategoriesArray}
                    updateTodo={updateTodo}
                  />
                ))}
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
