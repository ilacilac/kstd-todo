import React, { Dispatch, SetStateAction } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type CategoryTextFieldProps = {
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
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
        onChange={(e) => setPriority(e.target.value)}
      >
        <MenuItem value={"상"}>상</MenuItem>
        <MenuItem value={"중"}>중</MenuItem>
        <MenuItem value={"하"}>하</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PrioritySelect;
