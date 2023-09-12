import React, { Dispatch, SetStateAction } from "react";
import { FormControl, TextField } from "@mui/material";

type TaskTextFieldProps = {
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
};

const TaskTextField: React.FC<TaskTextFieldProps> = ({ task, setTask }) => {
  return (
    <FormControl fullWidth>
      <TextField
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        id="task"
        label="할 일"
      />
    </FormControl>
  );
};

export default TaskTextField;
