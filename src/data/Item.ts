export type ItemState = {
  id: number;
  title: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

export const initailItemState: ItemState = {
  id: 0,
  title: '',
  body: '',
  createdAt: 0,
  updatedAt: 0,
};
