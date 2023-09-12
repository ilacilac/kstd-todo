import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, FormGroup, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Todo } from "types/todo";
import FetchTodoForm from "components/Todo/FetchTodoForm";

type ModalProps = {
  handleClose: () => void;
  open: boolean;
  todo: Todo;
  todos: Todo[];

  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  categories: string[];
  updateTodo: (e: React.MouseEvent, todo: Todo) => void;
};

const TodoModal: React.FC<ModalProps> = ({
  handleClose,
  open,
  todo,
  todos,
  categories,
  setCategoriesArray,
  updateTodo,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2,
  };

  const buttonStyle = {
    px: 0,
    py: 0,
    justifyContent: "right",
    width: "100%",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }}>
        <Button sx={{ ...buttonStyle }} onClick={handleClose}>
          <CloseIcon />
        </Button>
        <FetchTodoForm
          todo={todo}
          todos={todos}
          handleClose={handleClose}
          categories={categories}
          setCategoriesArray={setCategoriesArray}
          updateTodo={updateTodo}
        />
      </Box>
    </Modal>
  );
};

export default TodoModal;
