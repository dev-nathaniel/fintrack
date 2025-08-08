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
  return [...transactions].sort((a, b) => {
    let aValue: any = a[field];
    let bValue: any = b[field];

    // Handle amount field specially (numeric sorting)
    if (field === 'amount') {
      aValue = Math.abs(aValue);
      bValue = Math.abs(bValue);
    }

    // Handle date field
    if (field === 'date') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
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
};

export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string
): Transaction[] => {
  if (!searchTerm.trim()) return transactions;
  
  const term = searchTerm.toLowerCase();
  return transactions.filter(transaction =>
    transaction.remark.toLowerCase().includes(term) ||
    transaction.currency.toLowerCase().includes(term) ||
    transaction.type.toLowerCase().includes(term) ||
    transaction.date.includes(term) ||
    transaction.amount.toString().includes(term)
  );
};
