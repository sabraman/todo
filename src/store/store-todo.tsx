import type React from "react";
import { useState, createContext, useCallback } from "react";
import TodoList from "../components/TodoList";
import {
  getTodos,
  addTodo as addTodoToStorage,
  removeTodo as removeTodoFromStorage,
  editTodo as editTodoInStorage,
  checkTodo as checkTodoInStorage,
} from "../api/todoLocalStorage";

import type TodoModel from "../models/todo";
import { filter } from "../models/todo";

interface TodoContextInterface {
  todoList: TodoModel[];
  filter: filter;
  changeFilter: (filterOrder: filter) => void;
  getTodo: () => Promise<void>;
  addTodo: (todo: TodoModel) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  checkTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, nameInput: string, descriptionInput: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextInterface>({
  todoList: [],
  filter: filter.all,
  changeFilter: (filterOrder: filter) => {},
  getTodo: async () => {},
  addTodo: async (todo: TodoModel) => {},
  removeTodo: async (id: string) => {},
  checkTodo: async (id: string) => {},
  updateTodo: async (id: string, nameInput: string, descriptionInput: string) => {},
});

const TodoContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filterOrder, setFilterOrder] = useState<filter>(filter.all);
  const [isLoading, setIsLoading] = useState(false);

  const changeFilterHandler = useCallback((filterOrder: filter) => {
    setFilterOrder(filterOrder);
  }, []);

  const getTodoHandler = useCallback(async () => {
    try {
      const loadedTodos = await getTodos();
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  }, []);

  const addTodoHandler = useCallback(async (todo: TodoModel) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const savedTodo = await addTodoToStorage(todo);
      setTodos(prevTodos => [...prevTodos, savedTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const removeTodoHandler = useCallback(async (id: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await removeTodoFromStorage(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to remove todo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const checkTodoHandler = useCallback(async (id: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const targetTodo = todos.find(todo => todo.id === id);
      if (!targetTodo) return;
      
      await checkTodoInStorage(id, !targetTodo.isDone);
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    } catch (error) {
      console.error('Failed to check todo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [todos, isLoading]);

  const updatingTodoHandler = useCallback(async (id: string, nameInput: string, descriptionInput: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await editTodoInStorage(id, nameInput, descriptionInput);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, name: nameInput, description: descriptionInput } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const todoContextValue: TodoContextInterface = {
    todoList: todos,
    filter: filterOrder,
    changeFilter: changeFilterHandler,
    getTodo: getTodoHandler,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    checkTodo: checkTodoHandler,
    updateTodo: updatingTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
