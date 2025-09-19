import { create } from "zustand";

export type Todo = {
  title: string;
  status: "open" | "in progress";
  createdAt: Date;
  category: string;
};

type TodoStore = {
  todos: Todo[];
  search: string;
  categoryFilter: string;
  addTodo: (todo: Todo) => void;
  removeTodo: (index: number) => void;
  clearTodo: () => void;
  setSearch: (text: string) => void;
  setCategoryFilter: (category: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  search: "",
  categoryFilter: "All tickets",
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index) =>
    set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  clearTodo: () => set({ todos: [] }),
  setSearch: (text) => set({ search: text }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
}));
