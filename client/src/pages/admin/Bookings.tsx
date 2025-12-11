import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Trash2, X, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Booking } from "@shared/schema";

export default function AdminBookings() {
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: bookings, isLoading } = useQuery<Booking[]>({ queryKey: ["/api/bookings"] });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const res = await apiRequest("PATCH", `/api/bookings/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: 'Booking updated' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({ title: 'Booking removed' });
    },
  });

  const items = bookings || [];
  const filteredBookings = items.filter(b => {
    if (filterType !== "all" && b.type !== filterType) return false;
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    return true;
  });

  const markDone = (id: number) => {
    updateStatusMutation.mutate({ id, status: 'Completed' });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete booking?')) return;
    deleteMutation.mutate(id);
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="font-bold text-2xl">Bookings & Enquiries</h1>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Visit">Visits</SelectItem>
              <SelectItem value="Grooming">Grooming</SelectItem>
              <SelectItem value="Enquiry">Enquiries</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {(filterType !== "all" || filterStatus !== "all") && (
            <Button variant="ghost" onClick={() => { setFilterType("all"); setFilterStatus("all"); }} className="text-muted-foreground">
              <X size={16} className="mr-2" /> Clear
            </Button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.name}</TableCell>
                    <TableCell className="font-medium">{booking.phone || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${booking.type === 'Visit' ? 'bg-purple-100 text-purple-700' :
                        booking.type === 'Grooming' ? 'bg-pink-100 text-pink-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                        {booking.type}
                      </span>
                    </TableCell>
                    <TableCell>{booking.detail}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => markDone(booking.id)}
                          disabled={booking.status === 'Completed' || updateStatusMutation.isPending}>
                          <CheckCircle2 size={16} className="mr-2" /> {booking.status === 'Completed' ? 'Done' : 'Mark Done'}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(booking.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
