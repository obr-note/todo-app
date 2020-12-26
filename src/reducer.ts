import { Reducer } from 'redux';
import { TodoAction, TodoActionType as Type } from './actions';

export type TodoItemState = {
  id: number;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

export type TodoState = {
  content: TodoItemState[];
};

export const initialState: TodoState = {
  content: [],
};

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initialState,
  action: TodoAction,
): TodoState => {
  switch (action.type) {
    case Type.ADD:
      return {
        ...state,
        content: [
          ...state.content,
          {
            id: state.content.length + 1,
            title: action.title || '',
            body: action.body || '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      };
    case Type.EDIT:
      return {
        ...state,
        content: [
          ...state.content,
          {
            id: state.content.length + 1,
            title: action.title || '',
            body: action.body || '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      };
    case Type.DELETE:
      return {
        ...state,
        content: [...state.content.filter((item) => item.id !== action.id)],
      };
    default: {
      const _: never = action.type;

      return state;
    }
  }
};
