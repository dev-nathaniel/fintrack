import { Transaction, SortField, SortOrder } from "@/types";

export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2023-10-01',
    remark: 'Salary',
    amount: 3000,
    currency: 'USD',
    type: 'Credit'
  },
  {
    id: '2',
    date: '2023-10-02',
    remark: 'Groceries',
    amount: -150,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '3',
    date: '2023-10-03',
    remark: 'Gym Membership',
    amount: -50,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '4',
    date: '2023-10-04',
    remark: 'Dinner',
    amount: -40,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '5',
    date: '2023-10-05',
    remark: 'Movie Tickets',
    amount: -30,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '6',
    date: '2023-10-06',
    remark: 'Rent',
    amount: -1200,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '7',
    date: '2023-10-07',
    remark: 'Utilities',
    amount: -100,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '8',
    date: '2023-10-08',
    remark: 'Car Payment',
    amount: -400,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '9',
    date: '2023-10-09',
    remark: 'Insurance',
    amount: -200,
    currency: 'USD',
    type: 'Debit'
  }
];

export const sortTransactions = (
  transactions: Transaction[],
  field: SortField,
  order: SortOrder
): Transaction[] => {
  try {
    if (!Array.isArray(transactions)) {
      throw new Error('Transactions must be an array');
    }

    return [...transactions].sort((a, b) => {
      let aValue: any = a[field];
      let bValue: any = b[field];

      // Handle null/undefined values
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';

      // Handle amount field specially (numeric sorting)
      if (field === 'amount') {
        aValue = Math.abs(Number(aValue) || 0);
        bValue = Math.abs(Number(bValue) || 0);
      }

      // Handle date field
      if (field === 'date') {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          throw new Error('Invalid date format in transactions');
        }
        
        aValue = dateA.getTime();
        bValue = dateB.getTime();
      }

      // Handle string fields
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  } catch (error) {
    console.error('Error sorting transactions:', error);
    throw new Error(`Failed to sort transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string
): Transaction[] => {
  try {
    if (!Array.isArray(transactions)) {
      throw new Error('Transactions must be an array');
    }

    if (!searchTerm.trim()) return transactions;
    
    const term = searchTerm.toLowerCase();
    return transactions.filter(transaction => {
      try {
        return (
          (transaction.remark || '').toLowerCase().includes(term) ||
          (transaction.currency || '').toLowerCase().includes(term) ||
          (transaction.type || '').toLowerCase().includes(term) ||
          (transaction.date || '').includes(term) ||
          (transaction.amount?.toString() || '').includes(term)
        );
      } catch (error) {
        console.warn('Error filtering transaction:', transaction, error);
        return false;
      }
    });
  } catch (error) {
    console.error('Error filtering transactions:', error);
    throw new Error(`Failed to filter transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
