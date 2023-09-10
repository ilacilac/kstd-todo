// components/TodoForm.tsx

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  FormGroup,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { createTodoToServer } from "service/todos";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../types/todo";

import dayjs from "dayjs";

type TodoFormProps = {
  todos: Todo[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
};

const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodosArray }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("기타");
  const [startDate, setStartDate] = useState("2022-04-12");
  const [endDate, setEndDate] = useState("");
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

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <FormGroup>
      <TextField
        value={task}
        onChange={(e) => setTask(e.target.value)}
        // placeholder="내용을 입력해주세요."
        required
        id="task"
        label="할일"
      />
      <Select
        labelId="category"
        id="category"
        value={category}
        label="카테고리"
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value={"기타"}>기타</MenuItem>
        <MenuItem value={"회사"}>회사</MenuItem>
        <MenuItem value={"취미"}>취미</MenuItem>
      </Select>
      <FormHelperText>우선순위</FormHelperText>
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

      {/* <Checkbox
        aria-label="완료"
        checked={status}
        onChange={(e) => setStatus(e.target.checked)}
      /> */}

      <Button
        onClick={handleClick}
        type="submit"
        disabled={task ? false : true}
      >
        추가하기
      </Button>
    </FormGroup>
  );
};

export default TodoForm;
