export type Message = {
  operator?: string;
  status?: string;
  description?: string;
  createdDate: number;
  successNumbers?: string[];
  failedNumbers?: string[];
  toNumbersCount?: number;
  body?: string;
};
