import { Reducer } from 'redux';
import { TodoAction, TodoActionType as Type } from './actions';

export type TodoItemState = {
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

export type TodoState = {
  idCounter: number;
  content: { [key: number]: TodoItemState };
};

export const initialState: TodoState = {
  idCounter: 0,
  content: {},
};

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initialState,
  action: TodoAction,
): TodoState => {
  switch (action.type) {
    case Type.ADD:
      return {
        ...state,
        idCounter: state.idCounter + 1,
        content: {
          ...state.content,
          [state.idCounter + 1]: {
            title: action.title || '',
            body: action.body || '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        },
      };
    case Type.UPDATE:
      if (typeof action.id === 'undefined') {
        return state;
      }

      return {
        ...state,
        content: {
          ...state.content,
          [action.id]: {
            title: action.title || '',
            body: action.body || '',
            createdAt: state.content[action.id].createdAt,
            updatedAt: Date.now(),
          },
        },
      };
    case Type.DELETE:
      if (typeof action.id === 'undefined') {
        return state;
      }
      // eslint-disable-next-line
      const newState = state;
      delete newState.content[action.id];

      return newState;
    default: {
      const _: never = action.type;

      return state;
    }
  }
};
