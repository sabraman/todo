import React, { useState, useRef, useContext, ReactEventHandler } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "./TodoForm.module.css";
import TaskFilters from "./TaskFilters";

const TodoForm = () => {
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputDescriptionRef = useRef<HTMLInputElement>(null);


	const todoCtx = useContext(TodoContext);
	const addTodo = todoCtx.addTodo;

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		const newTodo: TodoModel = {
			name: inputNameRef.current!.value,
			description: inputDescriptionRef.current!.value,
			isDone: false
		};

		if (newTodo.name.trim()===""){
			return;
		}
		addTodo(newTodo);

		inputNameRef.current!.value = "";
		inputDescriptionRef.current!.value = "";
	};
	return(
		<div className={classes.container}>
			<form onSubmit={submitHandler} onKeyPress={(e) => e.key === 'Enter' && submitHandler} className={classes.form}>
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
					<button className={classes.hide}></button>
			</form>
			<TaskFilters />
		</div>
	);
};

export default TodoForm;