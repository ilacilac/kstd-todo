import React, { Dispatch, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Priority } from "types/todo";
import config from "config/config";

type CategoryTextFieldProps = {
  priority: Priority;
  setPriority: Dispatch<SetStateAction<Priority>>;
};

const PrioritySelect: React.FC<CategoryTextFieldProps> = ({
  priority,
  setPriority,
}) => {
  return (
    <FormControl fullWidth sx={{ marginTop: "10px" }}>
      <InputLabel id="priority-label">우선순위</InputLabel>
      <Select
        labelId="priority-label"
        id="priority"
        value={priority}
        label="우선순위"
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        {config.priority.map((priority) => (
          <MenuItem value={priority} key={priority}>
            {priority}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PrioritySelect;
