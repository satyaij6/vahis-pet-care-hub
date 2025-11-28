import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { PawPrint, Package, Calendar, LogOut } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2">
          <PawPrint className="text-primary" />
          <h1 className="font-bold text-lg">Admin Dashboard</h1>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </Link>
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
                <p className="text-3xl font-bold mb-1">6</p>
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
                <p className="text-3xl font-bold mb-1">4</p>
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
                <p className="text-3xl font-bold mb-1">12</p>
                <p className="text-sm text-muted-foreground">Pending Visits</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <p className="font-medium text-sm">New visit request from Rahul</p>
                </div>
                <span className="text-xs text-muted-foreground">2 mins ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
