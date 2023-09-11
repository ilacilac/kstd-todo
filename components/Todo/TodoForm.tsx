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
import { Todo } from "../../types/todo";

import dayjs from "dayjs";
import DatePicker from "react-datepicker";

type TodoFormProps = {
  todos: Todo[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
};

const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodosArray }) => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, "day").toDate();
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("회사");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [priority, setPriority] = useState("상");
  const [isDone, setIsDone] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      task,
      category,
      startDate,
      endDate,
      priority,
      isDone,
    };

    if (!task) {
      alert("할 일을 모두 입력해주세요.");
      return false;
    }
    await createTodoToServer(newTodo).then(() => {
      setTodosArray([...todos, newTodo]);
      setTask("");
    });
  };

  useEffect(() => {
    console.log(startDate, endDate);
  }, []);
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
          <InputLabel id="category-label">카테고리</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            label="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"회사"}>회사</MenuItem>
            <MenuItem value={"공부"}>공부</MenuItem>
            <MenuItem value={"운동"}>운동</MenuItem>
            <MenuItem value={"취미"}>취미</MenuItem>
            <MenuItem value={"기타"}>기타</MenuItem>
          </Select>
        </FormControl>
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

export default TodoForm;
