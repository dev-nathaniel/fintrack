"use client"
import { cn } from "@/lib/utils";
import { Grid3X3, Menu, MoreHorizontal, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {Worker} from 'html2pdf.js'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const ledger = useRef<HTMLDivElement>(null)
  const [html2PdfWorker, setHtml2PdfWorker] = useState<Worker>()

  useEffect(() => {
    // Import inside useEffect so it only runs in the browser
    import("html2pdf.js").then((html2pdf) => {
      setHtml2PdfWorker(html2pdf.default())
    });
  }, []);

  const sharePDF = async () => {
    if (ledger.current) {
    html2PdfWorker?.from(ledger.current).saveAs('ledger')      
    }
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
          <Search className="w-5 h-5 text-gray-600" />
          <Grid3X3 className="w-5 h-5 text-gray-600" />
          <div>
            <Image width={40} height={40} src={'/profile.png'} alt="profile" />
          </div>
        </div>
      </div>

      <main className="flex w-full py-7 gap-12">
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

          <div ref={ledger}>
            <div className="border-b-2 border-[#49656E20] flex my-7">
              <div className="py-3 px-7 border-b-2 border-[#4B8B9F]">
                <p>Overview</p>
              </div>

              <div className="py-3 px-7">
                <p>Transactions</p>
              </div>
            </div>

            <div className="py-3 flex flex-col gap-4">
              <div>
                <p>Summary</p>
              </div>

              <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 items-center", sidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
                <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                  <div className="flex justify-between mb-4">
                    <p>Total Balance</p>
                    <MoreHorizontal />
                  </div>

                  <div className="mb-1">
                    <p className="font-bold text-3xl">$12,345</p>
                  </div>

                  <div>
                    <p>+5%</p>
                  </div>
                </div>

                <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                  <div className="flex justify-between mb-4">
                    <p>Total Balance</p>
                    <MoreHorizontal />
                  </div>

                  <div className="mb-1">
                    <p className="font-bold text-3xl">$12,345</p>
                  </div>

                  <div>
                    <p>+5%</p>
                  </div>
                </div>

                <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                  <div className="flex justify-between mb-4">
                    <p>Total Balance</p>
                    <MoreHorizontal />
                  </div>

                  <div className="mb-1">
                    <p className="font-bold text-3xl">$12,345</p>
                  </div>

                  <div>
                    <p>+5%</p>
                  </div>
                </div>

                <div className="p-7 flex-1 rounded-2xl bg-[#34616F09]">
                  <div className="flex justify-between mb-4">
                    <p>Total Balance</p>
                    <MoreHorizontal />
                  </div>

                  <div className="mb-1">
                    <p className="font-bold text-3xl">$12,345</p>
                  </div>

                  <div>
                    <p>+5%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-7 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="py-1">
                    <th className="w-1/2 text-left">Date</th>
                    <th className="text-left">Remark</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Currency</th>
                    <th className="text-left">Type</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="text-left py-4">2023-10-01</td>
                    <td className="text-left">Salary</td>
                    <td className="text-left">$3000</td>
                    <td className="text-left">USD</td>
                    <td className="text-left">Credit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
