import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import { styled } from "@mui/system";
import { Todo } from "../../types/todo";
import TodoListItem from "./TodoListItem";
import { getTodosFromServer } from "service/todos";
import { useQuery } from "react-query";

type TodoListProps = {
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
  setCategoriesArray: Dispatch<SetStateAction<string[]>>;
  deleteTodo: (id: string) => void;
  categories: string[];
  updateTodo: (e: React.MouseEvent, todo: Todo) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  deleteTodo,
  categories,
  setCategoriesArray,
  updateTodo,
}) => {
  const { category } = useRouter().query;
  const { isLoading, data } = useQuery("todos", getTodosFromServer);
  const [todosArray, setTodosArray] = useState<Todo[]>(data);
  return (
    <TodoListWrapStyled>
      <Box sx={{ margin: 0, padding: 0 }}>
        {!category && (
          <List sx={{ margin: 0, padding: 0 }}>
            {todosArray.map((todo, index) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                todos={todosArray}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                categories={categories}
                setCategoriesArray={setCategoriesArray}
              />
            ))}
          </List>
        )}
        {category && (
          <List sx={{ margin: 0, padding: 0 }}>
            {todosArray &&
              todosArray.map((todo, index) =>
                todo.category === category ? (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    todos={todosArray}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    setCategoriesArray={setCategoriesArray}
                    categories={categories}
                  />
                ) : (
                  ""
                )
              )}
            {!todosArray && <NoTaskBox>등록된 항목이 없습니다.</NoTaskBox>}
            {!todosArray.map((todo, index) => todo.category === category)
              .length && <NoTaskBox>등록된 항목이 없습니다.</NoTaskBox>}
          </List>
        )}
      </Box>
    </TodoListWrapStyled>
  );
};

const TodoListWrapStyled = styled(Box)`
  width: 80%;

  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const NoTaskBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
`;

export default TodoList;
