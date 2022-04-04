import React, { useContext } from "react";
import classes from "./TaskFilters.module.css";
import { TodoContext } from "../store/store-todo";
import { filter } from "../models/todo";


const TaskFilters = () => {
	const todoCtx = useContext(TodoContext);
	const changeFilter = todoCtx.changeFilter;
	const filterOrder = todoCtx.filter;
	console.log(todoCtx);

	const changeFilterOrder = (filter: filter) => {
		changeFilter(filter);
	};
	const allActive = filterOrder === filter.all ? classes.active : "";
	const activeActive = filterOrder === filter.active ? classes.active : "";
	const completedActive = filterOrder === filter.completed ? classes.active : "";
	return (
		<ul className={classes["task-filters"]}>
			<li onClick={changeFilterOrder.bind(null, filter.all)}>
				<button className={`${allActive} ${classes.icon}`}><i className="fa-solid fa-grip-vertical"></i></button>
				<a
					className={`${allActive}`}
					href="#"
				>
					All
				</a>
			</li>
			<li onClick={changeFilterOrder.bind(null, filter.active)}>
				<button className={`${activeActive} ${classes.icon}`}><i className="fa-solid fa-clock"></i></button>
				<a
					className={`${activeActive}`}
					href="#"
				>
					Pending
				</a>
			</li>
			<li onClick={changeFilterOrder.bind(null, filter.completed)}>
				<button className={`${completedActive} ${classes.icon}`}><i className="fa-solid fa-check"></i></button>
				<a
					className={`${completedActive}`}
					href="#"
				>
					Completed
				</a>
			</li>
		</ul>
	);
};

export default TaskFilters;