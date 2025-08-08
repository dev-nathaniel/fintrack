"use client"
import { Loader2 } from "lucide-react";
import { LoadingState } from "@/types";

interface LoadingSpinnerProps {
  loading: LoadingState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  loading, 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) {
  if (!loading.isLoading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {loading.message && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          {loading.message}
        </p>
      )}
      {loading.progress !== undefined && (
        <div className="w-full max-w-xs mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, loading.progress))}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {Math.round(loading.progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
