export const PostActionType = {
  USER_ADD: 'USER_ADD',
  POSTS_ADD: 'POSTS_ADD',
  POSTS_REFRESH: 'POSTS_REFRESH',
  POPULAR_POSTS_ADD: 'POPULAR_POSTS_ADD',
  POPULAR_POSTS_REFRESH: 'POPULAR_POSTS_REFRESH',
  FAVORITE_POSTS_ADD: 'FAVORITE_POSTS_ADD',
  FAVORITE_POSTS_REFRESH: 'FAVORITE_POSTS_REFRESH',
  MY_POSTS_ADD: 'MY_POSTS_ADD',
  MY_POSTS_REFRESH: 'MY_POSTS_REFRESH',
} as const;

type ValueOf<T> = T[keyof T];

export type PostState = {
  id: string;
  imageUrl: string;
  createUser: string;
  favoritesCount: number;
  createdAt: number;
  updatedAt: number;
};

export type PostAction = {
  type: ValueOf<typeof PostActionType>;
  mailAddress?: string;
  nickname?: string;
  posts?: PostState[];
};

export const addUser = (mailAddress: string, nickname: string): PostAction => ({
  type: PostActionType.USER_ADD,
  mailAddress,
  nickname,
});

export const addPosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.POSTS_ADD,
  posts,
});

export const refreshPosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.POSTS_REFRESH,
  posts,
});

export const addPopularPosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.POPULAR_POSTS_ADD,
  posts,
});

export const refreshPopularPosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.POPULAR_POSTS_REFRESH,
  posts,
});

export const addFavoritePosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.FAVORITE_POSTS_ADD,
  posts,
});

export const refreshFavoritePosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.FAVORITE_POSTS_REFRESH,
  posts,
});

export const addMyPosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.MY_POSTS_ADD,
  posts,
});

export const refreshMyPosts = (posts: PostState[]): PostAction => ({
  type: PostActionType.MY_POSTS_REFRESH,
  posts,
});
