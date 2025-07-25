import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TaskSummaryCard({ title, value, icon, className }) {
  // Extract color from className if it exists
  const colorClass = className || "";
  const iconBgColor = colorClass ? `${colorClass.split('-')[0]}-${colorClass.split('-')[1]}-500/10` : "bg-gray-500/10";
  
  return (
    <Card className="border-none bg-card/50 hover:bg-card/70 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-full",
            iconBgColor
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold", colorClass)}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
