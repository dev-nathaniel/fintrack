export interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: 'Credit' | 'Debit';
}

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
    remark: 'Freelance Project',
    amount: 1000,
    currency: 'USD',
    type: 'Credit'
  },
  {
    id: '5',
    date: '2023-10-05',
    remark: 'Restaurant',
    amount: -75,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '6',
    date: '2023-10-06',
    remark: 'Gas Station',
    amount: -45,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '7',
    date: '2023-10-07',
    remark: 'Online Shopping',
    amount: -200,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '8',
    date: '2023-10-08',
    remark: 'Consulting Fee',
    amount: 2500,
    currency: 'USD',
    type: 'Credit'
  },
  {
    id: '9',
    date: '2023-10-09',
    remark: 'Movie Tickets',
    amount: -30,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '10',
    date: '2023-10-10',
    remark: 'Coffee Shop',
    amount: -12,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '11',
    date: '2023-10-11',
    remark: 'Book Purchase',
    amount: -25,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '12',
    date: '2023-10-12',
    remark: 'Investment Dividend',
    amount: 150,
    currency: 'USD',
    type: 'Credit'
  },
  {
    id: '13',
    date: '2023-10-13',
    remark: 'Pharmacy',
    amount: -35,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '14',
    date: '2023-10-14',
    remark: 'Haircut',
    amount: -40,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '15',
    date: '2023-10-15',
    remark: 'Side Gig',
    amount: 800,
    currency: 'USD',
    type: 'Credit'
  },
  {
    id: '16',
    date: '2023-10-16',
    remark: 'Electric Bill',
    amount: -120,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '17',
    date: '2023-10-17',
    remark: 'Internet Bill',
    amount: -80,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '18',
    date: '2023-10-18',
    remark: 'Gift Purchase',
    amount: -60,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '19',
    date: '2023-10-19',
    remark: 'Car Maintenance',
    amount: -300,
    currency: 'USD',
    type: 'Debit'
  },
  {
    id: '20',
    date: '2023-10-20',
    remark: 'Bonus',
    amount: 1500,
    currency: 'USD',
    type: 'Credit'
  }
];

export type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type';
export type SortOrder = 'asc' | 'desc';

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
