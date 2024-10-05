export interface PaginationProps {
  children: React.ReactNode[] | React.ReactNode;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  splitData: number;
  title: string;
  page: string;
  className?: string;
  isBold?: boolean;
}
