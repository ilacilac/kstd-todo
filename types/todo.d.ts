export type Status = "대기중" | "진행중" | "완료";
export type Priority = "상" | "중" | "하";

export type Todo = {
  id: string;
  category: string;
  task: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
  status: Status;
};
export type NoIdTodo = {
  category: string;
  task: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
  status: Status;
};
