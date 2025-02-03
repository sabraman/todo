import type React from "react";
import { useRef, useContext, useCallback } from "react";
import type TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoForm.module.css";
import TaskFilters from "./TaskFilters";

const TodoForm = () => {
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputDescriptionRef = useRef<HTMLInputElement>(null);

	const todoCtx = useContext(TodoContext);
	const addTodo = todoCtx.addTodo;

	const submitHandler = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		try {
			const name = inputNameRef.current?.value ?? '';
			const description = inputDescriptionRef.current?.value ?? '';

			if (name.trim() === "") {
				return;
			}

			const newTodo: TodoModel = {
				id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				name,
				description,
				isDone: false
			};

			addTodo(newTodo);

			if (inputNameRef.current) inputNameRef.current.value = "";
			if (inputDescriptionRef.current) inputDescriptionRef.current.value = "";
		} catch (error) {
			console.error('Error submitting todo:', error);
		}
	}, [addTodo]);

	return(
		<div className={classes.container}>
			<form onSubmit={submitHandler} className={classes.form}>
				<input 
					id="todoText" 
					type="text" 
					className={classes.form_input}
					maxLength={72}
					placeholder="type todo.."
					ref={inputNameRef} />
				<input 
					id="todoDescription" 
					type="text" 
					className={classes.form_input}
					maxLength={72}
					placeholder="type description.."
					ref={inputDescriptionRef} />
				<button type="submit" className={classes.hide} />
			</form>
			<TaskFilters />
		</div>
	);
};

export default TodoForm;