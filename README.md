# FinTrack - Financial Transaction Tracker

A modern, responsive financial tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Transaction Management**: View financial transactions
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
- **Comprehensive Error Boundaries**: React ErrorBoundary catches and handles component errors gracefully
- **Data Validation**: Robust validation of transaction data with detailed error reporting
- **Loading States**: Visual feedback during data processing, sorting, and PDF generation
- **Empty States**: Contextual empty state messages for different scenarios (no data, no search results, etc.)
- **Retry Mechanisms**: Automatic retry functionality for failed operations
- **Responsive Error Messages**: Error messages adapt to screen size for better mobile experience
- **Safe Data Formatting**: Protected formatting functions that handle invalid data gracefully
- **Graceful Degradation**: Application continues to work even if some features fail
- **User-friendly Messages**: Clear error messages with recovery options
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
- **TransactionTable**: Reusable table component with sorting functionality and comprehensive error handling
- **SearchModal**: Modal component for global search with real-time results and validation
- **Dashboard**: Main dashboard component with summary calculations and tab navigation
- **ErrorBoundary**: React error boundary for catching and handling component errors
- **ErrorDisplay**: Consistent error display component with retry functionality
- **LoadingSpinner**: Loading indicator with progress tracking
- **EmptyState**: Contextual empty state component for different scenarios
- **Header**: Application header with navigation and search functionality
- **Sidebar**: Navigation sidebar with responsive design
- **Main Page**: Orchestrates all functionality and state management

### Key Functions
- **sortTransactions**: Handles multi-field sorting with proper type handling and error validation
- **filterTransactions**: Performs text-based filtering across all fields with data validation
- **calculateSummary**: Computes real-time financial summaries with error handling
- **sharePDF**: Generates and downloads PDF reports with progress tracking
- **validateTransactions**: Comprehensive data validation for transaction integrity
- **safeFormatAmount**: Protected amount formatting that handles invalid numbers
- **safeFormatDate**: Protected date formatting that handles invalid dates
- **createErrorState**: Creates standardized error states with retry functionality
- **withRetry**: Retry mechanism for failed operations with exponential backoff

### State Management
- **Active Tab**: Tracks current view (overview/transactions)
- **Search State**: Manages search terms and filtered results
- **Sort State**: Maintains current sort field and direction
- **Error State**: Handles and displays error messages with retry functionality
- **Loading State**: Manages loading indicators and progress tracking
- **Validation State**: Tracks data validation results and warnings
- **Responsive State**: Manages responsive breakpoints and mobile detection

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

The application includes comprehensive error handling to ensure a smooth user experience:

### Error Types and Recovery
1. **Data Validation Errors**: Invalid transaction data is caught and reported with specific field information
2. **Network Errors**: Failed API calls or PDF generation include retry mechanisms
3. **Component Errors**: React ErrorBoundary catches and displays user-friendly error messages
4. **Loading Errors**: Progress tracking shows when operations are in progress

### Recovery Actions
1. **Try Again**: Click the "Try Again" button in error messages for automatic retry
2. **Dismiss**: Close error messages that don't require immediate action
3. **Refresh Page**: Reload the page to reset the application state
4. **Clear Search**: If search results are causing issues, clear the search
5. **Check Console**: Open browser developer tools to view detailed error logs




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
