import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export function TaskAlert({ type, message, onDismiss, duration = 5000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  const alertVariants = {
    success: {
      variant: "default",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      title: "Success",
      className: "border-green-500/20 bg-green-500/10"
    },
    error: {
      variant: "destructive",
      icon: <AlertCircle className="h-4 w-4" />,
      title: "Error",
      className: "border-red-500/20 bg-red-500/10"
    },
    info: {
      variant: "default",
      icon: <Info className="h-4 w-4 text-blue-500" />,
      title: "Information",
      className: "border-blue-500/20 bg-blue-500/10"
    }
  };
  
  const { variant, icon, title, className } = alertVariants[type] || alertVariants.info;

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-md animate-in fade-in slide-in-from-top-2">
      <Alert variant={variant} className={`pr-8 ${className}`}>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        <button 
          onClick={handleDismiss}
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-background/80"
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </button>
      </Alert>
    </div>
  );
}
