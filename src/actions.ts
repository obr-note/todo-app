import { createAction } from '@reduxjs/toolkit';

export type PostState = {
  id: string;
  imageUrl: string;
  createUser: string;
  favoritesCount: number;
  createdAt: number;
  updatedAt: number;
};

export const addUser = createAction(
  'USER_ADD',
  (mailAddress: string, nickname: string) => {
    return {
      payload: {
        mailAddress,
        nickname,
      },
    };
  },
);

export const addPosts = createAction<PostState[]>('POSTS_ADD');

export const refreshPosts = createAction<PostState[]>('POSTS_REFRESH');

export const addPopularPosts = createAction<PostState[]>('POPULAR_POSTS_ADD');

export const refreshPopularPosts = createAction<PostState[]>(
  'POPULAR_POSTS_REFRESH',
);

export const addFavoritePosts = createAction<PostState[]>('FAVORITE_POSTS_ADD');

export const refreshFavoritePosts = createAction<PostState[]>(
  'FAVORITE_POSTS_REFRESH',
);

export const addMyPosts = createAction<PostState[]>('MY_POSTS_ADD');

export const refreshMyPosts = createAction<PostState[]>('MY_POSTS_REFRESH');
