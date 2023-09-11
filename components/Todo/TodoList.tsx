import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, List } from "@mui/material";
import { Todo } from "../../types/todo";
import TodoListItem from "./TodoListItem";
import { Dispatch, SetStateAction } from "react";
import { styled } from "@mui/system";

type TodoListProps = {
  todos: Todo[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
  deleteTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodosArray,
  deleteTodo,
}) => {
  return (
    <TodoListWrapStyled>
      <Droppable droppableId="inbox-column">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ margin: 0, padding: 0 }}
          >
            <List sx={{ margin: 0, padding: 0 }}>
              {todos.map((todo, index) => (
                <TodoListItem
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={todos}
                  deleteTodo={deleteTodo}
                  setTodosArray={setTodosArray}
                />
              ))}
              {provided.placeholder}
            </List>
          </Box>
        )}
      </Droppable>
    </TodoListWrapStyled>
  );
};

const TodoListWrapStyled = styled(Box)`
  width: 80%;
  margin: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
`;

export default TodoList;
