import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Video,
  Bell,
  BellOff
} from "lucide-react";
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import type { Database } from '@/types/database';

export function MeetingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [filterStatus, setFilterStatus] = useState<'all' | 'tentative' | 'confirmed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'board' | 'agm' | 'egm' | 'committee'>('all');
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];
  const { events: calendarEvents, loading, error } = useCalendarEvents(startDate, endDate);
  const [selectedEvent, setSelectedEvent] = useState<Database['public']['Tables']['calendar_events']['Row'] | null>(null);

  const filteredEvents = calendarEvents.filter(event => {
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (filterType !== 'all' && event.type !== filterType) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'tentative':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default' as const;
      case 'tentative':
        return 'secondary' as const;
      case 'completed':
        return 'outline' as const;
      case 'cancelled':
        return 'destructive' as const;
      default:
        return 'secondary' as const;
    }
  };

  const getMeetingTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'board': 'Board Meeting',
      'agm': 'Annual General Meeting',
      'egm': 'Extraordinary General Meeting',
      'committee': 'Committee Meeting',
      'audit': 'Audit Committee',
      'remuneration': 'Remuneration Committee'
    };
    return labels[type] || type;
  };

  const isNoticeOverdue = (event: Database['public']['Tables']['calendar_events']['Row']) => {
    if (!event.hasNoticeRequirement || !event.noticeDeadline || event.noticeSent) return false;
    return new Date() > new Date(event.noticeDeadline);
  };

  const getDaysUntilMeeting = (date: Date) => {
    const today = new Date();
    const meetingDate = new Date(date);
    const diffTime = meetingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayEvents = filteredEvents.filter(event => 
        new Date(event.date).toDateString() === currentDateObj.toDateString()
      );
      
      days.push({
        date: new Date(currentDateObj),
        isCurrentMonth: currentDateObj.getMonth() === month,
        events: dayEvents
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-1 border border-border ${
              day.isCurrentMonth ? 'bg-background' : 'bg-muted/50'
            }`}
          >
            <div className={`text-sm ${
              day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {day.date.getDate()}
            </div>
            <div className="space-y-1 mt-1">
              {day.events.slice(0, 2).map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getStatusColor(event.status)} text-white`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="truncate">{event.title}</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-2 w-2" />
                    {event.time}
                  </div>
                </div>
              ))}
              {day.events.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{day.events.length - 2} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return (
      <div className="space-y-4">
        {sortedEvents.map(event => (
          <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedEvent(event)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <Badge variant={getStatusBadgeVariant(event.status)}>
                      {event.status}
                    </Badge>
                    {isNoticeOverdue(event) && (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Notice Overdue
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      {event.isVirtual ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {event.attendeeCount} attendees • {event.entityName}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {getDaysUntilMeeting(new Date(event.date))} days
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getMeetingTypeLabel(event.type)}
                  </div>
                  {event.hasNoticeRequirement && (
                    <div className="flex items-center gap-1 mt-1">
                      {event.noticeSent ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : isNoticeOverdue(event) ? (
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                      ) : (
                        <BellOff className="h-3 w-3 text-orange-600" />
                      )}
                      <span className="text-xs">
                        {event.noticeSent ? 'Notice sent' : 'Notice pending'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Meeting Calendar</h2>
          <p className="text-muted-foreground">
            Visual calendar of board and shareholder meetings with notice tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
            <Tabs value={viewMode} onValueChange={(value: typeof viewMode) => setViewMode(value)}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Tabs value={filterStatus} onValueChange={(value: typeof filterStatus) => setFilterStatus(value)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="tentative">Tentative</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Type:</span>
              <Tabs value={filterType} onValueChange={(value: typeof filterType) => setFilterType(value)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="board">Board</TabsTrigger>
                  <TabsTrigger value="agm">AGM</TabsTrigger>
                  <TabsTrigger value="committee">Committee</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Calendar View */}
          {viewMode === 'month' ? renderCalendarGrid() : renderListView()}
        </CardContent>
      </Card>

      {/* Meeting Detail Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription>
                {getMeetingTypeLabel(selectedEvent.type)} • {selectedEvent.entityName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date & Time</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(selectedEvent.status)}>
                      {selectedEvent.status}
                    </Badge>
                    {getDaysUntilMeeting(new Date(selectedEvent.date)) >= 0 && (
                      <span className="text-sm text-muted-foreground">
                        in {getDaysUntilMeeting(new Date(selectedEvent.date))} days
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <div className="flex items-center gap-2">
                    {selectedEvent.isVirtual ? (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Attendees</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.attendeeCount} expected attendees
                  </p>
                </div>
              </div>

              {selectedEvent.hasNoticeRequirement && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notice Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notice Deadline:</span>
                        <span className="text-sm font-medium">
                          {selectedEvent.noticeDeadline ? new Date(selectedEvent.noticeDeadline).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notice Status:</span>
                        <div className="flex items-center gap-2">
                          {selectedEvent.noticeSent ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Sent</span>
                            </>
                          ) : isNoticeOverdue(selectedEvent) ? (
                            <>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">Overdue</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-orange-600" />
                              <span className="text-sm text-orange-600">Pending</span>
                            </>
                          )}
                        </div>
                      </div>
                      {isNoticeOverdue(selectedEvent) && !selectedEvent.noticeSent && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm text-red-800">
                            ⚠️ Notice deadline has passed. Send notice immediately to comply with requirements.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm">
                  Edit Meeting
                </Button>
                {selectedEvent.hasNoticeRequirement && !selectedEvent.noticeSent && (
                  <Button size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Notice
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}