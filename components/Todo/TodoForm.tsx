// components/TodoForm.tsx

import React, { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/types/todo";
type TodoFormProps = {
  todos: Todo[];
  setTodosArray: Dispatch<SetStateAction<Todo[]>>;
};

const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodosArray }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("회사");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("중");
  const [status, setStatus] = useState("대기");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      task,
      category,
      startDate,
      endDate,
      priority,
      status,
    };

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (res.ok) {
      // Refresh the current page to see the new todo
      setTodosArray([...todos, newTodo]);
      // window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="할 일"
        required
      />
      {/* ... Add more input fields for other attributes like category, startDate, etc. */}
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
