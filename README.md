# FinTrack - Financial Transaction Tracker

A modern, responsive financial tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Transaction Management**: View and manage financial transactions with detailed information
- **Real-time Summary**: Dynamic calculation of total balance, income, expenses, and transaction count
- **PDF Export**: Generate and download transaction ledgers as PDF files
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔍 Search & Filter
- **Global Search**: Search across all transaction fields (date, remark, amount, currency, type)
- **Smart Search Modal**: Real-time search results with preview
- **Auto-navigation**: Automatically switches to Transactions tab when searching
- **Clear Search**: Easy way to clear search filters and return to full view

### 📊 Data Visualization
- **Sortable Tables**: Click any column header to sort by date, remark, amount, currency, or type
- **Bidirectional Sorting**: Toggle between ascending and descending order
- **Visual Indicators**: Clear sort direction indicators with chevron icons
- **Color-coded Amounts**: Green for credits, red for debits

### 📱 User Interface
- **Tab Navigation**: Switch between Overview and Transactions views
- **Sidebar Navigation**: Collapsible sidebar for mobile and desktop
- **Modern UI**: Clean, professional design with hover effects and transitions
- **Error Handling**: Comprehensive error handling with user-friendly messages

### 🛡️ Error Handling
- **Graceful Degradation**: Application continues to work even if some features fail
- **User-friendly Messages**: Clear error messages with recovery options
- **Try Again Functionality**: Easy retry mechanisms for failed operations
- **Console Logging**: Detailed error logging for debugging

## Data Structure

### Transaction Interface
```typescript
interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: 'Credit' | 'Debit';
}
```

### Sample Data
The application includes 20 sample transactions covering various financial activities:
- Salary and freelance income
- Daily expenses (groceries, restaurants, gas)
- Bills and subscriptions
- Entertainment and personal care
- Investment returns

## Technical Implementation

### Components
- **TransactionTable**: Reusable table component with sorting functionality
- **SearchModal**: Modal component for global search with real-time results
- **Main Page**: Orchestrates all functionality and state management

### Key Functions
- **sortTransactions**: Handles multi-field sorting with proper type handling
- **filterTransactions**: Performs text-based filtering across all fields
- **calculateSummary**: Computes real-time financial summaries
- **sharePDF**: Generates and downloads PDF reports

### State Management
- **Active Tab**: Tracks current view (overview/transactions)
- **Search State**: Manages search terms and filtered results
- **Sort State**: Maintains current sort field and direction
- **Error State**: Handles and displays error messages

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Usage

### Viewing Transactions
- **Overview Tab**: Shows summary cards and first 4 transactions
- **Transactions Tab**: Displays all transactions with full sorting capabilities

### Searching
1. Click the search icon in the header
2. Type your search term
3. View real-time results
4. Click "View all results" to switch to Transactions tab

### Sorting
1. Click any column header in the table
2. Click again to reverse sort order
3. Visual indicators show current sort direction

### Exporting
1. Click the "Share" button in the header
2. PDF will be generated and downloaded automatically

## Error Recovery

If you encounter errors:
1. **Try Again**: Click the "Try again" button in error messages
2. **Clear Search**: Use "Clear search" to reset filters
3. **Refresh**: Reload the page if persistent issues occur
4. **Check Console**: Developer tools show detailed error information

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Dependencies

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **html2pdf.js**: PDF generation
- **clsx & tailwind-merge**: Utility functions

## Future Enhancements

- [ ] Add new transaction functionality
- [ ] Implement data persistence
- [ ] Add charts and graphs
- [ ] Multi-currency support
- [ ] Export to other formats (CSV, Excel)
- [ ] User authentication
- [ ] Cloud synchronization
