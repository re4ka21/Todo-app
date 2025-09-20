import { create } from "zustand";

export type Todo = {
  id: string;
  title: string;
  status: "open" | "in progress";
  createdAt: Date;
  category: string;
};

type TodoStore = {
  todos: Todo[];
  search: string;
  categoryFilter: string;
  addTodo: (todo: Omit<Todo, "id">) => void; // id генерується автоматично
  removeTodo: (id: string) => void;
  clearTodo: () => void;
  setSearch: (text: string) => void;
  setCategoryFilter: (category: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  search: "",
  categoryFilter: "All tickets",
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: `REQ-${state.todos.length + 1}-${Date.now()}`, // унікальний id
        },
      ],
    })),

  removeTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearTodo: () => set({ todos: [] }),

  setSearch: (text) => set({ search: text }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
}));
