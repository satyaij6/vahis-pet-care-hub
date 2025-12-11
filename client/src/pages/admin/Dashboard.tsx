import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { PawPrint, Package, Calendar, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Booking, Product, Pet } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { logoutMutation } = useAuth();

  const { data: bookings } = useQuery<Booking[]>({ queryKey: ["/api/bookings"] });
  const { data: products } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const { data: pets } = useQuery<Pet[]>({ queryKey: ["/api/pets"] });

  const bookingList = bookings || [];
  const productList = products || [];
  const petList = pets || [];

  const pendingVisitsCount = bookingList.filter(b => b.status !== 'Completed').length;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2">
          <PawPrint className="text-primary" />
          <h1 className="font-bold text-lg">Admin Dashboard</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => {
            logoutMutation.mutate(undefined, {
              onSuccess: () => setLocation("/admin/login"),
            });
          }}
          disabled={logoutMutation.isPending}
        >
          <LogOut size={16} className="mr-2" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Welcome back, Admin!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/pets">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-slate-700">Manage Pets</CardTitle>
                <PawPrint className="text-primary opacity-50" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">{petList.length}</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/products">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-slate-700">Products</CardTitle>
                <Package className="text-secondary opacity-50" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">{productList.length}</p>
                <p className="text-sm text-muted-foreground">In Store</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/bookings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-slate-700">Bookings</CardTitle>
                <Calendar className="text-green-500 opacity-50" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">{pendingVisitsCount}</p>
                <p className="text-sm text-muted-foreground">Pending Visits</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...bookingList].sort((a, b) => b.id - a.id).slice(0, 3).map((booking) => {
              let activityText = `New request from ${booking.name}`;
              if (booking.type === 'Grooming') {
                activityText = `Grooming visit request from ${booking.name}`;
              } else if (booking.type === 'Enquiry') {
                activityText = `Product purchasing request from ${booking.name}`;
              } else if (booking.type === 'Visit') {
                activityText = booking.detail === 'Visit request'
                  ? `New visit request from ${booking.name}`
                  : `Puppy buying request from ${booking.name}`;
              }

              return (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${booking.type === 'Grooming' ? 'bg-pink-500' :
                      booking.type === 'Enquiry' ? 'bg-blue-500' : 'bg-purple-500'
                      }`} />
                    <p className="font-medium text-sm">{activityText}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{booking.time}</span>
                </div>
              );
            })}
            {bookingList.length === 0 && <p className="text-muted-foreground text-sm">No recent activity.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
