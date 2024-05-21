type GetNoticePaginationReturn = {
  notices: Array<{
    date: Date;
    id: number;
    title: string;
    author: string;
    link: string;
    createdAt: Date;
    deletedAt: Date;
  }>;
  total: number;
  offset: number;
};

export type { GetNoticePaginationReturn };
