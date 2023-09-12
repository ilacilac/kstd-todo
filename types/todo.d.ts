export type Status = "대기중" | "진행중" | "완료";
export type Todo = {
  id: string;
  category: string;
  task: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: Status;
};
