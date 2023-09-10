// components/FetchTodoForm.tsx

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Checkbox,
  FilledTextFieldProps,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  MenuItem,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { createTodoToServer, updateTodosToServer } from "service/todos";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../types/todo";

type TodoFormProps = {
  todo: Todo;
  todos: Todo[];
  handleClose: () => void;
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
};

const FetchTodoForm: React.FC<TodoFormProps> = ({
  todo,
  todos,
  setTodosArray,
  handleClose,
}) => {
  const [task, setTask] = useState(todo.task);
  const [category, setCategory] = useState(todo.category);
  const [startDate, setStartDate] = useState(todo.startDate);
  const [endDate, setEndDate] = useState(todo.endDate);
  const [priority, setPriority] = useState(todo.priority);
  const [isDone, setIsDone] = useState(todo.isDone);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    // 1. todos를 전역 state에 저장 -> re render
    // 2. 변경된 todos를 파일에 저장
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
            isDone,
          }
        : _todo
    );
    updateTodosToServer(newTodos);
    setTodosArray(newTodos);
    handleClose();
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
        수정하기
      </Button>
    </FormGroup>
  );
};

export default FetchTodoForm;
