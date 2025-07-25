import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpCircle, Circle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityColors = {
  low: "bg-blue-600/10 text-blue-500 border-blue-500/20",
  medium: "bg-amber-600/10 text-amber-500 border-amber-500/20",
  high: "bg-red-600/10 text-red-500 border-red-500/20",
};

const priorityIcons = {
  low: <Circle className="h-4 w-4 text-blue-500" />,
  medium: <Clock className="h-4 w-4 text-amber-500" />,
  high: <ArrowUpCircle className="h-4 w-4 text-red-500" />
};

const statusColors = {
  pending: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "in-progress": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  completed: "bg-green-600/10 text-green-500 border-green-500/20",
};

const statusIcons = {
  pending: <Circle className="h-4 w-4 text-gray-400" />,
  "in-progress": <Clock className="h-4 w-4 text-orange-500" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />
};

export function TaskCard({ task, onEdit, onDelete }) {
  return (
    <Card className="h-full border-none bg-card/50 hover:bg-card/70 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-medium">{task.title}</CardTitle>
          <Badge 
            className={cn("flex items-center gap-1 px-2 py-1 border", priorityColors[task.priority] || priorityColors.low)}
          >
            {priorityIcons[task.priority] || priorityIcons.low}
            <span className="capitalize">{task.priority}</span>
          </Badge>
        </div>
        <CardDescription className="text-sm mt-2 line-clamp-2">
          {task.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge 
          className={cn("flex items-center gap-1 px-2 py-1 border", statusColors[task.status] || statusColors.pending)}
        >
          {statusIcons[task.status] || statusIcons.pending}
          <span>
            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" className="hover:bg-blue-950/20" onClick={() => onEdit(task)}>
          <Pencil className="h-4 w-4 mr-1" />
          <span>Edit</span>
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-red-950/20 text-destructive" onClick={() => onDelete(task.id)}>
          <Trash2 className="h-4 w-4 mr-1" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
