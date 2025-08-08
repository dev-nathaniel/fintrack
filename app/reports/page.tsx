"use client"
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        onSearchClick={() => {}}
        onShareClick={() => {}}
      />

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage="reports"
        onPageChange={handlePageChange}
      />

      <main className="w-full py-7 gap-12">
        <div id="mainBody" className={cn("flex-5/6 lg:pl-64", sidebarOpen ? "lg:pl-64" : "lg:pl-0")}>
          {/* Page Header */}
          <div id="mainHeader" className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="text-4xl font-bold">Reports</p>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <EmptyState page="reports" />
        </div>
      </main>
    </div>
  );
}
