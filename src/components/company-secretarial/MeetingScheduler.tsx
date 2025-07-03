
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";

interface MeetingSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meeting: any) => void;
}

export function MeetingScheduler({ isOpen, onClose, onSave }: MeetingSchedulerProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    entity: "",
    date: "",
    time: "",
    location: "",
    agenda: "",
    attendees: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      type: "",
      entity: "",
      date: "",
      time: "",
      location: "",
      agenda: "",
      attendees: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Meeting
          </DialogTitle>
          <DialogDescription>
            Schedule a new board meeting or general meeting
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Q4 2024 Board Meeting"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Meeting Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="board">Board Meeting</SelectItem>
                  <SelectItem value="agm">Annual General Meeting</SelectItem>
                  <SelectItem value="egm">Extraordinary General Meeting</SelectItem>
                  <SelectItem value="committee">Committee Meeting</SelectItem>
                  <SelectItem value="audit">Audit Committee</SelectItem>
                  <SelectItem value="remuneration">Remuneration Committee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="entity">Entity</Label>
              <Select value={formData.entity} onValueChange={(value) => setFormData({ ...formData, entity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme-corp">Acme Corporation Ltd</SelectItem>
                  <SelectItem value="global-tech">Global Tech Solutions Pte Ltd</SelectItem>
                  <SelectItem value="innovation-holdings">Innovation Holdings Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Board Room, Virtual Meeting, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees</Label>
            <Textarea
              id="attendees"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              placeholder="List expected attendees (one per line)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda">Agenda Items</Label>
            <Textarea
              id="agenda"
              value={formData.agenda}
              onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
              placeholder="Enter agenda items (one per line)"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
