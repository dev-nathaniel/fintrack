"use client"
import { AlertTriangle, X, RefreshCw, AlertCircle, Info } from "lucide-react";
import { ErrorState } from "@/types";
import { useState } from "react";

interface ErrorDisplayProps {
  error: ErrorState;
  className?: string;
  dismissible?: boolean;
}

export default function ErrorDisplay({ 
  error, 
  className = '', 
  dismissible = true 
}: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (error.type) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (error.type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const handleDismiss = () => {
    if (error.dismiss) {
      error.dismiss();
    } else {
      setIsVisible(false);
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getBackgroundColor()} ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium">
              {error.message}
            </p>
            
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {error.code && (
            <p className="text-xs opacity-75 mt-1">
              Error Code: {error.code}
            </p>
          )}
          
          {(error.retry || error.dismiss) && (
            <div className="flex gap-2 mt-3">
              {error.retry && (
                <button
                  onClick={error.retry}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-white/50 hover:bg-white/70 rounded transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Try Again
                </button>
              )}
              
              {error.dismiss && dismissible && (
                <button
                  onClick={error.dismiss}
                  className="px-3 py-1 text-xs font-medium bg-white/50 hover:bg-white/70 rounded transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
