import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Trash2, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Booking, bookings as initialBookings } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Using shared Booking type from '@/lib/data'

export default function AdminBookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useLocalStorage<Booking[]>("admin:bookings", initialBookings as Booking[]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredBookings = bookings.filter(b => {
    if (filterType !== "all" && b.type !== filterType) return false;
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    return true;
  });

  const markDone = (id: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookings(bookings.map((b: any) => b.id === id ? { ...b, status: 'Completed' } : b));
      setIsProcessing(false);
      toast({ title: 'Booking updated' });
    }, 500);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete booking?')) return;
    setBookings(bookings.filter((b: any) => b.id !== id));
    toast({ title: 'Booking removed' });
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
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => markDone(booking.id)} disabled={booking.status === 'Completed' || isProcessing}>
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
