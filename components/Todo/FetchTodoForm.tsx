// components/FetchTodoForm.tsx

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FilledTextFieldProps,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  styled,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { createTodoToServer, updateTodosToServer } from "service/todos";
import { v4 as uuidv4 } from "uuid";
import { Status, Todo } from "../../types/todo";
import { parseISO, format } from "date-fns";

type TodoFormProps = {
  todo: Todo;
  todos: Todo[];
  handleClose: () => void;
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  categories: string[];
};

const FetchTodoForm: React.FC<TodoFormProps> = ({
  todo,
  todos,
  setTodosArray,
  handleClose,
  categories,
  setCategoriesArray,
}) => {
  const [task, setTask] = useState(todo.task);
  const [category, setCategory] = useState(todo.category);
  const [startDate, setStartDate] = useState(new Date(todo.startDate));
  const [endDate, setEndDate] = useState(new Date(todo.endDate));
  const [priority, setPriority] = useState(todo.priority);
  const [status, setStatus] = useState(todo.status);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newTodos = todos.map((_todo) =>
      _todo.id === todo.id
        ? {
            ..._todo,
            id: todo.id,
            task,
            category,
            startDate,
            endDate,
            priority,
            status,
          }
        : _todo
    );

    updateTodosToServer(newTodos);
    setTodosArray(newTodos);

    const newCategories = new Set(newTodos.map((todo: Todo) => todo.category));
    const newUniqueCategories = [...newCategories] as string[];
    setCategoriesArray(newUniqueCategories);
    handleClose();
  };

  return (
    <FormGroup>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <TextField
          value={task}
          onChange={(e) => setTask(e.target.value)}
          // placeholder="내용을 입력해주세요."
          required
          id="task"
          label="할일"
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <TextField
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          // placeholder="내용을 입력해주세요."
          required
          id="category"
          label="카테고리"
        />
      </FormControl>
      <CategoriesBox>
        {categories &&
          categories.map((category) => (
            <CategoryButton
              onClick={() => setCategory(category)}
              variant="outlined"
              size="small"
              key={category}
            >
              {category}
            </CategoryButton>
          ))}
      </CategoriesBox>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <InputLabel id="priority-label">우선순위</InputLabel>

        <Select
          labelId="priority"
          id="priority"
          value={priority}
          label="우선순위"
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value={"상"}>상</MenuItem>
          <MenuItem value={"중"}>중</MenuItem>
          <MenuItem value={"하"}>하</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="status-label">현재상태</InputLabel>

          <Select
            labelId="status"
            id="status"
            value={status}
            label="현재상태"
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <MenuItem value={"대기중"}>대기중</MenuItem>
            <MenuItem value={"진행중"}>진행중</MenuItem>
            <MenuItem value={"완료"}>완료</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DateWrapStyled>
        <StartDateWrapStyled>
          <FormHelperText>시작일</FormHelperText>
          <StartDateStyled>
            <CalendarTodayIcon />
            <DateStyled
              selected={startDate}
              // locale={ko}
              maxDate={endDate}
              onChange={(date: Date) => {
                setStartDate(date);
              }}
            />
          </StartDateStyled>
        </StartDateWrapStyled>
        <EndDateWrapStyled>
          <FormHelperText sx={{ marginLeft: "5px" }}>종료일</FormHelperText>
          <EndDateStyled>
            <CalendarTodayIcon />
            <DateStyled
              selected={endDate}
              locale={ko}
              onChange={(date: Date) => {
                setEndDate(date);
              }}
            />
          </EndDateStyled>
        </EndDateWrapStyled>
      </DateWrapStyled>

      <Button
        onClick={handleClick}
        type="submit"
        variant="contained"
        disabled={task ? false : true}
        sx={{ marginTop: "10px", padding: "10px 0" }}
      >
        수정하기
      </Button>
    </FormGroup>
  );
};

const CategoriesBox = styled(Box)`
  margin: 10px 0;
  display: flex;
`;

const CategoryButton = styled(Button)`
  margin-right: 5px;
  border-radius: 30px;
`;
const DateWrapStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StartDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const EndDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 49%;
`;

const StartDateStyled = styled(Box)`
  display: flex;
  align-items: center;

  border: none;
  border-radius: 5px;
  padding: 0px 15px;
  // margin: 0 5px;
  background-color: #ededed;
`;
const EndDateStyled = styled(Box)`
  display: flex;
  align-items: center;

  border-radius: 5px;
  border: none;
  padding: 0px 15px;

  background-color: #ededed;
`;

const DateStyled = styled(DatePicker)`
  padding: 15px 0px;
  margin-left: 10px;
  border: none;
  background-color: transparent;
`;

export default FetchTodoForm;
