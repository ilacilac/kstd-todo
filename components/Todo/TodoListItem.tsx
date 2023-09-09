import { Button, ListItem, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../../types/todo";

type TodoListItemProps = {
  todo: Todo;
  index: number;
  deleteTodo: (id: string) => void;
};

const listItemStyle = { border: "1px solid #dddddd" };

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  index,
  deleteTodo,
}) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <ListItem
          sx={listItemStyle}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* TodoItem 컴포넌트에 각 todo를 넘겨줌 */}
          <Typography>{todo.task}</Typography>
          <Button onClick={() => deleteTodo(todo.id)}>삭제</Button>
        </ListItem>
      )}
    </Draggable>
  );
};

export default TodoListItem;
