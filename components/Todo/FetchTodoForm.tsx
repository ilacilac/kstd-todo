import React, { Dispatch, SetStateAction, useState } from "react";
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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import Select from "@mui/material/Select";

import { Priority, Status, Todo } from "../../types/todo";
import TaskTextField from "components/Common/TaskTextField";
import CategoryTextField from "components/Common/CategoryTextField";
import PrioritySelect from "components/Common/PrioritySelect";
import StatusSelect from "components/Common/StatusSelect";
import DateField from "components/Common/DateField";

type TodoFormProps = {
  todo: Todo;
  todos: Todo[];
  handleClose: () => void;

  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  categories: string[];
  updateTodo: (e: React.MouseEvent, todo: Todo) => void;
};

const FetchTodoForm: React.FC<TodoFormProps> = ({
  todo,
  updateTodo,
  handleClose,
  categories,
}) => {
  const [task, setTask] = useState(todo.task);
  const [category, setCategory] = useState(todo.category);
  const [startDate, setStartDate] = useState(new Date(todo.startDate));
  const [endDate, setEndDate] = useState(new Date(todo.endDate));
  const [priority, setPriority] = useState(todo.priority);
  const [status, setStatus] = useState(todo.status);

  return (
    <FormGroup>
      <TaskTextField task={task} setTask={setTask} />
      <CategoryTextField
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <PrioritySelect priority={priority} setPriority={setPriority} />
      <StatusSelect status={status} setStatus={setStatus} />

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
          updateTodo(e, {
            id: todo.id,
            task,
            category,
            startDate,
            endDate,
            priority,
            status,
          });
          handleClose();
        }}
        type="submit"
        variant="contained"
        disabled={task && category ? false : true}
        sx={{ marginTop: "10px", padding: "10px 0" }}
      >
        수정하기
      </Button>
    </FormGroup>
  );
};

const DateWrapStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StartDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: start;
  margin-right: 5px;
`;
const EndDateWrapStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: start;
`;

export default FetchTodoForm;
