"use client"
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Worker } from 'html2pdf.js'
import { transactions, filterTransactions } from "@/data/data";
import { DropdownOption, Transaction } from "@/types";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchModal from "@/components/SearchModal";
import Dashboard from "@/components/Dashboard";
import TransactionsPage from "@/components/TransactionsPage";
import EmptyState from "@/components/EmptyState";
import { Grid3X3, MoreHorizontal, Share } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [error, setError] = useState<string | null>(null);
  const ledger = useRef<HTMLDivElement>(null);
  const [html2PdfWorker, setHtml2PdfWorker] = useState<Worker>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownOptions: DropdownOption[] = [
    {
      id: 'share',
      label: 'Share PDF',
      icon: 'Share',
      onClick: () => {
        sharePDF()
        setDropdownOpen(false);
      }
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: 'Download',
      onClick: () => {
        // TODO: Implement export functionality
        setDropdownOpen(false);
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      onClick: () => {
        // TODO: Implement settings
        setDropdownOpen(false);
      }
    }
  ];

  const getIcon = (iconName: string | undefined) => {
    switch (iconName) {
      case 'Share':
        return <Share className="w-4 h-4" />;
      case 'Download':
        return <Grid3X3 className="w-4 h-4" />;
      case 'Settings':
        return <Grid3X3 className="w-4 h-4" />;
      default:
        return <Grid3X3 className="w-4 h-4" />;
    }
  };

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
        // Switch to transactions tab if on dashboard, or to transactions page if on other pages
        if (activePage === 'dashboard') {
          setActiveTab('transactions');
        } else if (activePage !== 'transactions') {
          setActivePage('transactions');
        }
      } else {
        setFilteredTransactions(transactions);
      }
      setError(null);
    } catch (err) {
      setError('Error filtering transactions. Please try again.');
      console.error('Filtering error:', err);
    }
  }, [searchTerm, activePage]);

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
      setActivePage('dashboard');
      setSearchTerm("");
    } else if (page === 'transactions') {
      window.location.href = '/transactions';
    } else if (page === 'reports') {
      window.location.href = '/reports';
    } else if (page === 'settings') {
      window.location.href = '/settings';
    }
  }

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            transactions={filteredTransactions}
            searchTerm={searchTerm}
            onClearSearch={clearSearch}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        );
      case 'transactions':
        return (
          <TransactionsPage
            transactions={filteredTransactions}
            searchTerm={searchTerm}
            onClearSearch={clearSearch}
          />
        );
      case 'reports':
        return <EmptyState page="reports" />;
      case 'settings':
        return <EmptyState page="settings" />;
      default:
        return <EmptyState page="default" />;
    }
  };

  return (
    <div className="px-2 sm:px-4 max-w-[100vw]">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchModalOpen(true)}
        onShareClick={sharePDF}
        activePage="dashboard"
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      <main className="w-full py-7 gap-12">
        <div id="mainBody" className={cn("flex-5/6 lg:pl-64", sidebarOpen ? "lg:pl-64" : "lg:pl-0")}>
          {/* Page Header */}
          <div id="mainHeader" className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="text-4xl font-bold">
                  {activePage === 'dashboard' && 'Wallet Ledger'}
                  {activePage === 'transactions' && 'Transactions'}
                  {activePage === 'reports' && 'Reports'}
                  {activePage === 'settings' && 'Settings'}
                </p>
              </div>

              {activePage === 'dashboard' && (
                <div className="rounded-2xl bg-[#34616F09] py-1 px-2 flex gap-2 items-center">
                  <div className={`rounded-full w-1.5 h-1.5 bg-[#087A2E]`}></div>

                  <p>Active</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div onClick={sharePDF} className="hidden sm:flex px-4 py-2 bg-[#4b8b9f] rounded-2xl cursor-pointer">
                <p>Share</p>
              </div>
              <div className="relative cursor-pointer" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="border border-[#49656E] rounded-2xl p-2 hover:bg-gray-50 transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {dropdownOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={option.onClick}
                        disabled={option.disabled}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                          }`}
                      >
                        {getIcon(option.icon)}
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Info - Only show on dashboard */}
          {activePage === 'dashboard' && (
            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center">
                <img className="z-40" alt="profile 4" src={'/profile (4).png'} width={32} height={32} />
                <img className="-ml-2 z-30" alt="profile 1" src={'/profile (1).png'} width={32} height={32} />
                <img className="-ml-2 z-20" alt="profile 2" src={'/profile (2).png'} width={32} height={32} />
                <img className="-ml-2 z-10" alt="profile 3" src={'/profile (3).png'} width={32} height={32} />
              </div>
              <div>
                <p>Ava, Liam, Noah +12 others</p>
              </div>
            </div>
          )}

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
            {renderPageContent()}
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
