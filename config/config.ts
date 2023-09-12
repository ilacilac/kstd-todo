import { Priority, Status } from "types/todo";

type Config = {
  status: Status[];
  priority: Priority[];
};

const config: Config = {
  status: ["대기중", "진행중", "완료"],
  priority: ["상", "중", "하"],
};

export default config;
