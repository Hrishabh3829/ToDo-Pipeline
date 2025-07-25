import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskSummaryCard({ title, value, icon, className }) {
  return (
    <Card className={`border-none bg-card/50 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className={className || "text-muted-foreground"}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${className ? "text-" + className.split("-")[1] : ""}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
