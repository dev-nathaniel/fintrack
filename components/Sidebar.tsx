"use client"
import { X } from "lucide-react";
import Image from "next/image";
import { SidebarItem } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ isOpen, onClose, activePage, onPageChange }: SidebarProps) {
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', isActive: activePage === 'dashboard' },
    { id: 'transactions', label: 'Transactions', isActive: activePage === 'transactions' },
    { id: 'reports', label: 'Reports', isActive: activePage === 'reports' },
    { id: 'settings', label: 'Settings', isActive: activePage === 'settings' }
  ];

  const handleItemClick = (itemId: string) => {
    onPageChange(itemId);
    onClose();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:w-56 hidden lg:flex lg:flex-col lg:fixed ${isOpen ? "lg:w-56" : "lg:hidden"}`}>
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`py-2 px-4 rounded-2xl text-left transition-colors cursor-pointer ${
              item.isActive 
                ? "bg-[#38677616] text-[#3A6C7B]" 
                : "text-[#3A6C7B] hover:bg-gray-50"
            }`}
          >
            <p>{item.label}</p>
          </button>
        ))}
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden pr-2 sm:pr-4 fixed top-0 bottom-0 bg-white z-50 w-56 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-[200%]"
      }`}>
        <div className="py-4 sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <Image width={112} height={112} src={'/logo.png'} alt="logo" />
            <button onClick={onClose} className="cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="py-7">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`py-2 px-4 rounded-2xl text-left w-full transition-colors cursor-pointer ${
                item.isActive 
                  ? "bg-[#38677616] text-[#3A6C7B]" 
                  : "text-[#3A6C7B] hover:bg-gray-50"
              }`}
            >
              <p>{item.label}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
