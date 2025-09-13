//TodoContext

import React, { createContext, useContext, useState } from "react";
export type Todo = {
  title: string;
  status: "open" | "in progress";
  createdAt: Date;
  category: string;
};
type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (index: number) => void;
  clearTodo: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };
  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };
  const clearTodo = () => {
    setTodos([]);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, clearTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used inside TodoProvider");
  return context;
};
