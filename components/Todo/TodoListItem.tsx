import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../../types/todo";
import ModalPortal from "components/Modal/ModalPortal";
import TodoModal from "components/Modal/TodoModal";

type TodoListItemProps = {
  todo: Todo;
  todos: Todo[];
  index: number;
  deleteTodo: (id: string) => void;
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid #dddddd",
  marginTop: "10px",
};
const buttonCommonStyle = {
  // padding: 0,
  minWidth: "auto",
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  todos,
  index,
  deleteTodo,
  setTodosArray,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onClick = (todo: Todo) => {
    console.log("a");
    handleOpen();
  };
  return (
    <>
      <Draggable draggableId={todo.id} index={index}>
        {(provided) => (
          <ListItem
            sx={listItemStyle}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Typography>{todo.task}</Typography>
            <Box>
              <Button
                sx={buttonCommonStyle}
                onClick={() => onClick(todo)}
                title="삭제"
              >
                <EditIcon />
              </Button>
              <Button
                sx={buttonCommonStyle}
                onClick={() => deleteTodo(todo.id)}
                title="삭제"
              >
                <DeleteIcon />
              </Button>
            </Box>
          </ListItem>
        )}
      </Draggable>
      {open && (
        <ModalPortal>
          <TodoModal
            handleClose={handleClose}
            open={open}
            todo={todo}
            todos={todos}
            setTodosArray={setTodosArray}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default TodoListItem;
