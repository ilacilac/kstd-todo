// components/TodoForm.tsx

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { createTodoToServer } from "service/todos";
import { v4 as uuidv4 } from "uuid";
import { Status, Todo } from "../../types/todo";

import dayjs from "dayjs";
import DatePicker from "react-datepicker";

type TodoFormProps = {
  todos: Todo[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  categories: string[];
};

const TodoForm: React.FC<TodoFormProps> = ({
  setTodosArray,
  setCategoriesArray,
  todos,
  categories,
}) => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, "day").toDate();
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [priority, setPriority] = useState("상");
  const [status, setStatus] = useState<Status>("대기중");

  const newCategories = new Set(categories.concat(category));
  const uniqueCategories = [...newCategories];
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      task,
      category,
      startDate,
      endDate,
      priority,
      status,
    };

    if (!task) {
      alert("할 일을 모두 입력해주세요.");
      return false;
    }
    await createTodoToServer(newTodo);

    setTodosArray([...todos, newTodo]);
    setCategoriesArray(uniqueCategories);
    setTask("");
    setCategory("");
  };

  return (
    <TodoFormWrapStyled>
      <FormGroup>
        <FormControl fullWidth>
          <TextField
            value={task}
            onChange={(e) => setTask(e.target.value)}
            // placeholder="내용을 입력해주세요."
            // sx={{ marginTop: "20px" }}
            required
            id="task"
            label="할 일"
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
            labelId="priority-label"
            id="priority"
            value={priority}
            label="우선순위"
            // sx={{ marginTop: "10px" }}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value={"상"}>상</MenuItem>
            <MenuItem value={"중"}>중</MenuItem>
            <MenuItem value={"하"}>하</MenuItem>
          </Select>
        </FormControl>

        {/* <Checkbox
        aria-label="완료"
        checked={status}
        onChange={(e) => setStatus(e.target.checked)}
      /> */}
        <DateWrapStyled>
          <StartDateWrapStyled>
            <FormHelperText>시작일</FormHelperText>
            <StartDateStyled>
              <CalendarTodayIcon />
              <DateStyled
                selected={startDate}
                locale={ko}
                maxDate={endDate}
                onChange={(date: Date) => {
                  setStartDate(date);
                }}
                dateFormat="yyyy-MM-dd"
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
                minDate={startDate}
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
          추가하기
        </Button>
      </FormGroup>
    </TodoFormWrapStyled>
  );
};

const TodoFormWrapStyled = styled(Box)`
  width: 80%;
  margin: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const StartDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const EndDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const DateWrapStyled = styled(Box)`
  display: flex;
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
  margin: 0 5px;
  background-color: #ededed;
`;

const DateStyled = styled(DatePicker)`
  padding: 15px 0px;
  margin-left: 10px;
  border: none;
  background-color: transparent;
`;

const CategoriesBox = styled(Box)`
  margin: 10px 0;
  display: flex;
`;
const CategoryButton = styled(Button)`
  margin-right: 5px;
  border-radius: 30px;
`;
export default TodoForm;
