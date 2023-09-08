import React from "react";
import { Todo } from "../../types/todo";

type TodoListItemProps = {
  todo: Todo;
  deleteTodo: (id: string) => void;
};

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, deleteTodo }) => {
  return (
    <li>
      {/* TodoItem 컴포넌트에 각 todo를 넘겨줌 */}
      {todo.task}
      <button onClick={() => deleteTodo(todo.id)}>삭제 </button>
    </li>
  );
};

export default TodoListItem;
