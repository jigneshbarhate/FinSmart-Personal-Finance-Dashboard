import React from 'react';
import { cn } from './Button';

export function Card({ className, children, noPadding = false, ...props }) {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md",
        !noPadding && "p-6",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-navy", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
