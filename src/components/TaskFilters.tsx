import React, { useContext, useCallback, memo } from "react";
import classes from "./TaskFilters.module.css";
import { TodoContext } from "../store/store-todo";
import { filter } from "../models/todo";

const TaskFilters = () => {
	const todoCtx = useContext(TodoContext);
	const changeFilter = todoCtx.changeFilter;
	const filterOrder = todoCtx.filter;

	const changeFilterOrder = useCallback((filterValue: filter) => {
		changeFilter(filterValue);
	}, [changeFilter]);

	const allActive = filterOrder === filter.all ? classes.active : "";
	const activeActive = filterOrder === filter.active ? classes.active : "";
	const completedActive = filterOrder === filter.completed ? classes.active : "";

	return (
		<ul className={classes["task-filters"]}>
			<li key="all">
				<button 
					type="button" 
					onClick={() => changeFilterOrder(filter.all)}
					className={`${allActive} ${classes.icon}`}
					aria-label="All tasks"
				>
					<i className="fa-solid fa-grip-vertical" />
					<span>All</span>
				</button>
			</li>
			<li key="active">
				<button 
					type="button"
					onClick={() => changeFilterOrder(filter.active)}
					className={`${activeActive} ${classes.icon}`}
					aria-label="Active tasks"
				>
					<i className="fa-solid fa-spinner" />
					<span>Active</span>
				</button>
			</li>
			<li key="completed">
				<button 
					type="button"
					onClick={() => changeFilterOrder(filter.completed)}
					className={`${completedActive} ${classes.icon}`}
					aria-label="Completed tasks"
				>
					<i className="fa-solid fa-check" />
					<span>Completed</span>
				</button>
			</li>
		</ul>
	);
};

export default memo(TaskFilters);