"use client"
import { Transaction, SortField, SortOrder, PaginationState } from "@/types";
import { sortTransactions } from "@/data/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
  showAllData?: boolean;
  showPagination?: boolean;
  itemsPerPageOptions?: number[];
  activeTab?: 'overview' | 'transactions'
}

export default function TransactionTable({ 
  transactions, 
  showAllData = false, 
  showPagination = false,
  itemsPerPageOptions = [10, 25, 50, 100],
  activeTab
}: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: showPagination ? 10 : transactions.length,
    totalItems: transactions.length
  });

  const handleSort = (field: SortField) => {
    try {
      if (sortField === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortOrder('asc');
      }
      setError(null);
    } catch (err) {
      setError('Error sorting transactions. Please try again.');
      console.error('Sorting error:', err);
    }
  };

  const getSortedTransactions = () => {
    try {
      return sortTransactions(transactions, sortField, sortOrder);
    } catch (err) {
      setError('Error processing transactions. Please try again.');
      console.error('Sorting error:', err);
      return transactions;
    }
  };

  const sortedTransactions = getSortedTransactions();

  // Calculate pagination
  const totalPages = Math.ceil(sortedTransactions.length / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  
  const displayTransactions = showAllData 
    ? (showPagination ? sortedTransactions.slice(startIndex, endIndex) : sortedTransactions.slice(0, 4))
    : sortedTransactions.slice(0, 10);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setPagination(prev => ({ 
      ...prev, 
      itemsPerPage, 
      currentPage: 1 // Reset to first page when changing items per page
    }));
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return amount >= 0 ? `$${formatted}` : `-$${formatted}`;
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <div className="w-3 h-3">
      <svg id="caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#15272D62" d="M480 224C492.9 224 504.6 231.8 509.6 243.8C514.6 255.8 511.8 269.5 502.7 278.7L342.7 438.7C330.2 451.2 309.9 451.2 297.4 438.7L137.4 278.7C128.2 269.5 125.5 255.8 130.5 243.8C135.5 231.8 147.1 224 160 224L480 224z" /></svg>
      </div>;
    }
    return sortOrder === 'asc' ? 
      <div className="w-3 h-3">
    <svg id="caret-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#15272D62" d="M160 416C147.1 416 135.4 408.2 130.4 396.2C125.4 384.2 128.2 370.5 137.4 361.4L297.4 201.4C309.9 188.9 330.2 188.9 342.7 201.4L502.7 361.4C511.9 370.6 514.6 384.3 509.6 396.3C504.6 408.3 492.9 416 480 416L160 416z"/></svg> 
    </div>: 
      <div className="w-3 h-3">
      <svg id="caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#15272D62" d="M480 224C492.9 224 504.6 231.8 509.6 243.8C514.6 255.8 511.8 269.5 502.7 278.7L342.7 438.7C330.2 451.2 309.9 451.2 297.4 438.7L137.4 278.7C128.2 269.5 125.5 255.8 130.5 243.8C135.5 231.8 147.1 224 160 224L480 224z" /></svg>
      </div>;

  };

  if (error) {
    return (
      <div className="py-7">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={cn("pt-7 pb-3 overflow-x-auto", activeTab === 'transactions' ? "py-3": "")}>
        <table className="w-full min-w-[600px] border-separate border-spacing-x-3">
          <thead>
            <tr>
              <th className="w-1/2 text-left border-b border-[#49656E20]">
                <button 
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1.5 py-2 hover:bg-[#f9fafb] rounded px-1 transition-colors"
                >
                  <p className="text-[#15272D62] text-sm font-medium">Date</p>
                  {getSortIcon('date')}
                </button>
              </th>
              <th className="text-left border-b border-[#49656E20]">
                <button 
                  onClick={() => handleSort('remark')}
                  className="flex items-center gap-1.5 py-2 hover:bg-[#f9fafb] rounded px-1 transition-colors"
                >
                  <p className="text-[#15272D62] text-sm font-medium">Remark</p>
                  {getSortIcon('remark')}
                </button>
              </th>
              <th className="text-left border-b border-[#49656E20]">
                <button 
                  onClick={() => handleSort('amount')}
                  className="flex items-center gap-1.5 py-2 hover:bg-[#f9fafb] rounded px-1 transition-colors"
                >
                  <p className="text-[#15272D62] text-sm font-medium">Amount</p>
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className="text-left border-b border-[#49656E20]">
                <button 
                  onClick={() => handleSort('currency')}
                  className="flex items-center gap-1.5 py-2 hover:bg-[#f9fafb] rounded px-1 transition-colors"
                >
                  <p className="text-[#15272D62] text-sm font-medium">Currency</p>
                  {getSortIcon('currency')}
                </button>
              </th>
              <th className="text-left border-b border-[#49656E20]">
                <button 
                  onClick={() => handleSort('type')}
                  className="flex items-center gap-1.5 py-2 hover:bg-[#f9fafb] rounded px-1 transition-colors"
                >
                  <p className="text-[#15272D62] text-sm font-medium">Type</p>
                  {getSortIcon('type')}
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {displayTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-[#f9fafb] transition-colors">
                <td className="text-left py-4 border-b border-[#49656E20]">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </td>
                <td className="text-left py-4 border-b border-[#49656E20]">
                  {transaction.remark}
                </td>
                <td className={`text-left py-4 border-b border-[#49656E20] ${
                  transaction.amount >= 0 ? 'text-[#05df72]' : 'text-[#fb2c36]'
                }`}>
                  {formatAmount(transaction.amount)}
                </td>
                <td className="text-left py-4 border-b border-[#49656E20]">
                  {transaction.currency}
                </td>
                <td className="text-left py-4 border-b border-[#49656E20]">
                  <div className={`px-2 py-1 rounded-2xl bg-[#34616F09] font-medium inline-flex gap-2 items-center`}>
                    <div className={`rounded-full w-1.5 h-1.5 ${transaction.type === 'Credit' ? 'bg-[#087A2E]' : 'bg-[#C6381B]'}`}></div>
                    <p>{transaction.type}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {showPagination && showAllData && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={pagination.itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      {!showAllData && (
        <div className="mt-4 text-center">
          <p className="text-sm text-[#4a5565]">
            Showing {displayTransactions.length} of {transactions.length} transactions
          </p>
        </div>
      )}
    </div>
  );
}
