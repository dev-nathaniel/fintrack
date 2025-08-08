"use client"
import { BarChart3, Settings, TrendingUp } from "lucide-react";

interface EmptyStateProps {
  page: string;
}

export default function EmptyState({ page }: EmptyStateProps) {
  const getPageConfig = (pageName: string) => {
    switch (pageName) {
      case 'reports':
        return {
          icon: <BarChart3 className="w-16 h-16 text-gray-300" />,
          title: 'No Reports Available',
          description: 'Generate your first financial report to see insights and analytics.',
          actionText: 'Coming Soon'
        };
      case 'settings':
        return {
          icon: <Settings className="w-16 h-16 text-gray-300" />,
          title: 'Settings',
          description: 'Configure your account preferences and application settings.',
          actionText: 'Coming Soon'
        };
      default:
        return {
          icon: <TrendingUp className="w-16 h-16 text-gray-300" />,
          title: 'Page Under Development',
          description: 'This page is currently being developed and will be available soon.',
          actionText: 'Coming Soon'
        };
    }
  };

  const config = getPageConfig(page);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          {config.icon}
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {config.title}
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
          {config.description}
        </p>
        
        <button 
          disabled
          className="bg-gray-100 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
        >
          {config.actionText}
        </button>
      </div>
    </div>
  );
}
