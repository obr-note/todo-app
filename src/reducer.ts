import { Reducer } from 'redux';
import { TodoAction, TodoActionType as Type } from './actions';

export type TodoState = {
  content: { id: number; text: string }[];
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
          { id: state.content.length + 1, text: action.text || '' },
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
