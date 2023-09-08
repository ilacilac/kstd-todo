import { Todo } from "../../types/todo";
import TodoListItem from "./TodoListItem";

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
