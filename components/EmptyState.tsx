"use client"
import { BarChart3, Settings, TrendingUp, Search, FileText, AlertCircle } from "lucide-react";
import { getEmptyStateMessage } from "@/lib/errorHandling";

interface EmptyStateProps {
  page: string;
  searchTerm?: string;
  context?: 'transactions' | 'search' | 'filtered' | 'default';
  showAction?: boolean;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  page, 
  searchTerm, 
  context = 'default',
  showAction = false,
  actionText,
  onAction
}: EmptyStateProps) {
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
      case 'transactions':
        return {
          icon: <FileText className="w-16 h-16 text-gray-300" />,
          title: searchTerm ? 'No Search Results' : 'No Transactions',
          description: getEmptyStateMessage(context, searchTerm),
          actionText: 'Add Transaction'
        };
      case 'search':
        return {
          icon: <Search className="w-16 h-16 text-gray-300" />,
          title: 'No Search Results',
          description: getEmptyStateMessage(context, searchTerm),
          actionText: 'Clear Search'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-16 h-16 text-gray-300" />,
          title: 'Unable to Load Data',
          description: 'There was an error loading the data. Please try refreshing the page.',
          actionText: 'Try Again'
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
  const finalActionText = actionText || config.actionText;
  const canShowAction = showAction || page === 'transactions' || page === 'search';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          {config.icon}
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {config.title}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {config.description}
        </p>
        
        {canShowAction && (
          <button 
            onClick={onAction}
            disabled={!onAction || page === 'reports' || page === 'settings'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              onAction && page !== 'reports' && page !== 'settings'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {finalActionText}
          </button>
        )}
      </div>
    </div>
  );
}
