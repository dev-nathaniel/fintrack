"use client"
import { Grid3X3, Menu, MoreHorizontal, Search, Share } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { DropdownOption } from "@/types";

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onShareClick: () => void;
}

export default function Header({ onMenuClick, onSearchClick, onShareClick }: HeaderProps) {
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
        onShareClick();
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

  return (
    <div className="flex justify-between z-50 py-3 sticky top-0 bg-white">
      <div className="flex items-center gap-4 sm:gap-7">
        <button onClick={onMenuClick} className="cursor-pointer">
          <Menu className="w-6 h-6" />
        </button>

        <Image width={112} height={112} src={'/logo.png'} alt="logo" />
      </div>

              <div className="flex items-center gap-4 sm:gap-7">
          <button 
            onClick={onSearchClick}
            className="cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          
          <Grid3X3 className="w-5 h-5 text-gray-600" />
          
          <div>
            <Image width={40} height={40} src={'/profile.png'} alt="profile" />
          </div>

          <div className="relative" ref={dropdownRef}>
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
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                      option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
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
  );
}