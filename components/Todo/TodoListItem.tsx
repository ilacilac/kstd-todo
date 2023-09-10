import React from "react";
import { Button, ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../../types/todo";

type TodoListItemProps = {
  todo: Todo;
  index: number;
  deleteTodo: (id: string) => void;
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid #dddddd",
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  index,
  deleteTodo,
}) => {
  const onClick = (todo: Todo) => {
    console.log("a");
  };
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <ListItem
          sx={listItemStyle}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => {
            onClick(todo);
          }}
        >
          <Typography>{todo.task}</Typography>
          <Button onClick={() => deleteTodo(todo.id)} title="삭제">
            <DeleteIcon />
          </Button>
        </ListItem>
      )}
    </Draggable>
  );
};

export default TodoListItem;
