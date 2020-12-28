export const TodoActionType = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const;

type ValueOf<T> = T[keyof T];

export type TodoAction = {
  type: ValueOf<typeof TodoActionType>;
  id?: number;
  title?: string;
  body?: string;
  createdAt?: number;
  updatedAt?: number;
};

export const addItem = (title: string, body: string): TodoAction => ({
  type: TodoActionType.ADD,
  title,
  body,
});

export const updateItem = (
  id: number,
  title: string,
  body: string,
): TodoAction => ({
  type: TodoActionType.UPDATE,
  id,
  title,
  body,
});

export const deleteItem = (id: number): TodoAction => ({
  type: TodoActionType.DELETE,
  id,
});
