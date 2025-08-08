import { Transaction, ValidationError, DataValidationResult, ErrorState } from "@/types";

// Data validation functions
export const validateTransaction = (transaction: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required fields validation
  if (!transaction.id || typeof transaction.id !== 'string') {
    errors.push({ field: 'id', message: 'Transaction ID is required and must be a string', value: transaction.id });
  }

  if (!transaction.date || typeof transaction.date !== 'string') {
    errors.push({ field: 'date', message: 'Date is required and must be a string', value: transaction.date });
  } else {
    // Date format validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(transaction.date)) {
      errors.push({ field: 'date', message: 'Date must be in YYYY-MM-DD format', value: transaction.date });
    } else {
      const date = new Date(transaction.date);
      if (isNaN(date.getTime())) {
        errors.push({ field: 'date', message: 'Invalid date value', value: transaction.date });
      }
    }
  }

  if (!transaction.remark || typeof transaction.remark !== 'string') {
    errors.push({ field: 'remark', message: 'Remark is required and must be a string', value: transaction.remark });
  }

  if (typeof transaction.amount !== 'number' || isNaN(transaction.amount)) {
    errors.push({ field: 'amount', message: 'Amount is required and must be a valid number', value: transaction.amount });
  }

  if (!transaction.currency || typeof transaction.currency !== 'string') {
    errors.push({ field: 'currency', message: 'Currency is required and must be a string', value: transaction.currency });
  }

  if (!transaction.type || !['Credit', 'Debit'].includes(transaction.type)) {
    errors.push({ field: 'type', message: 'Type must be either "Credit" or "Debit"', value: transaction.type });
  }

  return errors;
};

export const validateTransactions = (transactions: any[]): DataValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!Array.isArray(transactions)) {
    errors.push({ field: 'transactions', message: 'Transactions must be an array' });
    return { isValid: false, errors, warnings };
  }

  if (transactions.length === 0) {
    warnings.push({ field: 'transactions', message: 'No transactions found' });
  }

  transactions.forEach((transaction, index) => {
    const transactionErrors = validateTransaction(transaction);
    transactionErrors.forEach(error => {
      errors.push({ ...error, field: `transactions[${index}].${error.field}` });
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Error formatting functions
export const formatErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const createErrorState = (
  error: any, 
  retry?: () => void, 
  dismiss?: () => void
): ErrorState => {
  return {
    message: formatErrorMessage(error),
    type: 'error',
    retry,
    dismiss
  };
};

// Empty state handling
export const getEmptyStateMessage = (context: string, searchTerm?: string): string => {
  if (searchTerm) {
    return `No transactions found matching "${searchTerm}"`;
  }

  switch (context) {
    case 'transactions':
      return 'No transactions available';
    case 'search':
      return 'No search results found';
    case 'filtered':
      return 'No transactions match the current filters';
    default:
      return 'No data available';
  }
};

// Loading state messages
export const getLoadingMessage = (context: string): string => {
  switch (context) {
    case 'transactions':
      return 'Loading transactions...';
    case 'search':
      return 'Searching...';
    case 'pdf':
      return 'Generating PDF...';
    case 'sort':
      return 'Sorting data...';
    default:
      return 'Loading...';
  }
};

// Responsive error handling
export const getResponsiveErrorMessage = (error: string, isMobile: boolean): string => {
  if (isMobile && error.length > 100) {
    return error.substring(0, 100) + '...';
  }
  return error;
};

// Data sanitization
export const sanitizeTransaction = (transaction: any): Partial<Transaction> => {
  return {
    id: String(transaction.id || ''),
    date: String(transaction.date || ''),
    remark: String(transaction.remark || ''),
    amount: Number(transaction.amount) || 0,
    currency: String(transaction.currency || 'USD'),
    type: ['Credit', 'Debit'].includes(transaction.type) ? transaction.type : 'Debit'
  };
};

// Safe number formatting
export const safeFormatAmount = (amount: number): string => {
  try {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '$0.00';
    }
    
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return amount >= 0 ? `$${formatted}` : `-$${formatted}`;
  } catch (error) {
    console.error('Error formatting amount:', error);
    return '$0.00';
  }
};

// Safe date formatting
export const safeFormatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

// Retry mechanism
export const withRetry = async <T>(
  fn: () => Promise<T>, 
  maxRetries: number = 3, 
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};
