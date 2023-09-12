import React, { Dispatch, SetStateAction } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Status } from "types/todo";

type CategoryTextFieldProps = {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
};

const StatusSelect: React.FC<CategoryTextFieldProps> = ({
  status,
  setStatus,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <InputLabel id="status-label">현재상태</InputLabel>

        <Select
          labelId="status"
          id="status"
          value={status}
          label="현재상태"
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <MenuItem value={"대기중"}>대기중</MenuItem>
          <MenuItem value={"진행중"}>진행중</MenuItem>
          <MenuItem value={"완료"}>완료</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default StatusSelect;
