import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, FormControl, styled, TextField } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";

type CategoryTextFieldProps = {
  selected: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  maxDate?: Date;
  minDate?: Date;
};

const DateField: React.FC<CategoryTextFieldProps> = ({
  selected,
  setDate,
  maxDate,
  minDate,
}) => {
  return (
    <DateWrapStyled>
      <CalendarTodayIcon />
      <DateStyled
        selected={selected}
        onChange={(date: Date) => {
          setDate(date);
        }}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={"yyyy-MM-dd"}
      />
    </DateWrapStyled>
  );
};

const DateWrapStyled = styled(Box)`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  padding: 0px 15px;
  background-color: #ededed;
`;

const DateStyled = styled(DatePicker)`
  padding: 15px 0px;
  margin-left: 10px;
  border: none;
  background-color: transparent;
`;
export default DateField;
