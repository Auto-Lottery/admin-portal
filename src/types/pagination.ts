export type PaginationOption = {
  page: number;
  pageSize: number;
  total: number;
  filtersData: Record<string, string | number>;
};
