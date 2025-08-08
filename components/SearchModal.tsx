"use client"
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Transaction } from "@/types";
import { filterTransactions } from "@/data/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
  transactions: Transaction[];
}

export default function SearchModal({ isOpen, onClose, onSearch, transactions }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    try {
      const filtered = filterTransactions(transactions, searchTerm);
      setFilteredTransactions(filtered);
      setError(null);
    } catch (err) {
      setError('Error filtering transactions. Please try again.');
      console.error('Filtering error:', err);
    }
  }, [searchTerm, transactions]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return amount >= 0 ? `$${formatted}` : `-$${formatted}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {error ? (
            <div className="p-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          ) : searchTerm ? (
            <div>
              {filteredTransactions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredTransactions.slice(0, 10).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        onSearch(searchTerm);
                        onClose();
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.remark}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatAmount(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.currency}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredTransactions.length > 10 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      Showing 10 of {filteredTransactions.length} results
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Start typing to search transactions</p>
            </div>
          )}
        </div>

        {searchTerm && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleSearch}
              className="w-full bg-[#4B8B9F] text-white py-2 px-4 rounded-lg hover:bg-[#3d7a8a] transition-colors"
            >
              View all {filteredTransactions.length} results in Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
