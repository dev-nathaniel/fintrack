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

export interface DashboardSummary {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
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

// Error Handling Types
export interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
  code?: string;
  retry?: () => void;
  dismiss?: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface DataValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// Responsive breakpoint types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveConfig {
  breakpoint: Breakpoint;
  minWidth: number;
  maxWidth?: number;
}
