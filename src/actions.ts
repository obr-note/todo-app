export const TodoActionType = {
  ADD: 'ADD',
  DELETE: 'DELETE',
} as const;

type ValueOf<T> = T[keyof T];

export type TodoAction = {
  type: ValueOf<typeof TodoActionType>;
  id?: number;
  text?: string;
};

export const addItem = (text: string): TodoAction => ({
  type: TodoActionType.ADD,
  text,
});

export const deleteItem = (id: number): TodoAction => ({
  type: TodoActionType.DELETE,
  id,
});
