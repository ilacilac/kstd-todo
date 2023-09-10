import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, List } from "@mui/material";
import { Todo } from "../../types/todo";
import TodoListItem from "./TodoListItem";
import { Dispatch, SetStateAction } from "react";

type TodoListProps = {
  todos: Todo[];
  completed: Todo[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
  deleteTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodosArray,
  deleteTodo,
}) => {
  // const reorder = (todos: Todo[], startIndex: number, endIndex: number) => {
  //   const result = Array.from(todos);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // };

  // const onDragEnd = (result: any) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const items = reorder(todos, result.source.index, result.destination.index);

  //   setTodosArray(items);
  // };
  return (
    <Droppable droppableId="inbox-column">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          <List>
            {todos.map((todo, index) => (
              <TodoListItem
                key={todo.id}
                index={index}
                todo={todo}
                deleteTodo={deleteTodo}
              />
            ))}
            {provided.placeholder}
          </List>
        </Box>
      )}
    </Droppable>
  );
};

export default TodoList;
