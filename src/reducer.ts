import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PostState = {
  id: string;
  imageUrl: string;
  createUser: string;
  favoritesCount: number;
  createdAt: number;
  updatedAt: number;
};

export type AppState = {
  user: {
    mailAddress: string;
    nickname: string;
  };
  posts: PostState[];
  popularPosts: PostState[];
  favoritePosts: PostState[];
  myPosts: PostState[];
};

const initialState: AppState = {
  user: {
    mailAddress: '',
    nickname: '',
  },
  posts: [],
  popularPosts: [],
  favoritePosts: [],
  myPosts: [],
};

interface addUserType {
  mailAddress: string;
  nickname: string;
}

export const AppSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<addUserType>) => ({
      ...state,
      user: {
        mailAddress: action.payload.mailAddress,
        nickname: action.payload.nickname,
      },
    }),
    addPosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      posts: [...state.posts, ...action.payload],
    }),
    refreshPosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      posts: action.payload,
    }),
    addPopularPosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      popularPosts: [...state.popularPosts, ...action.payload],
    }),
    refreshPopularPosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      popularPosts: action.payload,
    }),
    addFavoritePosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      favoritePosts: [...state.favoritePosts, ...action.payload],
    }),
    refreshFavoritePosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      favoritePosts: action.payload,
    }),
    addMyPosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      myPosts: [...state.myPosts, ...action.payload],
    }),
    refreshMyPosts: (state, action: PayloadAction<PostState[]>) => ({
      ...state,
      myPosts: action.payload,
    }),
  },
});
