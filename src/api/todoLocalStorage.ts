import type TodoModel from "../models/todo";

const STORAGE_KEY = 'todos';

const getStoredTodos = (): TodoModel[] => {
  try {
    const todosJson = localStorage.getItem(STORAGE_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const setStoredTodos = (todos: TodoModel[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const addTodo = async (todo: TodoModel): Promise<TodoModel> => {
  return new Promise((resolve, reject) => {
    try {
      const todos = getStoredTodos();
      const todoWithId = {
        ...todo,
        id: todo.id || `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      todos.push(todoWithId);
      setStoredTodos(todos);
      resolve(todoWithId);
    } catch (error) {
      reject(new Error("Failed to add todo"));
    }
  });
};

export const removeTodo = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const todos = getStoredTodos();
      const filteredTodos = todos.filter(todo => todo.id !== id);
      setStoredTodos(filteredTodos);
      resolve();
    } catch (error) {
      reject(new Error("Failed to delete todo"));
    }
  });
};

export const editTodo = async (id: string, updateName: string, updateDescription: string): Promise<TodoModel> => {
  return new Promise((resolve, reject) => {
    try {
      const todos = getStoredTodos();
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        reject(new Error("Todo not found"));
        return;
      }
      const updatedTodo = {
        ...todos[todoIndex],
        name: updateName,
        description: updateDescription
      };
      todos[todoIndex] = updatedTodo;
      setStoredTodos(todos);
      resolve(updatedTodo);
    } catch (error) {
      reject(new Error("Failed to update todo"));
    }
  });
};

export const checkTodo = async (id: string, isDone: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const todos = getStoredTodos();
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        reject(new Error("Todo not found"));
        return;
      }
      todos[todoIndex] = {
        ...todos[todoIndex],
        isDone
      };
      setStoredTodos(todos);
      resolve();
    } catch (error) {
      reject(new Error("Failed to update todo status"));
    }
  });
};

export const getTodos = async (): Promise<TodoModel[]> => {
  return new Promise((resolve) => {
    const todos = getStoredTodos();
    resolve(todos);
  });
};