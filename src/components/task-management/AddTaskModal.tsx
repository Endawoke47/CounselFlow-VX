
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const [date, setDate] = useState<Date>();

  const modules = [
    "Contracts",
    "IP Management", 
    "Compliance",
    "Company Secretarial",
    "Disputes",
    "Matter Management",
    "Risk Management",
    "Policy Management",
    "Outsourced Matters"
  ];

  const assignees = [
    "Sarah Chen",
    "David Park",
    "Emily Rodriguez", 
    "Michael Kim",
    "Lisa Wang",
    "John Smith",
    "Maria Garcia"
  ];

  const entities = [
    "Global Holdings",
    "EU Operations",
    "APAC Operations", 
    "Technology Division",
    "Corporate"
  ];

  const priorities = [
    "Low",
    "Medium", 
    "High",
    "Critical"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input id="title" placeholder="Enter task title" />
            </div>
            
            <div>
              <Label htmlFor="module">Module</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module} value={module.toLowerCase().replace(/\s+/g, '-')}>
                      {module}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {assignees.map((assignee) => (
                    <SelectItem key={assignee} value={assignee.toLowerCase().replace(/\s+/g, '-')}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority.toLowerCase()}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="entity">Entity</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  {entities.map((entity) => (
                    <SelectItem key={entity} value={entity.toLowerCase().replace(/\s+/g, '-')}>
                      {entity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="linked-item">Linked Item (Optional)</Label>
              <Input id="linked-item" placeholder="Contract ID, Matter ID, etc." />
            </div>

            <div>
              <Label htmlFor="estimated-hours">Estimated Hours</Label>
              <Input id="estimated-hours" type="number" placeholder="0" />
            </div>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter task description and any additional details..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
