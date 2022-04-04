import React, { useContext, useState } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoDetails.module.css";

interface TodoDetailsProps {
	todo: TodoModel;
}

const TodoDetails = ({ todo }: TodoDetailsProps) => {
	const [todoName, setTodoName] = useState<string>(todo.name);
	const [todoDescription, setTodoDescription] = useState<string>(todo.description);
	const [editing, setEditing] = useState<boolean>(false);

	const todoCtx = useContext(TodoContext);
	const removeTodo = todoCtx.removeTodo;
	const checkTodo = todoCtx.checkTodo;
	const updateTodo = todoCtx.updateTodo;

	const removeTodoHandler = () => {
		removeTodo(todo.id!);
	};

	const checkTodoHandler = () => {
		checkTodo(todo.id!)
	}

	const saveEditTodoHandler = () => {
		updateTodo(todo.id!, todoName,  todoDescription);
		setEditing(false);
	};

	const onEnterPressHandler = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			saveEditTodoHandler();
			setEditing(false);
			return;
		}
	};
	const todo_iconCompleted = todo.isDone ? "fa-square-check" : "fa-square";
	const todo_completed = todo.isDone ? classes["todo-item_completed"] : "";
	const todo_editing = editing ? classes["todo-item_editing"] : "";
	const hide = editing ? classes.hide : "";
	const hideDescription = todo.isDone ? classes.hide : "";

	return (
		<div className={`${classes.todo_item} ${todo_completed} ${todo_editing}`}>
			<div className={classes.cell}>
				<button
					className={`${classes.icon} ${classes.checkIcon} ${hide}`}
					onClick={checkTodoHandler.bind(null, todo.id)}
				>
					<i className={`fa-solid ${todo_iconCompleted}`}></i>
					{/* <i className="far fa-check-circle"></i> */}
				</button>
			</div>
			<div className={classes.cell}>
				{!editing && <div className={classes.name}>{todoName}</div>}
				{editing && (
					<input
						onKeyPress={onEnterPressHandler}
						className={classes.input}
						type="text"
						value={todoName}
						onChange={(e) => setTodoName(e.target.value)}
					></input>
				)}
				{!editing && <div className={`${classes.description} ${hideDescription}`}>{todoDescription}</div>}
				{editing && (
					<input
						onKeyPress={onEnterPressHandler}
						className={classes.input}
						type="text"
						value={todoDescription}
						onChange={(e) => setTodoDescription(e.target.value)}
					></input>
				)}
			</div>
			<div className={classes.cell}>
				<button
					className={`${classes.icon} ${hide}`}
					onClick={() => setEditing(true)}
				>
					<i className="fa-solid fa-square-pen"></i>
					{/* <i className="fas fa-edit"></i> */}
				</button>
				<button
					className={`${classes.icon} ${hide}`}
					onClick={removeTodoHandler.bind(null, todo.id)}
				>
					<i className="fa-solid fa-square-minus"></i>
					{/* <i className="fas fa-eraser"></i> */}
				</button>
				<button
					className={`${classes.icon} ${!editing ? classes.hide : ""}`}
					onClick={saveEditTodoHandler}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	);
};

export default TodoDetails;