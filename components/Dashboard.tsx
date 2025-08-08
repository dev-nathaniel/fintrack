"use client"
import { Transaction, SummaryData } from "@/types";
import { MoreHorizontal } from "lucide-react";
import TransactionTable from "./TransactionTable";

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
  const calculateSummary = (): SummaryData => {
    const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const transactionCount = transactions.length;
    
    return { totalBalance, totalIncome, totalExpenses, transactionCount };
  };

  const summary = calculateSummary();

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b-2 border-[#49656E20] flex mb-7">
        <button 
          onClick={() => onTabChange('overview')}
          className={`py-3 px-7 transition-colors cursor-pointer ${
            activeTab === 'overview' 
              ? "border-b-2 border-[#4B8B9F] text-[#4B8B9F]" 
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <p>Overview</p>
        </button>

        <button 
          onClick={() => onTabChange('transactions')}
          className={`py-3 px-7 transition-colors cursor-pointer ${
            activeTab === 'transactions' 
              ? "border-b-2 border-[#4B8B9F] text-[#4B8B9F]" 
              : "text-gray-600 hover:text-gray-800"
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
              <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
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
                  <p className="font-bold text-3xl">{formatAmount(summary.totalBalance)}</p>
                </div>
                <div>
                  <p className={summary.totalBalance >= 0 ? "text-green-600" : "text-red-600"}>
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
                  <p className="font-bold text-3xl text-green-600">{formatAmount(summary.totalIncome)}</p>
                </div>
                <div>
                  <p className="text-green-600">+{((summary.totalIncome / 10000) * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                <div className="flex justify-between mb-4">
                  <p>Total Expenses</p>
                  <MoreHorizontal />
                </div>
                <div className="mb-1">
                  <p className="font-bold text-3xl text-red-600">{formatAmount(summary.totalExpenses)}</p>
                </div>
                <div>
                  <p className="text-red-600">-{((summary.totalExpenses / 10000) * 100).toFixed(1)}%</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
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
              <h2 className="text-xl font-semibold text-gray-900">All Transactions</h2>
              <p className="text-gray-600 mt-1">
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
