import { create } from "zustand"; // <- імпорт через {} для TypeScript

export type Todo = {
  title: string;
  status: "open" | "in progress";
  createdAt: Date;
  category: string;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (index: number) => void;
  clearTodo: () => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo: Todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index: number) =>
    set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  clearTodo: () => set({ todos: [] }),
}));
