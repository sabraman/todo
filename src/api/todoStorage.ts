import type TodoModel from "../models/todo";

const STORAGE_KEY = 'todos';

const getStoredTodos = (): TodoModel[] => {
  const todosJson = localStorage.getItem(STORAGE_KEY);
  return todosJson ? JSON.parse(todosJson) : [];
};

const setStoredTodos = (todos: TodoModel[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const addTodo = async (todo: TodoModel) => {
  try {
    const todos = getStoredTodos();
    todos.push(todo);
    setStoredTodos(todos);
    return todo;
  } catch (e) {
    throw new Error("Failed to add todo");
  }
};

export const removeTodo = async (id: string) => {
  try {
    const todos = getStoredTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setStoredTodos(filteredTodos);
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
};

export const editTodo = async (id: string, updateName: string, updateDescription: string) => {
  try {
    const todos = getStoredTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = {
        ...todos[todoIndex],
        name: updateName,
        description: updateDescription
      };
      setStoredTodos(todos);
      return todos[todoIndex];
    }
    throw new Error("Todo not found");
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};

export const checkTodo = async (id: string, updateComplete: boolean) => {
  try {
    const todos = getStoredTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = {
        ...todos[todoIndex],
        isDone: updateComplete
      };
      setStoredTodos(todos);
    }
  } catch (error) {
    throw new Error("Failed to update todo status");
  }
};

export const getTodos = async () => {
  try {
    return getStoredTodos();
  } catch (error) {
    throw new Error("Failed to get todos");
  }
}; 