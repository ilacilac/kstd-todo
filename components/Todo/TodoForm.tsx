import React, { Dispatch, SetStateAction, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
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
import Select from "@mui/material/Select";

import { NoIdTodo, Status, Todo } from "../../types/todo";

type TodoFormProps = {
  categories: string[];
  addTodo: (e: React.MouseEvent, todo: NoIdTodo) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ categories, addTodo }) => {
  const today = dayjs().toDate();
  const tomorrow = dayjs().add(1, "day").toDate();
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [priority, setPriority] = useState("상");
  const [status, setStatus] = useState<Status>("대기중");

  return (
    <TodoFormWrapStyled>
      <FormGroup>
        <FormControl fullWidth>
          <TextField
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            id="task"
            label="할 일"
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <TextField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value={"상"}>상</MenuItem>
            <MenuItem value={"중"}>중</MenuItem>
            <MenuItem value={"하"}>하</MenuItem>
          </Select>
        </FormControl>

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
                dateFormat="yyyy-MM-dd"
              />
            </EndDateStyled>
          </EndDateWrapStyled>
        </DateWrapStyled>
        <Button
          onClick={(e) => {
            addTodo(e, {
              task,
              category,
              startDate,
              endDate,
              priority,
              status,
            });
            setTask("");
            setCategory("");
          }}
          type="submit"
          variant="contained"
          disabled={task && category ? false : true}
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
