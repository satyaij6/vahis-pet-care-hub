import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AdminBookings() {
  // Mock bookings data
  const bookings = [
    { id: 1, name: "Rahul Kumar", type: "Visit", detail: "Beagle Puppy", time: "Tomorrow, 10:00 AM", status: "Pending" },
    { id: 2, name: "Priya Sharma", type: "Grooming", detail: "Bath & Blow Dry", time: "Today, 2:00 PM", status: "Confirmed" },
    { id: 3, name: "Amit Patel", type: "Enquiry", detail: "3 Products", time: "Yesterday", status: "Completed" },
  ];

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

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      booking.type === 'Visit' ? 'bg-purple-100 text-purple-700' :
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
                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                      <CheckCircle2 size={16} className="mr-2" /> Mark Done
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
