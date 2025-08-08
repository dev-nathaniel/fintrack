"use client"
import { useState } from "react";
import { Transaction, SummaryData, ErrorState, LoadingState } from "@/types";
import { MoreHorizontal } from "lucide-react";
import TransactionTable from "./TransactionTable";
import { safeFormatAmount, validateTransactions, createErrorState } from "@/lib/errorHandling";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from "./LoadingSpinner";

interface DashboardProps {
  transactions: Transaction[];
  searchTerm: string;
  onClearSearch: () => void;
  activeTab: 'overview' | 'transactions';
  onTabChange: (tab: 'overview' | 'transactions') => void;
}

export default function Dashboard({ 
  transactions, 
  searchTerm, 
  onClearSearch, 
  activeTab, 
  onTabChange 
}: DashboardProps) {
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

  const calculateSummary = (): SummaryData => {
    try {
      // Validate transactions before calculating
      const validation = validateTransactions(transactions);
      if (!validation.isValid) {
        throw new Error(`Data validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
      }

      const totalBalance = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      const totalIncome = transactions.filter(t => (t.amount || 0) > 0).reduce((sum, t) => sum + (t.amount || 0), 0);
      const totalExpenses = Math.abs(transactions.filter(t => (t.amount || 0) < 0).reduce((sum, t) => sum + (t.amount || 0), 0));
      const transactionCount = transactions.length;
      
      return { totalBalance, totalIncome, totalExpenses, transactionCount };
    } catch (err) {
      setError(createErrorState(err, () => {
        setError(null);
        return calculateSummary();
      }));
      return { totalBalance: 0, totalIncome: 0, totalExpenses: 0, transactionCount: 0 };
    }
  };

  const summary = calculateSummary();

  return (
    <div className="w-full">
      <LoadingSpinner loading={loading} />
      
      {error && (
        <div className="mb-6">
          <ErrorDisplay error={error} />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b-2 border-[#49656E20] flex mb-7">
        <button 
          onClick={() => onTabChange('overview')}
          className={`py-3 px-7 transition-colors cursor-pointer ${
            activeTab === 'overview' 
              ? "border-b-2 border-[#4B8B9F] text-[#4B8B9F]" 
              : "text-[#4a5565] hover:text-[#1e2939]"
          }`}
        >
          <p>Overview</p>
        </button>

        <button 
          onClick={() => onTabChange('transactions')}
          className={`py-3 px-7 transition-colors cursor-pointer ${
            activeTab === 'transactions' 
              ? "border-b-2 border-[#4B8B9F] text-[#4B8B9F]" 
              : "text-[#4a5565] hover:text-[#1e2939]"
          }`}
        >
          <p>Transactions</p>
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Summary Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#101828]">Summary</h2>
              {searchTerm && (
                <button 
                  onClick={onClearSearch}
                  className="text-sm text-[#4B8B9F] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                <div className="flex justify-between mb-4">
                  <p>Total Balance</p>
                  <MoreHorizontal />
                </div>
                <div className="mb-1">
                  <p className="font-bold text-3xl">{safeFormatAmount(summary.totalBalance)}</p>
                </div>
                <div>
                  <p className={summary.totalBalance >= 0 ? "text-[#05df72]" : "text-[#fb2c36]"}>
                    {summary.totalBalance >= 0 ? "+" : ""}{((summary.totalBalance / 10000) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                <div className="flex justify-between mb-4">
                  <p>Total Income</p>
                  <MoreHorizontal />
                </div>
                <div className="mb-1">
                  <p className="font-bold text-3xl text-[#05df72]">{safeFormatAmount(summary.totalIncome)}</p>
                </div>
                <div>
                  <p className="text-[#05df72]">+{((summary.totalIncome / 10000) * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                <div className="flex justify-between mb-4">
                  <p>Total Expenses</p>
                  <MoreHorizontal />
                </div>
                <div className="mb-1">
                  <p className="font-bold text-3xl text-[#fb2c36]">{safeFormatAmount(summary.totalExpenses)}</p>
                </div>
                <div>
                  <p className="text-[#fb2c36]">-{((summary.totalExpenses / 10000) * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                <div className="flex justify-between mb-4">
                  <p>Transactions</p>
                  <MoreHorizontal />
                </div>
                <div className="mb-1">
                  <p className="font-bold text-3xl">{summary.transactionCount}</p>
                </div>
                <div>
                  <p>This period</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-lg font-semibold text-[#101828] mb-4">Recent Transactions</h3>
            <TransactionTable
              transactions={transactions}
              showAllData={false}
              showPagination={false}
              activeTab="overview"
            />
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <div>
          {/* Transactions Tab Content */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#101828]">All Transactions</h2>
              <p className="text-[#4a5565] mt-1">
                {searchTerm 
                  ? `Showing ${transactions.length} results for "${searchTerm}"`
                  : `Total ${transactions.length} transactions`
                }
              </p>
            </div>
            
            {searchTerm && (
              <button
                onClick={onClearSearch}
                className="text-sm text-[#4B8B9F] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          <TransactionTable
            transactions={transactions}
            showAllData={true}
            showPagination={true}
            activeTab="transactions"
          />
        </div>
      )}
    </div>
  );
}
