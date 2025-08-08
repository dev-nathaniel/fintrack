"use client"
import { useEffect, useRef, useState } from "react";
import { Worker } from 'html2pdf.js'
import { transactions, filterTransactions } from "@/data/data";
import { Transaction } from "@/types";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchModal from "@/components/SearchModal";
import TransactionsPage from "@/components/TransactionsPage";
import { cn } from "@/lib/utils";

export default function TransactionsPageRoute() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [error, setError] = useState<string | null>(null);
  const ledger = useRef<HTMLDivElement>(null);
  const [html2PdfWorker, setHtml2PdfWorker] = useState<Worker>();

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

  const handlePageChange = (page: string) => {
    // Navigate to the selected page
    if (page === 'dashboard') {
      window.location.href = '/';
    } else if (page === 'transactions') {
      window.location.href = '/transactions';
    } else if (page === 'reports') {
      window.location.href = '/reports';
    } else if (page === 'settings') {
      window.location.href = '/settings';
    }
  }

  return (
    <div className="px-2 sm:px-4 max-w-[100vw]">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchModalOpen(true)}
        onShareClick={sharePDF}
        activePage="transactions"
      />

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage="transactions"
        onPageChange={handlePageChange}
      />

      <main className="w-full py-7 gap-12">
        <div id="mainBody" className={cn("flex-5/6 lg:pl-64", sidebarOpen ? "lg:pl-64" : "lg:pl-0")}>
          {/* Page Header */}
          <div id="mainHeader" className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="text-4xl font-bold">Transactions</p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-red-600 hover:text-red-800 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Page Content */}
          <div ref={ledger}>
            <TransactionsPage 
              transactions={filteredTransactions}
              searchTerm={searchTerm}
              onClearSearch={clearSearch}
            />
          </div>
        </div>
      </main>

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={handleSearch}
        transactions={transactions}
      />
    </div>
  );
}
