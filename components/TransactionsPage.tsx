"use client"
import { Transaction } from "@/types";
import { filterTransactions } from "@/lib/data";
import TransactionTable from "./TransactionTable";
import { Search, X } from "lucide-react";

interface TransactionsPageProps {
  transactions: Transaction[];
  searchTerm: string;
  onClearSearch: () => void;
}

export default function TransactionsPage({ 
  transactions, 
  searchTerm, 
  onClearSearch 
}: TransactionsPageProps) {
  const filteredTransactions = searchTerm ? filterTransactions(transactions, searchTerm) : transactions;

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">
            {searchTerm 
              ? `Showing ${filteredTransactions.length} results for "${searchTerm}"`
              : `Total ${transactions.length} transactions`
            }
          </p>
        </div>
        
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Clear search
          </button>
        )}
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-blue-800 font-medium">
                Search Results for "{searchTerm}"
              </p>
              <p className="text-blue-600 text-sm">
                Found {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <TransactionTable
        transactions={filteredTransactions}
        showAllData={true}
        showPagination={true}
        itemsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  );
}
