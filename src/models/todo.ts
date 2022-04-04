interface TodoModel {
  name: string;
	description: string;
  id?: string;
  isDone: boolean;
}

export enum filter {
  all = "all",
  active = "active",
  completed = "completed",
}

export default TodoModel;
