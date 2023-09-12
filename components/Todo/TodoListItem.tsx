import React, { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { Box, Button, ListItem, styled, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Todo } from "../../types/todo";
import ModalPortal from "components/Modal/ModalPortal";
import TodoModal from "components/Modal/TodoModal";

type TodoListItemProps = {
  todo: Todo;
  todos: Todo[];
  categories: string[];
  deleteTodo: (id: string) => void;
  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  updateTodo: (e: React.MouseEvent, todo: Todo) => void;
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  todos,
  deleteTodo,
  updateTodo,
  setCategoriesArray,
  categories,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    handleOpen();
  };

  return (
    <>
      <ListItemStyle>
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: "90%" }}>
          <Typography
            sx={
              todo.status === "완료"
                ? {
                    textDecoration: "line-through",
                    color: "#999",
                  }
                : {
                    fontWeight: "bold",
                    color: "#333",
                  }
            }
          >
            {todo.task}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: "#999999",
              marginLeft: "5px",
            }}
          >
            ({dayjs(todo.startDate).format("YYYY-MM-DD")} ~{" "}
            {dayjs(todo.endDate).format("YYYY-MM-DD")})
          </Typography>
        </Box>
        <EditBox>
          <StatusBox
            sx={
              todo.status === "대기중"
                ? { background: "#ffc6c6" }
                : todo.status === "진행중"
                ? { background: "#ffffc6" }
                : todo.status === "완료"
                ? { background: "#d8ffc6" }
                : {}
            }
          >
            <StatusText>{todo.status}</StatusText>
          </StatusBox>
          <Button
            sx={buttonCommonStyle}
            onClick={() => onClick()}
            title="수정하기 모달창이 열립니다."
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            sx={buttonCommonStyle}
            onClick={() => deleteTodo(todo.id)}
            title="삭제하기"
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </EditBox>
      </ListItemStyle>

      {open && (
        <ModalPortal>
          <TodoModal
            handleClose={handleClose}
            open={open}
            todo={todo}
            todos={todos}
            updateTodo={updateTodo}
            categories={categories}
            setCategoriesArray={setCategoriesArray}
          />
        </ModalPortal>
      )}
    </>
  );
};

const StatusBox = styled(Box)`
  align-items: center;
  color: #333;
  padding: 2px 5px;
  margin-right: 5px;
  border-radius: 5px;
`;
const EditBox = styled(Box)`
  display: flex;
  align-items: center;
`;
const StatusText = styled(Typography)`
  font-size: 12px;
`;
const ListItemStyle = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-top: 10px;
  &:first-of-type {
    margin-top: 0;
  }
`;

const buttonCommonStyle = {
  minWidth: "auto",
};
export default TodoListItem;
