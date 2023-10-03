// T -> 'name' | 'distance'
export type Column<T> = {
  name: T;
  label: string;
};

export enum SortBy {
  Desc = 'desc',
  Asc = 'asc',
}
