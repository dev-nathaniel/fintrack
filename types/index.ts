export interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: 'Credit' | 'Debit';
}

export type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type';
export type SortOrder = 'asc' | 'desc';

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

export interface SearchState {
  searchTerm: string;
  isSearching: boolean;
}

export interface TableState {
  sortField: SortField;
  sortOrder: SortOrder;
  error: string | null;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  isActive?: boolean;
}

export interface DropdownOption {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
}
