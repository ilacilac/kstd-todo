import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, FormControl, styled, TextField } from "@mui/material";

type CategoryTextFieldProps = {
  category: string;
  categories: string[];
  setCategory: Dispatch<SetStateAction<string>>;
};

const CategoryTextField: React.FC<CategoryTextFieldProps> = ({
  category,
  categories,
  setCategory,
}) => {
  return (
    <>
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
    </>
  );
};

const CategoriesBox = styled(Box)`
  margin: 10px 0;
  display: flex;
`;

const CategoryButton = styled(Button)`
  margin-right: 5px;
  border-radius: 30px;
`;

export default CategoryTextField;
