import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";

import { Box, Button, FormGroup, FormHelperText, styled } from "@mui/material";

import { NoIdTodo, Priority, Status, Todo } from "../../types/todo";
import TaskTextField from "components/Common/TaskTextField";
import CategoryTextField from "components/Common/CategoryTextField";
import PrioritySelect from "components/Common/PrioritySelect";
import DateField from "components/Common/DateField";

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
  const [priority, setPriority] = useState<Priority>("상");
  const [status, setStatus] = useState<Status>("대기중");

  return (
    <TodoFormWrapStyled>
      <FormGroup>
        <TaskTextField task={task} setTask={setTask} />
        <CategoryTextField
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
        <PrioritySelect priority={priority} setPriority={setPriority} />

        <DateWrapStyled>
          <StartDateWrapStyled>
            <FormHelperText>시작일</FormHelperText>
            <DateField
              selected={startDate}
              maxDate={endDate}
              setDate={setStartDate}
            />
          </StartDateWrapStyled>
          <EndDateWrapStyled>
            <FormHelperText sx={{ marginLeft: "5px" }}>종료일</FormHelperText>
            <DateField
              selected={endDate}
              minDate={startDate}
              setDate={setEndDate}
            />
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
  align-items: start;
  margin-right: 5px;
`;
const EndDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const DateWrapStyled = styled(Box)`
  display: flex;
`;

export default TodoForm;
