import React from 'react';
import { cn } from './Button';

export const Input = React.forwardRef(({ 
  className, 
  label,
  error,
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  return (
    <div className="w-full flex flex-col space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-navy-light">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 min-h-[1rem]">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
