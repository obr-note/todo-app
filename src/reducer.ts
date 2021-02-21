import { Reducer } from 'redux';
import { PostAction, PostActionType as Type } from './actions';

export type PostState = {
  id: string;
  imageUrl: string;
  createUser: string;
  favoritesCount: number;
  createdAt: number;
  updatedAt: number;
};

export type PostsState = {
  user: {
    mailAddress: string;
    nickname: string;
  };
  posts: PostState[];
  popularPosts: PostState[];
  favoritePosts: PostState[];
  myPosts: PostState[];
};

export const initialState: PostsState = {
  user: {
    mailAddress: '',
    nickname: '',
  },
  posts: [],
  popularPosts: [],
  favoritePosts: [],
  myPosts: [],
};

export const todoReducer: Reducer<PostsState, PostAction> = (
  state: PostsState = initialState,
  action: PostAction,
): PostsState => {
  switch (action.type) {
    case Type.USER_ADD:
      return {
        ...state,
        user: {
          mailAddress: action.mailAddress || '',
          nickname: action.nickname || '',
        },
      };

    case Type.POSTS_ADD:
      return {
        ...state,
        posts: [...state.posts, ...(action.posts || [])],
      };

    case Type.POSTS_REFRESH:
      return {
        ...state,
        posts: [...(action.posts || [])],
      };

    case Type.POPULAR_POSTS_ADD:
      return {
        ...state,
        posts: [...state.posts, ...(action.posts || [])],
      };

    case Type.POPULAR_POSTS_REFRESH:
      return {
        ...state,
        posts: [...(action.posts || [])],
      };

    case Type.FAVORITE_POSTS_ADD:
      return {
        ...state,
        posts: [...state.posts, ...(action.posts || [])],
      };

    case Type.FAVORITE_POSTS_REFRESH:
      return {
        ...state,
        posts: [...(action.posts || [])],
      };

    case Type.MY_POSTS_ADD:
      return {
        ...state,
        posts: [...state.posts, ...(action.posts || [])],
      };

    case Type.MY_POSTS_REFRESH:
      return {
        ...state,
        posts: [...(action.posts || [])],
      };

    default: {
      const _: never = action.type;

      return state;
    }
  }
};
