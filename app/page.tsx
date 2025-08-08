"use client"
import { cn } from "@/lib/utils";
import { Grid3X3, Menu, MoreHorizontal, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Worker } from 'html2pdf.js'
import { transactions, filterTransactions } from "@/lib/data";
import TransactionTable from "@/components/TransactionTable";
import SearchModal from "@/components/SearchModal";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview')
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [error, setError] = useState<string | null>(null)
  const ledger = useRef<HTMLDivElement>(null)
  const [html2PdfWorker, setHtml2PdfWorker] = useState<Worker>()

  useEffect(() => {
    // Import inside useEffect so it only runs in the browser
    import("html2pdf.js").then((html2pdf) => {
      setHtml2PdfWorker(html2pdf.default())
    }).catch((err) => {
      setError('Failed to load PDF generation. Please try again.');
      console.error('PDF worker error:', err);
    });
  }, []);

  useEffect(() => {
    try {
      if (searchTerm) {
        const filtered = filterTransactions(transactions, searchTerm);
        setFilteredTransactions(filtered);
        setActiveTab('transactions');
      } else {
        setFilteredTransactions(transactions);
      }
      setError(null);
    } catch (err) {
      setError('Error filtering transactions. Please try again.');
      console.error('Filtering error:', err);
    }
  }, [searchTerm]);

  const sharePDF = async () => {
    try {
      if (ledger.current && html2PdfWorker) {
        await html2PdfWorker.from(ledger.current).saveAs('ledger');
      } else {
        throw new Error('PDF generation not available');
      }
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error('PDF generation error:', err);
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchModalOpen(false);
  }

  const clearSearch = () => {
    setSearchTerm("");
  }

  const calculateSummary = () => {
    try {
      const totalBalance = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
      const totalIncome = filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = Math.abs(filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
      const transactionCount = filteredTransactions.length;

      return { totalBalance, totalIncome, totalExpenses, transactionCount };
    } catch (err) {
      setError('Error calculating summary. Please try again.');
      console.error('Summary calculation error:', err);
      return { totalBalance: 0, totalIncome: 0, totalExpenses: 0, transactionCount: 0 };
    }
  }

  const summary = calculateSummary();

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return (
    <div className="px-2 sm:px-4 max-w-[100vw]">
      <div className="flex justify-between z-50 py-3 sticky top-0 bg-white">
        <div className="flex items-center gap-4 sm:gap-7">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer ">
            <Menu className="w-6 h-6" />
          </button>

          <Image width={112} height={112} src={'/logo.png'} alt="logo" />
        </div>

        <div className="flex items-center gap-4 sm:gap-7">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <Grid3X3 className="w-5 h-5 text-gray-600" />
          <div>
            <Image width={40} height={40} src={'/profile.png'} alt="profile" />
          </div>
        </div>
      </div>

      <main className="w-full py-7 gap-12">
        <div id="sidebar" className={cn("lg:w-56 hidden lg:flex lg:flex-col lg:fixed", sidebarOpen ? "lg:w-56" : "lg:hidden")}>
          <div className="py-2 px-4 rounded-2xl bg-[#38677616]">
            <p className="text-[#3A6C7B]">Dashboard</p>
          </div>

          <div className="py-2 px-4 rounded-2xl">
            <p className="text-[#3A6C7B]">Transactions</p>
          </div>

          <div className="py-2 px-4 rounded-2xl">
            <p className="text-[#3A6C7B]">Reports</p>
          </div>

          <div className="py-2 px-4 rounded-2xl">
            <p className="text-[#3A6C7B]">Settings</p>
          </div>
        </div>

        <div id="mobileSidebar" className={cn("lg:hidden pr-2 sm:pr-4 fixed top-0 bottom-0 bg-white z-50 w-56", sidebarOpen ? "translate-x-0" : "-translate-x-[200%]")}>
          <div className="py-4 sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <Image width={112} height={112} src={'/logo.png'} alt="logo" />
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="py-7">
            <div className="py-2 px-4 rounded-2xl bg-[#38677616]">
              <p className="text-[#3A6C7B]">Dashboard</p>
            </div>

            <div className="py-2 px-4 rounded-2xl">
              <p className="text-[#3A6C7B]">Transactions</p>
            </div>

            <div className="py-2 px-4 rounded-2xl">
              <p className="text-[#3A6C7B]">Reports</p>
            </div>

            <div className="py-2 px-4 rounded-2xl">
              <p className="text-[#3A6C7B]">Settings</p>
            </div>
          </div>
        </div>

        <div id="mainBody" className={cn("flex-5/6 lg:pl-64", sidebarOpen ? "lg:pl-64" : "lg:pl-0")}>
          <div id="mainHeader" className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="text-4xl font-bold">Wallet Ledger</p>
              </div>

              <div className="rounded-2xl bg-[#34616F09] py-1 px-2 gap-2">
                <p>Active</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div onClick={sharePDF} className="bg-[#4B8B9F] hidden sm:flex cursor-pointer rounded-2xl py-2 px-4">
                <p>Share</p>
              </div>

              <div className="border border-[#49656E] rounded-2xl p-2">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-7">
            <div className="flex items-center">
              <Image className="z-40" alt="profile 4" src={'/profile (4).png'} width={32} height={32} />
              <Image className="-ml-2 z-30" alt="profile 1" src={'/profile (1).png'} width={32} height={32} />
              <Image className="-ml-2 z-20" alt="profile 2" src={'/profile (2).png'} width={32} height={32} />
              <Image className="-ml-2 z-10" alt="profile 3" src={'/profile (3).png'} width={32} height={32} />
            </div>

            <div>
              <p>Ava, Liam, Noah +12 others</p>
            </div>
          </div>

          {/* {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-red-600 hover:text-red-800 underline"
              >
                Dismiss
              </button>
            </div>
          )} */}

          <div>
            <div className={cn("border-b-2 border-[#49656E20] flex my-7", activeTab === 'transactions' ? "mb-0" : "")}>
              <button
                onClick={() => setActiveTab('overview')}
                className={cn("py-3 px-7 transition-colors cursor-pointer",
                  activeTab === 'overview'
                    ? "border-b-2 border-[#4B8B9F] text-[#4B8B9F]"
                    : "text-gray-600 hover:text-gray-800"
                )}
              >
                <p>Overview</p>
              </button>

              <button
                onClick={() => setActiveTab('transactions')}
                className={cn("py-3 px-7 transition-colors cursor-pointer",
                  activeTab === 'transactions'
                    ? "border-b-2 border-[#4B8B9F] text-[#4B8B9F]"
                    : "text-gray-600 hover:text-gray-800"
                )}
              >
                <p>Transactions</p>
              </button>
            </div>

            <div className="py-3 flex flex-col gap-4">
              {activeTab === 'overview' && (
                <>
                  <div className="py-3 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p>Summary</p>
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="text-sm text-[#4B8B9F] hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>

                    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 items-center", sidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
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
                          <p>+5%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="" ref={ledger}>
            <TransactionTable
              activeTab={activeTab}
              transactions={filteredTransactions}
              showAllData={activeTab === 'transactions'}
            />
          </div>
        </div>
      </main >

      <div>
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSearch={handleSearch}
          transactions={transactions}
        />
      </div>
    </div >
  );
}
